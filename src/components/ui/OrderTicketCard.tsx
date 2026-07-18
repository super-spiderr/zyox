import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar, Users, User } from 'lucide-react-native';
import Text from './Text';
import { useAppTheme, palette } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { widthScale, heightScale } from '@/utils/scaling';

export type OrderTicketStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | string;
export type PaymentTicketStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'FAILED' | string;

interface OrderTicketCardProps {
  orderId: string;
  eventName: string;
  customerName: string;
  eventDate: string;
  guestCount: number;
  orderStatus: OrderTicketStatus;
  paymentStatus: PaymentTicketStatus;
  /** Omit (or set `compact`) to hide the ticket-perforation + bill summary section. */
  totalAmount?: number;
  advanceAmount?: number;
  balanceAmount?: number;
  /** Hides the Total/Advance/Balance bill summary — just the ticket header + event/customer info. */
  compact?: boolean;
  onPress: () => void;
}

const getPaymentStatusColors = (status: string) => {
  switch (status) {
    case 'PAID':
      return { bg: palette.googleGreenBg, text: palette.googleGreenText }; // green
    case 'PARTIAL':
      return { bg: palette.googleAmberBg, text: palette.googleAmberText }; // amber/orange
    case 'PENDING':
      return { bg: palette.googleBlueBg, text: palette.googleBlueText }; // blue
    case 'FAILED':
      return { bg: palette.googleRedBg, text: palette.googleRedText }; // red
    default:
      return { bg: palette.gray100, text: palette.gray500 };
  }
};

/**
 * Ticket/bill-style order card shared between the Dashboard's "Recent
 * Orders" widget and the full Orders list — gradient order-id stub, ticket
 * perforation divider, and a bill-style Total/Advance/Balance summary row.
 */
