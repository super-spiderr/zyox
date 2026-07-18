import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: widthScale(20),
      marginTop: heightScale(10),
    },
    chartTitle: {
      color: theme.colors.text,
      marginBottom: heightScale(12),
    },
    chartCard: {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: widthScale(14),
      padding: widthScale(16),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    yAxisLabel: {
      position: 'absolute',
      left: -widthScale(4),
      width: widthScale(32),
      textAlign: 'right',
      color: theme.colors.textMuted,
    },
    emptyContainer: {
      height: 120,
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: widthScale(14),
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      color: theme.colors.textMuted,
    },
  });
};

export default getStyles;
