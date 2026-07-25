import React, { useState, useMemo, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { ScreenContainer, Text, SearchBar } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { ChevronLeft } from 'lucide-react-native';
import Contacts from 'react-native-contacts';
import { mapDeviceContact } from '@/utils/contacts';
import { DeviceContact } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectContact'>;

export const SelectContactScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  const [searchQuery, setSearchQuery] = useState('');
  const [deviceContacts, setDeviceContacts] = useState<DeviceContact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load device contacts immediately on mount
    setIsLoading(true);
    Contacts.getAll()
      .then(contactsList => {
        const mapped = contactsList
          .map(contact => mapDeviceContact(contact))
          .filter((contact): contact is DeviceContact => contact !== null);

        mapped.sort((a, b) => a.name.localeCompare(b.name));
        setDeviceContacts(mapped);
      })
      .catch(() => {
        Alert.alert(t('error'), t('failedToFetchContacts'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [t]);

  const filteredContacts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return deviceContacts;
    return deviceContacts.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q));
  }, [deviceContacts, searchQuery]);

  const handleSelectContact = (contact: DeviceContact) => {
    navigation.navigate('CreateCustomer', {
      selectedContact: contact,
    });
  };

  return (
    <ScreenContainer style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft color={theme.colors.primary} size={20} />
        </TouchableOpacity>
        <Text variant="h3" color="text">
          {t('selectContact')}
        </Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Search Input Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t('contactSearchPlaceholder')}
        showMicIcon={false}
        style={styles.searchBar}
      />

      {/* Loading Indicator */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={item => `${item.name}::${item.phone}`}
          style={styles.contactList}
          contentContainerStyle={styles.contactListContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text fontSize={14} color={theme.colors.textSecondary} style={styles.emptyText}>
                {deviceContacts.length === 0 ? t('noContactsFound') : t('noSearchResults')}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleSelectContact(item)}
              activeOpacity={0.7}
            >
              <View style={styles.contactAvatar}>
                <Text variant="bold" fontSize={15} color={theme.colors.primary}>
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.contactDetails}>
                <Text variant="bold" fontSize={14} color={theme.colors.text}>
                  {item.name}
                </Text>
                <Text
                  fontSize={12}
                  color={theme.colors.textSecondary}
                  style={styles.contactPhone}
                >
                  {item.phone}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </ScreenContainer>
  );
};
export default SelectContactScreen;
