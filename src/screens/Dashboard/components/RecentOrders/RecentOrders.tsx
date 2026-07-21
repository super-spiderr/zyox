import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { RecentOrder } from '@/api/dashboard';
import { widthScale } from '@/utils/scaling';
import { useNavigation } from '@react-navigation/native';
import { Users } from 'lucide-react-native';
import { useAppTheme } from '@/theme';

interface RecentOrdersProps {
  orders: RecentOrder[];
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders = [] }) => {
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const { theme } = useAppTheme();
  const navigation = useNavigation<any>();

  const getCalendarDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) return { day: '??', month: '???' };
      const months = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
      ];
      return {
        day: String(date.getDate()).padStart(2, '0'),
        month: months[date.getMonth()],
      };
    } catch {
      return { day: '??', month: '???' };
    }
  };

  const getStatusColors = (status: string) => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return {
          bg: theme.colors.successBg,
          text: theme.colors.successText,
          label: t('orderStatusActive') || 'Confirmed',
        };
      case 'COMPLETED':
        return {
          bg: theme.colors.purpleBg,
          text: theme.colors.purpleText,
          label: t('completed') || 'Completed',
        };
      case 'PENDING':
        return {
          bg: theme.colors.warningBg,
          text: theme.colors.warningText,
          label: t('pending') || 'Pending',
        };
      case 'CANCELLED':
        return {
          bg: theme.colors.errorBg,
          text: theme.colors.errorText,
          label: t('orderStatusFailed') || 'Cancelled',
        };
      default:
        return {
          bg: theme.colors.mutedBg,
          text: theme.colors.mutedText,
          label: status,
        };
    }
  };

  const displayOrders = orders.slice(0, 3);

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle} variant="tiroTamilRegular" fontSize={widthScale(14)}>
            {t('recentOrders')}
          </Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText} variant="medium">
            {t('noRecentOrders') || 'No recent orders'}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Row: Title + Count Badge */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle} variant="tiroTamilRegular" fontSize={widthScale(14)}>
          {t('recentOrders')}
        </Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText} variant="tiroTamilRegular" fontSize={widthScale(12)}>
            {orders.length}
          </Text>
        </View>
      </View>

      {/* Compact Detailed Recent Orders List Card */}
      <View style={styles.listContainer}>
        {displayOrders.map((order, idx) => {
          const dateInfo = getCalendarDate(order.deliveryDate);
          const statusInfo = getStatusColors(order.orderStatus);
          const isLast = idx === displayOrders.length - 1;

          return (
            <TouchableOpacity
              key={order._id}
              style={[styles.compactItem, !isLast && styles.borderBottom]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('OrderDetail', { orderId: order._id })}
            >
              {/* Left Side Info */}
              <View style={styles.compactLeft}>
                {/* Mini Calendar Icon */}
                <View style={styles.calendarBox}>
                  <View style={styles.calendarHeader}>
                    <Text style={styles.calendarMonth} variant="tiroTamilRegular">
                      {dateInfo.month}
                    </Text>
                  </View>
                  <View style={styles.calendarBody}>
                    <Text style={styles.calendarDay} variant="tiroTamilRegular">
                      {dateInfo.day}
                    </Text>
                  </View>
                </View>

                {/* Text Details Column */}
                <View style={styles.infoCol}>
                  <Text
                    style={styles.eventTitle}
                    variant="tiroTamilRegular"
                    fontSize={widthScale(14)}
                    numberOfLines={1}
                  >
                    {order.attributes?.eventName || 'Catering Event'}
                  </Text>
                  <View style={styles.eventSubRow}>
                    <Text
                      style={styles.eventSub}
                      variant="medium"
                      fontSize={widthScale(11)}
                      numberOfLines={1}
                    >
                      {order.customerId?.customerName || 'Customer'}
                    </Text>
                    {order.attributes?.guestCount ? (
                      <>
                        <Text style={styles.eventSub} variant="medium" fontSize={widthScale(11)}>
                          {' '}
                          ·{' '}
                        </Text>
                        <Users size={11} color="#5E5E5E" style={styles.guestIcon} />
                        <Text style={styles.eventSub} variant="medium" fontSize={widthScale(11)}>
                          {order.attributes.guestCount}
                        </Text>
                      </>
                    ) : null}
                  </View>
                </View>
              </View>

              {/* Right Side Stats */}
              <View style={styles.compactRight}>
                {/* Tiny Status Badge */}
                <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                  <Text
                    style={[styles.statusBadgeText, { color: statusInfo.text }]}
                    variant="tiroTamilRegular"
                  >
                    {statusInfo.label.toUpperCase()}
                  </Text>
                </View>

                {/* Pricing */}
                <Text style={styles.priceText} variant="tiroTamilRegular" fontSize={widthScale(13)}>
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default RecentOrders;
