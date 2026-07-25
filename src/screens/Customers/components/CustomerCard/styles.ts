import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    cardWrapper: {
      marginBottom: 0,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightScale(14),
      paddingHorizontal: 0,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    avatarWrap: {
      marginRight: widthScale(12),
    },
    avatarContainer: {
      width: widthScale(42),
      height: widthScale(42),
      borderRadius: widthScale(21),
      justifyContent: 'center',
      alignItems: 'center',
    },
    customerInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    phoneText: {
      marginTop: heightScale(2),
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(2),
    },
    actionBtn: {
      width: widthScale(36),
      height: widthScale(36),
      borderRadius: widthScale(18),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default getStyles;
