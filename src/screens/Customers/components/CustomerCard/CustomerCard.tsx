import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Phone } from 'lucide-react-native';
import { Text, WhatsAppIcon } from '@/components';
import { useStyles } from '@/hooks/useStyles';
import { useAppTheme } from '@/theme';
import { callPhoneNumber, openWhatsApp } from '@/utils/contactActions';
import { getInitials, getAvatarColors } from '@/utils/avatar';
import { CustomerCardProps } from '../../types';
import getStyles from './styles';

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onPress }) => {
  const styles = useStyles(getStyles);
  const { theme } = useAppTheme();

  const handleCall = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    callPhoneNumber(customer.phoneNumber);
  };

  const handleWhatsApp = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    openWhatsApp(customer.phoneNumber);
  };

  const avatarColor = getAvatarColors(customer.customerName, theme.colors.avatarPalette);

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.avatarWrap}>
          <View style={[styles.avatarContainer, { backgroundColor: avatarColor.bg }]}>
            <Text variant="bold" fontSize={15} color={avatarColor.text}>
              {getInitials(customer.customerName)}
            </Text>
          </View>
        </View>

        <View style={styles.customerInfo}>
          <Text variant="semibold" fontSize={15} color={theme.colors.text} numberOfLines={1}>
            {customer.customerName}
          </Text>
          <Text fontSize={12} color={theme.colors.textSecondary} style={styles.phoneText} numberOfLines={1}>
            {customer.phoneNumber}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleCall} activeOpacity={0.7}>
            <Phone size={18} color={theme.colors.callIcon} fill={theme.colors.callIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleWhatsApp} activeOpacity={0.7}>
            <WhatsAppIcon size={18} color={theme.colors.whatsappIcon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerCard;