export const OrderTicketCard: React.FC<OrderTicketCardProps> = ({
  orderId,
  eventName,
  customerName,
  eventDate,
  guestCount,
  orderStatus,
  paymentStatus,
  totalAmount,
  advanceAmount,
  balanceAmount,
  compact = false,
  onPress,
}) => {
  const { theme, isDark } = useAppTheme();
  const { t, language } = useLanguage();

  const startColor = theme.colors.primary;
  const endColor = theme.colors.cardGradEnd;
  const colors = isDark ? [endColor, startColor, endColor] : [startColor, endColor, startColor];
  const paymentColors = getPaymentStatusColors(paymentStatus);

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return t('completed') || 'Completed';
      case 'CONFIRMED':
        return 'Confirmed';
      case 'PENDING':
        return 'Pending';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'Paid';
      case 'PARTIAL':
        return 'Partial';
      case 'PENDING':
        return 'Pending';
      case 'FAILED':
        return 'Failed';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) return dateString;
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
      const day = String(date.getDate()).padStart(2, '0');
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return language === 'ta'
        ? `${day}/${String(date.getMonth() + 1).padStart(2, '0')}/${year}`
        : `${day} ${month} ${year}`;
    } catch {
      return dateString;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.orderCard,
        { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
      ]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      {/* Ticket Stub Header — order id highlighted with theme gradient */}
      <View style={styles.ticketHeader}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            StyleSheet.absoluteFill,
            {
              borderTopLeftRadius: widthScale(15),
              borderTopRightRadius: widthScale(15),
            },
          ]}
        />
        <View>
          <Text variant="bold" color="primaryText" fontSize={12} style={styles.orderIdLabel}>
            ORDER ID
          </Text>
          <Text variant="bold" color="primaryText" fontSize={15} style={styles.orderIdText}>
            {orderId}
          </Text>
        </View>
        <View style={styles.headerStatusChip}>
          <Text variant="bold" color="primaryText" fontSize={9}>
            {getOrderStatusText(orderStatus)}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        {/* Event Name */}
        <Text
          variant="bold"
          fontSize={15}
          style={[styles.eventNameText, { color: theme.colors.text }]}
          numberOfLines={1}
        >
          {eventName}
        </Text>

        {/* Customer Name */}
        <View style={styles.customerRow}>
          <User size={12} color={theme.colors.textSecondary} />
          <Text
            variant="medium"
            fontSize={13}
            style={[styles.customerNameText, { color: theme.colors.textSecondary }]}
          >
            {customerName || t('walkIn') || 'Walk-in'}
          </Text>
        </View>

        {/* Event Details (Date & Guests) */}
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Calendar size={12} color={theme.colors.textSecondary} />
            <Text
              variant="medium"
              fontSize={11}
              style={[styles.detailText, { color: theme.colors.textMuted }]}
            >
              {formatDate(eventDate)}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Users size={12} color={theme.colors.textSecondary} />
            <Text
              variant="medium"
              fontSize={11}
              style={[styles.detailText, { color: theme.colors.textMuted }]}
            >
              {guestCount} {t('guests')}
            </Text>
          </View>
        </View>

        {/* Payment Status */}
        <View style={styles.paymentBadgeRow}>
          <View style={[styles.statusBadge, { backgroundColor: paymentColors.bg }]}>
            <Text variant="bold" fontSize={9} style={{ color: paymentColors.text }}>
              {getPaymentStatusText(paymentStatus)}
            </Text>
          </View>
        </View>

        {!compact && typeof totalAmount === 'number' && (
          <>
            {/* Ticket Perforation */}
            <View style={styles.dividerContainer}>
              <View
                style={[
                  styles.cutout,
                  styles.leftCutout,
                  { backgroundColor: theme.colors.surface },
                ]}
              />
              <View style={[styles.dividerLine, { borderColor: theme.colors.border }]} />
              <View
                style={[
                  styles.cutout,
                  styles.rightCutout,
                  { backgroundColor: theme.colors.surface },
                ]}
              />
            </View>

            {/* Bill Summary */}
            <View style={styles.financialsRow}>
              <View style={styles.financialCol}>
                <Text
                  variant="medium"
                  fontSize={10}
                  style={[styles.financialLabel, { color: theme.colors.textMuted }]}
                >
                  Total
                </Text>
                <Text
                  variant="bold"
                  fontSize={13}
                  style={[styles.financialValue, { color: theme.colors.text }]}
                >
                  ₹{totalAmount}
                </Text>
              </View>

              {typeof advanceAmount === 'number' && advanceAmount > 0 && (
                <>
                  <View
                    style={[styles.financialDivider, { backgroundColor: theme.colors.border }]}
                  />
                  <View style={styles.financialCol}>
                    <Text
                      variant="medium"
                      fontSize={10}
                      style={[styles.financialLabel, { color: theme.colors.textMuted }]}
                    >
                      Advance
                    </Text>
                    <Text
                      variant="bold"
                      fontSize={13}
                      style={[styles.financialValue, styles.advanceText]}
                    >
                      ₹{advanceAmount}
                    </Text>
                  </View>
                </>
              )}

              <View style={[styles.financialDivider, { backgroundColor: theme.colors.border }]} />
              <View style={styles.financialCol}>
                <Text
                  variant="medium"
                  fontSize={10}
                  style={[styles.financialLabel, { color: theme.colors.textMuted }]}
                >
                  Balance
                </Text>
                <Text
                  variant="bold"
                  fontSize={13}
                  style={[styles.financialValue, styles.balanceText]}
                >
                  ₹{balanceAmount}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderCard: {
    borderWidth: 1,
    borderRadius: widthScale(16),
    overflow: 'hidden',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthScale(14),
    paddingVertical: heightScale(10),
    borderTopLeftRadius: widthScale(15),
    borderTopRightRadius: widthScale(15),
  },
  orderIdLabel: {
    marginBottom: heightScale(2),
  },
  orderIdText: {
    letterSpacing: 0.4,
  },
  headerStatusChip: {
    paddingHorizontal: widthScale(9),
    paddingVertical: heightScale(4),
    borderRadius: widthScale(20),
  },
  cardBody: {
    padding: widthScale(14),
  },
  eventNameText: {
    marginBottom: heightScale(6),
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthScale(4),
    marginBottom: heightScale(10),
  },
  customerNameText: {},
  paymentBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: heightScale(8),
  },
  statusBadge: {
    paddingHorizontal: widthScale(8),
    paddingVertical: heightScale(3),
    borderRadius: widthScale(6),
  },
  dividerContainer: {
    position: 'relative',
    width: '100%',
    marginVertical: heightScale(12),
    justifyContent: 'center',
  },
  dividerLine: {
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 0,
    width: '100%',
  },
  cutout: {
    position: 'absolute',
    width: widthScale(14),
    height: widthScale(14),
    borderRadius: widthScale(7),
    zIndex: 2,
  },
  leftCutout: {
    left: -widthScale(19),
  },
  rightCutout: {
    right: -widthScale(19),
  },
  detailsRow: {
    flexDirection: 'row',
    gap: widthScale(23),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthScale(3),
  },
  detailText: {},
  financialsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthScale(4),
  },
  financialCol: {
    flex: 1,
    alignItems: 'center',
  },
  financialDivider: {
    width: 1,
    height: heightScale(26),
  },
  financialLabel: {
    marginBottom: heightScale(2),
  },
  financialValue: {},
  advanceText: {
    color: palette.googleGreenText, // green
  },
  balanceText: {
    color: palette.googleRedText, // red
  },
});

export default OrderTicketCard;
