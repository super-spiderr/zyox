import React, { useState, useMemo } from 'react';
import { View, FlatList, Alert, ActivityIndicator } from 'react-native';
import { ScreenContainer, Skeleton, GradientHeader, SearchBar, EmptyState } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import getStyles from './styles';
import { Customer } from '@/store/customerStore';
import { useDeleteCustomer, useUpdateCustomer, useOrders, useInfiniteCustomers } from '@/hooks/queries';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppTheme } from '@/theme';
import { RootStackParamList } from '@/navigation/types';
import {
  applyCustomerFiltersAndSort,
  getCustomerId,
  CustomerStatusFilter,
  CustomerTypeFilter,
  CustomerSortBy,
} from '@/utils/customerFilters';
import { CUSTOMERS_PAGE_SIZE, CUSTOMERS_SKELETON_KEYS } from '@/constants/customer';

// Import split subcomponents
import CustomerCard from '../components/CustomerCard';
import CustomerDetailModal from '../components/CustomerDetailModal';
import CustomerFilterModal from '../components/CustomerFilterModal';

export const CustomersScreen: React.FC = () => {
  const { t } = useLanguage();

  const styles = useStyles(getStyles);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { theme } = useAppTheme();

  // State controls
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebouncedSearch(searchQuery);
  const [statusFilter, setStatusFilter] = useState<CustomerStatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<CustomerTypeFilter>('all');
  const [sortBy, setSortBy] = useState<CustomerSortBy>('name');

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isFilterSheetVisible, setIsFilterSheetVisible] = useState(false);

  const {
    data: customersData,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteCustomers(CUSTOMERS_PAGE_SIZE, debouncedSearch);

  const customers = useMemo(() => {
    return customersData?.pages.flatMap(page => page.customers) ?? [];
  }, [customersData]);

  const processedCustomers = useMemo(
    () => applyCustomerFiltersAndSort(customers, { statusFilter, typeFilter, sortBy }),
    [customers, statusFilter, typeFilter, sortBy],
  );

  const isFiltering = Boolean(debouncedSearch) || statusFilter !== 'all' || typeFilter !== 'all';

  const { data: orders = [] } = useOrders();

  const deactivateMutation = useDeleteCustomer({
    onSuccess: () => {
      setIsDetailModalVisible(false);
      setSelectedCustomer(null);
      Alert.alert(t('success'), t('customerDeactivatedSuccess'));
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      Alert.alert(t('error'), err.response?.data?.message || t('failedToDeactivateCustomer'));
    },
  });

  const reactivateMutation = useUpdateCustomer({
    onSuccess: () => {
      setIsDetailModalVisible(false);
      setSelectedCustomer(null);
      Alert.alert(t('success'), t('customerReactivatedSuccess'));
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      Alert.alert(t('error'), err.response?.data?.message || t('failedToReactivateCustomer'));
    },
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Action Handlers
  const handleCardPress = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailModalVisible(true);
  };

  const handleEditCustomer = () => {
    setIsDetailModalVisible(false);
    if (selectedCustomer) {
      navigation.navigate('CreateCustomer', { editCustomerId: getCustomerId(selectedCustomer) });
    }
  };

  const handleDeactivate = () => {
    if (!selectedCustomer) return;
    Alert.alert(
      t('deleteConfirmTitle'),
      t('deleteConfirmMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => deactivateMutation.mutate(getCustomerId(selectedCustomer)),
        },
      ],
    );
  };

  const handleReactivate = () => {
    if (!selectedCustomer) return;
    Alert.alert(
      t('reactivateConfirmTitle'),
      t('reactivateConfirmMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('reactivateCustomerAction'),
          onPress: () =>
            reactivateMutation.mutate({
              id: getCustomerId(selectedCustomer),
              payload: { isActive: true },
            }),
        },
      ],
    );
  };

  return (
    <ScreenContainer
      style={styles.container}
      statusBarBgColor="transparent"
      ignoreTopSafeArea
      statusBarStyle={'light-content'}
    >
      {/* Header component */}
      <GradientHeader
        title={t('customersTitle')}
        description={t('customersDesc')}
        sortActive={sortBy === 'name'}
        onSortToggle={() => setSortBy(prev => (prev === 'name' ? 'recently' : 'name'))}
        onFilterPress={() => setIsFilterSheetVisible(true)}
      />

      {/* Search Bar component */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t('searchCustomersPlaceholder')}
      />

      {/* Customers List */}
      {isLoading ? (
        <View style={styles.list}>
          {CUSTOMERS_SKELETON_KEYS.map(key => (
            <View key={key} style={styles.cardWrapper}>
              <View style={styles.card}>
                <View style={styles.skeletonRow}>
                  <Skeleton variant="circle" width={38} height={38} style={styles.skeletonAvatar} />
                  <View style={styles.skeletonInfo}>
                    <Skeleton variant="text" width="60%" height={16} style={styles.skeletonName} />
                    <Skeleton variant="text" width="40%" height={12} />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          data={processedCustomers}
          keyExtractor={item => getCustomerId(item as Customer)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          refreshing={isRefetching}
          onRefresh={refetch}
          renderItem={({ item }) => {
            const customer = item as Customer;
            return <CustomerCard customer={customer} onPress={() => handleCardPress(customer)} />;
          }}
          ListEmptyComponent={
            <EmptyState
              image={require('@/assets/images/man_empty_state.png')}
              description={isFiltering ? t('noCustomersFound') : t('noCustomersYet')}
              actionLabel={isFiltering ? undefined : t('addCustomer')}
              onActionPress={isFiltering ? undefined : () => navigation.navigate('CreateCustomer')}
            />
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={styles.endLoader}>
                <ActivityIndicator size="small" color={theme.colors.primary} />
              </View>
            ) : null
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      )}

      {/* Details Display Bottom Sheet */}
      <CustomerDetailModal
        visible={isDetailModalVisible}
        onClose={() => setIsDetailModalVisible(false)}
        customer={selectedCustomer}
        orders={orders}
        onEditDetails={handleEditCustomer}
        onDeactivate={handleDeactivate}
        onReactivate={handleReactivate}
      />

      {/* Filter Options Bottom Sheet */}
      <CustomerFilterModal
        visible={isFilterSheetVisible}
        onClose={() => setIsFilterSheetVisible(false)}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />
    </ScreenContainer>
  );
};

export default CustomersScreen;
