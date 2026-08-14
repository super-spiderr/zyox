import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import { Search, Check, X, Users } from 'lucide-react-native';
import { Text } from '@/components';
import { useAppTheme } from '@/theme';
import { useStyles } from '@/hooks/useStyles';
import { useLanguage } from '@/context/LanguageContext';
import { getInitials, getAvatarColors } from '@/utils/avatar';
import { Customer } from '@/store/customerStore';
import getStyles from './styles';

interface CustomerPickerModalProps {
  visible: boolean;
  onClose: () => void;
  customers: Customer[];
  selectedCustomerId: string;
  onSelect: (customer: Customer) => void;
}

export const CustomerPickerModal: React.FC<CustomerPickerModalProps> = ({
  visible,
  onClose,
  customers,
  selectedCustomerId,
  onSelect,
}) => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const [search, setSearch] = useState('');

  const filteredCustomers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      c => c.customerName.toLowerCase().includes(q) || c.phoneNumber.includes(q),
    );
  }, [customers, search]);

  const handleSelect = (customer: Customer) => {
    onSelect(customer);
    setSearch('');
    onClose();
  };

  const handleClose = () => {
    setSearch('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={handleClose}>
        <TouchableOpacity style={styles.container} activeOpacity={1}>
          <View style={styles.grabber} />
          <View style={styles.header}>
            <Text variant="bold" fontSize={16} color={theme.colors.text}>
              {t('selectCustomer')}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <X size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchRow}>
            <Search size={18} color={theme.colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or phone..."
              placeholderTextColor={theme.colors.textMuted}
              value={search}
              onChangeText={setSearch}
              autoFocus
            />
          </View>

          <FlatList
            data={filteredCustomers}
            keyExtractor={item => item._id || item.id}
            keyboardShouldPersistTaps="handled"
            style={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Users size={28} color={theme.colors.textMuted} />
                <Text fontSize={13} color={theme.colors.textSecondary} style={styles.emptyText}>
                  No customers found
                </Text>
              </View>
            }
            renderItem={({ item }) => {
              const isSelected = (item._id || item.id) === selectedCustomerId;
              const avatarColor = getAvatarColors(item.customerName, theme.colors.avatarPalette);
              return (
                <TouchableOpacity
                  style={[styles.row, isSelected && styles.rowSelected]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.avatar, { backgroundColor: avatarColor.bg }]}>
                    <Text variant="bold" fontSize={14} color={avatarColor.text}>
                      {getInitials(item.customerName)}
                    </Text>
                  </View>

                  <View style={styles.rowInfo}>
                    <Text variant="semibold" fontSize={14} color={theme.colors.text} numberOfLines={1}>
                      {item.customerName}
                    </Text>
                    <Text fontSize={12} color={theme.colors.textSecondary} numberOfLines={1}>
                      {item.phoneNumber}
                    </Text>
                  </View>

                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <Check size={13} color={theme.colors.primaryText} strokeWidth={3} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomerPickerModal;
