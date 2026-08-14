import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: widthScale(24),
      borderTopRightRadius: widthScale(24),
      padding: widthScale(20),
      paddingBottom: heightScale(10),
      height: heightScale(560),
    },
    grabber: {
      alignSelf: 'center',
      width: widthScale(40),
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.border,
      marginBottom: heightScale(14),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: heightScale(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      marginBottom: heightScale(12),
    },
    closeButton: {
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(14),
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(8),
      backgroundColor: theme.colors.inputBg,
      borderRadius: widthScale(12),
      paddingHorizontal: widthScale(14),
      height: heightScale(44),
      marginBottom: heightScale(12),
    },
    searchInput: {
      flex: 1,
      color: theme.colors.text,
      fontSize: widthScale(14),
      padding: 0,
    },
    list: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightScale(10),
      paddingHorizontal: widthScale(8),
      borderRadius: widthScale(12),
      marginBottom: heightScale(4),
    },
    rowSelected: {
      backgroundColor: theme.colors.primaryLight,
    },
    avatar: {
      width: widthScale(40),
      height: widthScale(40),
      borderRadius: widthScale(20),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: widthScale(12),
    },
    rowInfo: {
      flex: 1,
      justifyContent: 'center',
      gap: heightScale(2),
    },
    checkBadge: {
      width: widthScale(22),
      height: widthScale(22),
      borderRadius: widthScale(11),
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: widthScale(8),
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: heightScale(60),
    },
    emptyText: {
      marginTop: heightScale(10),
    },
  });
};

export default getStyles;
