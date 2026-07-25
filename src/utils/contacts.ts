import { Contact } from 'react-native-contacts';
import { DeviceContact } from '@/screens/Customers/types';
import { isValidIndianMobileNumber } from '@/utils/validation';

const normalizePhone = (rawNumber: string): string => {
  let phone = rawNumber.replace(/\D/g, '');
  if (phone.length === 12 && phone.startsWith('91')) {
    phone = phone.substring(2);
  }
  return phone;
};

/**
 * Normalizes a device Contact into a { name, phone } pair. A contact can list
 * several numbers (mobile, landline, work); this prefers the first one that
 * looks like a valid mobile number over blindly taking index 0, since a
 * landline listed first would otherwise silently fail form validation later.
 */
export const mapDeviceContact = (contact: Contact): DeviceContact | null => {
  const name = [contact.givenName, contact.middleName, contact.familyName]
    .filter(Boolean)
    .join(' ');

  const candidatePhones = (contact.phoneNumbers ?? [])
    .map(entry => normalizePhone(entry.number || ''))
    .filter(phone => phone.length > 0);

  const phone = candidatePhones.find(isValidIndianMobileNumber) ?? candidatePhones[0] ?? '';

  if (!name || !phone) return null;
  return { name, phone };
};
