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
    bottomSheetContainer: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: widthScale(24),
      borderTopRightRadius: widthScale(24),
      padding: widthScale(20),
      paddingBottom: heightScale(30),
    },
    grabber: {
      alignSelf: 'center',
      width: widthScale(40),
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.border,
      marginBottom: heightScale(14),
    },
    bottomSheetHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: heightScale(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      marginBottom: heightScale(10),
    },
    bottomSheetAvatar: {
      width: widthScale(44),
      height: widthScale(44),
      borderRadius: widthScale(22),
      backgroundColor: theme.colors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: widthScale(12),
    },
    bottomSheetAvatarText: {
      fontSize: widthScale(16),
      color: theme.colors.primary,
    },
    bottomSheetInfo: {
      flex: 1,
    },
    bottomSheetName: {
      fontSize: widthScale(16),
      color: theme.colors.text,
    },
    bottomSheetPhone: {
      fontSize: widthScale(13),
      color: theme.colors.textSecondary,
      marginTop: heightScale(2),
    },
    closeButton: {
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(14),
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomSheetItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightScale(10),
    },
    bottomSheetItemIconWrap: {
      width: widthScale(36),
      height: widthScale(36),
      borderRadius: widthScale(10),
      backgroundColor: theme.colors.infoSurfaceBg,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: widthScale(12),
    },
    bottomSheetItemIconWrapDanger: {
      backgroundColor: theme.colors.dangerIconBg,
    },
    bottomSheetItemText: {
      fontSize: widthScale(14),
      color: theme.colors.text,
    },
  });
};

export default getStyles;
