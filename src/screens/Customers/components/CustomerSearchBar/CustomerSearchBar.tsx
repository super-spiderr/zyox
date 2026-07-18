import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';

interface CustomerSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const CustomerSearchBar: React.FC<CustomerSearchBarProps> = ({
  value,
  onChangeText,
}) => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.searchContainer}>
      <Search size={18} color={theme.colors.textSecondary} style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={t('searchCustomersPlaceholder') || 'Search customers...'}
        placeholderTextColor={theme.colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={() => onChangeText('')}>
          <X size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomerSearchBar;
