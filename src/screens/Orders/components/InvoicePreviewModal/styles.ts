import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      backgroundColor: theme.colors.card,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: widthScale(16),
      paddingVertical: heightScale(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    },
    headerButton: {
      width: widthScale(36),
      height: widthScale(36),
      borderRadius: widthScale(18),
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pdfWrapper: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    pdf: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    centerFillAbsolute: {
      ...StyleSheet.absoluteFill,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    loadingText: {
      marginTop: heightScale(10),
    },
  });
};

export default getStyles;
