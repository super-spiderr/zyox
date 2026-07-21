import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { heightScale, widthScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      backgroundColor: theme.colors.background,
      overflow: 'hidden',
    },
    screenContent: {
      paddingTop: widthScale(60),
    },
    titleText: {
      paddingHorizontal: widthScale(8),
      transform: [{ rotate: '-4deg' }],
      textAlign: 'center',
      backgroundColor: palette.primary500,
      //width: '120%',
      alignSelf: 'center',
    },
    descText: {
      transform: [{ rotate: '4deg' }],
      //width: '120%',
      textAlign: 'center',
      backgroundColor: palette.yellow,
      color: palette.black,
      paddingHorizontal: widthScale(8),
      alignSelf: 'center',
    },
    floatingLangSelector: {
      marginBottom: widthScale(15),
      marginRight: widthScale(20),
      alignSelf: 'flex-end',
    },
    brandBlock: {
      marginTop: widthScale(40),
      marginBottom: heightScale(22),
    },
    subtitle: {
      marginTop: widthScale(10),
      paddingHorizontal: widthScale(28),
    },
    formTitleContainer: { paddingHorizontal: widthScale(20), gap: widthScale(6) },
    form: {
      paddingTop: widthScale(16),
      paddingBottom: widthScale(120),
      paddingHorizontal: widthScale(20),
    },
    footer: {
      backgroundColor: palette.primary600,
      justifyContent: 'center',
      transform: [{ rotate: '0deg' }],
      width: '120%',
      alignSelf: 'center',
    },
    footer1: {
      backgroundColor: palette.primary600,
      justifyContent: 'center',
      transform: [{ rotate: '-29deg' }],
      width: '120%',
      alignSelf: 'center',
    },
    fieldLabel: {
      marginBottom: heightScale(6),
    },
    formTitle: {
      marginTop: widthScale(10),
      width: '100%',
    },
    formDesc: {
      marginBottom: widthScale(20),
    },
    button: {
      marginTop: heightScale(16),
    },
    error: {
      marginBottom: heightScale(10),
    },
    adminCaptionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: widthScale(5),
      marginTop: heightScale(20),
      paddingHorizontal: widthScale(12),
    },
    adminCaptionIcon: {
      marginTop: -2,
    },
    adminCaption: {
      fontSize: 13,
      lineHeight: 18,
      flexShrink: 1,
    },
  });
};

export default getStyles;
