import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    bottomSheetOverlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'flex-end',
    },
    detailModalContainer: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: widthScale(28),
      borderTopRightRadius: widthScale(28),
      padding: widthScale(20),
      paddingBottom: heightScale(40),
      maxHeight: '85%',
      position: 'relative',
    },
    grabber: {
      alignSelf: 'center',
      width: widthScale(36),
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.border,
      marginBottom: heightScale(14),
    },
    closeButton: {
      position: 'absolute',
      top: heightScale(16),
      right: widthScale(16),
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(14),
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: heightScale(8),
      marginBottom: heightScale(16),
    },
    avatarContainer: {
      width: widthScale(48),
      height: widthScale(48),
      borderRadius: widthScale(24),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: widthScale(12),
    },
    profileInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    customerSubtitleText: {
      marginTop: heightScale(2),
    },
    actionButtonsRow: {
      flexDirection: 'row',
      gap: widthScale(8),
      marginBottom: heightScale(18),
    },
    actionBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: heightScale(40),
      borderRadius: widthScale(10),
      gap: widthScale(6),
    },
    waBtn: {
      backgroundColor: theme.colors.whatsappBg,
    },
    callBtn: {
      backgroundColor: theme.colors.callBg,
    },
    editBtn: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    },
    statsRow: {
      flexDirection: 'row',
      gap: widthScale(8),
      marginBottom: heightScale(20),
    },
    statsCard: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: widthScale(12),
      paddingVertical: heightScale(12),
      paddingHorizontal: widthScale(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
    statsCardWarning: {
      backgroundColor: theme.colors.warningBg,
    },
    statsLabelText: {
      marginTop: heightScale(2),
    },
    ordersSectionTitle: {
      marginBottom: heightScale(10),
    },
    ordersScroll: {
      flexGrow: 0,
      maxHeight: heightScale(200),
    },
    ordersContent: {
      paddingBottom: heightScale(10),
    },
    emptyOrdersState: {
      paddingVertical: heightScale(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    orderCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surface,
      borderRadius: widthScale(12),
      padding: widthScale(12),
      marginBottom: heightScale(8),
    },
    orderInfoCol: {
      flex: 1,
      marginRight: widthScale(12),
    },
    orderDateIdSub: {
      marginTop: heightScale(2),
    },
    orderStatusBadge: {
      paddingHorizontal: widthScale(8),
      paddingVertical: heightScale(4),
      borderRadius: widthScale(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    statusPaidBg: {
      backgroundColor: theme.colors.paidBg,
    },
    statusDueBg: {
      backgroundColor: theme.colors.warningBg,
    },
    deleteBottomBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: widthScale(6),
      marginTop: heightScale(16),
      paddingVertical: heightScale(12),
      borderRadius: widthScale(10),
      backgroundColor: theme.colors.errorLight,
    },
    reactivateBottomBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: widthScale(6),
      marginTop: heightScale(16),
      paddingVertical: heightScale(12),
      borderRadius: widthScale(10),
      backgroundColor: theme.colors.paidBg,
    },
  });
};

export default getStyles;
