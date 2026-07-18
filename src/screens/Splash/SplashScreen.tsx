import React, { useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';
import Text from '@/components/ui/Text';
import { palette } from '@/theme';
import {
  ChefHat,
  Utensils,
  Truck,
  Calendar,
  Coffee,
  Clock,
  Sparkles,
  Flame,
  ShoppingBag,
  Heart,
  Smile,
  Compass,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// Background icons setup - scattered coordinates across 4 quadrants
const backgroundIcons = [
  // Quadrant 1 (Top Right)
  { IconComponent: ChefHat, x: width * 0.15, y: -height * 0.12 },
  { IconComponent: Utensils, x: width * 0.32, y: -height * 0.08 },
  { IconComponent: Truck, x: width * 0.22, y: -height * 0.24 },
  { IconComponent: Calendar, x: width * 0.08, y: -height * 0.35 },
  { IconComponent: Coffee, x: width * 0.38, y: -height * 0.22 },
  { IconComponent: Clock, x: width * 0.28, y: -height * 0.38 },

  // Quadrant 2 (Top Left)
  { IconComponent: Sparkles, x: -width * 0.18, y: -height * 0.15 },
  { IconComponent: Flame, x: -width * 0.35, y: -height * 0.05 },
  { IconComponent: ShoppingBag, x: -width * 0.25, y: -height * 0.28 },
  { IconComponent: Heart, x: -width * 0.08, y: -height * 0.38 },
  { IconComponent: Smile, x: -width * 0.38, y: -height * 0.2 },
  { IconComponent: Compass, x: -width * 0.22, y: -height * 0.4 },

  // Quadrant 3 (Bottom Left)
  { IconComponent: ChefHat, x: -width * 0.12, y: height * 0.18 },
  { IconComponent: Utensils, x: -width * 0.28, y: height * 0.12 },
  { IconComponent: Truck, x: -width * 0.35, y: height * 0.25 },
  { IconComponent: Calendar, x: -width * 0.18, y: height * 0.32 },
  { IconComponent: Coffee, x: -width * 0.05, y: height * 0.28 },
  { IconComponent: Clock, x: -width * 0.25, y: height * 0.42 },

  // Quadrant 4 (Bottom Right)
  { IconComponent: Sparkles, x: width * 0.18, y: height * 0.15 },
  { IconComponent: Flame, x: width * 0.32, y: height * 0.1 },
  { IconComponent: ShoppingBag, x: width * 0.28, y: height * 0.28 },
  { IconComponent: Heart, x: width * 0.1, y: height * 0.35 },
  { IconComponent: Smile, x: width * 0.38, y: height * 0.22 },
  { IconComponent: Compass, x: width * 0.25, y: height * 0.4 },
];

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  // Animated values for English Text
  const engOpacity = useRef(new Animated.Value(0)).current;
  const engTranslateY = useRef(new Animated.Value(40)).current;
  const engScale = useRef(new Animated.Value(0.85)).current;
  const zTranslateX = useRef(new Animated.Value(0)).current;
  const yoxOpacity = useRef(new Animated.Value(1)).current;

  // Animated values for Tamil Text
  const tamOpacity = useRef(new Animated.Value(0)).current;
  const tamTranslateY = useRef(new Animated.Value(40)).current;
  const tamScale = useRef(new Animated.Value(0.85)).current;

  // Animated values for Splash Container
  const splashOpacity = useRef(new Animated.Value(1)).current;

  // Layout state for yox width
  const [widthYox, setWidthYox] = React.useState(0);

  const handleLayoutYox = (e: any) => {
    setWidthYox(e.nativeEvent.layout.width);
  };

  const iconAnims = useRef(
    backgroundIcons.map(target => ({
      x: new Animated.Value(target.x),
      y: new Animated.Value(target.y),
      scale: new Animated.Value(1),
      opacity: new Animated.Value(0),
    })),
  ).current;

  const startLogoAnimation = useCallback(() => {
    // Animate background icons imploding inside the letter Z (center 0,0)
    const iconAnimations = iconAnims.map(item => {
      return Animated.parallel([
        Animated.timing(item.x, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(item.y, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(item.scale, {
          toValue: 0.1,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(item.opacity, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.parallel([
      Animated.timing(yoxOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(zTranslateX, {
        toValue: widthYox ? widthYox / 2 : 35,
        duration: 120,
        useNativeDriver: true,
      }),
      ...iconAnimations,
    ]).start(() => {
      // Screen transition timeout
      setTimeout(() => {
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(() => {
          onComplete();
        });
      }, 150);
    });
  }, [iconAnims, yoxOpacity, zTranslateX, widthYox, onComplete, splashOpacity]);

  useEffect(() => {
    let active = true;

    const runAnimations = () => {
      // 1. English Roll In
      Animated.parallel([
        Animated.timing(engOpacity, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.spring(engTranslateY, {
          toValue: 0,
          tension: 200,
          friction: 15,
          useNativeDriver: true,
        }),
        Animated.spring(engScale, {
          toValue: 1,
          tension: 200,
          friction: 15,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (!active) return;

        // Wait 80ms
        setTimeout(() => {
          if (!active) return;

          // 2. English Roll Out & Tamil Roll In
          Animated.parallel([
            // English Roll Out
            Animated.timing(engOpacity, {
              toValue: 0,
              duration: 60,
              useNativeDriver: true,
            }),
            Animated.timing(engTranslateY, {
              toValue: -40,
              duration: 80,
              useNativeDriver: true,
            }),
            Animated.timing(engScale, {
              toValue: 1.1,
              duration: 80,
              useNativeDriver: true,
            }),
            // Tamil Roll In
            Animated.timing(tamOpacity, {
              toValue: 1,
              duration: 80,
              useNativeDriver: true,
            }),
            Animated.spring(tamTranslateY, {
              toValue: 0,
              tension: 200,
              friction: 15,
              useNativeDriver: true,
            }),
            Animated.spring(tamScale, {
              toValue: 1,
              tension: 200,
              friction: 15,
              useNativeDriver: true,
            }),
          ]).start(() => {
            if (!active) return;

            // Wait 80ms
            setTimeout(() => {
              if (!active) return;

              // Reset English animation variables to original rollout positions
              engTranslateY.setValue(40);
              engScale.setValue(0.85);
              engOpacity.setValue(0);
              yoxOpacity.setValue(1);
              zTranslateX.setValue(0);

              // Reset icon values
              iconAnims.forEach((item, idx) => {
                item.x.setValue(backgroundIcons[idx].x);
                item.y.setValue(backgroundIcons[idx].y);
                item.scale.setValue(1.0);
                item.opacity.setValue(0);
              });

              // 3. Tamil Roll Out (Roll Inside) & English 2 Roll In
              Animated.parallel([
                Animated.timing(tamOpacity, {
                  toValue: 0,
                  duration: 60,
                  useNativeDriver: true,
                }),
                Animated.timing(tamTranslateY, {
                  toValue: 40,
                  duration: 80,
                  useNativeDriver: true,
                }),
                Animated.timing(tamScale, {
                  toValue: 0.85,
                  duration: 80,
                  useNativeDriver: true,
                }),
                Animated.timing(engOpacity, {
                  toValue: 1,
                  duration: 80,
                  useNativeDriver: true,
                }),
                Animated.spring(engTranslateY, {
                  toValue: 0,
                  tension: 200,
                  friction: 15,
                  useNativeDriver: true,
                }),
                Animated.spring(engScale, {
                  toValue: 1,
                  tension: 200,
                  friction: 15,
                  useNativeDriver: true,
                }),
                // Fade in background icons at their scattered positions
                ...iconAnims.map(item =>
                  Animated.timing(item.opacity, {
                    toValue: 0.8,
                    duration: 80,
                    useNativeDriver: true,
                  }),
                ),
              ]).start(() => {
                if (!active) return;

                // Wait 80ms after English 2 is visible, then trigger Z centering & icon collapse
                setTimeout(() => {
                  if (active) {
                    startLogoAnimation();
                  }
                }, 80);
              });
            }, 80);
          });
        }, 80);
      });
    };

    runAnimations();
    return () => {
      active = false;
    };
  }, [
    engOpacity,
    engTranslateY,
    engScale,
    yoxOpacity,
    zTranslateX,
    tamOpacity,
    tamTranslateY,
    tamScale,
    iconAnims,
    startLogoAnimation,
  ]);

  const containerStyle = [
    styles.container,
    {
      opacity: splashOpacity,
    },
  ];

  const zLetterStyle = {
    transform: [{ translateX: zTranslateX }],
  };

  const yoxLettersStyle = {
    opacity: yoxOpacity,
  };

  return (
    <Animated.View style={containerStyle}>
      {/* Background Gradient */}
      <View style={StyleSheet.absoluteFill}>
        <Svg height="100%" width="100%">
          <Defs>
            <SvgLinearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={palette.black} stopOpacity="1" />
              <Stop offset="100%" stopColor={palette.splashGray} stopOpacity="1" />
            </SvgLinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#bgGrad)" />
        </Svg>
      </View>

      {/* Background ambient floating icons */}
      {iconAnims.map((item, idx) => {
        const Icon = backgroundIcons[idx].IconComponent;
        const iconStyle = [
          styles.ambientIcon,
          {
            opacity: item.opacity,
            transform: [{ translateX: item.x }, { translateY: item.y }, { scale: item.scale }],
          },
        ];
        return (
          <Animated.View key={idx} style={iconStyle}>
            <Icon size={28} color={palette.white} strokeWidth={2} />
          </Animated.View>
        );
      })}

      {/* English Text Rollout Wrapper */}
      <Animated.View
        style={[
          styles.textWrapper,
          {
            opacity: engOpacity,
            transform: [{ translateY: engTranslateY }, { scale: engScale }],
          },
        ]}
      >
        <View style={styles.engRow}>
          <Animated.View style={zLetterStyle}>
            <Text
              variant="muktaMalarBold"
              color="white"
              fontSize={68}
              style={styles.typewriterText}
            >
              Z
            </Text>
          </Animated.View>
          <Animated.View style={yoxLettersStyle} onLayout={handleLayoutYox}>
            <Text
              variant="muktaMalarBold"
              color="white"
              fontSize={48}
              style={styles.typewriterText}
            >
              yox
            </Text>
          </Animated.View>
        </View>
      </Animated.View>

      {/* Tamil Text Rollout Wrapper */}
      <Animated.View
        style={[
          styles.textWrapper,
          {
            opacity: tamOpacity,
            transform: [{ translateY: tamTranslateY }, { scale: tamScale }],
          },
        ]}
      >
        <Text variant="muktaMalarBold" color="white" fontSize={38} style={styles.typewriterText}>
          ஜியோக்ஸ்
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.darkBgApp, // Dark cinematic background regardless of mode
  },
  textWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typewriterText: {
    textAlign: 'center',
    letterSpacing: 2,
    paddingVertical: 20,
  },
  engRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ambientIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
