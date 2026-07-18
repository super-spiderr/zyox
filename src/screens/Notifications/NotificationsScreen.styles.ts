import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
    },
    header: {
      marginTop: heightScale(20),
      marginBottom: heightScale(24),
    },
    title: {
      fontSize: 28,
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
      marginBottom: heightScale(4),
    },
    subtitle: {
      fontSize: 14,
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textSecondary,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: heightScale(60),
    },
    emptyText: {
      fontSize: 16,
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: heightScale(16),
      paddingHorizontal: widthScale(20),
    },
    list: {
      gap: heightScale(16),
    },
    notificationCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(16),
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      gap: widthScale(12),
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    iconContainer: {
      width: widthScale(40),
      height: widthScale(40),
      borderRadius: widthScale(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 15,
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
      marginBottom: heightScale(4),
    },
    cardDescription: {
      fontSize: 13,
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: heightScale(12),
    },
    actionText: {
      fontSize: 12,
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.primary,
    },
  });

export default getStyles;
