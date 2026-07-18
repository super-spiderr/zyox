import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  LayoutChangeEvent,
  TouchableOpacity,
} from 'react-native';
import { useAppTheme, palette } from '@/theme';
import Text from './Text';

interface MarqueeProps {
  text: string;
  speed?: number; // Pixels per second
  onPress?: () => void;
  variant?: 'default' | 'sticker' | 'transparent';
  textColor?: string;
  fontSize?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({
  text,
  speed = 40,
  onPress,
  variant = 'default',
  textColor,
  fontSize,
}) => {
  const { theme } = useAppTheme();

  const containerWidthRef = useRef<number>(0);
  const textWidthRef = useRef<number>(0);
  const [ready, setReady] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Repeat text for the sticker tape or transparent variant to ensure a continuous stream

  const displayText = `${text} · ${text} · ${text} · ${text}`;

  useEffect(() => {
    if (!ready || containerWidthRef.current === 0 || textWidthRef.current === 0) return;

    const containerWidth = containerWidthRef.current;
    const textWidth = textWidthRef.current;

    // Reset animated value to start from the right boundary of the container
    animatedValue.setValue(containerWidth);

    const distance = containerWidth + textWidth;
    const duration = (distance / speed) * 1000;

    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: -textWidth,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [displayText, speed, ready, animatedValue]);

  const handleContainerLayout = (e: LayoutChangeEvent) => {
    containerWidthRef.current = e.nativeEvent.layout.width;
    if (textWidthRef.current > 0) {
      setReady(true);
    }
  };

  const handleTextLayout = (e: LayoutChangeEvent) => {
    textWidthRef.current = e.nativeEvent.layout.width;
    if (containerWidthRef.current > 0) {
      setReady(true);
    }
  };

  let containerBg = palette.transparent;
  let borderColor = palette.transparent;
  let marqueeTextColor = textColor || theme.colors.linkText;

  if (variant === 'default') {
    containerBg = theme.colors.infoSurfaceBg;
    borderColor = theme.colors.linkBorder;
  } else if (variant === 'sticker') {
    containerBg = palette.warning300;
    borderColor = palette.black;
    marqueeTextColor = textColor || palette.black;
  }

  const defaultFontSize = 12;
  const resolvedFontSize = fontSize ?? defaultFontSize;

  const variantConfig = {
    default: { style: styles.mainContainer, minHeight: 38 },
    sticker: { style: styles.stickerContainer, minHeight: 32 },
    transparent: { style: styles.transparentContainer, minHeight: 18 },
  };
  const { style: containerStyle, minHeight } = variantConfig[variant];

  const content = (
    <View
      style={[
        containerStyle,
        {
          backgroundColor: containerBg,
          borderColor,
          height: Math.max(minHeight, resolvedFontSize * 1.6),
        },
      ]}
    >
      {/* Marquee Text Scroller */}
      <View style={styles.scrollerContainer} onLayout={handleContainerLayout} pointerEvents="none">
        <Animated.View
          style={[
            styles.scrollerInner,
            {
              opacity: ready ? 1 : 0,
              transform: [{ translateX: animatedValue }],
            },
          ]}
        >
          <Text
            onLayout={handleTextLayout}
            variant="light"
            fontSize={resolvedFontSize}
            style={[
              styles.defaultText,
              {
                color: marqueeTextColor,
              },
            ]}
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {displayText}
          </Text>
        </Animated.View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginHorizontal: 0,
    overflow: 'hidden',
  },
  stickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
    paddingHorizontal: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  transparentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    marginHorizontal: 0,
    overflow: 'hidden',
  },
  scrollerContainer: {
    flex: 1,
    height: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  scrollerInner: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  defaultText: {
    width: undefined,
    letterSpacing: 1.5,
  },
});

export default Marquee;
