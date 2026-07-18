import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Phone, ChevronRight } from 'lucide-react-native';
import { Text } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import { Customer, CustomerType } from '@/store/customerStore';
import getStyles from './styles';

interface CustomerCardProps {
  customer: Customer;
  onPress: () => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onPress }) => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  const getInitials = (name: string) => {
    if (!name) return 'C';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts.at(-1)!.charAt(0)).toUpperCase();
  };

  const isBusiness = customer.customerType === 'BUSINESS';
  const typeSuffix = isBusiness ? '_business' : '_individual';
  const getTypeLabel = (type: CustomerType) => (type === 'BUSINESS' ? t('business') : t('individual'));

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.avatarWrap}>
          <View style={[styles.avatarContainer, styles[`avatarContainer${typeSuffix}`]]}>
            <Text variant="bold" style={[styles.avatarText, styles[`avatarText${typeSuffix}`]]}>
              {getInitials(customer.customerName)}
            </Text>
          </View>
          <View
            style={[
              styles.statusDot,
              customer.isActive ? styles.statusDot_active : styles.statusDot_inactive,
            ]}
          />
        </View>

        <View style={styles.customerInfo}>
          <View style={styles.nameRow}>
            <Text variant="bold" style={styles.nameText} numberOfLines={1}>
              {customer.customerName}
            </Text>
          </View>
          <View style={styles.phoneRow}>
            <Phone size={12} color={theme.colors.textSecondary} style={styles.phoneIcon} />
            <Text style={styles.detailText}>{customer.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.trailing}>
          <View style={[styles.badge, styles[`badge${typeSuffix}`]]}>
            <Text variant="bold" style={[styles.badgeText, styles[`badgeText${typeSuffix}`]]}>
              {getTypeLabel(customer.customerType)}
            </Text>
          </View>
          <ChevronRight size={16} color={theme.colors.textMuted} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerCard;
