import React from 'react';
import { View, TouchableOpacity, ScrollView, Modal, Linking } from 'react-native';
import { X, Phone, Pencil } from 'lucide-react-native';
import { Text } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import { Customer, CustomerType } from '@/store/customerStore';
import { Order } from '@/api/order';
import getStyles from './styles';
import Svg, { Path } from 'react-native-svg';

const WhatsAppIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = '#25D366',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12.012 2C6.48 2 2.01 6.47 2.01 12c0 1.91.53 3.69 1.46 5.25L2 22l4.92-1.28c1.5.83 3.21 1.3 5.09 1.3 5.53 0 10-4.47 10-10S17.54 2 12.012 2zM12 20c-1.66 0-3.2-.42-4.54-1.18l-.32-.18-2.92.76.77-2.82-.2-.32C3.96 15.01 3.5 13.56 3.5 12c0-4.69 3.81-8.5 8.5-8.5s8.5 3.81 8.5 8.5-3.81 8.5-8.5 8.5zm4.84-6.05c-.27-.13-1.58-.78-1.82-.87-.25-.09-.43-.13-.61.13-.18.27-.71.87-.87 1.05-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.11-.55.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.61-1.47-.84-2.02-.22-.53-.45-.45-.61-.46-.16 0-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.94 4.67 4.12.65.28 1.16.45 1.56.58.66.21 1.25.18 1.73.11.53-.08 1.58-.65 1.8-1.27.22-.63.22-1.16.16-1.27-.07-.12-.25-.19-.52-.32z"
      fill={color}
    />
  </Svg>
);

