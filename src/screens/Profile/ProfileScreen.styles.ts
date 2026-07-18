import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (_theme: Theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: _theme.spacing.lg,
      backgroundColor: _theme.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: _theme.spacing.lg,
      marginTop: heightScale(40),
    },
    errorTitle: {
      marginBottom: heightScale(8),
    },
    errorText: {
      textAlign: 'center',
      marginBottom: heightScale(20),
    },
    errorButton: {
      width: '60%',
    },
    header: {
      alignItems: 'center',
      marginTop: heightScale(20),
      marginBottom: heightScale(24),
    },
    avatarContainer: {
      width: widthScale(72),
      height: widthScale(72),
      borderRadius: widthScale(36),
      backgroundColor: _theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: heightScale(14),
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    avatarText: {
      fontSize: 26,
    },
    name: {
      marginBottom: heightScale(4),
    },
    email: {
      marginBottom: heightScale(12),
    },
    badgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    roleBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: _theme.colors.primary + '15',
      borderWidth: 1,
      borderColor: _theme.colors.primary + '30',
    },
    roleText: {
      fontSize: 11,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: `${palette.emerald500}15`,
      borderWidth: 1,
      borderColor: `${palette.emerald500}30`,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: palette.emerald500,
      marginRight: 6,
    },
    statusText: {
      fontSize: 11,
      color: palette.emerald500,
    },
    card: {
      backgroundColor: _theme.colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: _theme.colors.surfaceBorder,
      paddingHorizontal: _theme.spacing.lg,
      paddingVertical: _theme.spacing.sm,
      marginBottom: heightScale(24),
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: heightScale(14),
      borderBottomWidth: 1,
      borderBottomColor: _theme.colors.surfaceBorder,
    },
    lastInfoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: heightScale(14),
    },
    infoLabel: {
      fontSize: 14,
    },
    infoValue: {
      flex: 1,
      textAlign: 'right',
      paddingLeft: 16,
      fontSize: 14,
    },
    signOutButton: {
      marginBottom: heightScale(20),
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: heightScale(12),
      marginBottom: heightScale(10),
    },
    backButton: {
      padding: 6,
      borderRadius: 12,
      backgroundColor: _theme.colors.card,
      borderWidth: 1,
      borderColor: _theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default getStyles;
