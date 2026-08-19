import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  const isDark = theme.isDark;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    body: {
      flex: 1,
      paddingHorizontal: widthScale(16),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBg,
      borderRadius: widthScale(12),
      paddingHorizontal: widthScale(14),
      marginBottom: heightScale(12),
      height: heightScale(44),
    },
    searchIcon: {
      marginRight: widthScale(8),
    },
    searchInput: {
      flex: 1,
      color: theme.colors.text,
      fontFamily: theme.typography.fonts.urbanist.regular,
      fontSize: widthScale(13),
      padding: 0,
    },
    clearButton: {
      padding: widthScale(4),
    },
    filtersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: heightScale(14),
      gap: widthScale(8),
    },
    filterDropdown: {
      flex: 1,
      backgroundColor: theme.colors.inputBg,
      borderRadius: widthScale(8),
      paddingHorizontal: widthScale(8),
      height: heightScale(32),
      justifyContent: 'center',
    },
    filterDropdownActive: {
      backgroundColor: theme.colors.primaryLight,
    },
    filterDropdownItem: {
      marginRight: widthScale(8),
      paddingHorizontal: widthScale(12),
      height: heightScale(28),
    },
    filterText: {
      fontSize: widthScale(11),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.textSecondary,
    },
    filterTextActive: {
      color: theme.colors.primary,
      fontFamily: theme.typography.fonts.urbanist.bold,
    },
    list: {
      paddingBottom: heightScale(40),
      gap: heightScale(14),
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: heightScale(60),
    },
    emptyStateText: {
      fontSize: widthScale(14),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textSecondary,
      marginTop: heightScale(10),
    },
    card: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(16),
      padding: widthScale(16),
      marginBottom: heightScale(12),
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.15 : 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
    skeletonCard: {
      padding: widthScale(16),
      gap: heightScale(10),
    },
    skeletonHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    skeletonMetaRow: {
      flexDirection: 'row',
      gap: widthScale(16),
      marginTop: heightScale(4),
    },
    skeletonMetaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(4),
    },
  });
};

export default getStyles;
