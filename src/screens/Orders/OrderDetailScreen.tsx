import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
  Share,
} from 'react-native';
import { ScreenContainer, Text, GradientHeader } from '@/components';
import { useAppTheme, palette } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './OrdersScreen.styles';
import { useOrders, useCustomers, useDeleteOrder } from '@/hooks/queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Edit, Trash2, FileText } from 'lucide-react-native';
import { generatePDF } from 'react-native-html-to-pdf';
import { generateInvoiceHTML } from '@/utils/invoiceTemplate';
import { Order, PaymentStatus, OrderStatus } from '@/api/order';

const ordersIcon = require('@/assets/images/orders_icon.png');

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetail'>;

export const OrderDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme, isDark, themeMode } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  const { orderId } = route.params;
  const { data: orders = [], isLoading: isOrdersLoading } = useOrders();
  const { data: customers = [] } = useCustomers();
  const order = useMemo(() => orders.find(o => o._id === orderId) || null, [orders, orderId]);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const deleteMutation = useDeleteOrder({
    onSuccess: () => navigation.goBack(),
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to delete order');
    },
  });

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

  const getCustomerPhone = useCallback(
    (customerId: string | { _id: string; phoneNumber?: string }) => {
      if (!customerId) return '';
      if (typeof customerId === 'object') {
        return customerId.phoneNumber || '';
      }
      const cust = customers.find(c => (c._id || c.id) === customerId);
      return cust ? cust.phoneNumber : '';
    },
    [customers],
  );

  const getOrderTotal = (o: Order) => {
    const itemsTotal = o.orderItems?.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) || 0;
    return Math.max(0, itemsTotal - (o.discountAmount || 0));
  };

  const getOrderStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return styles.badge_pending;
      case 'CONFIRMED':
        return styles.badge_confirmed;
      case 'COMPLETED':
        return styles.badge_completed;
      case 'CANCELLED':
        return styles.badge_cancelled;
    }
  };

  const getOrderStatusTextStyle = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return styles.badgeText_pending;
      case 'CONFIRMED':
        return styles.badgeText_confirmed;
      case 'COMPLETED':
        return styles.badgeText_completed;
      case 'CANCELLED':
        return styles.badgeText_cancelled;
    }
  };

  const getPaymentStatusStyle = (status: PaymentStatus) => {
    switch (status) {
      case 'PENDING':
        return styles.badge_unpaid;
      case 'PARTIAL':
        return styles.badge_partial;
      case 'PAID':
        return styles.badge_paid;
    }
  };

  const getPaymentStatusTextStyle = (status: PaymentStatus) => {
    switch (status) {
      case 'PENDING':
        return styles.badgeText_unpaid;
      case 'PARTIAL':
        return styles.badgeText_partial;
      case 'PAID':
        return styles.badgeText_paid;
    }
  };

  const handleSharePDF = async () => {
    if (!order || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const customerName = getCustomerName(order.customerId);
      const customerPhone = getCustomerPhone(order.customerId);
      const htmlContent = generateInvoiceHTML(order, { name: customerName, phone: customerPhone });

      const options = {
        html: htmlContent,
        fileName: `invoice_${
          order._id ? order._id.substring(order._id.length - 6).toUpperCase() : 'order'
        }`,
        directory: 'Documents',
      };

      const file = await generatePDF(options);
      if (file?.filePath) {
        await Share.share({
          url: Platform.OS === 'ios' ? file.filePath : `file://${file.filePath}`,
          title: 'Catering Invoice PDF',
        });
      } else {
        Alert.alert('Error', 'Could not generate invoice PDF file path');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to generate and share PDF invoice');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleEdit = () => {
    if (!order) return;
    navigation.navigate('CreateOrder', { editOrderId: order._id });
  };

  const handleDelete = () => {
    if (!order) return;
    Alert.alert(
      t('deleteOrderConfirmTitle'),
      t('deleteOrderConfirmMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => deleteMutation.mutate(order._id),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <ScreenContainer
      style={styles.container}
      statusBarBgColor="transparent"
      ignoreTopSafeArea
      statusBarStyle={isDark ? 'light-content' : 'dark-content'}
    >
      <GradientHeader
        title={order?.eventName || t('viewOrder') || 'Order Details'}
        description={order ? `Order ID: ${order._id.slice(-6).toUpperCase()}` : undefined}
        image={ordersIcon}
      />

      <View style={styles.body}>
        {!order ? (
          <View style={styles.loadingContainer}>
            {isOrdersLoading ? (
              <ActivityIndicator size="large" color={theme.colors.primary} />
            ) : (
              <Text color="textSecondary">Order not found.</Text>
            )}
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Status */}
            <View style={styles.detailTitleSection}>
              <View style={[styles.badge, getOrderStatusStyle(order.orderStatus)]}>
                <Text style={[styles.badgeText, getOrderStatusTextStyle(order.orderStatus)]}>
                  {order.orderStatus}
                </Text>
              </View>
            </View>

            {/* Customer Details */}
            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Customer Information</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Client Name:</Text>
                <Text style={styles.detailValue}>{getCustomerName(order.customerId)}</Text>
              </View>
              {getCustomerPhone(order.customerId) ? (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Contact Phone:</Text>
                  <Text style={styles.detailValue}>{getCustomerPhone(order.customerId)}</Text>
                </View>
              ) : null}
            </View>

            {/* Event Schedule Details */}
            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Event Details</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Event Date:</Text>
                <Text style={styles.detailValue}>
                  {order.eventDate ? order.eventDate.split('T')[0] : ''}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Estimated Guests:</Text>
                <Text style={styles.detailValue}>{order.guestCount} Pax</Text>
              </View>
              {order.notes ? (
                <View style={[styles.detailSection, styles.notesSection]}>
                  <Text style={styles.detailLabel}>Special Instructions:</Text>
                  <Text style={[styles.detailValue, styles.notesValue]}>{order.notes}</Text>
                </View>
              ) : null}
            </View>

            {/* Nested Order Items list */}
            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Menu / Catering Items</Text>
              {order.orderItems?.map((item, idx) => (
                <View key={idx} style={styles.detailItemRow}>
                  <View style={styles.detailItemLeft}>
                    <Text style={styles.detailItemName}>{item.name}</Text>
                    <Text style={styles.detailItemSub}>
                      {item.type} • {item.quantity} x ₹{item.unitPrice}
                    </Text>
                  </View>
                  <View style={styles.detailItemRight}>
                    <Text style={styles.detailItemTotal}>₹{item.quantity * item.unitPrice}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Financial Summary Details */}
            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Payment & Invoicing</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment Status:</Text>
                <View style={[styles.badge, getPaymentStatusStyle(order.paymentStatus)]}>
                  <Text style={[styles.badgeText, getPaymentStatusTextStyle(order.paymentStatus)]}>
                    {order.paymentStatus}
                  </Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Items Total:</Text>
                <Text style={styles.detailValue}>
                  ₹{order.orderItems?.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) || 0}
                </Text>
              </View>
              {order.discountAmount > 0 ? (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Discount Applied:</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.error }]}>
                    -₹{order.discountAmount}
                  </Text>
                </View>
              ) : null}
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, styles.detailLabelBold]}>Grand Total:</Text>
                <Text style={[styles.detailValue, styles.detailValueBold, { color: theme.colors.primary }]}>
                  ₹{getOrderTotal(order)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Advance Paid:</Text>
                <Text style={[styles.detailValue, { color: theme.colors.primary }]}>
                  ₹{order.advanceAmount}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, styles.detailLabelBold]}>Balance Due:</Text>
                <Text
                  style={[
                    styles.detailValue,
                    styles.detailValueBold,
                    {
                      color:
                        getOrderTotal(order) - order.advanceAmount > 0
                          ? theme.colors.error
                          : theme.colors.primary,
                    },
                  ]}
                >
                  ₹{getOrderTotal(order) - order.advanceAmount}
                </Text>
              </View>
            </View>

            {/* Documents Links */}
            {order.quotationUrl || order.invoiceUrl || order.completedAt ? (
              <View style={styles.detailSection}>
                <Text style={styles.detailSectionTitle}>Records</Text>
                {order.completedAt ? (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Completed Date:</Text>
                    <Text style={styles.detailValue}>{order.completedAt.split('T')[0]}</Text>
                  </View>
                ) : null}
                {order.quotationUrl ? (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Quotation File:</Text>
                    <Text
                      style={[styles.detailValue, styles.linkValue, { color: theme.colors.primary }]}
                      numberOfLines={1}
                    >
                      {order.quotationUrl}
                    </Text>
                  </View>
                ) : null}
                {order.invoiceUrl ? (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Invoice File:</Text>
                    <Text
                      style={[styles.detailValue, styles.linkValue, { color: theme.colors.primary }]}
                      numberOfLines={1}
                    >
                      {order.invoiceUrl}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}

            {/* Edit / Delete / Share actions */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  {
                    borderColor: palette.emerald500,
                    backgroundColor: themeMode === 'light' ? palette.googleGreenBg : palette.darkBgOrderSuccess,
                  },
                ]}
                onPress={handleSharePDF}
                disabled={isGeneratingPdf}
              >
                {isGeneratingPdf ? (
                  <ActivityIndicator size="small" color={palette.emerald500} />
                ) : (
                  <View style={styles.actionBtnRow}>
                    <FileText size={16} color={palette.emerald500} />
                    <Text style={[styles.actionBtnText, styles.actionBtnTextGap, { color: palette.emerald500 }]}>
                      PDF
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  {
                    borderColor: theme.colors.primary,
                    backgroundColor: themeMode === 'light' ? palette.primary50 : palette.slate800,
                  },
                ]}
                onPress={handleEdit}
              >
                <Edit size={16} color={theme.colors.primary} />
                <Text style={[styles.actionBtnText, { color: theme.colors.primary }]}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  {
                    borderColor: theme.colors.error,
                    backgroundColor: themeMode === 'light' ? palette.error50 : palette.darkBgOrderError,
                  },
                ]}
                onPress={handleDelete}
              >
                <Trash2 size={16} color={theme.colors.error} />
                <Text style={[styles.actionBtnText, { color: theme.colors.error }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </ScreenContainer>
  );
};

export default OrderDetailScreen;
