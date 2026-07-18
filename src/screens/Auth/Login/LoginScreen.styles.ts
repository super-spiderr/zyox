import { StyleSheet } from 'react-native';
import { Theme, palette } from '@/theme';
import { heightScale, widthScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 0,
      backgroundColor: palette.black,
    },
    screenContainer: {
      flexGrow: 1,
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: palette.black,
    },
    screenContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
    titleText: {
      //textAlign: 'center',
      paddingHorizontal: widthScale(8),
    },
    heroDecoration: {
      position: 'absolute',
      width: widthScale(210),
      height: widthScale(155),
    },
    heroDecorationTopLeft: {
      top: heightScale(50),
    },
    heroDecorationBottomRight: {
      bottom: -heightScale(10),
      right: -widthScale(75),
      transform: [{ rotate: '10deg' }],
    },
    heroDecorationSecondary: {
      position: 'absolute',
      width: widthScale(140),
      height: widthScale(150),
    },
    heroDecorationTopRight: {
      top: heightScale(150),
      right: -widthScale(14),
      transform: [{ rotate: '16deg' }],
    },
    heroDecorationBottomLeft: {
      bottom: heightScale(24),
      left: -widthScale(16),
      transform: [{ rotate: '-16deg' }],
    },
    floatingLangSelector: {
      position: 'absolute',
      right: theme.spacing.lg,
      zIndex: 10,
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    brandBlock: {
      //alignItems: 'center',
      marginBottom: heightScale(32),
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 22,
      //textAlign: 'center',
      marginTop: heightScale(12),
      paddingHorizontal: widthScale(8),
    },
    form: {
      width: '100%',
    },
    fieldLabel: {
      fontSize: 15,
      marginBottom: heightScale(6),
    },
    button: {
      marginTop: heightScale(16),
    },
    error: {
      //textAlign: 'center',
      marginBottom: heightScale(10),
    },
    adminCaptionRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      //justifyContent: 'center',
      gap: widthScale(5),
      marginTop: heightScale(20),
      paddingHorizontal: widthScale(12),
    },
    adminCaptionIcon: {
      marginTop: 2,
    },
    adminCaption: {
      fontSize: 13,
      lineHeight: 18,
      flexShrink: 1,
    },
  });
};

export default getStyles;
