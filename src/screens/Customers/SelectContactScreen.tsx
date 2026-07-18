import React, { useState, useMemo, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ScreenContainer, Text } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { ChevronLeft, Search, X } from 'lucide-react-native';
import Contacts from 'react-native-contacts';
import { widthScale, heightScale } from '@/utils/scaling';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectContact'>;

export const SelectContactScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  const [searchQuery, setSearchQuery] = useState('');
  const [deviceContacts, setDeviceContacts] = useState<{ name: string; phone: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load device contacts immediately on mount
    setIsLoading(true);
    Contacts.getAll()
      .then(contactsList => {
        const mapped = contactsList
          .map(c => {
            const name = [c.givenName, c.middleName, c.familyName].filter(Boolean).join(' ');
            let phone = c.phoneNumbers?.[0]?.number?.replace(/[^0-9]/g, '') || '';
            // If it starts with 91 and has 12 digits, strip 91:
            if (phone.length === 12 && phone.startsWith('91')) {
              phone = phone.substring(2);
            }
            return { name, phone };
          })
          .filter(c => c.name && c.phone);

        // Sort contacts alphabetically
        mapped.sort((a, b) => a.name.localeCompare(b.name));
        setDeviceContacts(mapped);
      })
      .catch(err => {
        console.error('Error fetching contacts:', err);
        Alert.alert('Error', 'Failed to fetch device contacts.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredContacts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return deviceContacts;
    return deviceContacts.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q));
  }, [deviceContacts, searchQuery]);

  const handleSelectContact = (contact: { name: string; phone: string }) => {
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
          {t('selectContact') || 'Select Contact'}
        </Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchContainer}>
        <Search size={18} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('contactSearchPlaceholder') || 'Search contacts by name or phone...'}
          placeholderTextColor={theme.colors.textSecondary + '70'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <X size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Loading Indicator */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item, index) => item.phone + index}
          style={styles.contactList}
          contentContainerStyle={styles.contactListContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {deviceContacts.length === 0
                  ? t('noContactsFound') || 'No contacts found on device.'
                  : t('noSearchResults') || 'No matching contacts.'}
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
                <Text style={styles.contactAvatarText}>
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </ScreenContainer>
  );
};

const getStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: widthScale(20),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightScale(16),
      marginTop: heightScale(10),
    },
    backButton: {
      width: widthScale(34),
      height: widthScale(34),
      borderRadius: widthScale(10),
      backgroundColor: theme.colors.infoSurfaceBg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerRightPlaceholder: {
      width: widthScale(34),
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: widthScale(12),
      paddingHorizontal: widthScale(14),
      marginBottom: heightScale(16),
      height: heightScale(46),
    },
    searchIcon: {
      marginRight: widthScale(8),
    },
    searchInput: {
      flex: 1,
      color: theme.colors.text,
      fontFamily: theme.typography.fonts.urbanist.regular,
      fontSize: widthScale(13),
      padding: 0,
    },
    clearButton: {
      padding: widthScale(4),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contactList: {
      flex: 1,
    },
    contactListContent: {
      paddingBottom: heightScale(30),
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightScale(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    contactAvatar: {
      width: widthScale(40),
      height: widthScale(40),
      borderRadius: widthScale(20),
      backgroundColor: theme.colors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: widthScale(12),
    },
    contactAvatarText: {
      fontSize: widthScale(15),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.primary,
    },
    contactDetails: {
      flex: 1,
    },
    contactName: {
      fontSize: widthScale(14),
      fontFamily: theme.typography.fonts.urbanist.bold,
      color: theme.colors.text,
    },
    contactPhone: {
      fontSize: widthScale(12),
      fontFamily: theme.typography.fonts.urbanist.regular,
      color: theme.colors.textSecondary,
      marginTop: heightScale(2),
    },
    emptyContainer: {
      paddingVertical: heightScale(60),
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: widthScale(14),
      fontFamily: theme.typography.fonts.urbanist.medium,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });
};

export default SelectContactScreen;
