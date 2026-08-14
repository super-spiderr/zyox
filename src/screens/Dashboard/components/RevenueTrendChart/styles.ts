import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  const isDark = theme.isDark;

  return StyleSheet.create({
    container: {
      paddingHorizontal: widthScale(16),
      marginTop: heightScale(4),
      marginBottom: heightScale(10),
    },
    chartTitle: {
      color: theme.colors.dashboardTitle,
      marginBottom: heightScale(12),
    },
    chartCard: {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
      borderWidth: 0.5,
      borderRadius: widthScale(16),
      padding: widthScale(16),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.15 : 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
    yAxisLabel: {
      position: 'absolute',
      left: widthScale(8),
      width: widthScale(32),
      textAlign: 'right',
      color: theme.colors.textMuted,
    },
    emptyContainer: {
      height: 120,
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
      borderWidth: 0.5,
      borderRadius: widthScale(16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      color: theme.colors.textMuted,
    },
    xAxisRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingLeft: 40,
      paddingRight: 16,
      marginTop: heightScale(4),
    },
  });
};

export default getStyles;
