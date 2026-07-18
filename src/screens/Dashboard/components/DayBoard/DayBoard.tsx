import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { Text } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useAppTheme, palette } from '@/theme';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { ChevronRight, Users, Check, X, ClipboardList, Info } from 'lucide-react-native';
import { Order } from '@/api/order';
import { getOrderSlot } from '@/utils/orderHelpers';

interface DayBoardProps {
  todayOrders: Order[];
  currentSlot: 'Morning' | 'Afternoon' | 'Evening';
  confirmingOrderIds: string[];
  onConfirmOrder: (orderId: string) => void;
  onCreateOrderPress?: () => void;
}

export const DayBoard: React.FC<DayBoardProps> = ({
  todayOrders,
  currentSlot,
  confirmingOrderIds,
  onConfirmOrder,
  onCreateOrderPress,
}) => {
  const { t } = useLanguage();
  const { theme } = useAppTheme();
  const styles = useStyles(getStyles);

  const [selectedSlot, setSelectedSlot] = useState<'Morning' | 'Afternoon' | 'Evening' | null>(null);

  // Group today's orders by slot
  const slotOrders = {
    Morning: todayOrders.filter(order => getOrderSlot(order) === 'Morning'),
    Afternoon: todayOrders.filter(order => getOrderSlot(order) === 'Afternoon'),
    Evening: todayOrders.filter(order => getOrderSlot(order) === 'Evening'),
  };

  const getCustomerName = (customerId: any) => {
    if (!customerId) return t('walkIn') || 'Walk-in';
    if (typeof customerId === 'object') {
      return customerId.customerName || t('walkIn') || 'Walk-in';
    }
    return customerId;
  };

  const getOrderItemsSummary = (order: Order) => {
    if (!order.orderItems || order.orderItems.length === 0) return '';
    return order.orderItems.map(item => `${item.quantity}x ${item.name}`).join(', ');
  };

  const getSlotSubtitle = (slot: 'Morning' | 'Afternoon' | 'Evening') => {
    const orders = slotOrders[slot];
    if (orders.length === 0) return t('noOrders') || '0 orders';

    const drafts = orders.filter(o => o.orderStatus === 'PENDING').length;
    const confirmed = orders.length - drafts;

    const parts = [];
    if (confirmed > 0) parts.push(`${confirmed} ${t('orderStatusActive') || 'confirmed'}`);
    if (drafts > 0) parts.push(`${drafts} ${t('pending') || 'draft'}`);

    return parts.join(' · ');
  };

  const getSlotStatusDotColor = (slot: 'Morning' | 'Afternoon' | 'Evening') => {
    const orders = slotOrders[slot];
    if (orders.length === 0) return palette.gray400; // Gray for empty
    const hasDrafts = orders.some(o => o.orderStatus === 'PENDING');
    return hasDrafts ? palette.warning500 : palette.primary500; // Amber for drafts, Cobalt for only confirmed
  };

  const renderOrderCard = (order: Order) => {
    const isDraft = order.orderStatus === 'PENDING';
    const isConfirming = confirmingOrderIds.includes(order._id);
    const borderStyle = isDraft ? styles.borderDraft : styles.borderConfirmed;

    return (
      <View key={order._id} style={[styles.orderCard, borderStyle]}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Text style={styles.eventName} variant="bold" fontSize={15}>
              {order.eventName}
            </Text>
            <Text style={styles.customerName} variant="medium" fontSize={13}>
              {getCustomerName(order.customerId)}
            </Text>
          </View>
          <View style={styles.statusBadgeWrapper}>
            {isDraft ? (
              <View style={[styles.statusBadge, styles.badgeDraft]}>
                <Text style={styles.badgeTextDraft} variant="bold" fontSize={10}>
                  {t('pending') || 'Draft'}
                </Text>
              </View>
            ) : (
              <View style={[styles.statusBadge, styles.badgeConfirmed]}>
                <Text style={styles.badgeTextConfirmed} variant="bold" fontSize={10}>
                  {t('orderStatusActive') || 'Confirmed'}
                </Text>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.itemsSummary} variant="regular" fontSize={12} numberOfLines={2}>
          {getOrderItemsSummary(order)}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.infoRow}>
            <Users size={14} color={theme.colors.textSecondary} style={styles.infoIcon} />
            <Text style={styles.infoText} variant="medium" fontSize={12}>
              {order.guestCount} {t('guestCount') || 'Guests'}
            </Text>
          </View>

          {isDraft && (
            <TouchableOpacity
              style={styles.confirmButton}
              activeOpacity={0.8}
              onPress={() => onConfirmOrder(order._id)}
              disabled={isConfirming}
            >
              {isConfirming ? (
                <ActivityIndicator size="small" color={palette.white} />
              ) : (
                <>
                  <Check size={14} color={palette.white} style={styles.btnIcon} />
                  <Text style={styles.confirmBtnText} variant="bold" fontSize={12}>
                    {t('confirm') || 'Confirm'}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderSlotCard = (slot: 'Morning' | 'Afternoon' | 'Evening') => {
    const isCurrent = currentSlot === slot;
    const dotColor = getSlotStatusDotColor(slot);
    const subtitle = getSlotSubtitle(slot);

    let localizedTitle = t('morning') || 'Morning';
    if (slot === 'Afternoon') localizedTitle = t('afternoon') || 'Afternoon';
    if (slot === 'Evening') localizedTitle = t('evening') || 'Evening';

    return (
      <TouchableOpacity
        key={slot}
        style={[styles.slotCard, isCurrent && styles.slotCardCurrent]}
        activeOpacity={0.85}
        onPress={() => setSelectedSlot(slot)}
      >
        <View style={styles.slotLeft}>
          <View style={[styles.statusDot, { backgroundColor: dotColor }]} />
          <View style={styles.slotDetails}>
            <Text style={styles.slotTitle} variant="bold" fontSize={15}>
              {localizedTitle}
            </Text>
            <Text style={styles.slotSubtitle} variant="medium" fontSize={12}>
              {subtitle}
            </Text>
          </View>
        </View>
        <View style={styles.slotRight}>
          {isCurrent && (
            <View style={styles.liveIndicator}>
              <Text style={styles.liveText} variant="bold" fontSize={9}>
                LIVE
              </Text>
            </View>
          )}
          <ChevronRight size={18} color={theme.colors.textSecondary} />
        </View>
      </TouchableOpacity>
    );
  };

  // If zero orders today, show the friendly empty state illustration
  if (todayOrders.length === 0) {
    return (
      <View style={styles.boardContainer}>
        <Text style={styles.boardTitle} variant="bold" fontSize={18}>
          {t('dayBoard') || 'Day Board'}
        </Text>
        <View style={styles.emptyBoardCard}>
          <ClipboardList size={48} color={theme.colors.textMuted} style={styles.emptyBoardIcon} />
          <Text style={styles.emptyBoardTitle} variant="bold" fontSize={15}>
            {t('noOrdersYet') || 'No orders yet'}
          </Text>
          <Text style={styles.emptyBoardSub} variant="medium" fontSize={12}>
            {t('tapPlusToStart') || 'Tap + to start'}
          </Text>
          {!!onCreateOrderPress && (
            <TouchableOpacity
              style={styles.emptyBoardButton}
              activeOpacity={0.8}
              onPress={onCreateOrderPress}
            >
              <Text style={styles.emptyBoardButtonText} variant="bold" fontSize={13}>
                {t('createOrder') || 'Create Order'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  // Get orders list for selected slot modal
  const modalOrders = selectedSlot ? slotOrders[selectedSlot] : [];
  const modalTitle = selectedSlot
    ? (selectedSlot === 'Morning' ? t('morning') : selectedSlot === 'Afternoon' ? t('afternoon') : t('evening'))
    : '';

  return (
    <View style={styles.boardContainer}>
      <Text style={styles.boardTitle} variant="bold" fontSize={18}>
        {t('dayBoard') || 'Day Board'}
      </Text>

      <View style={styles.slotsWrapper}>
        {(['Morning', 'Afternoon', 'Evening'] as const).map(renderSlotCard)}
      </View>

      {/* Filtered Orders Modal Bottom Sheet */}
      <Modal
        visible={selectedSlot !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedSlot(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedSlot(null)}
        >
          <TouchableOpacity
            style={[styles.modalContent, { backgroundColor: theme.colors.card }]}
            activeOpacity={1}
          >
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <View style={[styles.statusDot, { backgroundColor: selectedSlot ? getSlotStatusDotColor(selectedSlot) : palette.gray400 }]} />
                <Text style={styles.modalTitle} variant="bold" fontSize={18}>
                  {modalTitle} {t('slot') || 'Slot'}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: theme.colors.secondaryLight }]}
                onPress={() => setSelectedSlot(null)}
              >
                <X size={18} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
            >
              {modalOrders.length > 0 ? (
                modalOrders.map(renderOrderCard)
              ) : (
                <View style={styles.modalEmptyContainer}>
                  <Info size={20} color={theme.colors.textMuted} />
                  <Text style={styles.modalEmptyText} variant="medium" fontSize={13}>
                    No orders for this slot
                  </Text>
                </View>
              )}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DayBoard;
