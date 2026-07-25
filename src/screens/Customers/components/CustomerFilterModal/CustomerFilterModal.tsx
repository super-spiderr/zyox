import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { X } from 'lucide-react-native';
import { Text } from '@/components';
import { useAppTheme } from '@/theme';
import { useStyles } from '@/hooks/useStyles';
import { useLanguage } from '@/context/LanguageContext';
import { CustomerFilterModalProps } from '../../types';
import { CUSTOMER_STATUS_FILTER_OPTIONS, CUSTOMER_TYPE_FILTER_OPTIONS } from '@/constants/customer';
import getStyles from './styles';

export const CustomerFilterModal: React.FC<CustomerFilterModalProps> = ({
  visible,
  onClose,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
}) => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.bottomSheetOverlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.bottomSheetContainer} activeOpacity={1}>
          <View style={styles.grabber} />
          <View style={styles.bottomSheetHeader}>
            <Text variant="bold" fontSize={16} color={theme.colors.text}>
              {t('filterCustomers')}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Status Section */}
          <Text variant="bold" fontSize={13} color={theme.colors.textSecondary} style={styles.filterSectionTitle}>
            {t('status')}
          </Text>
          <View style={styles.filterOptionsContainer}>
            {CUSTOMER_STATUS_FILTER_OPTIONS.map(option => {
              const isActive = statusFilter === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.filterOptionBtn, isActive && styles.filterOptionBtnActive]}
                  onPress={() => setStatusFilter(option.value)}
                >
                  <Text
                    variant={isActive ? 'bold' : 'medium'}
                    fontSize={12}
                    color={isActive ? theme.colors.primary : theme.colors.textSecondary}
                  >
                    {t(option.labelKey)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Type Section */}
          <Text variant="bold" fontSize={13} color={theme.colors.textSecondary} style={styles.filterSectionTitle}>
            {t('customerType')}
          </Text>
          <View style={styles.filterOptionsContainer}>
            {CUSTOMER_TYPE_FILTER_OPTIONS.map(option => {
              const isActive = typeFilter === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.filterOptionBtn, isActive && styles.filterOptionBtnActive]}
                  onPress={() => setTypeFilter(option.value)}
                >
                  <Text
                    variant={isActive ? 'bold' : 'medium'}
                    fontSize={12}
                    color={isActive ? theme.colors.primary : theme.colors.textSecondary}
                  >
                    {t(option.labelKey)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomerFilterModal;
