import React from 'react';
import { StyleSheet, View, StatusBar, ViewStyle, Platform } from 'react-native';
import { useAppTheme, palette } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useIsFocused } from '@react-navigation/native';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  ignoreTopSafeArea?: boolean;
  statusBarStyle?: 'light-content' | 'dark-content' | 'default';
  statusBarBgColor?: string;
  scrollRef?: React.RefObject<any>;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  style,
  contentContainerStyle,
  ignoreTopSafeArea = false,
  statusBarStyle,
  statusBarBgColor,
  scrollRef,
}) => {
  const { theme, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const resolvedBarStyle =
    statusBarStyle ||
    (ignoreTopSafeArea ? 'light-content' : isDark ? 'light-content' : 'dark-content');
  const resolvedBgColor = statusBarBgColor || palette.transparent;

  // Declarative <StatusBar> updates can lag behind theme toggles on Android, so
  // also nudge it imperatively whenever the resolved style/theme changes.
  React.useEffect(() => {
    if (!isFocused) return;
    StatusBar.setBarStyle(
      resolvedBarStyle === 'default'
        ? isDark
          ? 'light-content'
          : 'dark-content'
        : resolvedBarStyle,
      true,
    );
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(resolvedBgColor, true);
      StatusBar.setTranslucent(true);
    }
  }, [isFocused, resolvedBarStyle, resolvedBgColor, isDark]);

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
      paddingTop: ignoreTopSafeArea ? 0 : insets.top,
    },
    style,
  ];

  return (
    <View style={containerStyle}>
      {isFocused && (
        <StatusBar
          barStyle={resolvedBarStyle}
          backgroundColor={resolvedBgColor}
          translucent={true}
        />
      )}
      {scrollable ? (
        <KeyboardAwareScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
          bottomOffset={20}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={[styles.content, contentContainerStyle]}>{children}</View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenContainer;
