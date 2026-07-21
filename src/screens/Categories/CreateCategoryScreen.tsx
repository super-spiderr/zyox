import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer, Text, Button, GradientHeader } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './CategoriesScreen.styles';
import { useCategories, useCreateCategory, useUpdateCategory, useProfile } from '@/hooks/queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Image as ImageIcon, X } from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadImageToCloudinary } from '@/utils/cloudinary';
import { heightScale } from '@/utils/scaling';

const categoriesIcon = require('@/assets/images/categories_icon.png');

type Props = NativeStackScreenProps<RootStackParamList, 'CreateCategory'>;

export const CreateCategoryScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const insets = useSafeAreaInsets();

  const editCategoryId = route.params?.editCategoryId;
  const { data: categories = [] } = useCategories();
  const { data: profile } = useProfile();

  const currentUserName = useMemo(() => {
    if (profile?.firstName) {
      return `${profile.firstName}`;
    }
    return 'Admin';
  }, [profile]);

  const editCategory = useMemo(() => {
    if (!editCategoryId) return null;
    return categories.find(c => c._id === editCategoryId) || null;
  }, [categories, editCategoryId]);

  const [categoryName, setCategoryName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [createdBy, setCreatedBy] = useState(currentUserName);

  // Upload/File Picker State
  const [isUploading, setIsUploading] = useState(false);
  const [pickedFile, setPickedFile] = useState<{ name: string; size: number } | null>(null);

  const [nameError, setNameError] = useState('');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (editCategory && !initialized) {
      setCategoryName(editCategory.categoryName);
      setIsActive(editCategory.isActive);
      setImageUrl(editCategory.imageUrl || '');
      setCreatedBy(editCategory.createdBy || currentUserName);
      setInitialized(true);
    }
  }, [editCategory, initialized, currentUserName]);

  const createMutation = useCreateCategory({
    onSuccess: () => {
      navigation.navigate('Success', {
        title: t('success') || 'Success!',
        message: 'Category created successfully!',
        buttonTitle: t('ok') || 'OK',
        navigateTo: 'Categories',
      });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to create category');
    },
  });

  const updateMutation = useUpdateCategory({
    onSuccess: () => {
      navigation.navigate('Success', {
        title: t('success') || 'Success!',
        message: 'Category updated successfully!',
        buttonTitle: t('ok') || 'OK',
        navigateTo: 'Categories',
      });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update category');
    },
  });

  const handlePickImage = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (res.didCancel) return;
      if (res.errorCode) {
        Alert.alert('Error', res.errorMessage || 'Failed to pick image');
        return;
      }

      const asset = res.assets?.[0];
      if (!asset || !asset.uri) {
        Alert.alert('Error', 'No image file found');
        return;
      }

      setPickedFile({
        name: asset.fileName || 'upload.jpg',
        size: asset.fileSize || 0,
      });

      setIsUploading(true);
      const uploadedUrl = await uploadImageToCloudinary(
        asset.uri,
        asset.fileName || 'upload.jpg',
        asset.type || 'image/jpeg',
      );
      setImageUrl(uploadedUrl);
    } catch (err) {
      console.error('Image picker error:', err);
      Alert.alert('Error', 'Failed to pick image file');
      setPickedFile(null);
      setImageUrl('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    const trimmedName = categoryName.trim();
    if (!trimmedName) {
      setNameError(t('fieldRequired') || 'Category name is required');
      return;
    }
    if (trimmedName.length < 3 || trimmedName.length > 40) {
      setNameError(t('validationName') || 'Name must be between 3 and 40 characters');
      return;
    }

    const payload = {
      categoryName: trimmedName,
      isActive,
      imageUrl: imageUrl || undefined,
      createdBy: createdBy || currentUserName,
    };

    if (editCategoryId) {
      updateMutation.mutate({
        id: editCategoryId,
        payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending || isUploading;

  return (
    <ScreenContainer
      style={styles.container}
      statusBarBgColor="transparent"
      ignoreTopSafeArea
      statusBarStyle={isDark ? 'light-content' : 'dark-content'}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header — shared with the Categories list */}
        <GradientHeader
          title={
            editCategoryId ? `${t('edit')} ${t('categories')}` : t('createCategory') || 'Create Category'
          }
          description={
            editCategoryId
              ? "Update this category's information"
              : 'Fill in the details to add a new category'
          }
          image={categoriesIcon}
        />

        <ScrollView
          style={styles.body}
          contentContainerStyle={{ paddingBottom: heightScale(24) }}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Picker */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('categoryImageUrl')}</Text>
            {isUploading ? (
              <View style={styles.uploadImageContainer}>
                <Text style={styles.uploadImageText}>Uploading to Cloudinary...</Text>
              </View>
            ) : imageUrl ? (
              <View style={styles.previewImageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.previewThumbnail} />
                <View style={styles.previewInfo}>
                  <Text style={styles.previewName}>
                    {pickedFile ? pickedFile.name : 'Image Uploaded'}
                  </Text>
                  {pickedFile && pickedFile.size > 0 ? (
                    <Text style={styles.previewSize}>{(pickedFile.size / 1024).toFixed(1)} KB</Text>
                  ) : null}
                </View>
                <TouchableOpacity
                  style={styles.removePreviewButton}
                  onPress={() => {
                    setImageUrl('');
                    setPickedFile(null);
                  }}
                >
                  <X size={18} color={theme.colors.error} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadImageContainer}
                onPress={handlePickImage}
                activeOpacity={0.7}
              >
                <ImageIcon size={20} color={theme.colors.primary} />
                <Text style={styles.uploadImageText}>Upload Category Image</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Form Fields */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('categoryName')} *</Text>
            <TextInput
              style={[styles.formInput, nameError ? styles.inputError : null]}
              placeholder="e.g. Starters"
              placeholderTextColor={theme.colors.textSecondary + '70'}
              value={categoryName}
              onChangeText={text => {
                setCategoryName(text);
                if (nameError) setNameError('');
              }}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchLabelContainer}>
              <Text style={styles.switchLabel}>{t('isActive')}</Text>
              <Text style={styles.switchSubText}>Toggle category visibility</Text>
            </View>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: theme.colors.border, true: theme.colors.primaryLight }}
              thumbColor={isActive ? theme.colors.primary : theme.colors.textSecondary}
            />
          </View>
        </ScrollView>

        {/* Fixed footer — always visible, doesn't scroll with the form */}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <Button
            title={editCategoryId ? t('saveChanges') : t('create')}
            onPress={handleSave}
            loading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default CreateCategoryScreen;
