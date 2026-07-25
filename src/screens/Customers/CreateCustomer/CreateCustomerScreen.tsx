import React, { useState, useEffect } from 'react';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  Text,
  Button,
  Input,
  GradientHeader,
  GradientHeaderAction,
} from '@/components';
import { CustomerTypeCard } from '../components/CustomerTypeCard';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { CustomerType } from '@/enums/customer';
import { useCustomer, useCreateCustomer, useUpdateCustomer } from '@/hooks/queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { UserPlus, User, Building2, Phone, MapPin, FileText } from 'lucide-react-native';
import Contacts from 'react-native-contacts';
import type { AxiosError } from 'axios';
import { CustomerFormState, CustomerFormErrors } from '../types';
import { isValidIndianMobileNumber } from '@/utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateCustomer'>;

export const CreateCustomerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const insets = useSafeAreaInsets();

  const editCustomerId = route.params?.editCustomerId;
  const { data: editCustomer = null } = useCustomer(editCustomerId);

  const initialFormState: CustomerFormState = {
    customerName: '',
    phoneNumber: '',
    customerType: CustomerType.INDIVIDUAL,
    address: '',
    alternatePhoneNumber: '',
    specialNotes: '',
  };

  const [form, setForm] = useState<CustomerFormState>(initialFormState);
  const [errors, setErrors] = useState<CustomerFormErrors>({});
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
      navigation.setParams({ selectedContact: undefined });
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
      });
      setInitialized(true);
    }
  }, [editCustomer, initialized]);

  const navigateToSuccessScreen = (message: string) => {
    navigation.navigate('Success', {
      title: t('success'),
      message,
      buttonTitle: t('ok'),
      navigateTo: 'Main',
      navigationParams: { screen: 'Customers' },
    });
  };

  const createMutation = useCreateCustomer({
    onSuccess: () => {
      navigateToSuccessScreen(t('customerCreatedSuccess'));
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      Alert.alert(t('error'), err.response?.data?.message || t('failedToCreateCustomer'));
    },
  });

  const updateMutation = useUpdateCustomer({
    onSuccess: () => {
      navigateToSuccessScreen(t('customerUpdatedSuccess'));
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      Alert.alert(t('error'), err.response?.data?.message || t('failedToUpdateCustomer'));
    },
  });

  const handleSave = () => {
    const newErrors: CustomerFormErrors = {};

    const trimmedName = form.customerName.trim();
    if (!trimmedName) {
      newErrors.customerName = t('fieldRequired');
    } else if (trimmedName.length < 3 || trimmedName.length > 40) {
      newErrors.customerName = t('validationName');
    }

    const trimmedPhone = form.phoneNumber.trim();
    if (!trimmedPhone) {
      newErrors.phoneNumber = t('fieldRequired');
    } else if (!isValidIndianMobileNumber(trimmedPhone)) {
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

  const showContactsPermissionDeniedAlert = () => {
    Alert.alert(t('permissionDenied'), t('permissionDeniedMessage'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('openSettings'), onPress: () => Linking.openSettings() },
    ]);
  };

  const handleAddFromContacts = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: t('contactsPermissionTitle'),
        message: t('contactsPermissionMessage'),
        buttonPositive: t('allow'),
      }).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigation.navigate('SelectContact');
        } else {
          showContactsPermissionDeniedAlert();
        }
      });
    } else {
      // iOS
      Contacts.requestPermission().then((permission: string) => {
        if (permission === 'authorized') {
          navigation.navigate('SelectContact');
        } else {
          showContactsPermissionDeniedAlert();
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
      statusBarStyle={'light-content'}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        {/* Header — shared with the Customers list */}
        <GradientHeader
          title={editCustomerId ? `${t('edit')} ${t('tabCustomers')}` : t('createCustomer')}
          description={editCustomerId ? t('editCustomerDesc') : t('createCustomerDesc')}
          action={
            !editCustomerId ? (
              <GradientHeaderAction
                icon={<UserPlus size={16} color={theme.colors.primaryText} />}
                onPress={handleAddFromContacts}
              />
            ) : undefined
          }
        />

        <ScrollView
          style={styles.formScrollView}
          contentContainerStyle={styles.formScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text variant="semiBold" fontSize={20} style={styles.sectionTitle}>
            {t('clientInfo')}
          </Text>

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

          <Text variant="semiBold" fontSize={20} style={styles.sectionTitle}>
            {t('customerType')}
          </Text>
          <View style={styles.typeRow}>
            <CustomerTypeCard
              icon={<User size={16} color={theme.colors.primary} />}
              label={t('individual')}
              active={form.customerType === CustomerType.INDIVIDUAL}
              onPress={() => setForm(prev => ({ ...prev, customerType: CustomerType.INDIVIDUAL }))}
            />
            <CustomerTypeCard
              icon={<Building2 size={16} color={theme.colors.primary} />}
              label={t('business')}
              active={form.customerType === CustomerType.BUSINESS}
              onPress={() => setForm(prev => ({ ...prev, customerType: CustomerType.BUSINESS }))}
            />
          </View>

          <Text variant="semiBold" fontSize={20} style={styles.sectionTitle}>
            {t('additionalDetails')}
          </Text>

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
