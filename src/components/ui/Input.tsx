import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useAppTheme, palette } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import Text from './Text';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  style?: ViewStyle;
  icon?: React.ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: TextInputProps['keyboardType'];
  maxLength?: number;
  /**
   * 'light' forces a solid white card with dark text, regardless of the app
   * theme — for inputs sitting on a colorful/gradient surface where the
   * theme-flipping default (near-white in light mode, near-black in dark
   * mode) can't be guaranteed to contrast with what's behind it.
   */
  variant?: 'default' | 'light';
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  style,
  icon,
  multiline = false,
  numberOfLines,
  keyboardType,
  maxLength,
  variant = 'default',
}) => {
  const { theme } = useAppTheme();
  const { language } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(secureTextEntry);

  const isLight = variant === 'light';
  // 'light' forces a fixed appearance regardless of theme mode, so this is
  // intentionally palette.loginPlaceholder rather than theme.colors.textMuted.
  const mutedIconColor = isLight ? palette.loginPlaceholder : theme.colors.textMuted;

  const containerStyle = [
    styles.inputContainer,
    multiline && styles.inputContainerMultiline,
    {
      borderColor: error
        ? theme.colors.error
        : isFocused
        ? theme.colors.primary
        : isLight
        ? 'rgba(0,0,0,0.1)'
        : theme.colors.border,
      backgroundColor: isLight ? palette.white : theme.colors.surface,
      borderRadius: theme.spacing.borderRadius.sm,
    },
  ];

  const inputStyle: TextStyle = {
    color: isLight ? palette.black : theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.getFontFamily('regular', language),
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text variant="medium" color="textSecondary" style={styles.label}>
          {label}
        </Text>
      )}
      <View style={containerStyle}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={mutedIconColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && isHidden}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          maxLength={maxLength}
          style={[styles.input, inputStyle, multiline && styles.inputMultiline]}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsHidden(prev => !prev)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {isHidden ? (
              <EyeOff size={18} color={mutedIconColor} />
            ) : (
              <Eye size={18} color={mutedIconColor} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text variant="caption" color="error" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontSize: 15,
  },
  inputContainer: {
    height: 54,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputContainerMultiline: {
    height: 90,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 0,
  },
  inputMultiline: {
    textAlignVertical: 'top',
  },
  errorText: {
    marginTop: 4,
  },
});

export default Input;
