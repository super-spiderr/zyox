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
    muted: {
      bg: theme.colors.mutedBg,
      border: theme.colors.mutedBorder,
      text: theme.colors.mutedText,
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
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBg,
      borderRadius: widthScale(12),
      paddingHorizontal: widthScale(14),
      marginBottom: heightScale(12),
      height: heightScale(44),
    },
    searchIcon: {
      marginRight: widthScale(8),
    },
    searchInput: {
      flex: 1,
      color: theme.colors.text,
      fontFamily: theme.typography.fonts.urbanist.regular,
      fontSize: widthScale(13),
      padding: 0,
    },
    clearButton: {
      padding: widthScale(4),
    },
    filtersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: heightScale(14),
      gap: widthScale(8),
    },
    filterDropdown: {
      flex: 1,
      backgroundColor: theme.colors.inputBg,
      borderRadius: widthScale(8),
      paddingHorizontal: widthScale(8),
      height: heightScale(32),
      justifyContent: 'center',
    },
    filterText: {
      fontSize: widthScale(11),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.textSecondary,
    },
    list: {
      paddingBottom: heightScale(40),
      gap: heightScale(14),
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: heightScale(60),
    },
    emptyStateText: {
      fontSize: widthScale(14),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textSecondary,
      marginTop: heightScale(10),
    },
    card: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(16),
      padding: widthScale(16),
      marginBottom: heightScale(12),
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.15 : 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
    badge: {
      paddingVertical: heightScale(2),
      paddingHorizontal: widthScale(6),
      borderRadius: widthScale(6),
      borderWidth: 0.5,
    },
    badgeText: {
      fontSize: widthScale(10),
      fontFamily: theme.typography.fonts.urbanist.bold,
      textTransform: 'uppercase',
    },
    // Order status badges
    badge_pending: {
      backgroundColor: statusColors.warning.bg,
      borderColor: statusColors.warning.border,
    },
    badgeText_pending: {
      color: statusColors.warning.text,
    },
    badge_confirmed: {
      backgroundColor: statusColors.info.bg,
      borderColor: statusColors.info.border,
    },
    badgeText_confirmed: {
      color: statusColors.info.text,
    },
    badge_completed: {
      backgroundColor: theme.colors.successBg,
      borderColor: theme.colors.successBorder,
    },
    badgeText_completed: {
      color: theme.colors.successText,
    },
    badge_cancelled: {
      backgroundColor: theme.colors.errorBg,
      borderColor: theme.colors.errorBorder,
    },
    badgeText_cancelled: {
      color: theme.colors.errorText,
    },
    // Payment status badges
    badge_unpaid: {
      backgroundColor: theme.colors.errorBg,
      borderColor: theme.colors.errorBorder,
    },
    badgeText_unpaid: {
      color: theme.colors.errorText,
    },
    badge_partial: {
      backgroundColor: statusColors.warning.bg,
      borderColor: statusColors.warning.border,
    },
    badgeText_partial: {
      color: statusColors.warning.text,
    },
    badge_paid: {
      backgroundColor: theme.colors.successBg,
      borderColor: theme.colors.successBorder,
    },
    badgeText_paid: {
      color: theme.colors.successText,
    },

    formGroup: {
      marginBottom: heightScale(12),
    },
    formLabel: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.textSecondary,
      marginBottom: heightScale(4),
    },
    formInput: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(8),
      paddingHorizontal: widthScale(10),
      height: heightScale(40),
      color: theme.colors.text,
      fontFamily: theme.typography.fonts.urbanist.regular,
      fontSize: widthScale(13),
    },
    notesInput: {
      height: heightScale(60),
      textAlignVertical: 'top',
      paddingTop: heightScale(8),
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: widthScale(11),
      marginTop: heightScale(3),
      fontFamily: theme.typography.fonts.urbanist.regular,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(8),
      backgroundColor: theme.colors.surface,
      maxHeight: heightScale(140),
      padding: widthScale(6),
    },
    pickerItem: {
      paddingVertical: heightScale(8),
      paddingHorizontal: widthScale(8),
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    pickerItemText: {
      fontSize: widthScale(13),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.text,
    },

    // Nested Items Section
    orderItemsTitleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightScale(8),
      marginTop: heightScale(6),
    },
    addOrderItemBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primaryLight,
      paddingVertical: heightScale(4),
      paddingHorizontal: widthScale(8),
      borderRadius: widthScale(6),
    },
    addOrderItemBtnText: {
      fontSize: widthScale(11),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.primary,
      marginLeft: widthScale(4),
    },
    orderItemEditorRow: {
      backgroundColor: theme.colors.inputBg,
      borderRadius: widthScale(10),
      padding: widthScale(10),
      marginBottom: heightScale(10),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
    },
    orderItemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightScale(8),
    },
    orderItemIndexText: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.textSecondary,
    },
    orderItemInputsGrid: {
      gap: heightScale(8),
    },
    typeButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: widthScale(-3),
    },
    typeButton: {
      flex: 1,
      paddingVertical: heightScale(6),
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(6),
      alignItems: 'center',
      marginHorizontal: widthScale(3),
      backgroundColor: theme.colors.surface,
    },
    typeButtonActive: {
      backgroundColor: theme.colors.primaryLight,
      borderColor: theme.colors.primary,
    },
    typeButtonText: {
      fontSize: widthScale(11),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.textSecondary,
    },
    typeButtonTextActive: {
      color: theme.colors.primary,
      fontFamily: theme.typography.fonts.urbanist.bold,
    },

    // Summary Section
    summaryBlock: {
      backgroundColor: theme.colors.panelBg,
      borderRadius: widthScale(12),
      padding: widthScale(14),
      marginTop: heightScale(10),
      marginBottom: heightScale(14),
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    summaryTitle: {
      fontSize: widthScale(14),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
      marginBottom: heightScale(8),
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: heightScale(4),
    },
    summaryLabel: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textSecondary,
    },
    summaryValue: {
      fontSize: widthScale(13),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.text,
    },
    summaryTotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: heightScale(8),
      marginTop: heightScale(6),
    },
    summaryTotalLabel: {
      fontSize: widthScale(13),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
    },
    summaryTotalValue: {
      fontSize: widthScale(16),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.primary,
    },

    modalFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: heightScale(6),
    },
    footerButton: {
      flex: 0.48,
    },

    // Detail Modal specific styles
    detailTitleSection: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingBottom: heightScale(12),
      marginBottom: heightScale(12),
    },
    detailSection: {
      marginBottom: heightScale(14),
    },
    detailSectionTitle: {
      fontSize: widthScale(13),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.textSecondary,
      marginBottom: heightScale(6),
      textTransform: 'uppercase',
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: heightScale(4),
    },
    detailLabel: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textMuted,
    },
    detailValue: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.text,
      flexShrink: 1,
      textAlign: 'right',
    },
    detailLabelBold: {
      fontFamily: theme.typography.fonts.urbanist.bold,
    },
    detailValueBold: {
      fontFamily: theme.typography.fonts.urbanist.bold,
    },
    notesSection: {
      marginTop: heightScale(6),
    },
    notesValue: {
      textAlign: 'left',
      alignSelf: 'flex-start',
      marginTop: heightScale(4),
      width: '100%',
    },
    linkValue: {
      textDecorationLine: 'underline',
    },
    detailItemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: heightScale(6),
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    detailItemLeft: {
      flex: 0.6,
    },
    detailItemName: {
      fontSize: widthScale(13),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.text,
    },
    detailItemSub: {
      fontSize: widthScale(11),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textMuted,
      marginTop: heightScale(2),
    },
    detailItemRight: {
      flex: 0.4,
      alignItems: 'flex-end',
    },
    detailItemTotal: {
      fontSize: widthScale(13),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: heightScale(12),
      marginTop: heightScale(12),
    },
    actionBtn: {
      flex: 0.3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: heightScale(8),
      borderRadius: widthScale(8),
      borderWidth: 1,
    },
    actionBtnText: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.bold,
      marginLeft: widthScale(4),
    },
    actionBtnRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionBtnTextGap: {
      marginLeft: widthScale(4),
    },
  });
};

export default getStyles;
