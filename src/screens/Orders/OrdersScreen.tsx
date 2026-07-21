import React, { useState, useMemo, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import {
  ScreenContainer,
  Text,
  Skeleton,
  GradientHeader,
  GradientHeaderAction,
  OrderTicketCard,
} from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './OrdersScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { useOrders, useCustomers } from '@/hooks/queries';
import { Search, Plus, X, Calendar } from 'lucide-react-native';
import { Order, OrderStatus } from '@/api/order';

const ordersIcon = require('@/assets/images/orders_icon.png');

export const OrdersScreen: React.FC = () => {
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<any>();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'ALL' | OrderStatus>('ALL');

  // Fetch orders list from backend API
  const { data: orders = [], isLoading: isOrdersLoading, refetch: refetchOrders } = useOrders();

  const { data: customers = [] } = useCustomers();

  const getCustomerName = useCallback(
    (customerId: string | { _id: string; customerName: string }) => {
      if (!customerId) return 'Unknown Customer';
      if (typeof customerId === 'object') {
        return customerId.customerName;
      }
      const cust = customers.find(c => (c._id || c.id) === customerId);
      return cust ? cust.customerName : 'Loading...';
    },
    [customers],
  );

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const custName = getCustomerName(o.customerId)?.toLowerCase();
      const matchesSearch =
        o.attributes.eventName?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        custName.includes(searchQuery.trim().toLowerCase());
      const matchesStatus =
        selectedStatusFilter === 'ALL' || o.orderStatus === selectedStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, selectedStatusFilter, getCustomerName]);

  const openAddModal = () => {
    navigation.navigate('CreateOrder');
  };

  const getOrderDisplayId = (order: Order) =>
    order._id ? order._id.slice(-6).toUpperCase() : '------';

  const renderOrderItem = ({ item }: { item: Order }) => (
    <OrderTicketCard
      compact
      orderId={getOrderDisplayId(item)}
      eventName={item.attributes?.eventName}
      customerName={getCustomerName(item.customerId)}
      eventDate={item.deliveryDate}
      guestCount={item.attributes?.guestCount}
      orderStatus={item.orderStatus}
      paymentStatus={item.paymentStatus}
      onPress={() => navigation.navigate('OrderDetail', { orderId: item._id })}
    />
  );

  return (
    <ScreenContainer
      scrollable={false}
      contentContainerStyle={styles.container}
      statusBarBgColor="transparent"
      ignoreTopSafeArea
      statusBarStyle={'light-content'}
    >
      <GradientHeader
        title={t('ordersTitle')}
        description={t('ordersDesc') || 'Manage, search, and track customer catering orders.'}
        count={isOrdersLoading ? undefined : filteredOrders.length}
        countLabel={filteredOrders.length === 1 ? 'Order' : 'Orders'}
        image={ordersIcon}
        action={
          <GradientHeaderAction
            icon={<Plus size={16} color={theme.colors.primaryText} />}
            onPress={openAddModal}
          />
        }
      />

      <View style={styles.body}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Search size={18} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchOrdersPlaceholder')}
            placeholderTextColor={theme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery('')}>
              <X size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Row */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {(['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as const).map(status => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterDropdown,
                  selectedStatusFilter === status && { backgroundColor: theme.colors.primaryLight },
                  { marginRight: 8, paddingHorizontal: 12, height: 28 },
                ]}
                onPress={() => setSelectedStatusFilter(status)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedStatusFilter === status && {
                      color: theme.colors.primary,
                      fontFamily: theme.typography.fonts.urbanist.bold,
                    },
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {isOrdersLoading ? (
          <View style={styles.list}>
            {Array.from({ length: 5 }).map((_, index) => (
              <View key={index} style={[styles.card, { padding: 16, gap: 10 }]}>
                {/* Header row skeleton */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Skeleton variant="text" width="60%" height={16} />
                  <Skeleton variant="rect" width={80} height={20} borderRadius={10} />
                </View>

                {/* Customer name skeleton */}
                <Skeleton variant="text" width="40%" height={14} />

                {/* Meta row skeleton */}
                <View style={{ flexDirection: 'row', gap: 16, marginTop: 4 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Skeleton variant="circle" width={14} height={14} />
                    <Skeleton variant="text" width={80} height={12} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Skeleton variant="circle" width={14} height={14} />
                    <Skeleton variant="text" width={50} height={12} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <FlatList
            data={filteredOrders}
            keyExtractor={item => item._id}
            renderItem={renderOrderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            onRefresh={refetchOrders}
            refreshing={isOrdersLoading}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Calendar size={48} color={theme.colors.textMuted} />
                <Text style={styles.emptyStateText}>{t('noOrders')}</Text>
              </View>
            }
          />
        )}
      </View>
    </ScreenContainer>
  );
};

export default OrdersScreen;
