import React from 'react';
import { View, TextInput, TouchableOpacity, ViewStyle, TextInputProps } from 'react-native';
import { Search, X, Mic } from 'lucide-react-native';
import { useAppTheme } from '@/theme';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  showMicIcon?: boolean;
  onMicPress?: () => void;
  style?: ViewStyle;
  autoFocus?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  showMicIcon = true,
  onMicPress,
  style,
  autoFocus,
  keyboardType,
}) => {
  const { theme } = useAppTheme();
  const styles = useStyles(getStyles);

  const renderRightButton = () => {
    if (value.length > 0) {
      return (
        <TouchableOpacity style={styles.clearButton} onPress={() => onChangeText('')}>
          <X size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      );
    }

    if (showMicIcon) {
      return (
        <TouchableOpacity disabled={!onMicPress} onPress={onMicPress}>
          <Mic size={18} color={theme.colors.primary} />
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View style={[styles.searchContainer, style]}>
      <Search size={18} color={theme.colors.textSecondary} style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
      />
      {renderRightButton()}
    </View>
  );
};

export default SearchBar;
