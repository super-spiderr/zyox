import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    cardWrapper: {
      marginBottom: heightScale(10),
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightScale(12),
      borderRadius: widthScale(14),
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
    },
    avatarWrap: {
      position: 'relative',
      marginRight: widthScale(12),
    },
    avatarContainer: {
      width: widthScale(44),
      height: widthScale(44),
      borderRadius: widthScale(22),
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarContainer_individual: {
      backgroundColor: theme.colors.skySurfaceBg,
    },
    avatarContainer_business: {
      backgroundColor: theme.colors.warningSurfaceBg,
    },
    avatarText: {
      fontSize: widthScale(15),
    },
    avatarText_individual: {
      color: theme.colors.skyText,
    },
    avatarText_business: {
      color: theme.colors.warningText,
    },
    statusDot: {
      position: 'absolute',
      bottom: -1,
      right: -1,
      width: widthScale(13),
      height: widthScale(13),
      borderRadius: widthScale(7),
      borderWidth: 2,
      borderColor: theme.colors.card,
    },
    statusDot_active: {
      backgroundColor: palette.secondary500,
    },
    statusDot_inactive: {
      backgroundColor: theme.colors.textMuted,
    },
    customerInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    nameText: {
      fontSize: widthScale(15),
      color: theme.colors.text,
      flexShrink: 1,
    },
    phoneRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: heightScale(4),
    },
    phoneIcon: {
      marginRight: widthScale(5),
    },
    detailText: {
      fontSize: widthScale(12),
      color: theme.colors.textSecondary,
    },
    trailing: {
      alignItems: 'flex-end',
      marginLeft: widthScale(8),
    },
    badge: {
      paddingHorizontal: widthScale(8),
      paddingVertical: heightScale(2),
      borderRadius: widthScale(12),
      borderWidth: 1,
      marginBottom: heightScale(6),
    },
    badgeText: {
      fontSize: widthScale(9),
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    },
    badge_individual: {
      backgroundColor: theme.colors.skySurfaceBg,
      borderColor: theme.colors.skyBorder,
    },
    badge_business: {
      backgroundColor: theme.colors.warningSurfaceBg,
      borderColor: theme.colors.businessBadgeBorder,
    },
    badgeText_individual: {
      color: theme.colors.skyText,
    },
    badgeText_business: {
      color: theme.colors.warningText,
    },
  });
};

export default getStyles;
