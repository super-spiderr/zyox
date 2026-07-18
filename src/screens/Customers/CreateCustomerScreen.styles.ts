import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    formScrollView: {
      flex: 1,
    },
    formScrollContent: {
      paddingHorizontal: widthScale(16),
      paddingBottom: heightScale(24),
    },
    footer: {
      paddingHorizontal: widthScale(16),
      paddingTop: heightScale(12),
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    addFromContactsBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: widthScale(8),
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: widthScale(10),
      paddingVertical: heightScale(11),
      marginBottom: heightScale(20),
      backgroundColor: theme.colors.customerInfoBg,
    },
    addFromContactsText: {
      fontSize: widthScale(13),
      color: theme.colors.primary,
    },
    sectionTitle: {
      fontSize: widthScale(12),
      color: theme.colors.textSecondary,
      marginBottom: heightScale(10),
      marginTop: heightScale(4),
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    typeRow: {
      flexDirection: 'row',
      gap: widthScale(10),
      marginBottom: heightScale(20),
    },
    typeCard: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(8),
      paddingVertical: heightScale(14),
      paddingHorizontal: widthScale(12),
      borderRadius: widthScale(12),
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    typeCardActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryLight,
    },
    typeCardIconWrap: {
      width: widthScale(32),
      height: widthScale(32),
      borderRadius: widthScale(9),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.infoSurfaceBg,
    },
    typeCardText: {
      fontSize: widthScale(13),
      color: theme.colors.textSecondary,
    },
    typeCardTextActive: {
      color: theme.colors.primary,
    },
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: heightScale(14),
      paddingHorizontal: widthScale(14),
      borderRadius: widthScale(12),
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      marginBottom: heightScale(10),
    },
    switchLabelWrap: {
      flex: 1,
      marginRight: widthScale(12),
    },
    switchLabel: {
      fontSize: widthScale(14),
      color: theme.colors.text,
    },
    switchHint: {
      fontSize: widthScale(11),
      color: theme.colors.textSecondary,
      marginTop: heightScale(2),
    },
  });
};

export default getStyles;
