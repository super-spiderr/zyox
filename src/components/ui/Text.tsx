import React from 'react';
import { Text as RNText, TextStyle, TextProps, StyleSheet, StyleProp } from 'react-native';
import { useAppTheme, palette } from '@/theme';
import { TypographyVariant } from '@/theme/typography';
import { useLanguage } from '@/context/LanguageContext';

interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?:
    | 'text'
    | 'textSecondary'
    | 'textMuted'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'white'
    | (string & {});
  fontSize?: number;
  style?: StyleProp<TextStyle>;
}

export const Text: React.FC<AppTextProps> = ({
  variant = 'bodyMedium',
  color = 'text',
  fontSize,
  style,
  children,
  ...props
}) => {
  const { theme } = useAppTheme();
  const { language } = useLanguage();

  const {
    fontFamily,
    fontSize: resolvedFontSize,
    lineHeight,
  } = theme.typography.resolveTextStyle(variant, language);

  const baseStyle: TextStyle = {
    color:
      color === 'white'
        ? palette.white
        : theme.colors[color as keyof typeof theme.colors] || color || theme.colors.text,
    fontFamily,
    fontSize: fontSize ?? resolvedFontSize,
    lineHeight: fontSize !== undefined ? Math.round(fontSize * 1.4) : lineHeight,
  };

  const resolvedStyle = StyleSheet.flatten([baseStyle, style]);

  return (
    <RNText style={resolvedStyle} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
