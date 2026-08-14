import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, FlatList, Alert, Image, ActivityIndicator } from 'react-native';
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
import getStyles from './ProductsScreen.styles';
import { Product } from '@/api/product';
import { useInfiniteProducts, useDeleteProduct, useCategories, usePackages } from '@/hooks/queries';
import { useNavigation } from '@react-navigation/native';
import { Plus, UtensilsCrossed, Edit, Trash2 } from 'lucide-react-native';
import { PRODUCTS_PAGE_SIZE } from '@/constants/product';

export const ProductsScreen: React.FC = () => {
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<any>();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebouncedSearch(searchQuery);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'ALL' | 'VEG' | 'NON_VEG'>('ALL');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');

  const {
    data: productsData,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteProducts(PRODUCTS_PAGE_SIZE, debouncedSearch);

  // Query categories list (for filtering + name lookup)
  const { data: categories = [] } = useCategories();
  // Full package list (for warning when deleting a product referenced by packages)
  const { data: packages = [] } = usePackages();

  const products = useMemo(() => {
    return productsData?.pages.flatMap(page => page.products) ?? [];
  }, [productsData]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesType = selectedTypeFilter === 'ALL' || p.productType === selectedTypeFilter;
      const matchesCategory =
        selectedCategoryFilter === 'ALL' || p.categoryIds?.includes(selectedCategoryFilter);
      return matchesType && matchesCategory;
    });
  }, [products, selectedTypeFilter, selectedCategoryFilter]);

  // Type/category filtering happens client-side on already-fetched pages, so
  // a sparse filtered result can be shorter than the viewport and never
  // trigger FlatList's onEndReached. Keep pulling more pages until the
  // filtered set fills a page or there's nothing left to fetch.
  useEffect(() => {
    if (!isLoading && hasNextPage && !isFetchingNextPage && filteredProducts.length < PRODUCTS_PAGE_SIZE) {
      fetchNextPage();
    }
  }, [filteredProducts.length, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  // Delete mutation via centralized hooks
  const deleteMutation = useDeleteProduct({
    onSuccess: () => {
      Alert.alert(t('success') || 'Success', t('productDeletedSuccess') || 'Product deleted.');
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to delete product');
    },
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleDelete = (id: string) => {
    const referencingPackages = packages.filter(pkg =>
      pkg.items?.some(item => item.itemId === id),
    );
    const message =
      referencingPackages.length > 0
        ? t('deleteProductInUseMessage', { count: referencingPackages.length }) ||
          `This product is used in ${referencingPackages.length} package(s). Deleting it will leave those packages with a missing item. Continue?`
        : t('deleteConfirmMessage') || 'Are you sure you want to delete this product?';

    Alert.alert(t('deleteConfirmTitle') || 'Delete Product', message, [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('delete'),
        style: 'destructive',
        onPress: () => deleteMutation.mutate(id),
      },
    ]);
  };

  const getCategoryNames = (catIds: string[]) => {
    if (!catIds || catIds.length === 0) return 'Uncategorized';
    return catIds
      .map(id => categories.find(c => c._id === id)?.categoryName)
      .filter(Boolean)
      .join(', ');
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <UtensilsCrossed size={20} color={theme.colors.primary} />
        </View>
      )}

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.priceUnitText}>
          ₹{item.price} / {item.unit}
        </Text>

        <View style={styles.productMetaRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText} numberOfLines={1}>
              {getCategoryNames(item.categoryIds)}
            </Text>
          </View>

          <View
            style={[
              styles.typeBadge,
              item.productType === 'VEG' ? styles.badge_veg : styles.badge_nonveg,
            ]}
          >
            <Text
              style={[
                styles.typeBadgeText,
                item.productType === 'VEG' ? styles.badgeText_veg : styles.badgeText_nonveg,
              ]}
            >
              {item.productType === 'VEG' ? t('veg') : t('nonVeg')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CreateProduct', { editProductId: item._id })}
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
      statusBarStyle={'light-content'}
    >
      <GradientHeader
        title={t('productsTitle')}
        description={t('productsDesc') || 'Manage, search, and update products.'}
        action={
          <GradientHeaderAction
            icon={<Plus size={16} color={theme.colors.primaryText} />}
            onPress={() => navigation.navigate('CreateProduct')}
          />
        }
      />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t('searchProductsPlaceholder') || 'Search products...'}
        style={styles.searchBar}
      />

      <View style={styles.body}>
        {/* Filters */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={styles.filterDropdown}
            onPress={() => {
              setSelectedTypeFilter(prev => {
                if (prev === 'ALL') return 'VEG';
                if (prev === 'VEG') return 'NON_VEG';
                return 'ALL';
              });
            }}
          >
            <Text style={styles.filterText}>
              Type:{' '}
              {selectedTypeFilter === 'ALL'
                ? 'All'
                : selectedTypeFilter === 'VEG'
                ? t('veg')
                : t('nonVeg')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterDropdown}
            onPress={() => {
              Alert.alert(t('selectCategory') || 'Filter Category', '', [
                { text: 'All', onPress: () => setSelectedCategoryFilter('ALL') },
                ...categories.map(c => ({
                  text: c.categoryName,
                  onPress: () => setSelectedCategoryFilter(c._id),
                })),
                { text: t('cancel') || 'Cancel', style: 'cancel' },
              ]);
            }}
          >
            <Text style={styles.filterText} numberOfLines={1}>
              Category:{' '}
              {selectedCategoryFilter === 'ALL'
                ? 'All'
                : categories.find(c => c._id === selectedCategoryFilter)?.categoryName || 'All'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Main List */}
        {isLoading ? (
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
                    <Skeleton variant="rect" width={60} height={18} borderRadius={6} />
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
            data={filteredProducts}
            keyExtractor={item => item._id}
            renderItem={renderProductItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            refreshing={isRefetching}
            onRefresh={refetch}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <EmptyState
                icon={<UtensilsCrossed size={48} color={theme.colors.textMuted} />}
                description={t('noProductsFound')}
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

export default ProductsScreen;
