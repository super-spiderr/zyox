import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { ScreenContainer } from '@/components';

import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { useProfile, useDashboard } from '@/hooks/queries';
import { useAppTheme } from '@/theme';
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

  const { theme, isDark } = useAppTheme();

  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: dashboardData, isLoading: isDashboardLoading } = useDashboard();

  const firstName = profile?.firstName || 'Vignesh';

  if (isProfileLoading || isDashboardLoading) {
    return (
      <ScreenContainer
        scrollable={false}
        ignoreTopSafeArea={true}
        style={styles.screen}
        statusBarStyle={isDark ? 'light-content' : 'dark-content'}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
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
