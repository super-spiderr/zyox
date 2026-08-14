import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  const isDark = theme.isDark;

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
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    chipText: {
      color: theme.colors.inactiveChipText,
    },
    activeChipText: {
      color: theme.colors.primaryText,
    },
    gridContainer: {
      flexDirection: 'column',
      gap: widthScale(12),
    },
    revenueTile: {
      borderRadius: widthScale(16),
      overflow: 'hidden',
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.3 : 0.15,
      shadowRadius: 10,
      elevation: 4,
    },
    revenueTileGradient: {
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
      color: 'rgba(255, 255, 255, 0.85)',
    },
    arrowCircleOnDark: {
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(14),
      backgroundColor: 'rgba(255, 255, 255, 0.18)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrowCircleOnLight: {
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(14),
      backgroundColor: theme.colors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    revenueValue: {
      fontSize: widthScale(28),
      color: palette.white,
      lineHeight: widthScale(32),
    },
    revenueSub: {
      color: 'rgba(255, 255, 255, 0.85)',
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
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.2 : 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    pendingTile: {
      backgroundColor: theme.colors.primaryLight,
      borderColor: theme.colors.primaryLight,
    },
    pendingTitle: {
      color: theme.colors.primary,
    },
    pendingValue: {
      fontSize: widthScale(20),
      color: theme.colors.dashboardTitle,
      lineHeight: widthScale(24),
    },
    pendingSub: {
      color: theme.colors.primary,
    },
    nextEventTile: {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
    },
    nextEventTitle: {
      color: theme.colors.textSecondary,
    },
    nextEventValue: {
      fontSize: widthScale(20),
      color: theme.colors.dashboardTitle,
      lineHeight: widthScale(24),
    },
    nextEventSub: {
      color: theme.colors.textSecondary,
    },
  });
};

export default getStyles;
