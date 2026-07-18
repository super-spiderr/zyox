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
    section: {
      marginBottom: heightScale(24),
    },
    sectionHeader: {
      fontSize: 13,
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: heightScale(10),
      paddingLeft: widthScale(4),
    },
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(16),
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
      elevation: 2,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: heightScale(16),
      paddingHorizontal: widthScale(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    lastRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: heightScale(16),
      paddingHorizontal: widthScale(16),
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(12),
    },
    iconWrapper: {
      width: widthScale(36),
      height: widthScale(36),
      borderRadius: widthScale(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowLabelContainer: {
      flexDirection: 'column',
    },
    rowLabel: {
      fontSize: 15,
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
    },
    rowSublabel: {
      fontSize: 12,
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textSecondary,
      marginTop: heightScale(2),
    },
    rowRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(8),
    },
    rowValue: {
      fontSize: 14,
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.textSecondary,
    },
    signOutButton: {
      marginTop: 'auto',
      marginBottom: heightScale(20),
    },
  });

export default getStyles;
