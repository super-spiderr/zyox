import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer, Text, Button, GradientHeader } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './ProductsScreen.styles';
import { useProducts, useCreateProduct, useUpdateProduct, useCategories } from '@/hooks/queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Image as ImageIcon, X, Check } from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadImageToCloudinary } from '@/utils/cloudinary';
import { heightScale } from '@/utils/scaling';

const productsIcon = require('@/assets/images/products_icon.png');

type Props = NativeStackScreenProps<RootStackParamList, 'CreateProduct'>;

export const CreateProductScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const insets = useSafeAreaInsets();

  const editProductId = route.params?.editProductId;
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();

  const editProduct = useMemo(() => {
    if (!editProductId) return null;
    return products.find(p => p._id === editProductId) || null;
  }, [products, editProductId]);

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('Plate');
  const [productType, setProductType] = useState<'VEG' | 'NON_VEG'>('VEG');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');

  // Upload/File Picker State
  const [isUploading, setIsUploading] = useState(false);
  const [pickedFile, setPickedFile] = useState<{ name: string; size: number } | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (editProduct && !initialized) {
      setProductName(editProduct.productName);
      setPrice(String(editProduct.price));
      setUnit(editProduct.unit || 'Plate');
      setProductType(editProduct.productType);
      setSelectedCategoryIds(editProduct.categoryIds || []);
      setImageUrl(editProduct.imageUrl || '');
      setInitialized(true);
    }
  }, [editProduct, initialized]);

  const createMutation = useCreateProduct({
    onSuccess: () => {
      navigation.navigate('Success', {
        title: t('success') || 'Success!',
        message: 'Product created successfully!',
        buttonTitle: t('ok') || 'OK',
        navigateTo: 'Products',
      });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to create product');
    },
  });

  const updateMutation = useUpdateProduct({
    onSuccess: () => {
      navigation.navigate('Success', {
        title: t('success') || 'Success!',
        message: 'Product updated successfully!',
        buttonTitle: t('ok') || 'OK',
        navigateTo: 'Products',
      });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update product');
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

  const handleToggleCategory = (catId: string) => {
    setSelectedCategoryIds(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId],
    );
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    const trimmedName = productName.trim();
    if (!trimmedName) {
      newErrors.productName = t('fieldRequired');
    } else if (trimmedName.length < 3 || trimmedName.length > 40) {
      newErrors.productName = t('validationName');
    }

    const priceNum = parseFloat(price);
    if (!price) {
      newErrors.price = t('fieldRequired');
    } else if (isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = t('validationPrice');
    }

    if (!unit.trim()) {
      newErrors.unit = t('fieldRequired');
    }

    if (selectedCategoryIds.length === 0) {
      newErrors.categoryIds = t('validationCategory');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      productName: trimmedName,
      price: priceNum,
      unit: unit.trim(),
      productType,
      categoryIds: selectedCategoryIds,
      imageUrl: imageUrl || undefined,
    };

    if (editProductId) {
      updateMutation.mutate({
        id: editProductId,
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
      statusBarStyle={isDark ? 'dark-content' : 'light-content'}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header — shared with the Products list */}
        <GradientHeader
          title={
            editProductId ? `${t('edit')} ${t('products')}` : t('createProduct') || 'Create Product'
          }
          description={
            editProductId
              ? "Update this product's information"
              : 'Fill in the details to add a new product'
          }
          image={productsIcon}
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
                <Text style={styles.uploadImageText}>Upload Product Image</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Form Fields */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('productName')} *</Text>
            <TextInput
              style={[styles.formInput, errors.productName ? styles.inputError : null]}
              placeholder="e.g. Vegetable Biryani"
              placeholderTextColor={theme.colors.textSecondary + '70'}
              value={productName}
              onChangeText={text => {
                setProductName(text);
                if (errors.productName) {
                  setErrors(prev => ({ ...prev, productName: undefined }));
                }
              }}
            />
            {errors.productName ? <Text style={styles.errorText}>{errors.productName}</Text> : null}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('productPrice')} (₹) *</Text>
            <TextInput
              style={[styles.formInput, errors.price ? styles.inputError : null]}
              placeholder="e.g. 150"
              placeholderTextColor={theme.colors.textSecondary + '70'}
              value={price}
              onChangeText={text => {
                setPrice(text);
                if (errors.price) {
                  setErrors(prev => ({ ...prev, price: undefined }));
                }
              }}
              keyboardType="numeric"
            />
            {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('productUnit')} *</Text>
            <TextInput
              style={[styles.formInput, errors.unit ? styles.inputError : null]}
              placeholder="e.g. Plate, Kg, Liter"
              placeholderTextColor={theme.colors.textSecondary + '70'}
              value={unit}
              onChangeText={text => {
                setUnit(text);
                if (errors.unit) {
                  setErrors(prev => ({ ...prev, unit: undefined }));
                }
              }}
            />
            {errors.unit ? <Text style={styles.errorText}>{errors.unit}</Text> : null}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('productType')} *</Text>
            <View style={styles.typeButtonContainer}>
              <TouchableOpacity
                style={[styles.typeButton, productType === 'VEG' ? styles.typeButtonActive : null]}
                onPress={() => setProductType('VEG')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    productType === 'VEG' ? styles.typeButtonTextActive : null,
                  ]}
                >
                  {t('veg')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  productType === 'NON_VEG' ? styles.typeButtonActive : null,
                ]}
                onPress={() => setProductType('NON_VEG')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    productType === 'NON_VEG' ? styles.typeButtonTextActive : null,
                  ]}
                >
                  {t('nonveg')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Categories Selector */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('categories')} *</Text>
            <View style={styles.categoryListContainer}>
              {categories.map(cat => {
                const isSelected = selectedCategoryIds.includes(cat._id);
                return (
                  <TouchableOpacity
                    key={cat._id}
                    style={styles.categorySelectItem}
                    onPress={() => {
                      handleToggleCategory(cat._id);
                      if (errors.categoryIds) {
                        setErrors(prev => ({ ...prev, categoryIds: undefined }));
                      }
                    }}
                  >
                    <Text style={styles.categorySelectItemText}>{cat.categoryName}</Text>
                    {isSelected && <Check size={16} color={theme.colors.primary} />}
                  </TouchableOpacity>
                );
              })}
            </View>
            {errors.categoryIds ? <Text style={styles.errorText}>{errors.categoryIds}</Text> : null}
          </View>
        </ScrollView>

        {/* Fixed footer — always visible, doesn't scroll with the form */}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <Button
            title={editProductId ? t('saveChanges') : t('create')}
            onPress={handleSave}
            loading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default CreateProductScreen;
