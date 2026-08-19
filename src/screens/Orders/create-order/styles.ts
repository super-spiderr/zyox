import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Step Indicator Styles
    stepsContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingHorizontal: widthScale(20),
      paddingTop: heightScale(16),
      paddingBottom: heightScale(12),
      backgroundColor: theme.colors.panelBg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    stepItem: {
      alignItems: 'center',
      width: widthScale(76),
    },
    stepDotOuter: {
      width: widthScale(38),
      height: widthScale(38),
      borderRadius: widthScale(19),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: heightScale(6),
    },
    stepDotOuterActive: {
      backgroundColor: theme.colors.primaryLight,
    },
    stepDot: {
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(14),
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
    },
    stepDotActive: {
      backgroundColor: theme.colors.primary,
      borderWidth: 0,
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    stepDotCompleted: {
      backgroundColor: theme.colors.paidText,
      borderWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },
    stepDotInactive: {
      backgroundColor: theme.colors.card,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      shadowOpacity: 0,
      elevation: 0,
    },
    stepDotText: {
      fontSize: widthScale(12),
      color: palette.white,
    },
    stepDotTextInactive: {
      color: theme.colors.textMuted,
    },
    stepText: {
      fontSize: widthScale(12),
      textAlign: 'center',
    },
    stepTextActive: {
      color: theme.colors.text,
      fontFamily: theme.typography.fonts.urbanist.bold,
    },
    stepTextCompleted: {
      color: theme.colors.paidText,
      fontFamily: theme.typography.fonts.urbanist.regular,
    },
    stepTextInactive: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.fonts.urbanist.regular,
    },
    stepDivider: {
      flex: 1,
      height: 2,
      borderRadius: 1,
      marginTop: widthScale(19),
    },
    stepDividerActive: {
      backgroundColor: theme.colors.paidText,
    },
    stepDividerInactive: {
      backgroundColor: theme.colors.border,
    },
    // Scroll content
    scrollContent: {
      padding: widthScale(16),
      paddingBottom: heightScale(100),
    },
    // Step 1: Customer details forms
    formSectionTitle: {
      fontSize: widthScale(15),
      marginBottom: heightScale(14),
      color: theme.colors.text,
    },
    formGroup: {
      marginBottom: heightScale(16),
    },
    formLabel: {
      fontSize: widthScale(12),
      color: theme.colors.textSecondary,
      marginBottom: heightScale(6),
    },
    formInput: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(10),
      paddingHorizontal: widthScale(14),
      height: heightScale(44),
      fontSize: widthScale(14),
      color: theme.colors.text,
    },
    notesInput: {
      height: heightScale(80),
      paddingTop: heightScale(10),
      textAlignVertical: 'top',
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: widthScale(11),
      marginTop: heightScale(4),
    },
    selectTrigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    selectTriggerText: {
      flex: 1,
      fontSize: widthScale(14),
      marginRight: widthScale(8),
    },
    nextButton: {
      marginTop: heightScale(20),
    },
    // Step 2: Swiggy UI Selection Styles
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBg,
      borderRadius: widthScale(12),
      paddingHorizontal: widthScale(14),
      height: heightScale(44),
      marginBottom: heightScale(12),
    },
    searchIcon: {
      marginRight: widthScale(8),
    },
    searchInput: {
      flex: 1,
      color: theme.colors.text,
      fontSize: widthScale(13),
      padding: 0,
    },
    filterRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightScale(16),
    },
    filterTabs: {
      flexDirection: 'row',
      backgroundColor: theme.colors.panelBgMuted,
      borderRadius: widthScale(8),
      padding: widthScale(2),
      gap: widthScale(4),
    },
    filterTab: {
      paddingVertical: heightScale(6),
      paddingHorizontal: widthScale(14),
      borderRadius: widthScale(6),
    },
    filterTabText: {
      fontSize: widthScale(12),
    },
    vegToggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(6),
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(8),
      paddingVertical: heightScale(4),
      paddingHorizontal: widthScale(8),
    },
    vegDot: {
      width: widthScale(8),
      height: widthScale(8),
      borderRadius: widthScale(4),
      backgroundColor: palette.green500,
    },
    // MenuItem Rows (minimal tappable checklist)
    menuList: {
      paddingBottom: heightScale(80),
    },
    menuItemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderWidth: 1.5,
      borderColor: palette.transparent,
      borderRadius: widthScale(14),
      paddingVertical: heightScale(10),
      paddingHorizontal: widthScale(10),
      marginBottom: heightScale(8),
    },
    menuItemRowSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryLight,
    },
    menuItemThumb: {
      width: widthScale(48),
      height: widthScale(48),
      borderRadius: widthScale(10),
    },
    menuItemThumbPlaceholder: {
      backgroundColor: theme.colors.inputBg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuItemInfo: {
      flex: 1,
      marginHorizontal: widthScale(12),
      gap: heightScale(4),
    },
    menuItemNameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(6),
    },
    vegDotSmall: {
      width: widthScale(8),
      height: widthScale(8),
      borderRadius: widthScale(4),
    },
    menuItemName: {
      flex: 1,
      fontSize: widthScale(14),
      color: theme.colors.text,
    },
    menuItemPrice: {
      fontSize: widthScale(12),
      color: theme.colors.textSecondary,
    },
    checkCircle: {
      width: widthScale(24),
      height: widthScale(24),
      borderRadius: widthScale(12),
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkCircleActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
    },
    // Bottom Selection Summary Bar
    cartBarWrapper: {
      position: 'absolute',
      bottom: heightScale(20),
      left: widthScale(16),
      right: widthScale(16),
      backgroundColor: theme.colors.primary,
      borderRadius: widthScale(14),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: heightScale(12),
      paddingHorizontal: widthScale(18),
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    cartBarLeft: {
      gap: heightScale(2),
    },
    cartBarCount: {
      color: palette.white,
      fontSize: widthScale(13),
    },
    cartBarPrice: {
      color: palette.white,
      fontSize: widthScale(12),
      opacity: 0.85,
    },
    cartBarRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(4),
    },
    cartBarBtnText: {
      color: palette.white,
      fontSize: widthScale(13),
    },
    // Step 3: Checkout Page
    checkoutItemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: heightScale(8),
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    checkoutItemInfo: {
      flex: 1,
      marginRight: widthScale(8),
      gap: heightScale(2),
    },
    checkoutItemName: {
      fontSize: widthScale(13),
      color: theme.colors.text,
    },
    checkoutItemMeta: {
      fontSize: widthScale(11),
      color: theme.colors.textMuted,
    },
    checkoutItemTotal: {
      fontSize: widthScale(13),
      color: theme.colors.text,
      minWidth: widthScale(60),
      textAlign: 'right',
    },
    // Shared grouped-section card used across the Checkout step
    sectionCard: {
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(12),
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: widthScale(16),
      marginBottom: heightScale(16),
    },
    sectionCardHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightScale(10),
    },
    sectionCardTitle: {
      fontSize: widthScale(14),
      color: theme.colors.text,
    },
    sectionCardTitleSpaced: {
      marginBottom: heightScale(10),
    },
    sectionCardSubtitle: {
      fontSize: widthScale(12),
      color: theme.colors.textSecondary,
    },
    checkoutSummaryBlock: {
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(12),
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: widthScale(16),
      marginBottom: heightScale(16),
    },
    couponTrigger: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: heightScale(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      marginBottom: heightScale(12),
    },
    couponTriggerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(8),
    },
    couponTriggerText: {
      fontSize: widthScale(13),
    },
    couponAppliedBadge: {
      backgroundColor: palette.green100,
      borderColor: palette.green500,
      borderWidth: 1,
      borderRadius: widthScale(6),
      paddingVertical: heightScale(4),
      paddingHorizontal: widthScale(8),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: heightScale(12),
    },
    couponAppliedText: {
      color: palette.green700,
      fontSize: widthScale(12),
    },
    couponRemoveText: {
      color: theme.colors.error,
      fontSize: widthScale(11),
      marginLeft: widthScale(10),
    },
    billRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: heightScale(4),
    },
    billLabel: {
      fontSize: widthScale(13),
      color: theme.colors.textSecondary,
    },
    billVal: {
      fontSize: widthScale(13),
      color: theme.colors.text,
    },
    billTotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: heightScale(10),
      paddingTop: heightScale(8),
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    billTotalLabel: {
      fontSize: widthScale(14),
      color: theme.colors.text,
    },
    billTotalVal: {
      fontSize: widthScale(15),
      color: palette.green500,
    },
    financeInputsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: heightScale(12),
    },
    financeInputGroup: {
      flex: 0.48,
    },
    financeInput: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(8),
      paddingHorizontal: widthScale(10),
      height: heightScale(38),
      fontSize: widthScale(13),
      color: theme.colors.text,
    },
    balanceLabel: {
      fontSize: widthScale(13),
    },
    statusLabel: {
      fontSize: widthScale(13),
      color: theme.colors.textSecondary,
      marginBottom: heightScale(4),
    },
    statusGroupRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: widthScale(6),
      marginBottom: heightScale(12),
    },
    statusGroupRowLast: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: widthScale(6),
    },
    statusBtn: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(6),
      paddingVertical: heightScale(5),
      paddingHorizontal: widthScale(10),
    },
    statusBtnActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryLight,
    },
    statusText: {
      fontSize: widthScale(11),
      color: theme.colors.textSecondary,
    },
    statusTextActive: {
      color: theme.colors.primary,
    },
    // New helper classes to replace inline styles
    flexOne: {
      flex: 1,
    },
    justifyBetweenRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    stepContainerHeader: {
      paddingHorizontal: widthScale(16),
      paddingTop: heightScale(14),
    },
    vegToggleText: {
      fontSize: widthScale(11),
    },
    paymentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(4),
    },
    notesSection: {
      gap: heightScale(12),
    },
    checkoutButton: {
      marginTop: heightScale(4),
      marginBottom: heightScale(16),
    },
    // Sticky Checkout Footer
    checkoutFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: widthScale(16),
      paddingTop: heightScale(12),
      paddingBottom: heightScale(20),
      backgroundColor: theme.colors.card,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    footerTotalLabel: {
      fontSize: widthScale(11),
      color: theme.colors.textSecondary,
    },
    footerTotalValue: {
      fontSize: widthScale(18),
      color: theme.colors.text,
    },
    footerButton: {
      flex: 1,
      maxWidth: widthScale(190),
      marginLeft: widthScale(16),
    },
    vegIndicatorVeg: {
      width: 14,
      height: 14,
      borderWidth: 1.5,
      borderColor: theme.colors.paidText,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      marginRight: 6,
    },
    vegIndicatorNonVeg: {
      width: 14,
      height: 14,
      borderWidth: 1.5,
      borderColor: theme.colors.error,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      marginRight: 6,
    },
    vegDotVeg: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.colors.paidText,
    },
    vegDotNonVeg: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.colors.error,
    },
    autoPaymentStatusBtn: {
      backgroundColor: theme.colors.primaryLight,
      borderColor: theme.colors.primary,
    },
    autoPaymentStatusText: {
      color: theme.colors.primary,
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
