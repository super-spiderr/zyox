import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    bentoGrid: {
      paddingHorizontal: widthScale(16),
      marginBottom: heightScale(12),
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'stretch',
      marginBottom: heightScale(12),
    },
    sectionTitle: {
      color: theme.colors.dashboardTitle,
    },
    seeAllText: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
    chipsContainer: {
      flexDirection: 'row',
      gap: widthScale(8),
      marginBottom: heightScale(16),
    },
    filterChip: {
      paddingVertical: widthScale(6),
      paddingHorizontal: widthScale(16),
      borderRadius: widthScale(20),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    },
    activeChip: {
      backgroundColor: palette.yellow500,
      borderColor: palette.yellow500,
    },
    chipText: {
      color: theme.colors.inactiveChipText,
    },
    activeChipText: {
      color: '#1B194B',
    },
    gridContainer: {
      flexDirection: 'column',
      gap: widthScale(12),
    },
    row1: {
      width: '100%',
    },
    revenueTile: {
      backgroundColor: palette.primary600,
      borderRadius: widthScale(16),
      padding: widthScale(14),
      height: widthScale(115),
      justifyContent: 'space-between',
      overflow: 'hidden',
      position: 'relative',
    },
    bgCircleLeft: {
      position: 'absolute',
      right: -widthScale(40),
      top: -widthScale(40),
      width: widthScale(150),
      height: widthScale(150),
      borderRadius: widthScale(75),
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    bgCircleRight: {
      position: 'absolute',
      right: -widthScale(30),
      bottom: -widthScale(50),
      width: widthScale(120),
      height: widthScale(120),
      borderRadius: widthScale(60),
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    tileHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tileTitle: {
      fontSize: widthScale(13),
      color: '#E4D9FB',
    },
    arrowCircle: {
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(14),
      backgroundColor: palette.yellow500,
      justifyContent: 'center',
      alignItems: 'center',
    },
    revenueValue: {
      fontSize: widthScale(28),
      color: '#FFFFFF',
      lineHeight: widthScale(32),
    },
    revenueSub: {
      color: '#E4D9FB',
    },
    row2: {
      flexDirection: 'row',
      gap: widthScale(12),
    },
    squareTile: {
      flex: 1,
      borderRadius: widthScale(16),
      padding: widthScale(12),
      height: widthScale(95),
      justifyContent: 'space-between',
      borderWidth: 0.5,
    },
    pendingTile: {
      backgroundColor: palette.primary100,
      borderColor: palette.primary100,
    },
    pendingTitle: {
      color: palette.primary700,
    },
    pendingValue: {
      fontSize: widthScale(20),
      color: '#1B194B',
      lineHeight: widthScale(24),
    },
    pendingSub: {
      color: palette.primary300,
    },
    nextEventTile: {
      backgroundColor: palette.white,
      borderColor: theme.colors.border,
    },
    nextEventTitle: {
      color: theme.colors.textSecondary,
    },
    nextEventValue: {
      fontSize: widthScale(20),
      color: '#1B194B',
      lineHeight: widthScale(24),
    },
    nextEventSub: {
      color: theme.colors.textSecondary,
    },
  });
};

export default getStyles;
