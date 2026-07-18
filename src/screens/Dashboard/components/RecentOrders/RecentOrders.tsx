import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, OrderTicketCard } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useAppTheme } from '@/theme';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { ArrowRight } from 'lucide-react-native';
import { RecentOrder } from '@/api/dashboard';
import { useNavigation } from '@react-navigation/native';

interface RecentOrdersProps {
  orders: RecentOrder[];
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders = [] }) => {
  const { t } = useLanguage();
  const { theme } = useAppTheme();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<any>();

  // Limit to 5 most recent orders
  const displayOrders = orders.slice(0, 5);

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text variant="bold" fontSize={16} style={styles.sectionTitle}>
          {t('recentOrders') || 'Recent Orders'}
        </Text>
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
      <View style={styles.headerRow}>
        <Text variant="bold" fontSize={16} style={styles.sectionTitle}>
          {t('recentOrders') || 'Recent Orders'}
        </Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text variant="bold" fontSize={12} style={styles.viewAllText}>
            {t('viewAll') || 'View All'}
          </Text>
          <ArrowRight size={14} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {displayOrders.map(order => (
          <OrderTicketCard
            key={order._id}
            orderId={order.orderNumber}
            eventName={order.attributes?.eventName}
            customerName={order.customerId?.customerName}
            eventDate={order.deliveryDate}
            guestCount={order.attributes?.guestCount}
            orderStatus={order.orderStatus}
            paymentStatus={order.paymentStatus}
            totalAmount={order.totalAmount}
            advanceAmount={order.advanceAmount}
            balanceAmount={order.balanceAmount}
            onPress={() => navigation.navigate('OrderDetail', { orderId: order._id })}
          />
        ))}
      </View>
    </View>
  );
};

export default RecentOrders;
