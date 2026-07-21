import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    cardWrapper: {
      marginBottom: heightScale(8),
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightScale(14),
      paddingHorizontal: widthScale(16),
      backgroundColor: theme.colors.card,
      borderRadius: widthScale(16),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 2,
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
    avatarText: {
      fontSize: widthScale(15),
    },
    customerInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    nameText: {
      fontSize: widthScale(15),
      color: theme.colors.text,
    },
    phoneText: {
      fontSize: widthScale(12),
      color: theme.colors.textSecondary,
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
    callBtn: {
      backgroundColor: '#EAE8FF',
    },
    waBtn: {
      backgroundColor: '#E6F4EA',
    },
  });
};

export default getStyles;
