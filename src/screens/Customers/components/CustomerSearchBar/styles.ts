import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(22),
      paddingHorizontal: widthScale(16),
      height: heightScale(44),
      marginHorizontal: widthScale(16),
      marginBottom: heightScale(14),
    },
    searchIcon: {
      marginRight: widthScale(8),
    },
    searchInput: {
      flex: 1,
      fontSize: widthScale(14),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.text,
      paddingVertical: 0,
    },
    clearButton: {
      padding: widthScale(4),
    },
  });
};

export default getStyles;
