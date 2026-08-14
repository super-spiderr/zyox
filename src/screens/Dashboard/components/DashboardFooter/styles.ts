import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    footerContainer: {
      justifyContent: 'center',
      height: heightScale(75),
    },
    footerContent: {
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      marginTop: widthScale(25),
    },
    footerLogo: {
      width: widthScale(18),
      height: widthScale(20),
      marginBottom: heightScale(4),
      opacity: 0.6,
    },
    footerPoweredText: {
      fontSize: widthScale(11),
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.fonts.urbanist.medium,
    },
  });
};

export default getStyles;
