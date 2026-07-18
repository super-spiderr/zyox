import { StyleSheet, Dimensions } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

const { height: screenHeight } = Dimensions.get('window');

export const getStyles = (theme: Theme) => {
  const isDark = theme.isDark;

  return StyleSheet.create({
    boardContainer: {
      marginTop: heightScale(15),
      marginBottom: heightScale(15),
    },
    boardTitle: {
      color: theme.colors.text,
      marginBottom: heightScale(12),
      fontFamily: theme.typography.fonts.urbanist.bold,
    },
    slotsWrapper: {
      gap: heightScale(10),
    },
    slotCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(14),
      paddingVertical: heightScale(16),
      paddingHorizontal: widthScale(16),
      borderWidth: 0.8,
      borderColor: theme.colors.border,
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.2 : 0.02,
      shadowRadius: 3,
      elevation: 2,
    },
    slotCardCurrent: {
      borderColor: palette.primary500, // Cobalt Blue highlight
      borderWidth: 1.6,
      shadowColor: palette.primary500,
      shadowOpacity: isDark ? 0.3 : 0.08,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      backgroundColor: isDark ? 'rgba(37, 99, 235, 0.04)' : 'rgba(37, 99, 235, 0.02)',
    },
    slotLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(12),
    },
    statusDot: {
      width: widthScale(10),
      height: widthScale(10),
      borderRadius: widthScale(5),
    },
    slotDetails: {
      justifyContent: 'center',
    },
    slotTitle: {
      color: theme.colors.text,
      marginBottom: heightScale(2),
    },
    slotSubtitle: {
      color: theme.colors.textSecondary,
    },
    slotRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(8),
    },
    liveIndicator: {
      backgroundColor: palette.primary500,
      borderRadius: widthScale(4),
      paddingHorizontal: widthScale(5),
      paddingVertical: heightScale(1),
    },
    liveText: {
      color: palette.white,
    },

    // Empty state Day Board card
    emptyBoardCard: {
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(16),
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
      paddingVertical: heightScale(32),
      paddingHorizontal: widthScale(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyBoardIcon: {
      marginBottom: heightScale(12),
      opacity: 0.65,
    },
    emptyBoardTitle: {
      color: theme.colors.text,
      marginBottom: heightScale(4),
    },
    emptyBoardSub: {
      color: theme.colors.textMuted,
    },
    emptyBoardButton: {
      marginTop: heightScale(16),
      backgroundColor: theme.colors.primary,
      borderRadius: widthScale(10),
      paddingVertical: heightScale(10),
      paddingHorizontal: widthScale(20),
      minHeight: widthScale(44),
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyBoardButtonText: {
      color: palette.white,
    },

    // Order Card inside Modal
    orderCard: {
      backgroundColor: isDark ? theme.colors.surface : palette.white,
      borderRadius: widthScale(12),
      padding: widthScale(14),
      marginBottom: heightScale(10),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.02,
      shadowRadius: 2,
      elevation: 1,
    },
    borderDraft: {
      borderLeftWidth: widthScale(4),
      borderLeftColor: palette.warning500,
    },
    borderConfirmed: {
      borderLeftWidth: widthScale(4),
      borderLeftColor: palette.primary500,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: heightScale(6),
    },
    cardHeaderLeft: {
      flex: 1,
      paddingRight: widthScale(8),
    },
    eventName: {
      color: theme.colors.text,
      marginBottom: heightScale(2),
    },
    customerName: {
      color: theme.colors.textSecondary,
    },
    statusBadgeWrapper: {
      alignSelf: 'flex-start',
    },
    statusBadge: {
      borderRadius: widthScale(6),
      paddingHorizontal: widthScale(8),
      paddingVertical: heightScale(3),
    },
    badgeDraft: {
      backgroundColor: isDark ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.1)',
    },
    badgeConfirmed: {
      backgroundColor: isDark ? 'rgba(37, 99, 235, 0.15)' : 'rgba(37, 99, 235, 0.1)',
    },
    badgeTextDraft: {
      color: theme.colors.warningTextStrong,
    },
    badgeTextConfirmed: {
      color: theme.colors.infoTextStrong,
    },
    itemsSummary: {
      color: theme.colors.textMuted,
      marginBottom: heightScale(12),
      lineHeight: widthScale(15),
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoIcon: {
      marginRight: widthScale(6),
    },
    infoText: {
      color: theme.colors.textSecondary,
    },
    confirmButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: palette.primary500, // Cobalt Blue
      borderRadius: widthScale(8),
      paddingVertical: heightScale(6),
      paddingHorizontal: widthScale(12),
      gap: widthScale(4),
      shadowColor: palette.primary500,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 2,
    },
    btnIcon: {
      marginRight: widthScale(2),
    },
    confirmBtnText: {
      color: palette.white,
    },

    // Modal Sheet layout
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      borderTopLeftRadius: widthScale(24),
      borderTopRightRadius: widthScale(24),
      maxHeight: screenHeight * 0.78,
      paddingHorizontal: widthScale(20),
      paddingTop: heightScale(20),
      paddingBottom: heightScale(34),
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightScale(16),
      paddingBottom: heightScale(12),
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    modalHeaderTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(8),
    },
    modalTitle: {
      color: theme.colors.text,
    },
    closeButton: {
      width: widthScale(32),
      height: widthScale(32),
      borderRadius: widthScale(16),
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalScrollContent: {
      paddingBottom: heightScale(20),
    },
    modalEmptyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: heightScale(40),
      gap: widthScale(8),
    },
    modalEmptyText: {
      color: theme.colors.textMuted,
    },
  });
};

export default getStyles;
