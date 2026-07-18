import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  PermissionsAndroid,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer, Text, Button, Input, GradientHeader } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './CreateCustomerScreen.styles';
import { CustomerType } from '@/store/customerStore';
import { useCustomers, useCreateCustomer, useUpdateCustomer } from '@/hooks/queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { UserPlus, User, Building2, Phone, MapPin, FileText } from 'lucide-react-native';
import Contacts from 'react-native-contacts';

const customersIcon = require('@/assets/images/customers_icon.png');

type Props = NativeStackScreenProps<RootStackParamList, 'CreateCustomer'>;

export const CreateCustomerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const insets = useSafeAreaInsets();

  const editCustomerId = route.params?.editCustomerId;
  const { data: customers = [] } = useCustomers();
  const editCustomer = useMemo(() => {
    if (!editCustomerId) return null;
    return customers.find(c => (c._id || c.id) === editCustomerId) || null;
  }, [customers, editCustomerId]);

  interface CustomerFormState {
    customerName: string;
    phoneNumber: string;
    customerType: CustomerType;
    address: string;
    alternatePhoneNumber: string;
    specialNotes: string;
    isActive: boolean;
  }

  const initialFormState: CustomerFormState = {
    customerName: '',
    phoneNumber: '',
    customerType: 'INDIVIDUAL',
    address: '',
    alternatePhoneNumber: '',
    specialNotes: '',
    isActive: true,
  };

  const [form, setForm] = useState<CustomerFormState>(initialFormState);
  const [errors, setErrors] = useState<{ customerName?: string; phoneNumber?: string }>({});
  const [initialized, setInitialized] = useState(false);

  // Monitor returned contact selection from SelectContact screen
  useEffect(() => {
    const selectedContact = route.params?.selectedContact;
    if (selectedContact) {
      setForm(prev => ({
        ...prev,
        customerName: selectedContact.name,
        phoneNumber: selectedContact.phone,
      }));
      // Clear the params so they don't re-trigger on subsequent mounts
      navigation.setParams({ selectedContact: undefined } as any);
    }
  }, [route.params?.selectedContact, navigation]);

  useEffect(() => {
    if (editCustomer && !initialized) {
      setForm({
        customerName: editCustomer.customerName,
        phoneNumber: editCustomer.phoneNumber,
        customerType: editCustomer.customerType,
        address: editCustomer.address || '',
        alternatePhoneNumber: editCustomer.alternatePhoneNumber || '',
        specialNotes: editCustomer.specialNotes || '',
        isActive: editCustomer.isActive,
      });
      setInitialized(true);
    }
  }, [editCustomer, initialized]);

  const createMutation = useCreateCustomer({
    onSuccess: () => {
      navigation.navigate('Success', {
        title: t('success') || 'Success!',
        message: 'Customer created successfully!',
        buttonTitle: t('ok') || 'OK',
        navigateTo: 'Main',
        navigationParams: { screen: 'Customers' },
      });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to create customer');
    },
  });

  const updateMutation = useUpdateCustomer({
    onSuccess: () => {
      navigation.navigate('Success', {
        title: t('success') || 'Success!',
        message: 'Customer updated successfully!',
        buttonTitle: t('ok') || 'OK',
        navigateTo: 'Main',
        navigationParams: { screen: 'Customers' },
      });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update customer');
    },
  });

  const handleSave = () => {
    const newErrors: { customerName?: string; phoneNumber?: string } = {};

    const trimmedName = form.customerName.trim();
    if (!trimmedName) {
      newErrors.customerName = t('fieldRequired');
    } else if (trimmedName.length < 3 || trimmedName.length > 40) {
      newErrors.customerName = t('validationName');
    }

    const trimmedPhone = form.phoneNumber.trim();
    if (!trimmedPhone) {
      newErrors.phoneNumber = t('fieldRequired');
    } else if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
      newErrors.phoneNumber = t('validationPhone');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      customerName: trimmedName,
      phoneNumber: trimmedPhone,
      customerType: form.customerType,
      address: form.address.trim() || undefined,
      alternatePhoneNumber: form.alternatePhoneNumber.trim() || undefined,
      specialNotes: form.specialNotes.trim() || undefined,
      isActive: form.isActive,
    };

    if (editCustomerId) {
      updateMutation.mutate({
        id: editCustomerId,
        payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleAddFromContacts = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: t('contactsPermissionTitle') || 'Contacts Permission',
        message:
          t('contactsPermissionMessage') ||
          'This app requires access to your contacts to allow you to prefill client details.',
        buttonPositive: t('allow') || 'Allow',
      }).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigation.navigate('SelectContact');
        } else {
          Alert.alert('Permission Denied', 'Permission to access contacts was denied.');
        }
      });
    } else {
      // iOS
      Contacts.requestPermission().then((permission: string) => {
        if (permission === 'authorized') {
          navigation.navigate('SelectContact');
        } else {
          Alert.alert('Permission Denied', 'Permission to access contacts was denied.');
        }
      });
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <ScreenContainer
      style={styles.container}
      statusBarBgColor="transparent"
      ignoreTopSafeArea
      statusBarStyle={isDark ? 'dark-content' : 'light-content'}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        {/* Header — shared with the Customers list */}
        <GradientHeader
          title={editCustomerId ? `${t('edit')} ${t('tabCustomers')}` : t('createCustomer')}
          description={
            editCustomerId
              ? "Update this customer's information"
              : 'Fill in the details to add a new client'
          }
          image={customersIcon}
        />

        <ScrollView
          style={styles.formScrollView}
          contentContainerStyle={styles.formScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Quick Add from Contacts */}
          {!editCustomerId && (
            <TouchableOpacity style={styles.addFromContactsBtn} onPress={handleAddFromContacts}>
              <UserPlus size={16} color={theme.colors.primary} />
              <Text variant="bold" style={styles.addFromContactsText}>
                {t('addFromContacts')}
              </Text>
            </TouchableOpacity>
          )}

          <Text style={styles.sectionTitle}>Contact Info</Text>

          <Input
            label={`${t('customerName')} *`}
            placeholder={t('customerName')}
            value={form.customerName}
            onChangeText={text => {
              setForm(prev => ({ ...prev, customerName: text }));
              if (errors.customerName) {
                setErrors(prev => ({ ...prev, customerName: undefined }));
              }
            }}
            error={errors.customerName}
            icon={<User size={16} color={theme.colors.textMuted} />}
          />

          <Input
            label={`${t('phoneNumber')} *`}
            placeholder={t('phoneNumber')}
            value={form.phoneNumber}
            onChangeText={text => {
              setForm(prev => ({ ...prev, phoneNumber: text }));
              if (errors.phoneNumber) {
                setErrors(prev => ({ ...prev, phoneNumber: undefined }));
              }
            }}
            error={errors.phoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
            icon={<Phone size={16} color={theme.colors.textMuted} />}
          />

          <Input
            label={t('alternatePhoneNumber')}
            placeholder={t('alternatePhoneNumber')}
            value={form.alternatePhoneNumber}
            onChangeText={text => setForm(prev => ({ ...prev, alternatePhoneNumber: text }))}
            keyboardType="phone-pad"
            maxLength={10}
            icon={<Phone size={16} color={theme.colors.textMuted} />}
          />

          <Text style={styles.sectionTitle}>{t('customerType')}</Text>
          <View style={styles.typeRow}>
            <TouchableOpacity
              style={[styles.typeCard, form.customerType === 'INDIVIDUAL' && styles.typeCardActive]}
              onPress={() => setForm(prev => ({ ...prev, customerType: 'INDIVIDUAL' }))}
              activeOpacity={0.7}
            >
              <View style={styles.typeCardIconWrap}>
                <User size={16} color={theme.colors.primary} />
              </View>
              <Text
                variant={form.customerType === 'INDIVIDUAL' ? 'bold' : 'medium'}
                style={[
                  styles.typeCardText,
                  form.customerType === 'INDIVIDUAL' && styles.typeCardTextActive,
                ]}
              >
                {t('individual')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeCard, form.customerType === 'BUSINESS' && styles.typeCardActive]}
              onPress={() => setForm(prev => ({ ...prev, customerType: 'BUSINESS' }))}
              activeOpacity={0.7}
            >
              <View style={styles.typeCardIconWrap}>
                <Building2 size={16} color={theme.colors.primary} />
              </View>
              <Text
                variant={form.customerType === 'BUSINESS' ? 'bold' : 'medium'}
                style={[
                  styles.typeCardText,
                  form.customerType === 'BUSINESS' && styles.typeCardTextActive,
                ]}
              >
                {t('business')}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Additional Details</Text>

          <Input
            label={t('address')}
            placeholder={t('address')}
            value={form.address}
            onChangeText={text => setForm(prev => ({ ...prev, address: text }))}
            multiline
            numberOfLines={3}
            icon={<MapPin size={16} color={theme.colors.textMuted} />}
          />

          <Input
            label={t('notes')}
            placeholder={t('notes')}
            value={form.specialNotes}
            onChangeText={text => setForm(prev => ({ ...prev, specialNotes: text }))}
            multiline
            numberOfLines={3}
            icon={<FileText size={16} color={theme.colors.textMuted} />}
          />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelWrap}>
              <Text style={styles.switchLabel}>{t('isActive')}</Text>
              <Text style={styles.switchHint}>
                {form.isActive ? t('active') : t('inactive')}
              </Text>
            </View>
            <Switch
              value={form.isActive}
              onValueChange={val => setForm(prev => ({ ...prev, isActive: val }))}
              trackColor={{ false: theme.colors.border, true: theme.colors.primaryLight }}
              thumbColor={form.isActive ? theme.colors.primary : theme.colors.textSecondary}
            />
          </View>
        </ScrollView>

        {/* Fixed footer — always visible, doesn't scroll with the form */}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <Button
            title={editCustomerId ? t('saveChanges') : t('create')}
            onPress={handleSave}
            loading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default CreateCustomerScreen;
