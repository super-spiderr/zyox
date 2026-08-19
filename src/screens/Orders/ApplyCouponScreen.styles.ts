import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: heightScale(10),
      backgroundColor: theme.colors.background,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: widthScale(16),
      marginBottom: heightScale(16),
    },
    backButton: {
      padding: widthScale(6),
      marginRight: widthScale(10),
    },
    headerTitle: {
      fontSize: widthScale(18),
      color: theme.colors.text,
    },
    inputSection: {
      paddingHorizontal: widthScale(16),
      paddingBottom: heightScale(18),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    sectionLabel: {
      fontSize: widthScale(13),
      color: theme.colors.textSecondary,
      marginBottom: heightScale(8),
    },
    promoRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
      height: heightScale(46),
      borderWidth: 1,
      borderRadius: widthScale(8),
      paddingHorizontal: widthScale(14),
      fontSize: widthScale(14),
      marginRight: widthScale(10),
      borderColor: theme.colors.border,
      color: theme.colors.text,
      backgroundColor: theme.colors.cardAltBg,
    },
    applyBtn: {
      height: heightScale(46),
      paddingHorizontal: widthScale(18),
      borderRadius: widthScale(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    applyBtnActive: {
      backgroundColor: theme.colors.primary,
    },
    applyBtnDisabled: {
      backgroundColor: theme.colors.border,
    },
    applyBtnText: {
      color: theme.colors.primaryText,
      fontSize: widthScale(13),
    },
    listContainer: {
      paddingHorizontal: widthScale(16),
      paddingTop: heightScale(18),
      paddingBottom: heightScale(40),
    },
    couponHeading: {
      fontSize: widthScale(15),
      marginBottom: heightScale(14),
      color: theme.colors.text,
    },
    couponCard: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderRadius: widthScale(12),
      padding: widthScale(16),
      marginBottom: heightScale(16),
      borderStyle: 'dashed',
    },
    couponCardApplied: {
      borderColor: theme.colors.paidText,
    },
    couponCardEligible: {
      borderColor: theme.colors.border,
      opacity: 1,
    },
    couponCardInactive: {
      borderColor: theme.colors.border,
      opacity: 0.6,
    },
    couponTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightScale(10),
    },
    badgeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: widthScale(10),
      paddingVertical: heightScale(6),
      borderRadius: widthScale(6),
      borderWidth: 1,
      gap: widthScale(6),
    },
    badgeContainerApplied: {
      backgroundColor: theme.colors.paidBg,
      borderColor: theme.colors.paidText,
    },
    badgeContainerEligible: {
      backgroundColor: theme.colors.couponEligibleBg,
      borderColor: theme.colors.border,
    },
    badgeContainerInactive: {
      backgroundColor: theme.colors.couponInactiveBg,
      borderColor: theme.colors.border,
    },
    badgeText: {
      fontSize: widthScale(14),
    },
    badgeTextApplied: {
      color: theme.colors.paidText,
    },
    badgeTextEligible: {
      color: theme.colors.primary,
    },
    cardApplyBtn: {
      paddingVertical: heightScale(4),
      paddingHorizontal: widthScale(12),
      borderWidth: 1,
      borderRadius: widthScale(6),
    },
    cardApplyBtnEligible: {
      borderColor: theme.colors.paidText,
    },
    cardApplyBtnInactive: {
      borderColor: theme.colors.border,
    },
    cardApplyBtnTextEligible: {
      color: theme.colors.paidText,
    },
    cardApplyBtnTextInactive: {
      color: theme.colors.textMuted,
    },
    appliedRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(4),
    },
    appliedText: {
      color: theme.colors.paidText,
      fontSize: widthScale(14),
    },
    couponDesc: {
      fontSize: widthScale(12),
      color: theme.colors.textSecondary,
      lineHeight: heightScale(18),
    },
    minSpendWarning: {
      marginTop: heightScale(10),
      paddingTop: heightScale(8),
      borderTopWidth: 0.5,
      borderTopColor: theme.colors.border,
    },
    warningText: {
      color: theme.colors.error,
    },
  });
};

export default getStyles;
