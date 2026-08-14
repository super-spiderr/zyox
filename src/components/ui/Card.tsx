import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useAppTheme } from '@/theme';
import { widthScale } from '@/utils/scaling';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  /** Removes the border/shadow treatment, keeping only background + radius. */
  flat?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, style, flat = false }) => {
  const { theme, isDark } = useAppTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: theme.colors.card,
          borderRadius: widthScale(16),
        },
        !flat && {
          borderWidth: 0.5,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.text,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.15 : 0.04,
          shadowRadius: 6,
          elevation: 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    padding: widthScale(16),
  },
});

export default Card;
