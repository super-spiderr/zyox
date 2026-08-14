import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { heightScale, widthScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      backgroundColor: theme.colors.background,
    },
    screenContent: {
      paddingHorizontal: widthScale(24),
      paddingBottom: heightScale(24),
    },
    floatingLangSelector: {
      alignSelf: 'flex-end',
    },
    logoRow: {
      //alignItems: 'center',
      marginTop: heightScale(8),
      marginBottom: heightScale(4),
    },
    headerLogo: {
      width: widthScale(64),
      height: widthScale(70),
      tintColor: theme.colors.primary,
    },
    mascotRow: {
      alignItems: 'flex-end',
      marginTop: heightScale(1),
      marginRight: -widthScale(12),
    },
    mascotImage: {
      width: widthScale(250),
      height: widthScale(325),
      transform: [{ rotate: '20deg' }],
    },
    welcomeBlock: {
      marginTop: heightScale(18),
      marginBottom: heightScale(10),
    },
    welcomeHeading: {
      marginBottom: heightScale(14),
    },
    highlightWord: {
      backgroundColor: palette.yellow,
      paddingHorizontal: widthScale(16),
      borderRadius: widthScale(4),
      overflow: 'hidden',
    },
    formTitle: {
      marginBottom: heightScale(4),
      //textAlign: 'center',
    },
    formDesc: {
      //textAlign: 'center',
    },
    form: {
      width: '100%',
      marginTop: widthScale(10),
    },
    fieldLabel: {
      marginBottom: heightScale(10),
    },
    button: {
      marginTop: heightScale(10),
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
