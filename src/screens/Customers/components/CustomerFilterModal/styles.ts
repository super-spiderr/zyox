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
      justifyContent: 'space-between',
      paddingBottom: heightScale(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      marginBottom: heightScale(8),
    },
    closeButton: {
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(14),
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterSectionTitle: {
      marginTop: heightScale(12),
      marginBottom: heightScale(6),
    },
    filterOptionsContainer: {
      flexDirection: 'row',
      gap: widthScale(8),
      marginBottom: heightScale(12),
    },
    filterOptionBtn: {
      flex: 1,
      paddingVertical: heightScale(8),
      borderRadius: widthScale(8),
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.card,
    },
    filterOptionBtnActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryLight,
    },
  });
};

export default getStyles;
