import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      marginTop: heightScale(2),
    },
    title: {
      paddingHorizontal: widthScale(20),
      color: theme.colors.text,
    },
    sliderScrollView: {
      marginLeft: widthScale(20),
      paddingRight: 0,
      flexGrow: 0,
    },
    sliderContentContainer: {
      paddingTop: heightScale(10),
      gap: widthScale(10),
      paddingRight: 0,
    },
    quickCard: {
      width: widthScale(125),
      height: widthScale(55),
      borderRadius: widthScale(16),
      padding: widthScale(12),
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      position: 'relative',
      overflow: 'hidden',
    },
    quickCardTitle: {
      color: theme.colors.text,
      maxWidth: '85%',
    },
    heroCard: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    heroCardTitle: {
      color: theme.colors.primaryText,
    },
    cornerImage: {
      position: 'absolute',
      bottom: -widthScale(3),
      right: -widthScale(9),
      width: widthScale(48),
      height: widthScale(48),
      resizeMode: 'cover',
    },
  });
};

export default getStyles;
