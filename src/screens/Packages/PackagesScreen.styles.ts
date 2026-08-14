import { StyleSheet, Dimensions } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  const { width } = Dimensions.get('window');
  const tileGap = widthScale(12);
  const tileWidth = (width - widthScale(16) * 2 - tileGap) / 2;

  const tileBaseStyle = {
    borderRadius: widthScale(20),
    overflow: 'hidden' as const,
    backgroundColor: theme.colors.card,
    position: 'relative' as const,
  };
  const tileSmallStyle = { width: tileWidth, height: tileWidth * 1.05 };
  const tileLargeStyle = { width: '100%' as const, height: tileWidth * 0.95 };

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
    searchBar: {
      marginHorizontal: widthScale(16),
      marginBottom: heightScale(12),
    },
    filtersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: heightScale(14),
      gap: widthScale(8),
    },
    filterChip: {
      paddingVertical: heightScale(7),
      paddingHorizontal: widthScale(14),
      borderRadius: widthScale(18),
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    },
    filterChipActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    filterChipText: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.textSecondary,
    },
    filterChipTextActive: {
      color: theme.colors.primaryText,
      fontFamily: theme.typography.fonts.urbanist.bold,
    },
    list: {
      paddingBottom: heightScale(40),
    },
    endLoader: {
      paddingVertical: heightScale(16),
      alignItems: 'center',
    },
    rowPair: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: tileGap,
    },
    rowLarge: {
      marginBottom: tileGap,
    },
    tileBase: tileBaseStyle,
    tileSmall: tileSmallStyle,
    tileLarge: tileLargeStyle,
    skeletonHero: {
      ...tileBaseStyle,
      ...tileLargeStyle,
      marginBottom: tileGap,
    },
    skeletonSmall: {
      ...tileBaseStyle,
      ...tileSmallStyle,
    },
    tileDecorCircleLeft: {
      position: 'absolute',
      left: -widthScale(30),
      top: -widthScale(40),
      width: widthScale(140),
      height: widthScale(140),
      borderRadius: widthScale(70),
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    tileDecorCircleRight: {
      position: 'absolute',
      right: -widthScale(20),
      bottom: -widthScale(50),
      width: widthScale(120),
      height: widthScale(120),
      borderRadius: widthScale(60),
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    tileImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      resizeMode: 'cover',
    },
    tilePlaceholder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tileGradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '55%',
    },
    tileTypeDot: {
      position: 'absolute',
      top: widthScale(10),
      left: widthScale(10),
      width: widthScale(16),
      height: widthScale(16),
      borderRadius: widthScale(8),
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tileTypeDotInner: {
      width: widthScale(7),
      height: widthScale(7),
      borderRadius: widthScale(3.5),
    },
    tileActions: {
      position: 'absolute',
      top: widthScale(8),
      right: widthScale(8),
      flexDirection: 'row',
      gap: widthScale(6),
    },
    tileActionButton: {
      width: widthScale(26),
      height: widthScale(26),
      borderRadius: widthScale(13),
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tileLabelWrap: {
      position: 'absolute',
      bottom: widthScale(10),
      left: widthScale(10),
      right: widthScale(10),
    },
    tileLabel: {
      fontSize: widthScale(14),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: palette.white,
    },
    tileLabelLarge: {
      fontSize: widthScale(20),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: palette.white,
    },
    tileSubLabel: {
      fontSize: widthScale(11),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: 'rgba(255,255,255,0.85)',
      marginTop: heightScale(2),
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
    removeItemButton: {
      marginLeft: widthScale(10),
      padding: widthScale(4),
    },
    itemsTotalHint: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.textSecondary,
      marginTop: heightScale(8),
    },
    modalEmptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: heightScale(32),
      gap: heightScale(8),
    },
    modalEmptyStateText: {
      fontSize: widthScale(13),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textSecondary,
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
