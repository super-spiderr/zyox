import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { ShoppingCart, History, Eye, Edit, Trash2, X } from 'lucide-react-native';
import { Text } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import { Customer } from '@/store/customerStore';
import getStyles from './styles';

interface CustomerActionSheetProps {
  visible: boolean;
  onClose: () => void;
  customer: Customer | null;
  onCreateOrder: () => void;
  onViewOrderHistory: () => void;
  onViewDetails: () => void;
  onEditDetails: () => void;
  onDelete: () => void;
}

export const CustomerActionSheet: React.FC<CustomerActionSheetProps> = ({
  visible,
  onClose,
  customer,
  onCreateOrder,
  onViewOrderHistory,
  onViewDetails,
  onEditDetails,
  onDelete,
}) => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  const getInitials = (name: string) => {
    if (!name) return 'C';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts.at(-1)!.charAt(0)).toUpperCase();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.bottomSheetOverlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.bottomSheetContainer} activeOpacity={1}>
          <View style={styles.grabber} />

          {/* Header info inside sheet */}
          {customer && (
            <View style={styles.bottomSheetHeader}>
              <View style={styles.bottomSheetAvatar}>
                <Text variant="bold" style={styles.bottomSheetAvatarText}>
                  {getInitials(customer.customerName)}
                </Text>
              </View>
              <View style={styles.bottomSheetInfo}>
                <Text variant="bold" style={styles.bottomSheetName}>
                  {customer.customerName}
                </Text>
                <Text style={styles.bottomSheetPhone}>{customer.phoneNumber}</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <X size={16} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
          )}

          {/* List of actions */}
          <TouchableOpacity style={styles.bottomSheetItem} onPress={onCreateOrder} activeOpacity={0.7}>
            <View style={styles.bottomSheetItemIconWrap}>
              <ShoppingCart size={17} color={theme.colors.primary} />
            </View>
            <Text style={styles.bottomSheetItemText}>{t('createOrder') || 'Create Order'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomSheetItem}
            onPress={onViewOrderHistory}
            activeOpacity={0.7}
          >
            <View style={styles.bottomSheetItemIconWrap}>
              <History size={17} color={theme.colors.primary} />
            </View>
            <Text style={styles.bottomSheetItemText}>
              {t('orderHistory') || 'View Order History'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomSheetItem} onPress={onViewDetails} activeOpacity={0.7}>
            <View style={styles.bottomSheetItemIconWrap}>
              <Eye size={17} color={theme.colors.primary} />
            </View>
            <Text style={styles.bottomSheetItemText}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomSheetItem} onPress={onEditDetails} activeOpacity={0.7}>
            <View style={styles.bottomSheetItemIconWrap}>
              <Edit size={17} color={theme.colors.primary} />
            </View>
            <Text style={styles.bottomSheetItemText}>{t('edit') || 'Edit Details'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomSheetItem} onPress={onDelete} activeOpacity={0.7}>
            <View style={[styles.bottomSheetItemIconWrap, styles.bottomSheetItemIconWrapDanger]}>
              <Trash2 size={17} color={theme.colors.error} />
            </View>
            <Text style={[styles.bottomSheetItemText, { color: theme.colors.error }]}>
              {t('delete') || 'Delete Customer'}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomerActionSheet;
