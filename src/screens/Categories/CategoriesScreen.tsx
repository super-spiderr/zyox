import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
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
import getStyles from './CategoriesScreen.styles';
import { Category } from '@/api/category';
import { useInfiniteCategories } from '@/hooks/queries';
import { useNavigation } from '@react-navigation/native';
import { Plus, Layers, Edit } from 'lucide-react-native';
import { CATEGORIES_PAGE_SIZE } from '@/constants/category';

const TILE_ACCENTS = (theme: ReturnType<typeof useAppTheme>['theme']) => [
  { bg: theme.colors.infoBg, icon: theme.colors.infoText },
  { bg: theme.colors.purpleBg, icon: theme.colors.purpleText },
  { bg: theme.colors.warningBg, icon: theme.colors.warningText },
  { bg: theme.colors.successBg, icon: theme.colors.successText },
  { bg: theme.colors.skyBg, icon: theme.colors.skyText },
];

export const CategoriesScreen: React.FC = () => {
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<any>();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebouncedSearch(searchQuery);

  const {
    data: categoriesData,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteCategories(CATEGORIES_PAGE_SIZE, debouncedSearch);

  const categories = useMemo(() => {
    return categoriesData?.pages.flatMap(page => page.categories) ?? [];
  }, [categoriesData]);

  // Bento mosaic: alternate a full-width hero tile with a row of two smaller
  // tiles so the grid reads as varied tiles instead of a uniform card list.
  const rows = useMemo(() => {
    const result: { item: Category; index: number }[][] = [];
    let isHero = true;
    let i = 0;
    while (i < categories.length) {
      if (isHero) {
        result.push([{ item: categories[i], index: i }]);
        i += 1;
      } else {
        result.push(
          categories.slice(i, i + 2).map((item, offset) => ({ item, index: i + offset })),
        );
        i += 2;
      }
      isHero = !isHero;
    }
    return result;
  }, [categories]);

  const accents = useMemo(() => TILE_ACCENTS(theme), [theme]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderCategoryTile = (item: Category, index: number, isLarge: boolean) => {
    const accent = accents[index % accents.length];

    return (
      <TouchableOpacity
        key={item._id}
        style={[styles.tileBase, isLarge ? styles.tileLarge : styles.tileSmall]}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('CategoryDetail', {
            categoryId: item._id,
            categoryName: item.categoryName,
          })
        }
      >
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.tileImage} />
        ) : (
          <View style={[styles.tilePlaceholder, { backgroundColor: accent.bg }]}>
            {isLarge && (
              <>
                <View style={styles.tileDecorCircleLeft} pointerEvents="none" />
                <View style={styles.tileDecorCircleRight} pointerEvents="none" />
              </>
            )}
            <Layers size={isLarge ? 40 : 32} color={accent.icon} />
          </View>
        )}

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.75)']}
          style={styles.tileGradient}
          pointerEvents="none"
        />

        <View style={styles.tileActions}>
          <TouchableOpacity
            style={styles.tileActionButton}
            onPress={() => navigation.navigate('CreateCategory', { editCategoryId: item._id })}
            activeOpacity={0.7}
          >
            <Edit size={13} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.tileLabelWrap}>
          <Text style={isLarge ? styles.tileLabelLarge : styles.tileLabel} numberOfLines={1}>
            {item.categoryName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRow = ({ item: row }: { item: { item: Category; index: number }[] }) => {
    if (row.length === 1) {
      return (
        <View style={styles.rowLarge}>{renderCategoryTile(row[0].item, row[0].index, true)}</View>
      );
    }
    return (
      <View style={styles.rowPair}>
        {row.map(({ item, index }) => renderCategoryTile(item, index, false))}
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
        title={t('categoriesTitle')}
        description={t('categoriesDesc') || 'Manage, search, and update product categories.'}
        action={
          <GradientHeaderAction
            icon={<Plus size={16} color={theme.colors.primaryText} />}
            onPress={() => navigation.navigate('CreateCategory')}
          />
        }
      />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t('searchCategoriesPlaceholder') || 'Search categories...'}
        style={styles.searchBar}
      />

      <View style={styles.body}>
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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            refreshing={isRefetching}
            onRefresh={refetch}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <EmptyState
                icon={<Layers size={48} color={theme.colors.textMuted} />}
                description={t('noCategoriesFound')}
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

export default CategoriesScreen;
