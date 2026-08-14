import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  const isDark = theme.isDark;

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
    listContainer: {
      paddingHorizontal: widthScale(16),
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(20),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      marginHorizontal: widthScale(16),
      paddingVertical: widthScale(6),
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.15 : 0.04,
      shadowRadius: 6,
      elevation: 2,
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
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarMonth: {
      color: theme.colors.primaryText,
      fontSize: widthScale(8),
    },
    calendarBody: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
    },
    calendarDay: {
      color: theme.colors.dashboardTitle,
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
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.15 : 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
    emptyText: {
      color: theme.colors.textSecondary,
    },
  });
};

export default getStyles;
