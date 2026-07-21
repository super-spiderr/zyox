import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      marginTop: heightScale(4),
      marginBottom: heightScale(18),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: widthScale(16),
      marginBottom: heightScale(12),
    },
    sectionTitle: {
      color: theme.colors.dashboardTitle,
    },
    countBadge: {
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(14),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
    },
    countText: {
      color: theme.colors.textSecondary,
    },
    followUpCard: {
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(20),
      padding: widthScale(16),
      marginHorizontal: widthScale(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
      marginBottom: heightScale(16),
    },
    cardContentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(12),
      flex: 1,
    },
    avatarStack: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stackCircle: {
      width: widthScale(32),
      height: widthScale(32),
      borderRadius: widthScale(16),
      borderWidth: 1.5,
      borderColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoColumn: {
      flex: 1,
    },
    followUpTitle: {
      color: theme.colors.dashboardTitle,
      lineHeight: widthScale(20),
    },
    followUpSub: {
      color: theme.colors.textSecondary,
      marginTop: heightScale(2),
    },
    plusCircle: {
      width: widthScale(36),
      height: widthScale(36),
      borderRadius: widthScale(18),
      backgroundColor: palette.yellow500,
      justifyContent: 'center',
      alignItems: 'center',
    },
    plusText: {
      color: '#1B194B',
      lineHeight: widthScale(24),
    },
    recentOrdersSubTitle: {
      color: theme.colors.dashboardTitle,
      paddingHorizontal: widthScale(16),
      marginTop: heightScale(18),
      marginBottom: heightScale(10),
    },
    listContainer: {
      paddingHorizontal: widthScale(16),
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(20),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      marginHorizontal: widthScale(16),
      paddingVertical: widthScale(6),
    },
    compactItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: widthScale(12),
    },
    borderBottom: {
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    compactLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    calendarBox: {
      width: widthScale(40),
      height: widthScale(42),
      borderRadius: widthScale(8),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      backgroundColor: theme.colors.card,
    },
    calendarHeader: {
      height: widthScale(14),
      backgroundColor: palette.primary600,
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarMonth: {
      color: '#FFFFFF',
      fontSize: widthScale(8),
    },
    calendarBody: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: palette.white,
    },
    calendarDay: {
      color: '#1B194B',
      fontSize: widthScale(14),
    },
    infoCol: {
      marginLeft: widthScale(12),
      flex: 1,
      paddingRight: widthScale(8),
    },
    eventTitle: {
      color: theme.colors.dashboardTitle,
      lineHeight: widthScale(18),
    },
    eventSub: {
      color: theme.colors.textSecondary,
    },
    eventSubRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: heightScale(2),
    },
    guestIcon: {
      marginHorizontal: widthScale(3),
    },
    compactRight: {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    statusBadge: {
      paddingVertical: widthScale(2),
      paddingHorizontal: widthScale(6),
      borderRadius: widthScale(6),
    },
    statusBadgeText: {
      fontSize: widthScale(9),
    },
    priceText: {
      color: theme.colors.dashboardTitle,
      marginTop: heightScale(4),
    },
    emptyContainer: {
      paddingHorizontal: widthScale(16),
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(20),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      marginHorizontal: widthScale(16),
      paddingVertical: heightScale(32),
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      color: theme.colors.textSecondary,
    },
  });
};

export default getStyles;
