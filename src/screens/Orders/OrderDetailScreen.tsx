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
import {
  ScreenContainer,
  Text,
  Button,
  GradientHeader,
  GradientHeaderAction,
  WhatsAppIcon,
} from '@/components';
import { useAppTheme, palette } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './OrderDetailScreen.styles';
import { useOrders, useCustomers, useDeleteOrder } from '@/hooks/queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import {
  Edit,
  Trash2,
  FileText,
  User,
  Calendar,
  Users,
  ChefHat,
  CreditCard,
  Phone,
  Share2,
} from 'lucide-react-native';
import { generatePDF } from 'react-native-html-to-pdf';
import { generateInvoiceHTML } from '@/utils/invoiceTemplate';
import { getInitials, getAvatarColors } from '@/utils/avatar';
import { callPhoneNumber, openWhatsApp } from '@/utils/contactActions';
import { Order, PaymentStatus, OrderStatus } from '@/api/order';
import { InvoicePreviewModal } from './components/InvoicePreviewModal';

const ordersIcon = require('@/assets/images/orders_icon.png');

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetail'>;

export const OrderDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  const { orderId } = route.params;
  const { data: orders = [], isLoading: isOrdersLoading } = useOrders();
  const { data: customers = [] } = useCustomers();
  const order = useMemo(() => orders.find(o => o._id === orderId) || null, [orders, orderId]);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [invoiceFilePath, setInvoiceFilePath] = useState<string | null>(null);
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);

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
    const itemsTotal =
      o.orderItems?.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) || 0;
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

  // Generates the invoice PDF once and caches the file path so repeat
  // views/shares don't regenerate it.
  const generateInvoicePdf = async (): Promise<string | null> => {
    if (invoiceFilePath) return invoiceFilePath;
    if (!order) return null;

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
      setInvoiceFilePath(file.filePath);
      return file.filePath;
    }
    return null;
  };

  const handleViewInvoice = async () => {
    if (!order || isGeneratingPdf) return;
    setShowInvoicePreview(true);
    if (invoiceFilePath) return;
    setIsGeneratingPdf(true);
    try {
      const path = await generateInvoicePdf();
      if (!path) {
        Alert.alert('Error', 'Could not generate invoice PDF file path');
        setShowInvoicePreview(false);
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to generate invoice PDF');
      setShowInvoicePreview(false);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleSharePdf = async () => {
    if (!order || isSharing) return;
    setIsSharing(true);
    try {
      const path = await generateInvoicePdf();
      if (!path) {
        Alert.alert('Error', 'Could not generate invoice PDF file path');
        return;
      }
      await Share.share({
        url: Platform.OS === 'ios' ? path : `file://${path}`,
        title: 'Catering Invoice PDF',
      });
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to share invoice PDF');
    } finally {
      setIsSharing(false);
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

  const customerPhone = order ? getCustomerPhone(order.customerId) : '';
  const customerName = order ? getCustomerName(order.customerId) : '';
  const avatarColor = order ? getAvatarColors(customerName, theme.colors.avatarPalette) : null;
  const itemsTotal =
    order?.orderItems?.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) || 0;
  const grandTotal = order ? getOrderTotal(order) : 0;
  const balanceDue = order ? grandTotal - order.advanceAmount : 0;

  return (
    <ScreenContainer
      style={styles.container}
      statusBarBgColor="transparent"
      ignoreTopSafeArea
      statusBarStyle={'light-content'}
    >
      <GradientHeader
        title={order?.attributes?.eventName || t('viewOrder') || 'Order Details'}
        description={order ? `Order ID: ${order._id.slice(-6).toUpperCase()}` : undefined}
        image={ordersIcon}
        action={
          order ? (
            <View style={styles.headerActionsRow}>
              <GradientHeaderAction
                icon={<Edit size={16} color={palette.white} />}
                onPress={handleEdit}
              />
              <GradientHeaderAction
                icon={<Trash2 size={16} color={palette.white} />}
                onPress={handleDelete}
              />
            </View>
          ) : undefined
        }
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
          <>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Overview: status pills + headline totals */}
              <View style={styles.card}>
                <View style={styles.overviewPillsRow}>
                  <View style={[styles.badge, getOrderStatusStyle(order.orderStatus)]}>
                    <Text
                      style={[styles.badgeText, getOrderStatusTextStyle(order.orderStatus)]}
                      variant="bold"
                    >
                      {order.orderStatus}
                    </Text>
                  </View>
                  <View style={[styles.badge, getPaymentStatusStyle(order.paymentStatus)]}>
                    <Text
                      style={[styles.badgeText, getPaymentStatusTextStyle(order.paymentStatus)]}
                      variant="bold"
                    >
                      {order.paymentStatus}
                    </Text>
                  </View>
                </View>
                <View style={styles.overviewStatsRow}>
                  <View style={styles.overviewStatBox}>
                    <Text style={styles.overviewStatLabel}>Grand Total</Text>
                    <Text style={styles.overviewStatValue} variant="bold">
                      ₹{grandTotal.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.overviewStatDivider} />
                  <View style={styles.overviewStatBox}>
                    <Text style={styles.overviewStatLabel}>Balance Due</Text>
                    <Text
                      style={[
                        styles.overviewStatValue,
                        balanceDue > 0 ? styles.balanceTextDue : styles.balanceTextPaid,
                      ]}
                      variant="bold"
                    >
                      ₹{balanceDue.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Customer */}
              <View style={styles.card}>
                <View style={styles.sectionHeaderRow}>
                  <View style={styles.sectionIconWrap}>
                    <User size={14} color={theme.colors.primary} />
                  </View>
                  <Text style={styles.sectionTitle} variant="bold">
                    Customer
                  </Text>
                </View>
                <View style={styles.customerRow}>
                  <View style={[styles.avatar, { backgroundColor: avatarColor?.bg }]}>
                    <Text variant="bold" fontSize={16} color={avatarColor?.text}>
                      {getInitials(customerName)}
                    </Text>
                  </View>
                  <View style={styles.customerInfo}>
                    <Text style={styles.customerName} variant="semibold" numberOfLines={1}>
                      {customerName}
                    </Text>
                    {customerPhone ? (
                      <Text style={styles.customerPhone}>{customerPhone}</Text>
                    ) : null}
                  </View>
                  {customerPhone ? (
                    <View style={styles.quickActionsRow}>
                      <TouchableOpacity
                        style={[styles.quickActionBtn, styles.quickActionCallBtn]}
                        onPress={() => callPhoneNumber(customerPhone)}
                        activeOpacity={0.7}
                      >
                        <Phone
                          size={16}
                          color={theme.colors.callIcon}
                          fill={theme.colors.callIcon}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.quickActionBtn, styles.quickActionWhatsappBtn]}
                        onPress={() => openWhatsApp(customerPhone)}
                        activeOpacity={0.7}
                      >
                        <WhatsAppIcon size={16} color={theme.colors.whatsappIcon} />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              </View>

              {/* Event Details */}
              <View style={styles.card}>
                <View style={styles.sectionHeaderRow}>
                  <View style={styles.sectionIconWrap}>
                    <Calendar size={14} color={theme.colors.primary} />
                  </View>
                  <Text style={styles.sectionTitle} variant="bold">
                    Event Details
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconWrap}>
                    <Calendar size={14} color={theme.colors.textSecondary} />
                  </View>
                  <Text style={styles.infoLabel}>Event Date</Text>
                  <Text style={styles.infoValue}>
                    {order.deliveryDate ? order.deliveryDate.split('T')[0] : '-'}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconWrap}>
                    <Users size={14} color={theme.colors.textSecondary} />
                  </View>
                  <Text style={styles.infoLabel}>Guests</Text>
                  <Text style={styles.infoValue}>{order.attributes?.guestCount ?? '-'} Pax</Text>
                </View>
                {order.notes ? (
                  <View style={styles.notesBox}>
                    <Text style={styles.notesText}>{order.notes}</Text>
                  </View>
                ) : null}
              </View>

              {/* Menu Items */}
              <View style={styles.card}>
                <View style={styles.sectionHeaderRow}>
                  <View style={styles.sectionIconWrap}>
                    <ChefHat size={14} color={theme.colors.primary} />
                  </View>
                  <Text style={styles.sectionTitle} variant="bold">
                    Menu Items
                  </Text>
                </View>
                {order.orderItems?.map((item, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.itemRow,
                      idx === (order.orderItems?.length ?? 0) - 1 && styles.itemRowLast,
                    ]}
                  >
                    <View style={styles.itemLeft}>
                      <Text style={styles.itemName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.itemMeta}>
                        {item.type} · {item.quantity} × ₹{item.unitPrice}
                      </Text>
                    </View>
                    <Text style={styles.itemTotal} variant="semibold">
                      ₹{(item.quantity * item.unitPrice).toLocaleString()}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Payment & Invoicing */}
              <View style={styles.card}>
                <View style={styles.sectionHeaderRow}>
                  <View style={styles.sectionIconWrap}>
                    <CreditCard size={14} color={theme.colors.primary} />
                  </View>
                  <Text style={styles.sectionTitle} variant="bold">
                    Payment & Invoicing
                  </Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Items Total</Text>
                  <Text style={styles.billValue}>₹{itemsTotal.toLocaleString()}</Text>
                </View>
                {order.discountAmount > 0 ? (
                  <View style={styles.billRow}>
                    <Text style={styles.billLabel}>Discount</Text>
                    <Text style={[styles.billValue, { color: theme.colors.error }]}>
                      -₹{order.discountAmount.toLocaleString()}
                    </Text>
                  </View>
                ) : null}
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Advance Paid</Text>
                  <Text style={[styles.billValue, { color: theme.colors.primary }]}>
                    ₹{order.advanceAmount.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.billTotalRow}>
                  <Text style={styles.billLabel} variant="bold">
                    Balance Due
                  </Text>
                  <Text
                    style={[
                      styles.billValue,
                      balanceDue > 0 ? styles.balanceTextDue : styles.balanceTextPaid,
                    ]}
                    variant="bold"
                  >
                    ₹{balanceDue.toLocaleString()}
                  </Text>
                </View>
              </View>

              {/* Records */}
              {order.quotationUrl || order.invoiceUrl || order.completedAt ? (
                <View style={styles.card}>
                  <View style={styles.sectionHeaderRow}>
                    <View style={styles.sectionIconWrap}>
                      <FileText size={14} color={theme.colors.primary} />
                    </View>
                    <Text style={styles.sectionTitle} variant="bold">
                      Records
                    </Text>
                  </View>
                  {order.completedAt ? (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Completed Date</Text>
                      <Text style={styles.infoValue}>{order.completedAt.split('T')[0]}</Text>
                    </View>
                  ) : null}
                  {order.quotationUrl ? (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Quotation</Text>
                      <Text style={[styles.infoValue, styles.linkValue]} numberOfLines={1}>
                        {order.quotationUrl}
                      </Text>
                    </View>
                  ) : null}
                  {order.invoiceUrl ? (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Invoice File</Text>
                      <Text style={[styles.infoValue, styles.linkValue]} numberOfLines={1}>
                        {order.invoiceUrl}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </ScrollView>

            {/* Sticky Footer */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.footerIconButton}
                onPress={handleSharePdf}
                disabled={isSharing}
                activeOpacity={0.7}
              >
                {isSharing ? (
                  <ActivityIndicator size="small" color={theme.colors.primary} />
                ) : (
                  <Share2 size={19} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
              <Button
                title="View Invoice PDF"
                onPress={handleViewInvoice}
                loading={isGeneratingPdf}
                style={styles.footerPrimaryButton}
              />
            </View>
          </>
        )}
      </View>

      <InvoicePreviewModal
        visible={showInvoicePreview}
        onClose={() => setShowInvoicePreview(false)}
        fileUri={invoiceFilePath}
        isLoading={isGeneratingPdf}
        onSharePress={handleSharePdf}
        isSharing={isSharing}
      />
    </ScreenContainer>
  );
};

export default OrderDetailScreen;
