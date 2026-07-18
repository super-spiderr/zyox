import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, AnimatedNumber } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { TrendingUp, ShoppingBag, Users } from 'lucide-react-native';
import { palette } from '@/theme';

interface DashboardCountsProps {
  totalRevenue: number;
  activeOrdersCount: number;
  activeCustomersCount: number;
  onOrdersPress: () => void;
  onCustomersPress: () => void;
}

export const DashboardCounts: React.FC<DashboardCountsProps> = ({
  totalRevenue,
  activeOrdersCount,
  activeCustomersCount,
  onOrdersPress,
  onCustomersPress,
}) => {
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.container}>
      {/* Revenue Card (Full Width) */}
      <View style={styles.revenueCard}>
        {/* Background Watermark Pattern */}
        <View
          style={[styles.cardWatermark, { transform: [{ rotate: '-15deg' }] }]}
          pointerEvents="none"
        >
          <TrendingUp size={90} color={palette.successPastelText} />
        </View>

        <View style={styles.revenueIconWrapper}>
          <TrendingUp size={22} color={palette.successPastelText} />
        </View>
        <View style={styles.revenueContent}>
          <Text style={styles.cardLabel} variant="medium">
            {t('revenue')}
          </Text>
          <AnimatedNumber
            value={totalRevenue}
            prefix="₹"
            fontSize={24}
            variant="bold"
            style={styles.cardValue}
          />
        </View>
      </View>

      {/* Grid Row */}
      <View style={styles.row}>
        {/* Orders Card (Half Width) */}
        <TouchableOpacity style={styles.smallCard} activeOpacity={0.8} onPress={onOrdersPress}>
          {/* Background Watermark Pattern */}
          <View
            style={[styles.cardWatermark, { transform: [{ rotate: '-15deg' }] }]}
            pointerEvents="none"
          >
            <ShoppingBag size={75} color={palette.infoPastelText} />
          </View>

          <View style={[styles.iconWrapper, styles.ordersIconBg]}>
            <ShoppingBag size={20} color={palette.infoPastelText} />
          </View>
          <Text style={styles.cardLabel} variant="medium">
            {t('orders')}
          </Text>
          <AnimatedNumber
            value={activeOrdersCount}
            fontSize={40}
            variant="bold"
            style={styles.cardValue}
          />
        </TouchableOpacity>

        {/* Customers Card (Half Width) */}
        <TouchableOpacity style={styles.smallCard} activeOpacity={0.8} onPress={onCustomersPress}>
          {/* Background Watermark Pattern */}
          <View
            style={[styles.cardWatermark, { transform: [{ rotate: '-15deg' }] }]}
            pointerEvents="none"
          >
            <Users size={75} color={palette.warningPastelText} />
          </View>

          <View style={[styles.iconWrapper, styles.customersIconBg]}>
            <Users size={20} color={palette.warningPastelText} />
          </View>
          <Text style={styles.cardLabel} variant="medium">
            {t('customers')}
          </Text>
          <AnimatedNumber
            value={activeCustomersCount}
            fontSize={20}
            variant="bold"
            style={styles.cardValue}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardCounts;
