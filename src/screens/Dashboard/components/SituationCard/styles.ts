import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  const isDark = theme.isDark;

  return StyleSheet.create({
    card: {
      position: 'relative',
      borderRadius: widthScale(16),
      overflow: 'hidden',
      paddingVertical: heightScale(16),
      paddingHorizontal: widthScale(16),
      marginVertical: heightScale(12),
      borderWidth: 0.5,
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.2 : 0.05,
      shadowRadius: 6,
    },
    leftBorder: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: widthScale(6),
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconWrapper: {
      marginRight: widthScale(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    titleText: {
      fontSize: widthScale(14),
      lineHeight: widthScale(18),
    },
    actionWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: widthScale(8),
    },

    // Amber Variant (Drafts aging)
    cardAmber: {
      backgroundColor: isDark ? 'rgba(217, 119, 6, 0.15)' : 'rgba(251, 191, 36, 0.12)',
      borderColor: isDark ? 'rgba(217, 119, 6, 0.4)' : 'rgba(251, 191, 36, 0.4)',
    },
    textAmber: {
      color: theme.colors.warningText,
    },

    // Green Variant (Morning slot full)
    cardGreen: {
      backgroundColor: isDark ? 'rgba(22, 163, 74, 0.15)' : 'rgba(52, 211, 153, 0.12)',
      borderColor: isDark ? 'rgba(22, 163, 74, 0.4)' : 'rgba(52, 211, 153, 0.4)',
    },
    textGreen: {
      color: theme.colors.successText,
    },

    // Cobalt Blue Variant (No orders / default)
    cardCobalt: {
      backgroundColor: isDark ? 'rgba(37, 99, 235, 0.15)' : 'rgba(191, 219, 254, 0.15)',
      borderColor: isDark ? 'rgba(37, 99, 235, 0.4)' : 'rgba(191, 219, 254, 0.5)',
    },
    textCobalt: {
      color: theme.colors.infoText,
    },
  });
};

export default getStyles;
