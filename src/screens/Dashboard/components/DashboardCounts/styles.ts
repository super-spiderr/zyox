import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      marginTop: widthScale(16),
      paddingHorizontal: widthScale(20),
      gap: heightScale(12),
      zIndex: 10,
    },
    revenueCard: {
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(16),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      padding: widthScale(16),
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: widthScale(12),
    },
    smallCard: {
      flex: 1,
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(16),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      padding: widthScale(16),
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
      overflow: 'hidden',
    },
    iconWrapper: {
      width: widthScale(40),
      height: widthScale(40),
      borderRadius: widthScale(20),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: heightScale(12),
    },
    revenueIconWrapper: {
      width: widthScale(44),
      height: widthScale(44),
      borderRadius: widthScale(22),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: widthScale(16),
      backgroundColor: palette.successPastelBg,
    },
    revenueContent: {
      flex: 1,
    },
    cardLabel: {
      fontSize: widthScale(11),
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.fonts.urbanist.medium,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    cardValue: {
      fontSize: widthScale(22),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
      marginTop: heightScale(2),
    },
    ordersIconBg: {
      backgroundColor: palette.infoPastelBg,
    },
    customersIconBg: {
      backgroundColor: palette.warningPastelBg,
    },
    cardWatermark: {
      position: 'absolute',
      right: widthScale(-15),
      bottom: heightScale(-15),
      opacity: 0.07,
      zIndex: 0,
    },
  });
};

export default getStyles;
