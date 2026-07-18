import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  const textColor = theme.colors.primaryText;

  const alphaColor = (opacity: number) => {
    return textColor === palette.white
      ? `rgba(255, 255, 255, ${opacity})`
      : `rgba(0, 0, 0, ${opacity})`;
  };

  return StyleSheet.create({
    gradientCard: {
      marginHorizontal: widthScale(16),
      borderRadius: widthScale(14),
      paddingHorizontal: widthScale(16),
      paddingTop: widthScale(14),
      position: 'relative',
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginTop: widthScale(6),
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightScale(12),
    },
    hotelHeader: {
      marginBottom: heightScale(10),
    },
    hotelName: {
      color: textColor,
    },
    hotelSubtitle: {
      color: alphaColor(0.7),
      letterSpacing: 1,
      marginTop: heightScale(2),
    },
    cardTitle: {
      color: alphaColor(0.8),
    },
    cardValue: {
      color: textColor,
    },
    divider: {
      height: 1,
      backgroundColor: alphaColor(0.15),
      width: '100%',
      marginTop: heightScale(20),
      marginBottom: heightScale(10),
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: widthScale(10),
    },
    cardCol: {
      flex: 1,
      alignItems: 'center',
    },
    colTitle: {
      color: alphaColor(0.65),
    },
    colValue: {
      color: textColor,
    },
    verticalDivider: {
      width: 1,
      height: heightScale(24),
      backgroundColor: alphaColor(0.15),
      marginRight: widthScale(12),
    },
    footerRow: {
      alignItems: 'center',
      marginTop: heightScale(10),
      marginBottom: heightScale(6),
    },
    footerText: {
      color: alphaColor(0.55),
    },
    moneyIcon: {
      position: 'absolute',
      right: widthScale(0),
      bottom: widthScale(45),
      width: widthScale(84),
      height: widthScale(114),
      resizeMode: 'cover',
    },
  });
};

export default getStyles;
