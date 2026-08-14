import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingBottom: heightScale(24),
      backgroundColor: theme.colors.background,
    },
    body: {
      // paddingHorizontal: widthScale(1),
    },
    listContainer: {
      //paddingHorizontal: widthScale(4),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: heightScale(14),
      paddingHorizontal: widthScale(12),
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: widthScale(12),
    },
    iconWrapper: {
      width: widthScale(40),
      height: widthScale(40),
      borderRadius: widthScale(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowLabelContainer: {
      flex: 1,
    },
    rowLabel: {
      fontSize: widthScale(15),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
    },
    rowSublabel: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textSecondary,
      marginTop: heightScale(2),
    },
    rowRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(8),
    },
  });
};

export default getStyles;
