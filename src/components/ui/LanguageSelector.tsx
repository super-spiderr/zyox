import React from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';
import { useAppTheme, palette } from '@/theme';
import Text from './Text';

interface LanguageSelectorProps {
  style?: StyleProp<ViewStyle>;
  /**
   * 'onDark' forces a fixed translucent-white pill with white active-cap
   * text, for use on a permanently-dark surface (e.g. the Login screen)
   * where the theme-driven default can't be guaranteed to contrast — in
   * dark mode theme.colors.primary is white, which would render white
   * active-cap text on a white cap.
   */
  variant?: 'default' | 'onDark';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ style, variant = 'default' }) => {
  const { language, setLanguage } = useLanguage();
  const { theme } = useAppTheme();
  const isOnDark = variant === 'onDark';

  const containerStyle = [
    styles.container,
    {
      backgroundColor: isOnDark ? 'rgba(255,255,255,0.12)' : theme.colors.surface,
      borderColor: isOnDark ? 'rgba(255,255,255,0.3)' : theme.colors.surfaceBorder,
    },
    style,
  ];

  const activeCapStyle = { backgroundColor: isOnDark ? palette.white : theme.colors.primary };
  const activeTextStyle = isOnDark ? styles.capTextActiveOnDark : styles.capTextActive;
  const inactiveTextStyle = { color: isOnDark ? 'rgba(255,255,255,0.7)' : theme.colors.textSecondary };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={[styles.cap, language === 'en' ? activeCapStyle : undefined]}
        onPress={() => setLanguage('en')}
        activeOpacity={0.7}
      >
        <Text
          variant="caption"
          style={[styles.capText, language === 'en' ? activeTextStyle : inactiveTextStyle]}
        >
          EN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.cap, language === 'ta' ? activeCapStyle : undefined]}
        onPress={() => setLanguage('ta')}
        activeOpacity={0.7}
      >
        <Text
          variant="caption"
          style={[styles.capText, language === 'ta' ? activeTextStyle : inactiveTextStyle]}
        >
          தமிழ்
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  cap: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capText: {
    fontSize: 11,
    fontWeight: '600',
  },
  capTextActive: {
    color: palette.white,
    fontWeight: 'bold',
  },
  capTextActiveOnDark: {
    color: palette.black,
    fontWeight: 'bold',
  },
});

export default LanguageSelector;
