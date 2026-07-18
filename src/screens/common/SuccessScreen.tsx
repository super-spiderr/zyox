import React, { useEffect } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { ScreenContainer, Text, Button } from '@/components';
import { useAppTheme, palette } from '@/theme';
import { useStyles } from '@/hooks/useStyles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import { widthScale, heightScale } from '@/utils/scaling';

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

export const SuccessScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme } = useAppTheme();
  const styles = useStyles(getStyles);

  const { title, message, buttonTitle, navigateTo, navigationParams } = route.params;

  // Shared values for spring entry animations
  const iconScale = useSharedValue(0);
  const iconOpacity = useSharedValue(0);

  const performRedirect = React.useCallback(() => {
    if (navigateTo === 'Main') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main', params: navigationParams }],
      });
    } else {
      navigation.reset({
        index: 1,
        routes: [
          { name: 'Main' },
          { name: navigateTo as any, params: navigationParams },
        ],
      });
    }
  }, [navigation, navigateTo, navigationParams]);

  useEffect(() => {
    // Animate success ring and check mark
    iconScale.value = withSpring(1.0, { damping: 10, stiffness: 100 });
    iconOpacity.value = withSpring(1.0);

    // Intercept back navigations (swiping back, Android back press, programmatic back)
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'RESET') {
        return;
      }
      e.preventDefault();
      performRedirect();
    });

    return unsubscribe;
  }, [iconScale, iconOpacity, navigation, performRedirect]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScale.value }],
      opacity: iconOpacity.value,
    };
  });

  const handlePress = () => {
    performRedirect();
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.content}>
        {/* Animated Checkmark Circle */}
        <Animated.View style={[styles.successRing, animatedIconStyle]}>
          <View style={styles.successCircle}>
            <Check size={widthScale(42)} color={palette.emerald500} strokeWidth={3.5} />
          </View>
        </Animated.View>

        {/* Text Section (Animated via Reanimated Entering Layout) */}
        <Animated.View entering={FadeInDown.delay(100).duration(600).springify()} style={styles.textGroup}>
          <Text variant="h1" style={styles.title}>
            {title}
          </Text>
          <Text style={styles.message}>
            {message}
          </Text>
        </Animated.View>

        {/* CTA Action Button */}
        <Animated.View entering={FadeInDown.delay(300).duration(600).springify()} style={styles.buttonGroup}>
          <Button
            title={buttonTitle || 'Continue'}
            onPress={handlePress}
            style={styles.button}
          />
        </Animated.View>
      </View>
    </ScreenContainer>
  );
};

const getStyles = (theme: any) => {
  const isDark = theme.isDark;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: widthScale(30),
    },
    successRing: {
      width: widthScale(110),
      height: widthScale(110),
      borderRadius: widthScale(55),
      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.06)',
      borderWidth: 2,
      borderColor: 'rgba(16, 185, 129, 0.15)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: heightScale(28),
    },
    successCircle: {
      width: widthScale(86),
      height: widthScale(86),
      borderRadius: widthScale(43),
      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.18)' : 'rgba(16, 185, 129, 0.12)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textGroup: {
      alignItems: 'center',
      marginBottom: heightScale(40),
    },
    title: {
      fontSize: widthScale(24),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: heightScale(12),
    },
    message: {
      fontSize: widthScale(15),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: heightScale(22),
      paddingHorizontal: widthScale(12),
    },
    buttonGroup: {
      width: '100%',
      paddingHorizontal: widthScale(20),
    },
    button: {
      width: '100%',
    },
  });
};

export default SuccessScreen;
