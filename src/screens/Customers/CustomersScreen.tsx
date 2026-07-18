import React, { useState, useMemo } from 'react';
import { View, FlatList, Alert, Image } from 'react-native';
import { ScreenContainer, Text, Skeleton, Button, GradientHeader } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useAppTheme } from '@/theme';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './CustomersScreen.styles';
import { Customer } from '@/store/customerStore';
import { useCustomers, useDeleteCustomer } from '@/hooks/queries';
import { useNavigation } from '@react-navigation/native';

// Import split subcomponents
import CustomerSearchBar from './components/CustomerSearchBar';
import CustomerCard from './components/CustomerCard';
import CustomerActionSheet from './components/CustomerActionSheet';
import CustomerDetailModal from './components/CustomerDetailModal';
import CustomerFilterModal from './components/CustomerFilterModal';

const customersIcon = require('@/assets/images/customers_icon.png');

export const CustomersScreen: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useAppTheme();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<any>();

  // Safe helper to obtain customer ID (_id or id)
  const getCustomerId = (customer?: Customer | null) => {
    if (!customer) return '';
    return customer.id || customer._id || customer.customerName;
  };

  // State controls
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('active');
  const [typeFilter, setTypeFilter] = useState<'all' | 'individual' | 'business'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'recently'>('recently');

  // Modal / Sheet visibility states
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isFilterSheetVisible, setIsFilterSheetVisible] = useState(false);

  // Fetch Customers List from backend API
  const { data: customers = [], isLoading, refetch } = useCustomers();

  // Delete Mutation
  const deleteMutation = useDeleteCustomer({
    onSuccess: () => {
      setIsActionSheetVisible(false);
      setSelectedCustomer(null);
      Alert.alert('Success', 'Customer deleted successfully!');
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to delete customer');
    },
  });

  // Filter and Sort Customers
  const processedCustomers = useMemo(() => {
    // 1. Filter by status (all vs active vs inactive)
    let list = customers;
    if (statusFilter === 'active') {
      list = customers.filter(c => c.isActive === true);
    } else if (statusFilter === 'inactive') {
      list = customers.filter(c => c.isActive === false);
    }

    // 2. Filter by customer type (all vs individual vs business)
    if (typeFilter === 'individual') {
      list = list.filter(c => c.customerType === 'INDIVIDUAL');
    } else if (typeFilter === 'business') {
      list = list.filter(c => c.customerType === 'BUSINESS');
    }

    // 3. Filter by search query
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter(
        c =>
          c.customerName.toLowerCase().includes(query) ||
          c.phoneNumber.toLowerCase().includes(query) ||
          c.alternatePhoneNumber?.toLowerCase().includes(query),
      );
    }

    // 4. Sort list
    if (sortBy === 'name') {
      list.sort((a, b) => a.customerName.localeCompare(b.customerName));
    } else if (sortBy === 'recently') {
      list.sort((a, b) => {
        const idA = a._id || a.id || '';
        const idB = b._id || b.id || '';
        return idB.localeCompare(idA); // Descending order (newest first)
      });
    }

    return list;
  }, [customers, statusFilter, typeFilter, searchQuery, sortBy]);

  // Action Handlers
  const handleCardPress = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsActionSheetVisible(true);
  };

  const handleCreateOrder = () => {
    setIsActionSheetVisible(false);
    if (selectedCustomer) {
      navigation.navigate('CreateOrder', { selectCustomerId: getCustomerId(selectedCustomer) });
    }
  };

  const handleViewOrderHistory = () => {
    setIsActionSheetVisible(false);
    if (selectedCustomer) {
      navigation.navigate('Orders', { customerSearchQuery: selectedCustomer.customerName });
    }
  };

  const handleEditCustomer = () => {
    setIsActionSheetVisible(false);
    if (selectedCustomer) {
      navigation.navigate('CreateCustomer', { editCustomerId: getCustomerId(selectedCustomer) });
    }
  };

  const handleDelete = () => {
    if (!selectedCustomer) return;
    Alert.alert(
      t('deleteConfirmTitle') || 'Delete Customer',
      t('deleteConfirmMessage') || 'Are you sure you want to delete this customer?',
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => deleteMutation.mutate(getCustomerId(selectedCustomer)),
        },
      ],
    );
  };

  return (
    <ScreenContainer
      style={styles.container}
      statusBarBgColor="transparent"
      ignoreTopSafeArea
      statusBarStyle={isDark ? 'dark-content' : 'light-content'}
    >
      {/* Header component */}
      <GradientHeader
        title={t('customersTitle') || 'Customer Directory'}
        description={t('customersDesc') || 'Manage, search, and update client records.'}
        count={isLoading ? undefined : processedCustomers.length}
        countLabel={processedCustomers.length === 1 ? t('customer') : t('customers')}
        image={customersIcon}
        sortActive={sortBy === 'name'}
        onSortToggle={() => setSortBy(prev => (prev === 'name' ? 'recently' : 'name'))}
        onFilterPress={() => setIsFilterSheetVisible(true)}
      />

      {/* Search Bar component */}
      <CustomerSearchBar value={searchQuery} onChangeText={setSearchQuery} />

      {/* Customers Directory List */}
      <FlatList
        data={isLoading ? ([1, 2, 3, 4] as any) : processedCustomers}
        keyExtractor={(item, index) =>
          isLoading ? String(index) : getCustomerId(item as Customer)
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        refreshing={isLoading}
        onRefresh={refetch}
        renderItem={({ item }) => {
          if (isLoading) {
            return (
              <View style={styles.cardWrapper}>
                <View style={styles.card}>
                  <View style={styles.skeletonRow}>
                    <Skeleton
                      variant="circle"
                      width={38}
                      height={38}
                      style={styles.skeletonAvatar}
                    />
                    <View style={styles.skeletonInfo}>
                      <Skeleton
                        variant="text"
                        width="60%"
                        height={16}
                        style={styles.skeletonName}
                      />
                      <Skeleton variant="text" width="40%" height={12} />
                    </View>
                  </View>
                </View>
              </View>
            );
          }

          const customer = item as Customer;
          return <CustomerCard customer={customer} onPress={() => handleCardPress(customer)} />;
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Image
              source={require('@/assets/images/man_empty_state.png')}
              style={styles.emptyIllustration}
            />
            {customers.length === 0 ? (
              <>
                <Text style={styles.emptyText} variant="bold" fontSize={16}>
                  {t('noCustomersYet') || 'No customers yet'}
                </Text>
                <Text style={styles.emptyText}>
                  {t('tapPlusToStart') ||
                    'Tap add customer to start managing your client directory.'}
                </Text>
                <Button
                  title={`+ ${t('addCustomer') || 'Add Customer'}`}
                  onPress={() => navigation.navigate('CreateCustomer')}
                  style={styles.emptyStateButton}
                />
              </>
            ) : (
              <Text style={styles.emptyText}>{t('noCustomersFound') || 'No customers found.'}</Text>
            )}
          </View>
        }
      />

      {/* Actions Bottom Sheet Modal */}
      <CustomerActionSheet
        visible={isActionSheetVisible}
        onClose={() => setIsActionSheetVisible(false)}
        customer={selectedCustomer}
        onCreateOrder={handleCreateOrder}
        onViewOrderHistory={handleViewOrderHistory}
        onViewDetails={() => {
          setIsActionSheetVisible(false);
          setIsDetailModalVisible(true);
        }}
        onEditDetails={handleEditCustomer}
        onDelete={handleDelete}
      />

      {/* Details Display Modal */}
      <CustomerDetailModal
        visible={isDetailModalVisible}
        onClose={() => setIsDetailModalVisible(false)}
        customer={selectedCustomer}
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
