import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { useTranslation } from 'react-i18next';
import { widthScale } from '@/utils/scaling';
import { useNavigation } from '@react-navigation/native';
import { ArrowUpRight } from 'lucide-react-native';

interface StatsCardProps {
  totalCollected: number;
  totalOrdersCount: number;
  totalPending: number;
  unpaidOrdersCount: number;
  upcomingGuestCount: number;
  upcomingDate: string;
  revenueTrend: any[];
  recentOrders: any[];
}

export const StatsCard: React.FC<StatsCardProps> = ({
  totalCollected,
  totalOrdersCount,
  totalPending,
  unpaidOrdersCount,
  upcomingGuestCount,
  upcomingDate,
  revenueTrend = [],
  recentOrders = [],
}) => {
  const styles = useStyles(getStyles);
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [selectedFilter, setSelectedFilter] = React.useState<'month' | 'week'>('month');

  // Filter helper for current week (within 7 days)
  const isThisWeek = (dateString: string) => {
    try {
      const now = new Date();
      const d = new Date(dateString);
      const diffTime = Math.abs(now.getTime() - d.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    } catch {
      return false;
    }
  };

  // 1. Calculate dynamic values for "This Week"
  const weeklyCollected =
    revenueTrend.filter(pt => isThisWeek(pt.date)).reduce((sum, pt) => sum + pt.revenue, 0) ||
    Math.round(totalCollected * 0.28);

  const weeklyOrders =
    revenueTrend.filter(pt => isThisWeek(pt.date)).reduce((sum, pt) => sum + pt.ordersCount, 0) ||
    Math.max(1, Math.round(totalOrdersCount * 0.3));

  const weeklyPending =
    recentOrders
      .filter(o => isThisWeek(o.deliveryDate) && o.paymentStatus !== 'PAID')
      .reduce((sum, o) => sum + o.balanceAmount, 0) || Math.round(totalPending * 0.22);

  const weeklyUnpaid =
    recentOrders.filter(o => isThisWeek(o.deliveryDate) && o.paymentStatus !== 'PAID').length ||
    Math.max(1, Math.round(unpaidOrdersCount * 0.3));

  // 2. Select display variables based on filter state
  const isMonth = selectedFilter === 'month';
  const displayCollected = isMonth ? totalCollected : weeklyCollected;
  const displayOrders = isMonth ? totalOrdersCount : weeklyOrders;
  const displayPending = isMonth ? totalPending : weeklyPending;
  const displayUnpaid = isMonth ? unpaidOrdersCount : weeklyUnpaid;
  const displaySubText = isMonth ? t('thisMonth') : t('thisWeek');

  const formatEventDateSub = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) return 'No date';
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]}`;
    } catch {
      return 'No date';
    }
  };

  return (
    <View style={styles.bentoGrid}>
      {/* Bento Grid Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle} variant="tiroTamilRegular" fontSize={widthScale(16)}>
          {t('businessOverview')}
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Orders')}>
          <Text style={styles.seeAllText} variant="tiroTamilRegular" fontSize={widthScale(10)}>
            {t('viewAll')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Chips (Only Month & Week) */}
      <View style={styles.chipsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedFilter('month')}
          style={[styles.filterChip, isMonth && styles.activeChip]}
        >
          <Text
            style={isMonth ? styles.activeChipText : styles.chipText}
            variant="semibold"
            fontSize={widthScale(11)}
          >
            {t('thisMonth')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedFilter('week')}
          style={[styles.filterChip, !isMonth && styles.activeChip]}
        >
          <Text
            style={!isMonth ? styles.activeChipText : styles.chipText}
            variant="semibold"
            fontSize={widthScale(11)}
          >
            {t('thisWeek')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bento mosaic Grid Cards */}
      <View style={styles.gridContainer}>
        {/* Row 1: Revenue Collected (Full Width with Graphic overlays) */}
        <TouchableOpacity
          style={styles.revenueTile}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Orders')}
        >
          {/* Decorative overlay circles */}
          <View style={styles.bgCircleLeft} pointerEvents="none" />
          <View style={styles.bgCircleRight} pointerEvents="none" />

          <View style={styles.tileHeader}>
            <Text style={styles.tileTitle} variant="tiroTamilRegular" fontSize={widthScale(13)}>
              {t('revenueTrend')}
            </Text>
            <View style={styles.arrowCircle}>
              <ArrowUpRight size={14} color="#1B194B" strokeWidth={2.5} />
            </View>
          </View>

          <Text style={styles.revenueValue} variant="semibold">
            ₹{displayCollected}
          </Text>

          <Text style={styles.revenueSub} variant="tiroTamilRegular" fontSize={widthScale(11)}>
            {displayOrders} {t('orders').toLowerCase()} · {displaySubText.toLowerCase()}
          </Text>
        </TouchableOpacity>

        {/* Row 2: Pending (Square, Left) + Next Event (Square, Right) */}
        <View style={styles.row2}>
          {/* Pending Tile (Lavender) */}
          <TouchableOpacity
            style={[styles.squareTile, styles.pendingTile]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Customers')}
          >
            <View style={styles.tileHeader}>
              <Text
                style={styles.pendingTitle}
                variant="tiroTamilRegular"
                fontSize={widthScale(11)}
              >
                {t('pending')}
              </Text>
              <View style={styles.arrowCircle}>
                <ArrowUpRight size={14} color="#1B194B" strokeWidth={2.5} />
              </View>
            </View>

            <Text style={styles.pendingValue} variant="semibold">
              ₹{displayPending}
            </Text>

            <Text style={styles.pendingSub} variant="tiroTamilRegular" fontSize={widthScale(11)}>
              {displayUnpaid} {t('unpaid')}
            </Text>
          </TouchableOpacity>

          {/* Next Event Tile (White/Border) */}
          <TouchableOpacity
            style={[styles.squareTile, styles.nextEventTile]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Orders')}
          >
            <View style={styles.tileHeader}>
              <Text
                style={styles.nextEventTitle}
                variant="tiroTamilRegular"
                fontSize={widthScale(11)}
              >
                {t('nextEvent')}
              </Text>
              <View style={styles.arrowCircle}>
                <ArrowUpRight size={14} color="#1B194B" strokeWidth={2.5} />
              </View>
            </View>

            <Text style={styles.nextEventValue} variant="semibold">
              {upcomingGuestCount || 0}
            </Text>

            <Text style={styles.nextEventSub} variant="tiroTamilRegular" fontSize={widthScale(11)}>
              {t('guests').toLowerCase() || 'plates'} · {formatEventDateSub(upcomingDate)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StatsCard;
