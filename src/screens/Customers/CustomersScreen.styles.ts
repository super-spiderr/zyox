import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    listWrapper: {
      flex: 1,
      flexDirection: 'row',
    },
    flatList: {
      flex: 1,
    },
    list: {
      flexGrow: 1,
      paddingBottom: heightScale(80),
      paddingLeft: widthScale(16),
      paddingRight: widthScale(16),
    },

    cardWrapper: {
      marginBottom: heightScale(8),
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightScale(12),
      paddingHorizontal: widthScale(14),
      borderRadius: widthScale(14),
      backgroundColor: theme.colors.card,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 2,
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
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: heightScale(40),
      paddingHorizontal: widthScale(20),
    },
    emptyIllustration: {
      width: widthScale(140),
      height: widthScale(140),
      marginBottom: heightScale(4),
      resizeMode: 'contain',
    },
    emptyText: {
      fontSize: widthScale(14),
      color: theme.colors.textSecondary,
      marginTop: heightScale(8),
      textAlign: 'center',
      lineHeight: heightScale(20),
    },
    emptyStateButton: {
      marginTop: heightScale(20),
      minWidth: widthScale(160),
    },
  });
};

export default getStyles;
