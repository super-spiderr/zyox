import React, { useState, useMemo, useEffect } from 'react';
import { View, FlatList, Alert, Image } from 'react-native';
import { ScreenContainer, Text, Skeleton, Button, GradientHeader } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './CustomersScreen.styles';
import { Customer } from '@/store/customerStore';
import { useCustomers, useDeleteCustomer, useOrders } from '@/hooks/queries';
import { useNavigation } from '@react-navigation/native';

// Import split subcomponents
import CustomerSearchBar from './components/CustomerSearchBar';
import CustomerCard from './components/CustomerCard';
import CustomerDetailModal from './components/CustomerDetailModal';
import CustomerFilterModal from './components/CustomerFilterModal';
import CustomerPagination from './components/CustomerPagination';

export const CustomersScreen: React.FC = () => {
  const { t } = useLanguage();

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
  const [sortBy, setSortBy] = useState<'name' | 'recently'>('name'); // default to alphabetical for clean directory

  // Pagination controls
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modal / Sheet visibility states
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isFilterSheetVisible, setIsFilterSheetVisible] = useState(false);

  // Fetch Customers List & Orders from backend API
  const { data: customers = [], isLoading, refetch } = useCustomers();
  const { data: orders = [] } = useOrders();

  // Delete Mutation
  const deleteMutation = useDeleteCustomer({
    onSuccess: () => {
      setIsDetailModalVisible(false);
      setSelectedCustomer(null);
      Alert.alert('Success', 'Customer deactivated successfully!');
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to deactivate customer');
    },
  });

  // Filter Customers
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

    // 4. Sort list based on sortBy selection
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

  // Reset page to 1 when filters, search query or sort order changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, typeFilter, sortBy]);

  const totalItems = processedCustomers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // Ensure current page remains valid
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Paginated slice of processed customers
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedCustomers.slice(start, start + pageSize);
  }, [processedCustomers, currentPage, pageSize]);

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

  const handleDelete = () => {
    if (!selectedCustomer) return;
    Alert.alert(
      t('deleteConfirmTitle') || 'Deactivate Customer',
      t('deleteConfirmMessage') || 'Are you sure you want to deactivate this customer?',
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
      <CustomerSearchBar value={searchQuery} onChangeText={setSearchQuery} />

      {/* Customers List */}
      <View style={styles.listWrapper}>
        <FlatList
          data={isLoading ? ([1, 2, 3, 4] as any) : paginatedCustomers}
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
                <Text style={styles.emptyText}>
                  {t('noCustomersFound') || 'No customers found.'}
                </Text>
              )}
            </View>
          }
          ListFooterComponent={
            !isLoading && totalItems > 0 ? (
              <CustomerPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            ) : null
          }
          style={styles.flatList}
        />
      </View>

      {/* Details Display Bottom Sheet */}
      <CustomerDetailModal
        visible={isDetailModalVisible}
        onClose={() => setIsDetailModalVisible(false)}
        customer={selectedCustomer}
        orders={orders}
        onEditDetails={handleEditCustomer}
        onDelete={handleDelete}
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
