import React from 'react';
import { View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { ScreenContainer, Skeleton } from '@/components';

import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { useProfile, useDashboard } from '@/hooks/queries';
import { useAppTheme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';
import DashboardHeader from './components/DashboardHeader';
import StatsCard from './components/StatsCard';
import DashboardFooter from './components/DashboardFooter';
import RevenueTrendChart from './components/RevenueTrendChart/RevenueTrendChart';
import RecentOrders from './components/RecentOrders/RecentOrders';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const DashboardScreen: React.FC<Props> = () => {
  const styles = useStyles(getStyles);

  const { isDark } = useAppTheme();

  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: dashboardData, isLoading: isDashboardLoading } = useDashboard();

  const firstName = profile?.firstName || 'Vignesh';

  if (isProfileLoading || isDashboardLoading) {
    return (
      <ScreenContainer
        scrollable={true}
        ignoreTopSafeArea={true}
        contentContainerStyle={styles.container}
        style={styles.screen}
        statusBarStyle={isDark ? 'light-content' : 'dark-content'}
      >
        {/* Header skeleton */}
        <View style={styles.skeletonHeader}>
          <Skeleton width={widthScale(120)} height={16} variant="text" />
          <Skeleton width={widthScale(160)} height={20} variant="text" style={{ marginTop: heightScale(8) }} />
          <View style={styles.skeletonButtonRow}>
            <Skeleton height={widthScale(46)} borderRadius={widthScale(23)} style={{ flex: 1 }} />
            <Skeleton height={widthScale(46)} borderRadius={widthScale(23)} style={{ flex: 1 }} />
            <Skeleton height={widthScale(46)} borderRadius={widthScale(23)} style={{ flex: 1 }} />
          </View>
        </View>

        {/* Stats section skeleton */}
        <View style={styles.skeletonSection}>
          <Skeleton width={widthScale(140)} height={16} variant="text" />
          <Skeleton height={widthScale(115)} borderRadius={widthScale(16)} style={{ marginTop: heightScale(16) }} />
          <View style={styles.skeletonRow2}>
            <Skeleton height={widthScale(95)} borderRadius={widthScale(16)} style={{ flex: 1 }} />
            <Skeleton height={widthScale(95)} borderRadius={widthScale(16)} style={{ flex: 1 }} />
          </View>
        </View>

        {/* Chart skeleton */}
        <View style={styles.skeletonSection}>
          <Skeleton width={widthScale(140)} height={16} variant="text" />
          <Skeleton height={widthScale(170)} borderRadius={widthScale(16)} style={{ marginTop: heightScale(16) }} />
        </View>

        {/* Recent orders skeleton */}
        <View style={styles.skeletonSection}>
          <Skeleton width={widthScale(140)} height={16} variant="text" />
          <View style={{ marginTop: heightScale(16) }}>
            {[0, 1, 2].map(i => (
              <View key={i} style={styles.skeletonListItem}>
                <Skeleton width={widthScale(40)} height={widthScale(42)} borderRadius={widthScale(8)} />
                <View style={styles.skeletonListInfo}>
                  <Skeleton width="60%" height={14} variant="text" />
                  <Skeleton width="40%" height={12} variant="text" />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScreenContainer>
    );
  }

  const totalCollected = dashboardData?.overview?.totalCollected ?? 0;
  const totalPending = dashboardData?.overview?.totalPending ?? 0;
  const totalOrdersCount = dashboardData?.overview?.totalOrdersCount ?? 0;
  // const upcomingCount = dashboardData?.orderStatusDistribution?.CONFIRMED ?? 0;
  const unpaidOrdersCount =
    (dashboardData?.paymentStatusDistribution?.PENDING ?? 0) +
    (dashboardData?.paymentStatusDistribution?.PARTIAL ?? 0);
  const upcomingGuestCount = dashboardData?.recentOrders?.[0]?.attributes?.guestCount ?? 0;
  const upcomingDate = dashboardData?.recentOrders?.[0]?.deliveryDate ?? '';

  return (
    <ScreenContainer
      scrollable={true}
      ignoreTopSafeArea={true}
      contentContainerStyle={styles.container}
      style={styles.screen}
      statusBarStyle={isDark ? 'light-content' : 'dark-content'}
    >
      <DashboardHeader firstName={firstName} />
      <StatsCard
        totalCollected={totalCollected}
        totalOrdersCount={totalOrdersCount}
        totalPending={totalPending}
        unpaidOrdersCount={unpaidOrdersCount}
        upcomingGuestCount={upcomingGuestCount}
        upcomingDate={upcomingDate}
        revenueTrend={dashboardData?.revenueTrend || []}
        recentOrders={dashboardData?.recentOrders || []}
      />
      <RevenueTrendChart data={dashboardData?.revenueTrend || []} />
      <RecentOrders orders={dashboardData?.recentOrders || []} />
      <DashboardFooter />
    </ScreenContainer>
  );
};

export default DashboardScreen;
