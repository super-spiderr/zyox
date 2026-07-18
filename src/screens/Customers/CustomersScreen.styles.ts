import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    list: {
      flexGrow: 1,
      paddingBottom: heightScale(80),
      marginHorizontal: widthScale(16),
    },
    cardWrapper: {
      marginBottom: heightScale(10),
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightScale(12),
      paddingHorizontal: widthScale(14),
      borderRadius: widthScale(14),
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
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
