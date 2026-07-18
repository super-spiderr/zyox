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
import getStyles from './ProductsScreen.styles';
import { Product } from '@/api/product';
import { useProducts, useDeleteProduct, useCategories } from '@/hooks/queries';
import { useNavigation } from '@react-navigation/native';
import { Search, Plus, UtensilsCrossed, Edit, Trash2 } from 'lucide-react-native';

const productsIcon = require('@/assets/images/products_icon.png');

export const ProductsScreen: React.FC = () => {
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<any>();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'ALL' | 'VEG' | 'NON_VEG'>('ALL');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');

  // Query products list via centralized hooks
  const {
    data: products = [],
    isLoading: isProductsLoading,
    refetch: refetchProducts,
  } = useProducts();

  // Query categories list (for filtering)
  const { data: categories = [] } = useCategories();

  // Delete mutation via centralized hooks
  const deleteMutation = useDeleteProduct({
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to delete product');
    },
  });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.productName.toLowerCase().includes(searchQuery.trim().toLowerCase());
      const matchesType = selectedTypeFilter === 'ALL' || p.productType === selectedTypeFilter;
      const matchesCategory =
        selectedCategoryFilter === 'ALL' || p.categoryIds?.includes(selectedCategoryFilter);
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [products, searchQuery, selectedTypeFilter, selectedCategoryFilter]);

  const handleDelete = (id: string) => {
    Alert.alert(
      t('deleteConfirmTitle') || 'Delete Product',
      t('deleteConfirmMessage') || 'Are you sure you want to delete this product?',
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
      statusBarStyle={isDark ? 'dark-content' : 'light-content'}
    >
      <GradientHeader
        title={t('productsTitle')}
        description={t('productsDesc') || 'Manage, search, and update products.'}
        count={isProductsLoading ? undefined : filteredProducts.length}
        countLabel={filteredProducts.length === 1 ? 'Product' : 'Products'}
        image={productsIcon}
        action={
          <GradientHeaderAction
            icon={<Plus size={16} color={theme.colors.primaryText} />}
            onPress={() => navigation.navigate('CreateProduct')}
          />
        }
      />

      <View style={styles.body}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Search size={18} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchProductsPlaceholder') || 'Search products...'}
            placeholderTextColor={theme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

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
              Type: {selectedTypeFilter === 'ALL' ? 'All' : selectedTypeFilter === 'VEG' ? t('veg') : t('nonVeg')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterDropdown}
            onPress={() => {
              Alert.alert(
                t('selectCategory') || 'Filter Category',
                '',
                [
                  { text: 'All', onPress: () => setSelectedCategoryFilter('ALL') },
                  ...categories.map(c => ({
                    text: c.categoryName,
                    onPress: () => setSelectedCategoryFilter(c._id),
                  })),
                  { text: t('cancel') || 'Cancel', style: 'cancel' },
                ]
              );
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
        {isProductsLoading ? (
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
            contentContainerStyle={styles.list}
            refreshing={isProductsLoading}
            onRefresh={refetchProducts}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <UtensilsCrossed size={48} color={theme.colors.textMuted} />
                <Text style={styles.emptyStateText}>{t('noProductsFound')}</Text>
              </View>
            }
          />
        )}
      </View>
    </ScreenContainer>
  );
};

export default ProductsScreen;
