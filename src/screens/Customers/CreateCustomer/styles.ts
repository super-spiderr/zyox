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
    sectionTitle: {
      color: theme.colors.text,
      marginBottom: heightScale(10),
      marginTop: heightScale(4),
    },
    typeRow: {
      flexDirection: 'row',
      gap: widthScale(10),
      marginBottom: heightScale(20),
    },
  });
};

export default getStyles;
