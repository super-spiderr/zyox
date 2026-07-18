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
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: widthScale(16),
      paddingVertical: heightScale(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      padding: widthScale(4),
      marginRight: widthScale(10),
    },
    headerTitle: {
      fontSize: widthScale(18),
      color: theme.colors.text,
    },
    // Step Indicator Styles
    stepsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: widthScale(24),
      paddingVertical: heightScale(12),
      backgroundColor: theme.colors.panelBg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    stepItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(4),
    },
    stepDot: {
      width: widthScale(20),
      height: widthScale(20),
      borderRadius: widthScale(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
    stepDotText: {
      fontSize: widthScale(11),
      color: palette.white,
    },
    stepText: {
      fontSize: widthScale(12),
    },
    stepDivider: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: widthScale(8),
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
    pickerContainer: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(8),
      backgroundColor: theme.colors.card,
      marginTop: heightScale(4),
      maxHeight: heightScale(150),
      overflow: 'hidden',
    },
    pickerItem: {
      paddingVertical: heightScale(10),
      paddingHorizontal: widthScale(14),
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    pickerItemText: {
      fontSize: widthScale(13),
      color: theme.colors.text,
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
      backgroundColor: palette.secondary500,
    },
    // MenuItem Cards
    menuList: {
      paddingBottom: heightScale(80),
    },
    menuItemCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingVertical: heightScale(16),
      paddingHorizontal: widthScale(4),
    },
    menuItemLeft: {
      flex: 1,
      paddingRight: widthScale(16),
    },
    typeBadgeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: heightScale(6),
    },
    vegNonvegBorder: {
      width: widthScale(14),
      height: widthScale(14),
      borderWidth: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: widthScale(2),
    },
    vegNonvegCircle: {
      width: widthScale(6),
      height: widthScale(6),
      borderRadius: widthScale(3),
    },
    menuItemName: {
      fontSize: widthScale(15),
      color: theme.colors.text,
      marginBottom: heightScale(4),
    },
    menuItemPrice: {
      fontSize: widthScale(14),
      color: theme.colors.textSecondary,
      marginBottom: heightScale(4),
    },
    menuItemRight: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuItemImgPlaceholder: {
      width: widthScale(100),
      height: widthScale(100),
      borderRadius: widthScale(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuItemImg: {
      width: widthScale(100),
      height: widthScale(100),
      borderRadius: widthScale(12),
    },
    // Swiggy Add Button Styles
    addBtnWrapper: {
      position: 'absolute',
      bottom: heightScale(-10),
      alignSelf: 'center',
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    swiggyAddBtn: {
      width: widthScale(82),
      height: heightScale(32),
      borderRadius: widthScale(6),
      borderWidth: 1,
      borderColor: palette.secondary500,
      backgroundColor: palette.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    swiggyAddText: {
      color: palette.secondary500,
      fontSize: widthScale(12),
    },
    swiggyQtyBtn: {
      width: widthScale(82),
      height: heightScale(32),
      borderRadius: widthScale(6),
      backgroundColor: palette.secondary500,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: widthScale(8),
    },
    qtyBtnText: {
      color: palette.white,
      fontSize: widthScale(16),
      paddingHorizontal: widthScale(4),
    },
    qtyNumText: {
      color: palette.white,
      fontSize: widthScale(12),
    },
    // Bottom Cart Bar
    cartBarWrapper: {
      position: 'absolute',
      bottom: heightScale(20),
      left: widthScale(16),
      right: widthScale(16),
      backgroundColor: palette.secondary500,
      borderRadius: widthScale(12),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: heightScale(12),
      paddingHorizontal: widthScale(16),
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    cartBarLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(6),
    },
    cartBarCount: {
      color: palette.white,
      fontSize: widthScale(13),
    },
    cartBarPrice: {
      color: palette.white,
      fontSize: widthScale(14),
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
    checkoutItemName: {
      fontSize: widthScale(13),
      color: theme.colors.text,
      flex: 1,
    },
    checkoutItemQty: {
      fontSize: widthScale(13),
      color: theme.colors.textSecondary,
      marginHorizontal: widthScale(10),
    },
    checkoutItemTotal: {
      fontSize: widthScale(13),
      color: theme.colors.text,
      minWidth: widthScale(60),
      textAlign: 'right',
    },
    checkoutSummaryBlock: {
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(12),
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: widthScale(16),
      marginVertical: heightScale(16),
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
      backgroundColor: palette.secondary100,
      borderColor: palette.secondary500,
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
      color: palette.secondary700,
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
      color: palette.secondary500,
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
    dividerPipe: {
      color: palette.white,
      opacity: 0.6,
    },
    checkoutHeader: {
      marginBottom: heightScale(12),
    },
    paymentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(4),
    },
    notesSection: {
      gap: heightScale(12),
      marginTop: heightScale(8),
    },
    checkoutButton: {
      marginTop: heightScale(14),
    },
    actionButtonSpacing: {
      marginTop: heightScale(28),
    },
  });
};

export default getStyles;
