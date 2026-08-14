import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, FlatList, Alert, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ScreenContainer,
  Text,
  Skeleton,
  GradientHeader,
  GradientHeaderAction,
  SearchBar,
  EmptyState,
} from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import getStyles from './PackagesScreen.styles';
import { Package } from '@/api/package';
import { useInfinitePackages, useDeletePackage } from '@/hooks/queries';
import { useNavigation } from '@react-navigation/native';
import { Plus, Briefcase, Edit, Trash2 } from 'lucide-react-native';
import { PACKAGES_PAGE_SIZE } from '@/constants/package';

export const PackagesScreen: React.FC = () => {
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<any>();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebouncedSearch(searchQuery);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'ALL' | 'VEG' | 'NON_VEG'>('ALL');

  const {
    data: packagesData,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isRefetching,
    isFetchingNextPage,
  } = useInfinitePackages(PACKAGES_PAGE_SIZE, debouncedSearch);

  const packages = useMemo(() => {
    return packagesData?.pages.flatMap(page => page.packages) ?? [];
  }, [packagesData]);

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      return selectedTypeFilter === 'ALL' || pkg.packageType === selectedTypeFilter;
    });
  }, [packages, selectedTypeFilter]);

  // Type filtering happens client-side on already-fetched pages, so a sparse
  // filtered result can be shorter than the viewport and never trigger
  // FlatList's onEndReached. Keep pulling more pages until the filtered set
  // fills a page or there's nothing left to fetch.
  useEffect(() => {
    if (!isLoading && hasNextPage && !isFetchingNextPage && filteredPackages.length < PACKAGES_PAGE_SIZE) {
      fetchNextPage();
    }
  }, [filteredPackages.length, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  // Bento mosaic: alternate a full-width hero tile with a row of two smaller
  // tiles so the grid reads as varied tiles instead of a uniform card list.
  const rows = useMemo(() => {
    const result: { item: Package; index: number }[][] = [];
    let isHero = true;
    let i = 0;
    while (i < filteredPackages.length) {
      if (isHero) {
        result.push([{ item: filteredPackages[i], index: i }]);
        i += 1;
      } else {
        result.push(
          filteredPackages.slice(i, i + 2).map((item, offset) => ({ item, index: i + offset })),
        );
        i += 2;
      }
      isHero = !isHero;
    }
    return result;
  }, [filteredPackages]);

  // Delete mutation using centralized hooks
  const deleteMutation = useDeletePackage({
    onSuccess: () => {
      Alert.alert(t('success') || 'Success', t('packageDeletedSuccess') || 'Package deleted.');
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to delete package');
    },
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

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
      ],
    );
  };

  const renderPackageTile = (item: Package, index: number, isLarge: boolean) => {
    const isVeg = item.packageType === 'VEG';
    const accentBg = isVeg ? theme.colors.successBg : theme.colors.errorBg;
    const accentIcon = isVeg ? theme.colors.successText : theme.colors.errorText;
    const itemsCount = item.items?.length || 0;

    return (
      <TouchableOpacity
        key={item._id}
        style={[styles.tileBase, isLarge ? styles.tileLarge : styles.tileSmall]}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('CreatePackage', { editPackageId: item._id })}
      >
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.tileImage} />
        ) : (
          <View style={[styles.tilePlaceholder, { backgroundColor: accentBg }]}>
            {isLarge && (
              <>
                <View style={styles.tileDecorCircleLeft} pointerEvents="none" />
                <View style={styles.tileDecorCircleRight} pointerEvents="none" />
              </>
            )}
            <Briefcase size={isLarge ? 40 : 32} color={accentIcon} />
          </View>
        )}

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.75)']}
          style={styles.tileGradient}
          pointerEvents="none"
        />

        <View style={styles.tileTypeDot}>
          <View
            style={[
              styles.tileTypeDotInner,
              { backgroundColor: isVeg ? theme.colors.successText : theme.colors.errorText },
            ]}
          />
        </View>

        <View style={styles.tileActions}>
          <TouchableOpacity
            style={styles.tileActionButton}
            onPress={() => navigation.navigate('CreatePackage', { editPackageId: item._id })}
            activeOpacity={0.7}
          >
            <Edit size={13} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tileActionButton}
            onPress={() => handleDelete(item._id)}
            activeOpacity={0.7}
          >
            <Trash2 size={13} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.tileLabelWrap}>
          <Text style={isLarge ? styles.tileLabelLarge : styles.tileLabel} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.tileSubLabel} numberOfLines={1}>
            ₹{item.price} · {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRow = ({ item: row }: { item: { item: Package; index: number }[] }) => {
    if (row.length === 1) {
      return (
        <View style={styles.rowLarge}>{renderPackageTile(row[0].item, row[0].index, true)}</View>
      );
    }
    return (
      <View style={styles.rowPair}>
        {row.map(({ item, index }) => renderPackageTile(item, index, false))}
      </View>
    );
  };

  return (
    <ScreenContainer
      scrollable={false}
      contentContainerStyle={styles.container}
      statusBarBgColor="transparent"
      ignoreTopSafeArea
      statusBarStyle={isDark ? 'light-content' : 'dark-content'}
    >
      <GradientHeader
        title={t('packagesTitle')}
        description={t('packagesDesc') || 'Manage, search, and update catering packages.'}
        action={
          <GradientHeaderAction
            icon={<Plus size={16} color={theme.colors.primaryText} />}
            onPress={() => navigation.navigate('CreatePackage')}
          />
        }
      />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t('searchPackagesPlaceholder') || 'Search packages...'}
        style={styles.searchBar}
      />

      <View style={styles.body}>
        {/* Filters (Type Filter) */}
        <View style={styles.filtersContainer}>
          {(['ALL', 'VEG', 'NON_VEG'] as const).map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterChip,
                selectedTypeFilter === type ? styles.filterChipActive : undefined,
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedTypeFilter(type)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedTypeFilter === type ? styles.filterChipTextActive : undefined,
                ]}
              >
                {type === 'ALL' ? t('allTypes') || 'All Types' : type === 'VEG' ? t('veg') : t('nonVeg')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading ? (
          <View style={styles.list}>
            <Skeleton variant="rect" style={styles.skeletonHero} />
            <View style={styles.rowPair}>
              <Skeleton variant="rect" style={styles.skeletonSmall} />
              <Skeleton variant="rect" style={styles.skeletonSmall} />
            </View>
          </View>
        ) : (
          <FlatList
            data={rows}
            keyExtractor={row => row.map(({ item }) => item._id).join('-')}
            renderItem={renderRow}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            onRefresh={refetch}
            refreshing={isRefetching}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <EmptyState
                icon={<Briefcase size={48} color={theme.colors.textMuted} />}
                description={t('noPackagesFound')}
              />
            }
            ListFooterComponent={
              isFetchingNextPage ? (
                <View style={styles.endLoader}>
                  <ActivityIndicator size="small" color={theme.colors.primary} />
                </View>
              ) : null
            }
          />
        )}
      </View>
    </ScreenContainer>
  );
};

export default PackagesScreen;
