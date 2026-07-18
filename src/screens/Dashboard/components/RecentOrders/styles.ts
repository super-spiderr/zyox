import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: widthScale(20),
      marginTop: heightScale(10),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightScale(12),
    },
    sectionTitle: {
      color: theme.colors.text,
    },
    viewAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(4),
    },
    viewAllText: {
      color: theme.colors.primary,
    },
    listContainer: {
      gap: heightScale(14),
    },
    emptyContainer: {
      height: 100,
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
