import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale } from '@/utils/scaling';

export const getStyles = (theme: Theme, insets: { top: number }) => {
  return StyleSheet.create({
    headerContainer: {
      flexDirection: 'column',
      paddingHorizontal: widthScale(16),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: insets.top + widthScale(20),
    },
    headerLeftRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(12),
    },
    avatarCircle: {
      width: widthScale(42),
      height: widthScale(42),
      borderRadius: widthScale(12),
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      color: theme.colors.primaryText,
    },
    headerLeft: {
      justifyContent: 'center',
    },
    greetingText: {
      color: theme.colors.textSecondary,
    },
    userNameText: {
      color: theme.colors.text,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(8),
    },
    iconButton: {
      justifyContent: 'center',
      alignItems: 'center',
      height: widthScale(46),
      width: widthScale(46),
      borderRadius: widthScale(14),
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      position: 'relative',
    },
    badgeDot: {
      position: 'absolute',
      top: widthScale(12),
      right: widthScale(12),
      width: widthScale(8),
      height: widthScale(8),
      borderRadius: widthScale(4),
      backgroundColor: palette.error500,
      borderWidth: 1.5,
      borderColor: theme.colors.card,
    },
  });
};

export default getStyles;
