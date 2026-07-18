import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { X } from 'lucide-react-native';
import { Text } from '@/components';
import { useAppTheme } from '@/theme';
import { useStyles } from '@/hooks/useStyles';
import { useLanguage } from '@/context/LanguageContext';
import getStyles from './styles';

interface CustomerFilterModalProps {
  visible: boolean;
  onClose: () => void;
  statusFilter: 'all' | 'active' | 'inactive';
  setStatusFilter: (status: 'all' | 'active' | 'inactive') => void;
  typeFilter: 'all' | 'individual' | 'business';
  setTypeFilter: (type: 'all' | 'individual' | 'business') => void;
}

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
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.bottomSheetOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity style={styles.bottomSheetContainer} activeOpacity={1}>
          <View style={styles.grabber} />
          <View style={styles.bottomSheetHeader}>
            <Text variant="bold" style={styles.bottomSheetName}>
              {t('filterCustomers') || 'Filter Customers'}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Status Section */}
          <Text style={styles.filterSectionTitle}>{t('status') || 'Status'}</Text>
          <View style={styles.filterOptionsContainer}>
            <TouchableOpacity
              style={[
                styles.filterOptionBtn,
                statusFilter === 'all' && styles.filterOptionBtnActive,
              ]}
              onPress={() => setStatusFilter('all')}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  statusFilter === 'all' && styles.filterOptionTextActive,
                ]}
              >
                {t('allStatuses') || 'All Statuses'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterOptionBtn,
                statusFilter === 'active' && styles.filterOptionBtnActive,
              ]}
              onPress={() => setStatusFilter('active')}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  statusFilter === 'active' && styles.filterOptionTextActive,
                ]}
              >
                {t('activeOnly') || 'Active Only'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterOptionBtn,
                statusFilter === 'inactive' && styles.filterOptionBtnActive,
              ]}
              onPress={() => setStatusFilter('inactive')}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  statusFilter === 'inactive' && styles.filterOptionTextActive,
                ]}
              >
                {t('inactiveOnly') || 'Inactive Only'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Type Section */}
          <Text style={styles.filterSectionTitle}>{t('customerType') || 'Customer Type'}</Text>
          <View style={styles.filterOptionsContainer}>
            <TouchableOpacity
              style={[
                styles.filterOptionBtn,
                typeFilter === 'all' && styles.filterOptionBtnActive,
              ]}
              onPress={() => setTypeFilter('all')}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  typeFilter === 'all' && styles.filterOptionTextActive,
                ]}
              >
                {t('allTypes') || 'All Types'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterOptionBtn,
                typeFilter === 'individual' && styles.filterOptionBtnActive,
              ]}
              onPress={() => setTypeFilter('individual')}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  typeFilter === 'individual' && styles.filterOptionTextActive,
                ]}
              >
                {t('individual') || 'Individual'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterOptionBtn,
                typeFilter === 'business' && styles.filterOptionBtnActive,
              ]}
              onPress={() => setTypeFilter('business')}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  typeFilter === 'business' && styles.filterOptionTextActive,
                ]}
              >
                {t('business') || 'Business'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomerFilterModal;
