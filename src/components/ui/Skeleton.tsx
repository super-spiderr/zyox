import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { useAppTheme } from '@/theme';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  variant?: 'circle' | 'rect' | 'text';
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
  variant = 'rect',
  style,
}) => {
  const { theme } = useAppTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  let calculatedBorderRadius = borderRadius;
  if (calculatedBorderRadius === undefined) {
    if (variant === 'circle') {
      calculatedBorderRadius = typeof width === 'number' ? width / 2 : 9999;
    } else if (variant === 'text') {
      calculatedBorderRadius = 4;
    } else {
      calculatedBorderRadius = 8;
    }
  }

  const skeletonColor = theme.colors.skeletonBg;

  return (
    <Animated.View
      style={[
        {
          width: width || '100%',
          height: height || (variant === 'text' ? 14 : 40),
          borderRadius: calculatedBorderRadius,
          backgroundColor: skeletonColor,
          opacity: opacity,
        },
        style,
      ]}
    />
  );
};

export default Skeleton;
