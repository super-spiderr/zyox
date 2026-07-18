import React from 'react';
import { View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { X, User, Phone, Building2, BadgeCheck, MapPin, FileText } from 'lucide-react-native';
import { Text, Button } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import { Customer, CustomerType } from '@/store/customerStore';
import getStyles from './styles';

interface CustomerDetailModalProps {
  visible: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  visible,
  onClose,
  customer,
}) => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  const getCustomerTypeLabel = (type: CustomerType) => (type === 'BUSINESS' ? t('business') : t('individual'));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.bottomSheetOverlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.detailModalContainer} activeOpacity={1}>
          <View style={styles.grabber} />
          <View style={styles.modalHeader}>
            <Text variant="bold" style={styles.modalTitle}>
              Customer Details
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {customer && (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.detailModalContent}>
              <View style={styles.detailRow}>
                <View style={styles.detailIconWrap}>
                  <User size={16} color={theme.colors.primary} />
                </View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>{t('fullName') || 'Full Name'}</Text>
                  <Text variant="bold" style={styles.detailValue}>
                    {customer.customerName}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailIconWrap}>
                  <Phone size={16} color={theme.colors.primary} />
                </View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Primary Phone</Text>
                  <Text variant="bold" style={styles.detailValue}>
                    {customer.phoneNumber}
                  </Text>
                </View>
              </View>

              {customer.alternatePhoneNumber ? (
                <View style={styles.detailRow}>
                  <View style={styles.detailIconWrap}>
                    <Phone size={16} color={theme.colors.primary} />
                  </View>
                  <View style={styles.detailTextWrap}>
                    <Text style={styles.detailLabel}>{t('alternatePhoneNumber')}</Text>
                    <Text variant="bold" style={styles.detailValue}>
                      {customer.alternatePhoneNumber}
                    </Text>
                  </View>
                </View>
              ) : null}

              <View style={styles.detailRow}>
                <View style={styles.detailIconWrap}>
                  <Building2 size={16} color={theme.colors.primary} />
                </View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>{t('customerType')}</Text>
                  <Text variant="bold" style={styles.detailValue}>
                    {getCustomerTypeLabel(customer.customerType)}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailIconWrap}>
                  <BadgeCheck size={16} color={theme.colors.primary} />
                </View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>{t('status')}</Text>
                  <View
                    style={[
                      styles.statusPill,
                      customer.isActive ? styles.statusPillActive : styles.statusPillInactive,
                    ]}
                  >
                    <Text
                      variant="bold"
                      style={customer.isActive ? styles.statusPillTextActive : styles.statusPillTextInactive}
                    >
                      {customer.isActive ? t('active') : t('inactive')}
                    </Text>
                  </View>
                </View>
              </View>

              {customer.address ? (
                <View style={styles.detailRow}>
                  <View style={styles.detailIconWrap}>
                    <MapPin size={16} color={theme.colors.primary} />
                  </View>
                  <View style={styles.detailTextWrap}>
                    <Text style={styles.detailLabel}>{t('address')}</Text>
                    <Text variant="bold" style={styles.detailValue}>
                      {customer.address}
                    </Text>
                  </View>
                </View>
              ) : null}

              {customer.specialNotes ? (
                <View style={[styles.detailRow, styles.detailRowLast]}>
                  <View style={styles.detailIconWrap}>
                    <FileText size={16} color={theme.colors.primary} />
                  </View>
                  <View style={styles.detailTextWrap}>
                    <Text style={styles.detailLabel}>{t('notes')}</Text>
                    <Text variant="bold" style={styles.detailValue}>
                      {customer.specialNotes}
                    </Text>
                  </View>
                </View>
              ) : null}
            </ScrollView>
          )}

          <Button title="Close" onPress={onClose} style={styles.modalCloseBtn} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomerDetailModal;
