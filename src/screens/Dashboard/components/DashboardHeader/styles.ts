import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme, insets: { top: number }) => {
  return StyleSheet.create({
    headerContainer: {
      flexDirection: 'column',
      paddingHorizontal: widthScale(16),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingTop: insets.top + widthScale(10),
    },
    greetingContainer: {
      flexDirection: 'column',
    },
    greetingText: {
      color: theme.colors.dashboardTitle,
    },
    userNameText: {
      color: theme.colors.dashboardTitle,
      lineHeight: widthScale(28),
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(16),
    },
    bellButton: {
      position: 'relative',
      padding: widthScale(4),
    },
    redBadge: {
      position: 'absolute',
      top: widthScale(2),
      right: widthScale(2),
      width: widthScale(8),
      height: widthScale(8),
      borderRadius: widthScale(4),
      backgroundColor: palette.error500,
    },
    avatarCircle: {
      height: widthScale(40),
      width: widthScale(40),
      backgroundColor: palette.primary100,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: widthScale(20),
    },
    avatarText: {
      color: palette.primary700,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: widthScale(12),
      marginTop: heightScale(16),
      marginBottom: heightScale(10),
      width: '100%',
    },
    actionButton: {
      flex: 1,
      height: widthScale(46),
      borderRadius: widthScale(23),
      backgroundColor: palette.primary600,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: widthScale(8),
    },
    customerButton: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    buttonText: {
      color: '#FFFFFF',
    },
    customerButtonText: {
      color: theme.colors.dashboardTitle,
    },
  });
};

export default getStyles;
