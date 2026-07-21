import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { heightScale, widthScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    screen: {
      backgroundColor: theme.colors.surface,
    },
    container: {
      paddingTop: 0,
      paddingBottom: heightScale(20),
      gap: widthScale(12),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default getStyles;
