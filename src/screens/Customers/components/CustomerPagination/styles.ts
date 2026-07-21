import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      paddingVertical: heightScale(16),
      paddingHorizontal: widthScale(8),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: heightScale(8),
    },
    summaryText: {
      fontSize: widthScale(12),
      color: theme.colors.textSecondary,
      marginBottom: heightScale(10),
    },
    controlsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: widthScale(12),
    },
    navButton: {
      width: widthScale(36),
      height: widthScale(36),
      borderRadius: widthScale(18),
      backgroundColor: theme.colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border || 'rgba(0,0,0,0.08)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1,
    },
    disabledNavButton: {
      opacity: 0.4,
      borderColor: 'transparent',
      shadowOpacity: 0,
      elevation: 0,
    },
    pageBadge: {
      paddingHorizontal: widthScale(14),
      paddingVertical: heightScale(6),
      borderRadius: widthScale(16),
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border || 'rgba(0,0,0,0.08)',
    },
    pageBadgeText: {
      fontSize: widthScale(13),
      color: theme.colors.text,
    },
  });
};

export default getStyles;
