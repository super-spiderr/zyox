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
import getStyles from './CategoriesScreen.styles';
import { Category } from '@/api/category';
import { useCategories, useDeleteCategory } from '@/hooks/queries';
import { useNavigation } from '@react-navigation/native';
import { Search, Plus, Layers, Edit, Trash2, X } from 'lucide-react-native';

const categoriesIcon = require('@/assets/images/categories_icon.png');

export const CategoriesScreen: React.FC = () => {
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<any>();

  const [searchQuery, setSearchQuery] = useState('');

  // Fetch categories using centralized hooks
  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useCategories();

  // Delete mutation using centralized hooks
  const deleteMutation = useDeleteCategory({
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to delete category');
    },
  });

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return categories;
    return categories.filter(c => c.categoryName.toLowerCase().includes(query));
  }, [categories, searchQuery]);

  const handleDelete = (id: string) => {
    Alert.alert(
      t('deleteConfirmTitle') || 'Delete Category',
      t('deleteConfirmMessage') || 'Are you sure you want to delete this category?',
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

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <View style={styles.card}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Layers size={20} color={theme.colors.primary} />
        </View>
      )}

      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.categoryName}</Text>
        <View style={styles.categoryMetaRow}>
          {item.createdBy ? (
            <Text style={styles.creatorText}>By {item.createdBy}</Text>
          ) : null}

          <View
            style={[
              styles.statusBadge,
              item.isActive ? styles.statusActive : styles.statusInactive,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.isActive ? { color: styles.statusActive.color } : { color: styles.statusInactive.color },
              ]}
            >
              {item.isActive ? t('active') : t('inactive')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CreateCategory', { editCategoryId: item._id })}
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
      statusBarStyle={isDark ? 'light-content' : 'dark-content'}
    >
      <GradientHeader
        title={t('categoriesTitle')}
        description={t('categoriesDesc') || 'Manage, search, and update product categories.'}
        count={isLoading ? undefined : filteredCategories.length}
        countLabel={filteredCategories.length === 1 ? 'Category' : 'Categories'}
        image={categoriesIcon}
        action={
          <GradientHeaderAction
            icon={<Plus size={16} color={theme.colors.primaryText} />}
            onPress={() => navigation.navigate('CreateCategory')}
          />
        }
      />

      <View style={styles.body}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Search size={18} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchCategoriesPlaceholder') || 'Search categories...'}
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

        {isLoading ? (
          <FlatList
            data={[1, 2, 3, 4]}
            keyExtractor={(item, index) => String(index)}
            contentContainerStyle={styles.list}
            renderItem={() => (
              <View style={[styles.card, { padding: 12, alignItems: 'center' }]}>
                <Skeleton
                  variant="rect"
                  width={50}
                  height={50}
                  borderRadius={8}
                  style={{ marginRight: 12 }}
                />
                <View style={{ flex: 1, gap: 8 }}>
                  <Skeleton variant="text" width="60%" height={16} />
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Skeleton variant="text" width="30%" height={12} />
                    <Skeleton
                      variant="rect"
                      width={40}
                      height={16}
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
            data={filteredCategories}
            keyExtractor={item => item._id}
            renderItem={renderCategoryItem}
            contentContainerStyle={styles.list}
            refreshing={isLoading}
            onRefresh={refetch}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Layers size={48} color={theme.colors.textMuted} />
                <Text style={styles.emptyStateText}>{t('noCategoriesFound')}</Text>
              </View>
            }
          />
        )}
      </View>
    </ScreenContainer>
  );
};

export default CategoriesScreen;
