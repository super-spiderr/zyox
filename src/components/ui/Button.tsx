import React from 'react';
import { StyleSheet, ActivityIndicator, ViewStyle, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme, palette } from '@/theme';
import Text from './Text';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  gradient?: string[];
  textColor?: string;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  gradient,
  textColor,
  style,
}) => {
  const { theme, isDark } = useAppTheme();

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';

  // Default primary buttons to the app's own theme gradient (same formula as
  // StatsCard/PulsingFAB) rather than an off-theme brand color.
  const startColor = theme.colors.primary;
  const endColor = theme.colors.cardGradEnd;
  const themeGradient = isDark ? [endColor, startColor] : [startColor, endColor];
  const buttonGradient = gradient || (isPrimary ? themeGradient : undefined);

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.border;
    if (buttonGradient) return palette.transparent;
    if (isPrimary) return theme.colors.primary;
    if (isSecondary) return theme.colors.secondary;
    return palette.transparent;
  };

  const getBorderColor = () => {
    if (isOutline) return theme.colors.primary;
    return palette.transparent;
  };

  const getTextColor = () => {
    if (disabled) return 'textMuted';
    if (textColor) return textColor;
    if (isOutline) return 'primary';
    if (isPrimary) return theme.colors.primaryText;
    return palette.white;
  };

  const getSpinnerColor = () => {
    if (textColor) return textColor;
    if (isOutline) return theme.colors.primary;
    if (isPrimary) return theme.colors.primaryText;
    return palette.white;
  };

  const gradientContainerStyle = [
    StyleSheet.absoluteFill,
    {
      borderRadius: theme.spacing.borderRadius.md,
      overflow: 'hidden' as const,
    },
  ];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: isOutline ? 1.5 : 0,
          borderRadius: theme.spacing.borderRadius.md,
          overflow: 'hidden',
          transform: [{ scale: pressed ? 0.96 : 1 }],
          opacity: pressed ? 0.92 : 1,
        },
        style,
      ]}
    >
      {buttonGradient && !disabled && (
        <LinearGradient
          colors={buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={gradientContainerStyle}
        />
      )}
      {loading ? (
        <ActivityIndicator color={getSpinnerColor()} size="small" />
      ) : (
        <Text variant="semiBold" color={getTextColor()} style={styles.text}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
  },
});

export default Button;
