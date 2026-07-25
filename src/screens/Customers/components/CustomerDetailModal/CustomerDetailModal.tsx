import React from 'react';
import { View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { X, Phone, Pencil, Trash2, UserCheck } from 'lucide-react-native';
import { Text, WhatsAppIcon } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import { CustomerType } from '@/enums/customer';
import { callPhoneNumber, openWhatsApp } from '@/utils/contactActions';
import { getInitials, getAvatarColors } from '@/utils/avatar';
import { getCustomerId } from '@/utils/customerFilters';
import { getOrderTotal, isOrderForCustomer, formatOrderDate } from '@/utils/orderHelpers';
import { CustomerDetailModalProps } from '../../types';
import getStyles from './styles';

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  visible,
  onClose,
  customer,
  orders = [],
  onEditDetails,
  onDeactivate,
  onReactivate,
}) => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  if (!customer) return null;

  const customerTypeLabel =
    customer.customerType === CustomerType.BUSINESS ? t('business') : t('individual');

  const customerOrders = orders.filter(order => isOrderForCustomer(order, getCustomerId(customer)));

  const ordersCount = customerOrders.length;
  const lifetimeBilling = customerOrders.reduce((sum, o) => sum + getOrderTotal(o), 0);
  const pendingDue = customerOrders.reduce((sum, o) => {
    if (o.paymentStatus === 'PAID') return sum;
    const due = getOrderTotal(o) - (o.advanceAmount || 0);
    return sum + Math.max(0, due);
  }, 0);

  const avatarColor = getAvatarColors(customer.customerName, theme.colors.avatarPalette);

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
              <Text variant="bold" fontSize={16} color={avatarColor.text}>
                {getInitials(customer.customerName)}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text variant="bold" fontSize={18} color={theme.colors.text} numberOfLines={1}>
                {customer.customerName}
              </Text>
              <Text
                fontSize={13}
                color={theme.colors.textSecondary}
                style={styles.customerSubtitleText}
                numberOfLines={1}
              >
                {customer.phoneNumber} · {customerTypeLabel}
              </Text>
            </View>
          </View>

          {/* Call / WhatsApp / Edit Buttons */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.waBtn]}
              onPress={() => openWhatsApp(customer.phoneNumber)}
              activeOpacity={0.8}
            >
              <WhatsAppIcon size={16} color={theme.colors.whatsappText} />
              <Text variant="bold" fontSize={12} color={theme.colors.whatsappText}>
                {t('whatsapp')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.callBtn]}
              onPress={() => callPhoneNumber(customer.phoneNumber)}
              activeOpacity={0.8}
            >
              <Phone size={15} color={theme.colors.callText} fill={theme.colors.callText} />
              <Text variant="bold" fontSize={12} color={theme.colors.callText}>
                {t('call')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.editBtn]}
              onPress={onEditDetails}
              activeOpacity={0.8}
            >
              <Pencil size={15} color={theme.colors.text} />
              <Text variant="bold" fontSize={12} color={theme.colors.text}>
                {t('edit')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Statistics Grid Cards */}
          <View style={styles.statsRow}>
            <View style={styles.statsCard}>
              <Text variant="bold" fontSize={18} color={theme.colors.text}>
                {ordersCount}
              </Text>
              <Text fontSize={11} color={theme.colors.textSecondary} style={styles.statsLabelText}>
                {t('orders')}
              </Text>
            </View>

            <View style={styles.statsCard}>
              <Text variant="bold" fontSize={18} color={theme.colors.text}>
                ₹{lifetimeBilling.toLocaleString('en-IN')}
              </Text>
              <Text fontSize={11} color={theme.colors.textSecondary} style={styles.statsLabelText}>
                {t('customerLifetimeBilling')}
              </Text>
            </View>

            <View style={[styles.statsCard, styles.statsCardWarning]}>
              <Text variant="bold" fontSize={18} color={theme.colors.warningText}>
                ₹{pendingDue.toLocaleString('en-IN')}
              </Text>
              <Text fontSize={11} color={theme.colors.warningText} style={styles.statsLabelText}>
                {t('customerPendingDue')}
              </Text>
            </View>
          </View>

          {/* Orders Section Header */}
          <Text
            variant="bold"
            fontSize={11}
            letterSpacing={0.8}
            color={theme.colors.textMuted}
            style={styles.ordersSectionTitle}
          >
            {t('customerOrdersSectionTitle')}
          </Text>

          {/* Customer Orders List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.ordersScroll}
            contentContainerStyle={styles.ordersContent}
          >
            {customerOrders.length === 0 ? (
              <View style={styles.emptyOrdersState}>
                <Text fontSize={13} color={theme.colors.textMuted}>
                  {t('noOrdersForCustomer')}
                </Text>
              </View>
            ) : (
              customerOrders.map(order => {
                const total = getOrderTotal(order);
                const isPaid = order.paymentStatus === 'PAID';
                const dueAmount = total - (order.advanceAmount || 0);

                return (
                  <View key={order._id} style={styles.orderCard}>
                    <View style={styles.orderInfoCol}>
                      <Text variant="bold" fontSize={13} color={theme.colors.text} numberOfLines={1}>
                        {order.attributes?.eventName || t('eventFallbackLabel')}{' '}
                        {order.attributes?.guestCount
                          ? t('guestCountPlatesLabel', { count: order.attributes.guestCount })
                          : ''}
                      </Text>
                      <Text
                        fontSize={11}
                        color={theme.colors.textSecondary}
                        style={styles.orderDateIdSub}
                      >
                        {formatOrderDate(order.deliveryDate, t('noDateLabel'))} ·{' '}
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
                        fontSize={10}
                        color={isPaid ? theme.colors.paidText : theme.colors.warningText}
                      >
                        {isPaid ? t('orderPaidLabel') : t('orderDueLabel', { amount: `₹${dueAmount}` })}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>

          {/* Deactivate / Reactivate Customer Option */}
          {customer.isActive ? (
            <TouchableOpacity
              style={styles.deleteBottomBtn}
              onPress={onDeactivate}
              activeOpacity={0.7}
            >
              <Trash2 size={16} color={theme.colors.error} />
              <Text variant="bold" fontSize={14} color={theme.colors.error}>
                {t('deactivateCustomerAction')}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.reactivateBottomBtn}
              onPress={onReactivate}
              activeOpacity={0.7}
            >
              <UserCheck size={16} color={theme.colors.paidText} />
              <Text variant="bold" fontSize={14} color={theme.colors.paidText}>
                {t('reactivateCustomerAction')}
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomerDetailModal;
