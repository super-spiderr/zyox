import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  const isDark = theme.isDark;

  const statusColors = {
    warning: {
      bg: theme.colors.warningBgSoft,
      border: theme.colors.warningBorderSoft,
      text: theme.colors.warningText,
    },
    info: {
      bg: theme.colors.infoBgSoft,
      border: theme.colors.infoBorderSoft,
      text: theme.colors.infoText,
    },
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    body: {
      flex: 1,
      paddingHorizontal: widthScale(16),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      paddingTop: heightScale(14),
      paddingBottom: heightScale(24),
    },
    headerActionsRow: {
      flexDirection: 'row',
      gap: widthScale(8),
    },
    headerActionBtn: {
      width: widthScale(34),
      height: widthScale(34),
      borderRadius: widthScale(17),
      justifyContent: 'center',
      alignItems: 'center',
    },

    // Generic card shared by all sections
    card: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(16),
      padding: widthScale(16),
      marginBottom: heightScale(14),
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.15 : 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
    sectionHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(8),
      marginBottom: heightScale(12),
    },
    sectionIconWrap: {
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(9),
      backgroundColor: theme.colors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: widthScale(13),
      color: theme.colors.textSecondary,
    },

    // Badges (order/payment status pills)
    badge: {
      paddingVertical: heightScale(5),
      paddingHorizontal: widthScale(10),
      borderRadius: widthScale(8),
      borderWidth: 0.5,
    },
    badgeText: {
      fontSize: widthScale(11),
      textTransform: 'uppercase',
    },
    badge_pending: { backgroundColor: statusColors.warning.bg, borderColor: statusColors.warning.border },
    badgeText_pending: { color: statusColors.warning.text },
    badge_confirmed: { backgroundColor: statusColors.info.bg, borderColor: statusColors.info.border },
    badgeText_confirmed: { color: statusColors.info.text },
    badge_completed: { backgroundColor: theme.colors.successBg, borderColor: theme.colors.successBorder },
    badgeText_completed: { color: theme.colors.successText },
    badge_cancelled: { backgroundColor: theme.colors.errorBg, borderColor: theme.colors.errorBorder },
    badgeText_cancelled: { color: theme.colors.errorText },
    badge_unpaid: { backgroundColor: theme.colors.errorBg, borderColor: theme.colors.errorBorder },
    badgeText_unpaid: { color: theme.colors.errorText },
    badge_partial: { backgroundColor: statusColors.warning.bg, borderColor: statusColors.warning.border },
    badgeText_partial: { color: statusColors.warning.text },
    badge_paid: { backgroundColor: theme.colors.successBg, borderColor: theme.colors.successBorder },
    badgeText_paid: { color: theme.colors.successText },

    // Overview card: status pills + headline totals
    overviewPillsRow: {
      flexDirection: 'row',
      gap: widthScale(8),
      marginBottom: heightScale(16),
    },
    overviewStatsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    overviewStatBox: {
      flex: 1,
    },
    overviewStatDivider: {
      width: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: widthScale(16),
    },
    overviewStatLabel: {
      fontSize: widthScale(11),
      color: theme.colors.textSecondary,
      marginBottom: heightScale(4),
    },
    overviewStatValue: {
      fontSize: widthScale(19),
      color: theme.colors.text,
    },

    // Customer card
    customerRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: widthScale(46),
      height: widthScale(46),
      borderRadius: widthScale(23),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: widthScale(12),
    },
    customerInfo: {
      flex: 1,
      gap: heightScale(2),
    },
    customerName: {
      fontSize: widthScale(15),
      color: theme.colors.text,
    },
    customerPhone: {
      fontSize: widthScale(12),
      color: theme.colors.textSecondary,
    },
    quickActionsRow: {
      flexDirection: 'row',
      gap: widthScale(6),
    },
    quickActionBtn: {
      width: widthScale(34),
      height: widthScale(34),
      borderRadius: widthScale(17),
      justifyContent: 'center',
      alignItems: 'center',
    },
    quickActionCallBtn: {
      backgroundColor: theme.colors.callBg,
    },
    quickActionWhatsappBtn: {
      backgroundColor: theme.colors.whatsappBg,
    },

    // Icon + label + value info rows (Event, Records)
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightScale(6),
    },
    infoIconWrap: {
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(8),
      backgroundColor: theme.colors.inputBg,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: widthScale(10),
    },
    infoLabel: {
      fontSize: widthScale(12),
      color: theme.colors.textSecondary,
      flex: 1,
    },
    infoValue: {
      fontSize: widthScale(13),
      color: theme.colors.text,
      textAlign: 'right',
      flexShrink: 1,
    },
    linkValue: {
      textDecorationLine: 'underline',
      color: theme.colors.primary,
    },
    notesBox: {
      backgroundColor: theme.colors.inputBg,
      borderRadius: widthScale(10),
      padding: widthScale(10),
      marginTop: heightScale(6),
    },
    notesText: {
      fontSize: widthScale(12),
      color: theme.colors.text,
      lineHeight: heightScale(18),
    },

    // Menu items list
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: heightScale(9),
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    itemRowLast: {
      borderBottomWidth: 0,
      paddingBottom: 0,
    },
    itemLeft: {
      flex: 1,
      marginRight: widthScale(10),
    },
    itemName: {
      fontSize: widthScale(13),
      color: theme.colors.text,
    },
    itemMeta: {
      fontSize: widthScale(11),
      color: theme.colors.textMuted,
      marginTop: heightScale(2),
    },
    itemTotal: {
      fontSize: widthScale(13),
      color: theme.colors.text,
    },

    // Payment breakdown rows
    billRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: heightScale(5),
    },
    billLabel: {
      fontSize: widthScale(13),
      color: theme.colors.textSecondary,
    },
    billValue: {
      fontSize: widthScale(13),
      color: theme.colors.text,
    },
    billTotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: heightScale(8),
      paddingTop: heightScale(10),
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },

    // Sticky footer
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(10),
      paddingHorizontal: widthScale(16),
      paddingTop: heightScale(12),
      paddingBottom: heightScale(20),
      backgroundColor: theme.colors.card,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    footerPrimaryButton: {
      flex: 1,
    },
    footerIconButton: {
      width: heightScale(50),
      height: heightScale(50),
      borderRadius: widthScale(12),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryLight,
    },
    balanceTextDue: {
      color: theme.colors.error,
    },
    balanceTextPaid: {
      color: theme.colors.paidText,
    },
  });
};

export default getStyles;
