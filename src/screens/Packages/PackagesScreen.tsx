import React, { useState, useMemo } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import { ScreenContainer, Text, Skeleton, GradientHeader, GradientHeaderAction } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './PackagesScreen.styles';
import { Package } from '@/api/package';
import { usePackages, useDeletePackage } from '@/hooks/queries';
import { useNavigation } from '@react-navigation/native';
import { Search, Plus, Briefcase, Edit, Trash2, X } from 'lucide-react-native';

const packagesIcon = require('@/assets/images/packages_icon.png');

export const PackagesScreen: React.FC = () => {
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<any>();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'ALL' | 'VEG' | 'NON_VEG'>('ALL');

  // Fetch packages using centralized hooks
  const {
    data: packages = [],
    isLoading: isPackagesLoading,
    refetch: refetchPackages,
  } = usePackages();

  // Delete mutation using centralized hooks
  const deleteMutation = useDeletePackage({
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to delete package');
    },
  });

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
      const matchesType = selectedTypeFilter === 'ALL' || pkg.packageType === selectedTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [packages, searchQuery, selectedTypeFilter]);

  const handleDelete = (id: string) => {
    Alert.alert(
      t('deletePackageConfirmTitle') || 'Delete Package',
      t('deletePackageConfirmMessage') || 'Are you sure you want to delete this package?',
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => deleteMutation.mutate(id),
        },
      ]
    );
  };

  const renderPackageItem = ({ item }: { item: Package }) => (
    <View style={styles.card}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.packageImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Briefcase size={24} color={theme.colors.primary} />
        </View>
      )}

      <View style={styles.packageInfo}>
        <Text style={styles.packageName}>{item.name}</Text>
        <Text style={styles.priceText}>₹{item.price}</Text>
        <View style={styles.packageMetaRow}>
          <Text style={styles.itemsCountText}>
            {item.items?.length || 0} {item.items?.length === 1 ? 'Item' : 'Items'}
          </Text>
          <View
            style={[
              styles.typeBadge,
              item.packageType === 'VEG' ? styles.badge_veg : styles.badge_nonveg,
            ]}
          >
            <Text
              style={[
                styles.typeBadgeText,
                item.packageType === 'VEG' ? styles.badgeText_veg : styles.badgeText_nonveg,
              ]}
            >
              {item.packageType === 'VEG' ? t('veg') : t('nonVeg')}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              item.isActive ? styles.badge_active : styles.badge_inactive,
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                item.isActive ? styles.badgeText_active : styles.badgeText_inactive,
              ]}
            >
              {item.isActive ? t('profileActive') : t('pending')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CreatePackage', { editPackageId: item._id })}
          activeOpacity={0.7}
        >
          <Edit size={16} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDelete(item._id)}
          activeOpacity={0.7}
        >
          <Trash2 size={16} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenContainer
      scrollable={false}
      contentContainerStyle={styles.container}
      statusBarBgColor="transparent"
      ignoreTopSafeArea
      statusBarStyle={isDark ? 'dark-content' : 'light-content'}
    >
      <GradientHeader
        title={t('packagesTitle')}
        description={t('packagesDesc') || 'Manage, search, and update catering packages.'}
        count={isPackagesLoading ? undefined : filteredPackages.length}
        countLabel={filteredPackages.length === 1 ? 'Package' : 'Packages'}
        image={packagesIcon}
        action={
          <GradientHeaderAction
            icon={<Plus size={16} color={theme.colors.primaryText} />}
            onPress={() => navigation.navigate('CreatePackage')}
          />
        }
      />

      <View style={styles.body}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Search size={18} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchPackagesPlaceholder') || 'Search packages...'}
            placeholderTextColor={theme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery('')}>
              <X size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filters (Type Filter) */}
        <View style={styles.filtersContainer}>
          {(['ALL', 'VEG', 'NON_VEG'] as const).map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                selectedTypeFilter === type ? styles.typeButtonActive : undefined,
                { flex: 0, paddingHorizontal: 12, height: 32, justifyContent: 'center' },
              ]}
              onPress={() => setSelectedTypeFilter(type)}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  selectedTypeFilter === type ? styles.typeButtonTextActive : undefined,
                ]}
              >
                {type === 'ALL' ? 'All Types' : type === 'VEG' ? t('veg') : t('nonVeg')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isPackagesLoading ? (
          <FlatList
            data={[1, 2, 3, 4]}
            keyExtractor={(item, index) => String(index)}
            contentContainerStyle={styles.list}
            renderItem={() => (
              <View style={styles.card}>
                <Skeleton variant="rect" width={54} height={54} borderRadius={12} />
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Skeleton variant="text" width="60%" height={16} style={{ marginBottom: 6 }} />
                  <Skeleton variant="text" width="30%" height={14} style={{ marginBottom: 8 }} />
                  <View style={{ flexDirection: 'row' }}>
                    <Skeleton variant="rect" width={50} height={18} borderRadius={6} />
                    <Skeleton
                      variant="rect"
                      width={50}
                      height={18}
                      borderRadius={6}
                      style={{ marginLeft: 8 }}
                    />
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <FlatList
            data={filteredPackages}
            keyExtractor={item => item._id}
            renderItem={renderPackageItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            onRefresh={refetchPackages}
            refreshing={isPackagesLoading}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Briefcase size={48} color={theme.colors.textMuted} />
                <Text style={styles.emptyStateText}>{t('noPackagesFound')}</Text>
              </View>
            }
          />
        )}
      </View>
    </ScreenContainer>
  );
};

export default PackagesScreen;
