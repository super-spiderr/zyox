import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '@/components';
import LinearGradient from 'react-native-linear-gradient';
import { useStyles } from '@/hooks/useStyles';
import { useAppTheme } from '@/theme';
import getStyles from './styles';
import { useTranslation } from 'react-i18next';
import { widthScale } from '@/utils/scaling';

interface StatsCardProps {
  totalRevenue?: number;
  activeOrdersCount?: number;
  activeCustomersCount?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  totalRevenue = 24500,
  activeOrdersCount = 12,
  activeCustomersCount = 8,
}) => {
  const { theme, isDark } = useAppTheme();
  const styles = useStyles(getStyles);
  const { t } = useTranslation();

  const startColor = theme.colors.primary;
  const endColor = theme.colors.cardGradEnd;
  const colors = isDark ? [endColor, startColor, endColor] : [startColor, endColor, startColor];
  return (
    <View style={styles.gradientCard}>
      <LinearGradient
        colors={colors}
        start={{ x: 0.4, y: 1.3 }}
        end={{ x: 0.8, y: 0 }}
        angle={240}
        angleCenter={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Image source={require('@/assets/images/payments_icon.png')} style={styles.moneyIcon} />
      <View style={styles.hotelHeader}>
        <Text style={styles.hotelName} variant="bold" fontSize={widthScale(18)}>
          {t('cateringTitle') || 'SRI GOKULAM'}
        </Text>
        <Text style={styles.hotelSubtitle} variant="bold" fontSize={widthScale(9)}>
          {t('cateringSubtitle') || 'HOTEL & CATERING'}
        </Text>
        <Text style={styles.footerText} variant="medium" fontSize={widthScale(9)}>
          Powered by Zyox
        </Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.cardRow}>
        <View style={styles.cardCol}>
          <Text style={styles.colTitle} variant="bold" fontSize={widthScale(11)}>
            {t('revenue') || 'Revenue'}
          </Text>
          <Text style={styles.colValue} variant="bold" fontSize={widthScale(18)}>
            ₹{totalRevenue.toLocaleString('en-IN')}
          </Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.cardCol}>
          <Text style={styles.colTitle} variant="bold" fontSize={widthScale(11)}>
            {t('orders') || 'Orders'}
          </Text>
          <Text style={styles.colValue} variant="bold" fontSize={widthScale(18)}>
            {activeOrdersCount.toLocaleString('en-IN')}
          </Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.cardCol}>
          <Text style={styles.colTitle} variant="bold" fontSize={widthScale(11)}>
            {t('customers') || 'Customers'}
          </Text>
          <Text style={styles.colValue} variant="bold" fontSize={widthScale(18)}>
            {activeCustomersCount.toLocaleString('en-IN')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StatsCard;
