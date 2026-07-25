import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    endLoader: { paddingVertical: 20, alignItems: 'center' },
    list: {
      paddingBottom: heightScale(120),
      paddingLeft: widthScale(16),
      paddingRight: widthScale(16),
    },
    cardWrapper: {
      marginBottom: 0,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightScale(12),
      paddingHorizontal: 0,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    skeletonRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    skeletonAvatar: {
      marginRight: widthScale(12),
    },
    skeletonInfo: {
      flex: 1,
    },
    skeletonName: {
      marginBottom: heightScale(6),
    },
  });
};

export default getStyles;
