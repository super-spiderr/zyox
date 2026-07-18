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
import DashboardQuickActions from './components/DashboardQuickActions';
import DashboardFooter from './components/DashboardFooter';
import RevenueTrendChart from './components/RevenueTrendChart/RevenueTrendChart';
import RecentOrders from './components/RecentOrders/RecentOrders';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </ScreenContainer>
    );
  }

  const totalRevenue = dashboardData?.overview?.totalRevenue ?? 0;
  const totalOrdersCount = dashboardData?.overview?.totalOrdersCount ?? 0;
  const totalCustomersCount = dashboardData?.overview?.totalCustomersCount ?? 0;

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
        totalRevenue={totalRevenue}
        activeOrdersCount={totalOrdersCount}
        activeCustomersCount={totalCustomersCount}
      />
      <RevenueTrendChart data={dashboardData?.revenueTrend || []} />
      <DashboardQuickActions
        onNewOrderPress={() => navigation.navigate('CreateOrder')}
        onCategoriesPress={() => navigation.navigate('Categories')}
        onProductsPress={() => navigation.navigate('Products')}
        onCustomersPress={() => navigation.navigate('Customers')}
        onPackagesPress={() => navigation.navigate('Packages')}
      />

      <RecentOrders orders={dashboardData?.recentOrders || []} />
      <DashboardFooter />
    </ScreenContainer>
  );
};

export default DashboardScreen;
