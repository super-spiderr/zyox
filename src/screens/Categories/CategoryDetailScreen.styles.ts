import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingBottom: heightScale(24),
      backgroundColor: theme.colors.background,
    },
    body: {
      paddingHorizontal: widthScale(16),
    },
    loadingContainer: {
      paddingVertical: heightScale(60),
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: heightScale(10),
    },
    sectionSpacing: {
      marginTop: heightScale(20),
    },
    sectionTitle: {
      fontSize: widthScale(15),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
    },
    countBadge: {
      minWidth: widthScale(26),
      height: widthScale(26),
      borderRadius: widthScale(13),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: widthScale(6),
      backgroundColor: theme.colors.surface,
    },
    countText: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.textSecondary,
    },
    itemCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(14),
      padding: widthScale(10),
      marginBottom: heightScale(10),
    },
    itemImage: {
      width: widthScale(46),
      height: widthScale(46),
      borderRadius: widthScale(10),
      backgroundColor: theme.colors.imagePlaceholderBg,
    },
    itemPlaceholder: {
      width: widthScale(46),
      height: widthScale(46),
      borderRadius: widthScale(10),
      backgroundColor: theme.colors.purpleBg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemInfo: {
      flex: 1,
      marginLeft: widthScale(12),
    },
    itemName: {
      fontSize: widthScale(14),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
    },
    itemMeta: {
      fontSize: widthScale(11),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textSecondary,
      marginTop: heightScale(2),
    },
  });
};

export default getStyles;
