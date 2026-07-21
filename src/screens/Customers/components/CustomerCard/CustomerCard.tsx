import React from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { Phone } from 'lucide-react-native';
import { Text } from '@/components';
import { useStyles } from '@/hooks/useStyles';
import { Customer } from '@/store/customerStore';
import getStyles from './styles';
import Svg, { Path } from 'react-native-svg';

const WhatsAppIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = '#25D366',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12.012 2C6.48 2 2.01 6.47 2.01 12c0 1.91.53 3.69 1.46 5.25L2 22l4.92-1.28c1.5.83 3.21 1.3 5.09 1.3 5.53 0 10-4.47 10-10S17.54 2 12.012 2zM12 20c-1.66 0-3.2-.42-4.54-1.18l-.32-.18-2.92.76.77-2.82-.2-.32C3.96 15.01 3.5 13.56 3.5 12c0-4.69 3.81-8.5 8.5-8.5s8.5 3.81 8.5 8.5-3.81 8.5-8.5 8.5zm4.84-6.05c-.27-.13-1.58-.78-1.82-.87-.25-.09-.43-.13-.61.13-.18.27-.71.87-.87 1.05-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.11-.55.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.61-1.47-.84-2.02-.22-.53-.45-.45-.61-.46-.16 0-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.94 4.67 4.12.65.28 1.16.45 1.56.58.66.21 1.25.18 1.73.11.53-.08 1.58-.65 1.8-1.27.22-.63.22-1.16.16-1.27-.07-.12-.25-.19-.52-.32z"
      fill={color}
    />
  </Svg>
);

interface CustomerCardProps {
  customer: Customer;
  onPress: () => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onPress }) => {
  const styles = useStyles(getStyles);

  const getInitials = (name: string) => {
    if (!name) return 'C';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts.at(-1)!.charAt(0)).toUpperCase();
  };

  const getAvatarColors = (name: string) => {
    const colors = [
      { bg: '#EAE8FF', text: '#431DB0' }, // light purple
      { bg: '#FFFBE0', text: '#7A5101' }, // tan/yellow
      { bg: '#E6F4EA', text: '#137333' }, // light green
      { bg: '#E2F0FD', text: '#0B57D0' }, // light blue
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % colors.length;
    return colors[idx];
  };

  const handleCall = (e: any) => {
    e.stopPropagation();
    Linking.openURL(`tel:${customer.phoneNumber}`);
  };

  const handleWhatsApp = (e: any) => {
    e.stopPropagation();
    const cleaned = customer.phoneNumber.replace(/[^\d]/g, '');
    const formatted = cleaned.length === 10 ? `91${cleaned}` : cleaned;
    Linking.openURL(`https://wa.me/${formatted}`);
  };

  const avatarColor = getAvatarColors(customer.customerName);

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.avatarWrap}>
          <View style={[styles.avatarContainer, { backgroundColor: avatarColor.bg }]}>
            <Text variant="bold" style={[styles.avatarText, { color: avatarColor.text }]}>
              {getInitials(customer.customerName)}
            </Text>
          </View>
        </View>

        <View style={styles.customerInfo}>
          <Text variant="semibold" style={styles.nameText} numberOfLines={1}>
            {customer.customerName}
          </Text>
          <Text style={styles.phoneText} numberOfLines={1}>
            {customer.phoneNumber}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionBtn]} onPress={handleCall} activeOpacity={0.7}>
            <Phone size={18} color="#431DB0" fill="#431DB0" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn]} onPress={handleWhatsApp} activeOpacity={0.7}>
            <WhatsAppIcon size={18} color="#137333" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerCard;
