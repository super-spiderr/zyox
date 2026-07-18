import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Text from './Text';
import { palette } from '@/theme';

interface AnimatedLogoProps {
  title?: string;
  style?: any;
  color?: string;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  title = 'Zyox',
  style,
  color = 'primary',
}) => {
  // Unicode-aware split for Tamil combining vowel signs
  const getSplittedText = (text: string) => {
    if (!text) {
      return { first: '', rest: '' };
    }

    // Check if the text starts with a Tamil character
    const isTamilText = /^[\u0B80-\u0BFF]/.test(text);
    if (isTamilText) {
      // Matches a Tamil character followed by any number of combining vowel signs, anusvara, pulli, or length marks
      const match = text.match(/^[\u0B80-\u0BFF][\u0B82\u0BBE-\u0BCD\u0BD7]*/);
      if (match) {
        const first = match[0];
        const rest = text.slice(first.length);
        return { first, rest };
      }
    }

    // Modern Intl.Segmenter fallback for other languages
    try {
      if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
        const segmenter = new (Intl as any).Segmenter(undefined, { granularity: 'grapheme' });
        const segments = Array.from(segmenter.segment(text) as any).map((s: any) => s.segment);
        if (segments.length > 0) {
          return {
            first: segments[0],
            rest: segments.slice(1).join(''),
          };
        }
      }
    } catch {
      // Fallback below
    }

    if (text.length <= 1) {
      return { first: text, rest: '' };
    }

    // Look ahead for Tamil combining characters range in case of partial Unicode segments
    const secondChar = text.charAt(1);
    const code = secondChar.charCodeAt(0);
    const isCombining = code >= 0x0bbe && code <= 0x0bcd;

    if (isCombining) {
      return {
        first: text.slice(0, 2),
        rest: text.slice(2),
      };
    }

    return {
      first: text.slice(0, 1),
      rest: text.slice(1),
    };
  };

  const { first: firstLetter, rest: restLetters } = getSplittedText(title);

  const [restWidth, setRestWidth] = useState(0);

  // Animated values
  const wordOpacity = useRef(new Animated.Value(0)).current;
  const wordTranslateY = useRef(new Animated.Value(20)).current;
  const wordScale = useRef(new Animated.Value(0.95)).current;
  const restOpacity = useRef(new Animated.Value(1)).current;
  const restTranslateX = useRef(new Animated.Value(0)).current;
  const firstLetterTranslateX = useRef(new Animated.Value(0)).current;
  const primaryLetterOpacity = useRef(new Animated.Value(1)).current;
  const whiteLetterOpacity = useRef(new Animated.Value(0)).current;
  const circleScale = useRef(new Animated.Value(0)).current;
  const circleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let active = true;

    const runSequence = () => {
      if (!active) return;

      // 1. Reset values for the entry
      wordOpacity.setValue(0);
      wordTranslateY.setValue(20);
      wordScale.setValue(0.95);
      restOpacity.setValue(1);
      restTranslateX.setValue(0);
      firstLetterTranslateX.setValue(0);
      primaryLetterOpacity.setValue(1);
      whiteLetterOpacity.setValue(0);
      circleScale.setValue(0);
      circleOpacity.setValue(0);

      // 2. Roll in the word
      Animated.parallel([
        Animated.timing(wordOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(wordTranslateY, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(wordScale, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start(() => {
        if (!active) return;

        const loopTransition = () => {
          if (!active) return;

          // 3. Wait 1200ms showing the full word
          setTimeout(() => {
            if (!active) return;

            // 4. Hide rest letters (slide left inside Z), scale up circle, cross-fade first letter to white
            Animated.parallel([
              Animated.timing(restOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
              Animated.timing(restTranslateX, {
                toValue: -50,
                duration: 250,
                useNativeDriver: true,
              }),
              Animated.timing(firstLetterTranslateX, {
                toValue: restWidth / 2,
                duration: 250,
                useNativeDriver: true,
              }),
              Animated.timing(circleScale, { toValue: 1, duration: 250, useNativeDriver: true }),
              Animated.timing(circleOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
              Animated.timing(primaryLetterOpacity, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(whiteLetterOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
            ]).start(() => {
              if (!active) return;

              // 5. Wait 1500ms in centered circular state
              setTimeout(() => {
                if (!active) return;

                // 6. Return back to full word state (fade in/slide rest back, hide circle, text back to primary)
                Animated.parallel([
                  Animated.timing(restOpacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                  }),
                  Animated.timing(restTranslateX, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                  }),
                  Animated.timing(firstLetterTranslateX, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                  }),
                  Animated.timing(circleScale, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                  }),
                  Animated.timing(circleOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                  }),
                  Animated.timing(primaryLetterOpacity, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                  }),
                  Animated.timing(whiteLetterOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                  }),
                ]).start(() => {
                  if (active) {
                    // Loop the transition again
                    loopTransition();
                  }
                });
              }, 1500);
            });
          }, 1200);
        };

        // Start the loop
        loopTransition();
      });
    };

    runSequence();

    return () => {
      active = false;
    };
  }, [
    title,
    restWidth,
    wordOpacity,
    wordTranslateY,
    wordScale,
    restOpacity,
    restTranslateX,
    firstLetterTranslateX,
    primaryLetterOpacity,
    whiteLetterOpacity,
    circleScale,
    circleOpacity,
  ]);

  const rowStyle = [
    styles.textWrapper,
    {
      opacity: wordOpacity,
      transform: [{ translateY: wordTranslateY }, { scale: wordScale }],
    },
  ];

  const restTextStyle = {
    opacity: restOpacity,
    transform: [{ translateX: restTranslateX }],
  };

  const primaryZStyle = [
    styles.absoluteLetter,
    {
      opacity: primaryLetterOpacity,
    },
  ];

  const whiteZStyle = [
    styles.absoluteLetter,
    {
      opacity: whiteLetterOpacity,
    },
  ];

  const engCircleStyle = [
    styles.circle,
    {
      opacity: circleOpacity,
      transform: [{ scale: circleScale }],
    },
  ];

  const firstLetterStyle = [
    styles.letterContainer,
    {
      transform: [{ translateX: firstLetterTranslateX }],
    },
  ];

  // Adjust font size based on Tamil vs English character ranges
  const isTamil = title.match(/[\u0B80-\u0BFF]/);
  const fontSize = isTamil ? 20 : 26;

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={rowStyle}>
        <View style={styles.row}>
          {/* Circular Background centered inside letterContainer */}
          <Animated.View style={firstLetterStyle}>
            <Animated.View style={engCircleStyle} />
            <Text
              variant="bold"
              color={color}
              fontSize={fontSize}
              style={styles.hiddenText}
              numberOfLines={1}
            >
              {firstLetter}
            </Text>
            <Animated.View style={primaryZStyle}>
              <Text variant="bold" color={color} fontSize={fontSize} numberOfLines={1}>
                {firstLetter}
              </Text>
            </Animated.View>
            <Animated.View style={whiteZStyle}>
              <Text variant="bold" color="white" fontSize={fontSize} numberOfLines={1}>
                {firstLetter}
              </Text>
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={restTextStyle}
            onLayout={e => setRestWidth(e.nativeEvent.layout.width)}
          >
            <Text variant="bold" color={color} fontSize={fontSize} numberOfLines={1}>
              {restLetters}
            </Text>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    width: 43,
    height: 42,
    borderRadius: 28,
    backgroundColor: palette.primary500,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  letterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
  },
  absoluteLetter: {
    position: 'absolute',
  },
  hiddenText: {
    opacity: 0,
  },
});

export default AnimatedLogo;