interface CustomerDetailModalProps {
  visible: boolean;
  onClose: () => void;
  customer: Customer | null;
  orders: Order[];
  onEditDetails: () => void;
  onDelete: () => void;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  visible,
  onClose,
  customer,
  orders = [],
  onEditDetails,
}) => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  if (!customer) return null;

  const getCustomerTypeLabel = (type: CustomerType) =>
    type === 'BUSINESS' ? t('business') : t('individual');

  const getInitials = (name: string) => {
    if (!name) return 'C';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts.at(-1)!.charAt(0)).toUpperCase();
  };

  const getAvatarColors = (name: string) => {
    const colors = [
      { bg: '#EAE8FF', text: '#431DB0' }, // light purple
      { bg: '#FFFBE0', text: '#7A5101' }, // tan/yellow
      { bg: '#E6F4EA', text: '#137333' }, // light green
      { bg: '#E2F0FD', text: '#0B57D0' }, // light blue
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % colors.length;
    return colors[idx];
  };

  const isOrderForCustomer = (order: Order, custId: string) => {
    if (!order || !custId) return false;
    if (typeof order.customerId === 'string') {
      return order.customerId === custId;
    }
    if (order.customerId && typeof order.customerId === 'object') {
      return order.customerId._id === custId;
    }
    return false;
  };

  const getOrderTotal = (o: Order) => {
    const itemsTotal =
      o.orderItems?.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) || 0;
    return Math.max(0, itemsTotal - (o.discountAmount || 0));
  };

  const formatOrderDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) return 'No date';
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return `${String(date.getDate()).padStart(2, '0')} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    } catch {
      return dateString;
    }
  };

  const customerIdString = customer._id || customer.id || '';
  const customerOrders = orders.filter(o => isOrderForCustomer(o, customerIdString));

  // Compute Statistics
  const ordersCount = customerOrders.length;
  const lifetimeBilling = customerOrders.reduce((sum, o) => sum + getOrderTotal(o), 0);
  const pendingDue = customerOrders.reduce((sum, o) => {
    if (o.paymentStatus === 'PAID') return sum;
    const due = getOrderTotal(o) - (o.advanceAmount || 0);
    return sum + (due > 0 ? due : 0);
  }, 0);

  const handleCall = () => {
    Linking.openURL(`tel:${customer.phoneNumber}`);
  };

  const handleWhatsApp = () => {
    const cleaned = customer.phoneNumber.replace(/[^\d]/g, '');
    const formatted = cleaned.length === 10 ? `91${cleaned}` : cleaned;
    Linking.openURL(`https://wa.me/${formatted}`);
  };

  const avatarColor = getAvatarColors(customer.customerName);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.bottomSheetOverlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.detailModalContainer} activeOpacity={1}>
          {/* Top Sheet Drag Grabber */}
          <View style={styles.grabber} />

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
            <X size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          {/* Customer Profile Header */}
          <View style={styles.profileHeader}>
            <View style={[styles.avatarContainer, { backgroundColor: avatarColor.bg }]}>
              <Text variant="bold" style={[styles.avatarText, { color: avatarColor.text }]}>
                {getInitials(customer.customerName)}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text variant="bold" style={styles.customerNameText} numberOfLines={1}>
                {customer.customerName}
              </Text>
              <Text style={styles.customerSubtitleText} numberOfLines={1}>
                {customer.phoneNumber} · {getCustomerTypeLabel(customer.customerType)}
              </Text>
            </View>
          </View>

          {/* Call / WhatsApp / Edit Buttons */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.waBtn]}
              onPress={handleWhatsApp}
              activeOpacity={0.8}
            >
              <WhatsAppIcon size={16} color="#137333" />
              <Text variant="bold" style={styles.waBtnText}>
                WhatsApp
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.callBtn]}
              onPress={handleCall}
              activeOpacity={0.8}
            >
              <Phone size={15} color="#431DB0" fill="#431DB0" />
              <Text variant="bold" style={styles.callBtnText}>
                Call
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.editBtn]}
              onPress={onEditDetails}
              activeOpacity={0.8}
            >
              <Pencil size={15} color={theme.colors.text} />
              <Text variant="bold" style={styles.editBtnText}>
                {t('edit') || 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Statistics Grid Cards */}
          <View style={styles.statsRow}>
            <View style={styles.statsCard}>
              <Text variant="bold" style={styles.statsValueText}>
                {ordersCount}
              </Text>
              <Text style={styles.statsLabelText}>{t('orders') || 'orders'}</Text>
            </View>

            <View style={styles.statsCard}>
              <Text variant="bold" style={styles.statsValueText}>
                ₹{lifetimeBilling.toLocaleString('en-IN')}
              </Text>
              <Text style={styles.statsLabelText}>lifetime</Text>
            </View>

            <View style={[styles.statsCard, styles.statsCardWarning]}>
              <Text variant="bold" style={[styles.statsValueText, styles.warningValueText]}>
                ₹{pendingDue.toLocaleString('en-IN')}
              </Text>
              <Text style={[styles.statsLabelText, styles.warningLabelText]}>pending</Text>
            </View>
          </View>

          {/* Orders Section Header */}
          <Text variant="bold" style={styles.ordersSectionTitle}>
            ORDERS
          </Text>

          {/* Customer Orders List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.ordersScroll}
            contentContainerStyle={styles.ordersContent}
          >
            {customerOrders.length === 0 ? (
              <View style={styles.emptyOrdersState}>
                <Text style={styles.emptyOrdersText}>No orders recorded for this customer.</Text>
              </View>
            ) : (
              customerOrders.map(order => {
                const total = getOrderTotal(order);
                const isPaid = order.paymentStatus === 'PAID';
                const dueAmount = total - (order.advanceAmount || 0);

                return (
                  <View key={order._id} style={styles.orderCard}>
                    <View style={styles.orderInfoCol}>
                      <Text variant="bold" style={styles.orderEventTitle} numberOfLines={1}>
                        {order.attributes?.eventName || 'Event'}{' '}
                        {order.attributes?.guestCount ? `· ${order.attributes.guestCount} plates` : ''}
                      </Text>
                      <Text style={styles.orderDateIdSub}>
                        {formatOrderDate(order.deliveryDate)} ·{' '}
                        {order._id.substring(order._id.length - 8).toUpperCase()}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.orderStatusBadge,
                        isPaid ? styles.statusPaidBg : styles.statusDueBg,
                      ]}
                    >
                      <Text
                        variant="bold"
                        style={[
                          styles.statusBadgeText,
                          isPaid ? styles.statusPaidText : styles.statusDueText,
                        ]}
                      >
                        {isPaid ? 'PAID ✓' : `₹${dueAmount} DUE`}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomerDetailModal;
