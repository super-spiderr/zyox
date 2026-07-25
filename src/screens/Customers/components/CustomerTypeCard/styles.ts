import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    typeCard: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(8),
      paddingVertical: heightScale(4),
      paddingHorizontal: widthScale(8),
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
  });
};

export default getStyles;
