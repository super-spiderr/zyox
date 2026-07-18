import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  const isDark = theme.isDark;

  const statusColors = {
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
    footer: {
      paddingHorizontal: widthScale(16),
      paddingTop: heightScale(12),
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
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
      gap: 8,
    },
    list: {
      paddingBottom: heightScale(40),
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
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(16),
      padding: widthScale(14),
      marginBottom: heightScale(12),
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.15 : 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
    packageImage: {
      width: widthScale(54),
      height: widthScale(54),
      borderRadius: widthScale(12),
      backgroundColor: theme.colors.imagePlaceholderBg,
    },
    placeholderImage: {
      width: widthScale(54),
      height: widthScale(54),
      borderRadius: widthScale(12),
      backgroundColor: theme.colors.packageIconBg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    packageInfo: {
      flex: 1,
      marginLeft: widthScale(14),
    },
    packageName: {
      fontSize: widthScale(15),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
    },
    priceText: {
      fontSize: widthScale(13),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.primary,
      marginTop: heightScale(2),
    },
    packageMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: heightScale(6),
    },
    itemsCountText: {
      fontSize: widthScale(11),
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.fonts.urbanist.regular,
    },
    typeBadge: {
      paddingVertical: heightScale(2),
      paddingHorizontal: widthScale(6),
      borderRadius: widthScale(6),
      borderWidth: 0.5,
      marginLeft: widthScale(8),
    },
    typeBadgeText: {
      fontSize: widthScale(10),
      fontFamily: theme.typography.fonts.urbanist.bold,
      textTransform: 'uppercase',
    },
    statusBadge: {
      paddingVertical: heightScale(2),
      paddingHorizontal: widthScale(6),
      borderRadius: widthScale(6),
      borderWidth: 0.5,
      marginLeft: widthScale(8),
    },
    statusBadgeText: {
      fontSize: widthScale(10),
      fontFamily: theme.typography.fonts.urbanist.medium,
    },
    badge_veg: {
      backgroundColor: theme.colors.successBg,
      borderColor: theme.colors.successBorder,
    },
    badgeText_veg: {
      color: theme.colors.successText,
    },
    badge_nonveg: {
      backgroundColor: theme.colors.errorBg,
      borderColor: theme.colors.errorBorder,
    },
    badgeText_nonveg: {
      color: theme.colors.errorText,
    },
    badge_active: {
      backgroundColor: theme.colors.successBg,
      borderColor: theme.colors.successBorder,
    },
    badgeText_active: {
      color: theme.colors.successText,
    },
    badge_inactive: {
      backgroundColor: statusColors.muted.bg,
      borderColor: statusColors.muted.border,
    },
    badgeText_inactive: {
      color: statusColors.muted.text,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      padding: widthScale(6),
      marginLeft: widthScale(4),
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: widthScale(20),
      borderTopRightRadius: widthScale(20),
      padding: widthScale(20),
      maxHeight: '85%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightScale(16),
    },
    modalTitle: {
      fontSize: widthScale(18),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
    },
    modalCloseButton: {
      padding: widthScale(4),
    },
    modalScrollView: {
      marginBottom: heightScale(16),
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
    inputError: {
      borderColor: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: widthScale(11),
      marginTop: heightScale(3),
      fontFamily: theme.typography.fonts.urbanist.regular,
    },
    uploadImageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
      borderRadius: widthScale(8),
      padding: widthScale(12),
      justifyContent: 'center',
      marginVertical: heightScale(6),
      height: heightScale(50),
    },
    uploadImageText: {
      fontSize: widthScale(13),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.primary,
      marginLeft: widthScale(8),
    },
    previewImageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(8),
      padding: widthScale(8),
      marginVertical: heightScale(6),
    },
    previewThumbnail: {
      width: widthScale(40),
      height: widthScale(40),
      borderRadius: widthScale(6),
      backgroundColor: palette.gray200,
    },
    previewInfo: {
      flex: 1,
      marginLeft: widthScale(10),
    },
    previewName: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.text,
    },
    previewSize: {
      fontSize: widthScale(10),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textMuted,
      marginTop: heightScale(2),
    },
    removePreviewButton: {
      padding: widthScale(6),
    },
    typeButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: widthScale(-3),
    },
    typeButton: {
      flex: 1,
      paddingVertical: heightScale(8),
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
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.textSecondary,
    },
    typeButtonTextActive: {
      color: theme.colors.primary,
      fontFamily: theme.typography.fonts.urbanist.bold,
    },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: heightScale(10),
      paddingVertical: heightScale(4),
    },
    switchLabel: {
      fontSize: widthScale(13),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.textSecondary,
    },
    productListContainer: {
      maxHeight: heightScale(240),
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(8),
      padding: widthScale(8),
      backgroundColor: theme.colors.surface,
    },
    productSelectItemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: heightScale(10),
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    productSelectItemTextWrapper: {
      flex: 0.55,
      flexDirection: 'row',
      alignItems: 'center',
    },
    productSelectItemText: {
      fontSize: widthScale(13),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.text,
      marginLeft: widthScale(8),
    },
    qtySelectorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(6),
      overflow: 'hidden',
    },
    qtySelectorButton: {
      backgroundColor: theme.colors.imagePlaceholderBg,
      paddingHorizontal: widthScale(8),
      paddingVertical: heightScale(4),
      alignItems: 'center',
      justifyContent: 'center',
    },
    qtySelectorText: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
      width: widthScale(28),
      textAlign: 'center',
    },
    modalFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: heightScale(6),
    },
    footerButton: {
      flex: 0.48,
    },
  });
};

export default getStyles;
