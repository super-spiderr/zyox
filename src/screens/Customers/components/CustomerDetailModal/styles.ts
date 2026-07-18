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
      borderTopLeftRadius: widthScale(24),
      borderTopRightRadius: widthScale(24),
      padding: widthScale(20),
      paddingBottom: heightScale(30),
      maxHeight: '75%',
    },
    grabber: {
      alignSelf: 'center',
      width: widthScale(40),
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.border,
      marginBottom: heightScale(14),
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightScale(16),
      paddingBottom: heightScale(14),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    modalTitle: {
      fontSize: widthScale(17),
      color: theme.colors.text,
    },
    closeButton: {
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(14),
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailModalContent: {
      paddingVertical: heightScale(4),
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: heightScale(10),
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    detailRowLast: {
      borderBottomWidth: 0,
    },
    detailIconWrap: {
      width: widthScale(32),
      height: widthScale(32),
      borderRadius: widthScale(9),
      backgroundColor: theme.colors.infoSurfaceBg,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: widthScale(12),
    },
    detailTextWrap: {
      flex: 1,
      justifyContent: 'center',
    },
    detailLabel: {
      fontSize: widthScale(11),
      color: theme.colors.textSecondary,
      marginBottom: heightScale(2),
    },
    detailValue: {
      fontSize: widthScale(14),
      color: theme.colors.text,
    },
    statusPill: {
      alignSelf: 'flex-start',
      paddingHorizontal: widthScale(10),
      paddingVertical: heightScale(3),
      borderRadius: widthScale(12),
      borderWidth: 1,
    },
    statusPillActive: {
      backgroundColor: theme.colors.successBg,
      borderColor: theme.colors.successBorder,
    },
    statusPillInactive: {
      backgroundColor: theme.colors.neutralSurfaceBg,
      borderColor: theme.colors.mutedBorder,
    },
    statusPillTextActive: {
      color: theme.colors.successText,
      fontSize: widthScale(11),
    },
    statusPillTextInactive: {
      color: theme.colors.mutedText,
      fontSize: widthScale(11),
    },
    modalCloseBtn: {
      marginTop: heightScale(16),
    },
  });
};

export default getStyles;
