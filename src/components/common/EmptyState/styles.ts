import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: heightScale(40),
      paddingHorizontal: widthScale(20),
    },
    illustration: {
      width: widthScale(140),
      height: widthScale(140),
      marginBottom: heightScale(4),
      resizeMode: 'contain',
    },
    title: {
      color: theme.colors.text,
      textAlign: 'center',
    },
    description: {
      fontSize: widthScale(14),
      color: theme.colors.textSecondary,
      marginTop: heightScale(8),
      textAlign: 'center',
      lineHeight: heightScale(20),
    },
    actionButton: {
      marginTop: heightScale(20),
      minWidth: widthScale(160),
    },
  });
};

export default getStyles;
