import { Linking } from 'react-native';

export const callPhoneNumber = (phoneNumber: string): void => {
  Linking.openURL(`tel:${phoneNumber}`);
};

export const openWhatsApp = (phoneNumber: string): void => {
  const cleaned = phoneNumber.replace(/[^\d]/g, '');
  const formatted = cleaned.length === 10 ? `91${cleaned}` : cleaned;
  Linking.openURL(`https://wa.me/${formatted}`);
};
