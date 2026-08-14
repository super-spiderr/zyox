import React, { useMemo } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { ScreenContainer, Text, GradientHeader, EmptyState } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './CategoryDetailScreen.styles';
import { useProducts, usePackages } from '@/hooks/queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { UtensilsCrossed, Briefcase, ChevronRight } from 'lucide-react-native';
import { Product } from '@/api/product';
import { Package } from '@/api/package';

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryDetail'>;

export const CategoryDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  const { data: products = [], isLoading: isProductsLoading } = useProducts();
  const { data: packages = [], isLoading: isPackagesLoading } = usePackages();

  const categoryProducts = useMemo(
    () => products.filter(p => p.categoryIds?.includes(categoryId)),
    [products, categoryId],
  );

  const categoryProductIds = useMemo(
    () => new Set(categoryProducts.map(p => p._id)),
    [categoryProducts],
  );

  const categoryPackages = useMemo(
    () => packages.filter(pkg => pkg.items?.some(i => categoryProductIds.has(i.itemId))),
    [packages, categoryProductIds],
  );

  const isLoading = isProductsLoading || isPackagesLoading;

  const renderProduct = (product: Product) => (
    <TouchableOpacity
      key={product._id}
      style={styles.itemCard}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('CreateProduct', { editProductId: product._id })}
    >
      {product.imageUrl ? (
        <Image source={{ uri: product.imageUrl }} style={styles.itemImage} />
      ) : (
        <View style={styles.itemPlaceholder}>
          <UtensilsCrossed size={18} color={theme.colors.primary} />
        </View>
      )}
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>
          {product.productName}
        </Text>
        <Text style={styles.itemMeta}>
          ₹{product.price} / {product.unit}
        </Text>
      </View>
      <ChevronRight size={18} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderPackage = (pkg: Package) => (
    <TouchableOpacity
      key={pkg._id}
      style={styles.itemCard}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('CreatePackage', { editPackageId: pkg._id })}
    >
      {pkg.imageUrl ? (
        <Image source={{ uri: pkg.imageUrl }} style={styles.itemImage} />
      ) : (
        <View style={styles.itemPlaceholder}>
          <Briefcase size={18} color={theme.colors.primary} />
        </View>
      )}
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>
          {pkg.name}
        </Text>
        <Text style={styles.itemMeta}>
          ₹{pkg.price} · {pkg.items?.length || 0} {pkg.items?.length === 1 ? 'item' : 'items'}
        </Text>
      </View>
      <ChevronRight size={18} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <ScreenContainer
      scrollable
      contentContainerStyle={styles.container}
      statusBarBgColor="transparent"
      ignoreTopSafeArea
      statusBarStyle={isDark ? 'light-content' : 'dark-content'}
    >
      <GradientHeader
        title={categoryName}
        description={t('categoryItemsDesc') || 'Products & packages in this category'}
      />

      <View style={styles.body}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('products') || 'Products'}</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{categoryProducts.length}</Text>
              </View>
            </View>
            {categoryProducts.length === 0 ? (
              <EmptyState
                icon={<UtensilsCrossed size={40} color={theme.colors.textMuted} />}
                description={t('noProductsFound')}
              />
            ) : (
              categoryProducts.map(renderProduct)
            )}

            <View style={[styles.sectionHeader, styles.sectionSpacing]}>
              <Text style={styles.sectionTitle}>{t('packages') || 'Packages'}</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{categoryPackages.length}</Text>
              </View>
            </View>
            {categoryPackages.length === 0 ? (
              <EmptyState
                icon={<Briefcase size={40} color={theme.colors.textMuted} />}
                description={t('noPackagesFound')}
              />
            ) : (
              categoryPackages.map(renderPackage)
            )}
          </>
        )}
      </View>
    </ScreenContainer>
  );
};

export default CategoryDetailScreen;
