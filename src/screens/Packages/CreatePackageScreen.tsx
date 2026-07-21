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
import getStyles from './PackagesScreen.styles';
import { PackageItem } from '@/api/package';
import { usePackages, useCreatePackage, useUpdatePackage, useProducts } from '@/hooks/queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Image as ImageIcon, X, Plus, Minus } from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadImageToCloudinary } from '@/utils/cloudinary';
import { heightScale } from '@/utils/scaling';

const packagesIcon = require('@/assets/images/packages_icon.png');

type Props = NativeStackScreenProps<RootStackParamList, 'CreatePackage'>;

export const CreatePackageScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const insets = useSafeAreaInsets();

  const editPackageId = route.params?.editPackageId;
  const { data: packages = [] } = usePackages();
  const { data: products = [] } = useProducts();

  const editPackage = useMemo(() => {
    if (!editPackageId) return null;
    return packages.find(p => p._id === editPackageId) || null;
  }, [packages, editPackageId]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [packageType, setPackageType] = useState<'VEG' | 'NON_VEG'>('VEG');
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedItems, setSelectedItems] = useState<PackageItem[]>([]);

  // Upload/File Picker State
  const [isUploading, setIsUploading] = useState(false);
  const [pickedFile, setPickedFile] = useState<{ name: string; size: number } | null>(null);

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (editPackage && !initialized) {
      setName(editPackage.name);
      setPrice(String(editPackage.price));
      setPackageType(editPackage.packageType);
      setIsActive(editPackage.isActive);
      setImageUrl(editPackage.imageUrl || '');
      setSelectedItems(editPackage.items || []);
      setInitialized(true);
    }
  }, [editPackage, initialized]);

  const createMutation = useCreatePackage({
    onSuccess: () => {
      navigation.navigate('Success', {
        title: t('success') || 'Success!',
        message: 'Package created successfully!',
        buttonTitle: t('ok') || 'OK',
        navigateTo: 'Packages',
      });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to create package');
    },
  });

  const updateMutation = useUpdatePackage({
    onSuccess: () => {
      navigation.navigate('Success', {
        title: t('success') || 'Success!',
        message: 'Package updated successfully!',
        buttonTitle: t('ok') || 'OK',
        navigateTo: 'Packages',
      });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update package');
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

  const handleQtyChange = (productId: string, increment: boolean) => {
    setSelectedItems(prev => {
      const existing = prev.find(item => item.itemId === productId);
      if (existing) {
        const newQty = increment ? existing.qty + 1 : existing.qty - 1;
        if (newQty <= 0) {
          return prev.filter(item => item.itemId !== productId);
        }
        return prev.map(item => (item.itemId === productId ? { ...item, qty: newQty } : item));
      } else if (increment) {
        return [...prev, { itemId: productId, qty: 1 }];
      }
      return prev;
    });
    if (errors.items) {
      setErrors(prev => ({ ...prev, items: '' }));
    }
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = t('fieldRequired');
    } else if (trimmedName.length < 3 || trimmedName.length > 40) {
      newErrors.name = t('validationName');
    }

    const priceNum = Number.parseFloat(price);
    if (!price) {
      newErrors.price = t('fieldRequired');
    } else if (Number.isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = t('validationPrice');
    }

    if (selectedItems.length === 0) {
      newErrors.items = t('validationItems') || 'Package must contain at least one item';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      name: trimmedName,
      price: priceNum,
      packageType,
      isActive,
      items: selectedItems,
      imageUrl: imageUrl || undefined,
    };

    if (editPackageId) {
      updateMutation.mutate({
        id: editPackageId,
        payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  const renderImageSection = () => {
    if (isUploading) {
      return (
        <View style={styles.uploadImageContainer}>
          <Text style={styles.uploadImageText}>Uploading to Cloudinary...</Text>
        </View>
      );
    }

    if (imageUrl) {
      return (
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
      );
    }

    return (
      <TouchableOpacity
        style={styles.uploadImageContainer}
        onPress={handlePickImage}
        activeOpacity={0.7}
      >
        <ImageIcon size={20} color={theme.colors.primary} />
        <Text style={styles.uploadImageText}>Upload Package Image</Text>
      </TouchableOpacity>
    );
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
        {/* Header — shared with the Packages list */}
        <GradientHeader
          title={editPackageId ? `${t('edit')} ${t('packages')}` : t('createPackage') || 'Create Package'}
          description={
            editPackageId
              ? "Update this package's information"
              : 'Fill in the details to add a new package'
          }
          image={packagesIcon}
        />

        <ScrollView
          style={styles.body}
          contentContainerStyle={{ paddingBottom: heightScale(24) }}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Picker */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('categoryImageUrl')}</Text>
            {renderImageSection()}
          </View>

          {/* Form Fields */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('packageName') || 'Package Name'} *</Text>
            <TextInput
              style={[styles.formInput, errors.name ? styles.inputError : null]}
              placeholder="e.g. Premium Veg Combo"
              placeholderTextColor={theme.colors.textSecondary + '70'}
              value={name}
              onChangeText={text => {
                setName(text);
                if (errors.name) {
                  setErrors(prev => ({ ...prev, name: undefined }));
                }
              }}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('packagePrice') || 'Package Price'} (₹) *</Text>
            <TextInput
              style={[styles.formInput, errors.price ? styles.inputError : null]}
              placeholder="e.g. 500"
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
            <Text style={styles.formLabel}>{t('packageType') || 'Package Type'} *</Text>
            <View style={styles.typeButtonContainer}>
              <TouchableOpacity
                style={[styles.typeButton, packageType === 'VEG' ? styles.typeButtonActive : null]}
                onPress={() => setPackageType('VEG')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    packageType === 'VEG' ? styles.typeButtonTextActive : null,
                  ]}
                >
                  {t('veg')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  packageType === 'NON_VEG' ? styles.typeButtonActive : null,
                ]}
                onPress={() => setPackageType('NON_VEG')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    packageType === 'NON_VEG' ? styles.typeButtonTextActive : null,
                  ]}
                >
                  {t('nonVeg')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Items Selector */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('selectItems') || 'Select Items'} *</Text>
            {errors.items ? <Text style={styles.errorText}>{errors.items}</Text> : null}
            <View style={styles.productListContainer}>
              <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                {products.map(prod => {
                  const qty = selectedItems.find(item => item.itemId === prod._id)?.qty || 0;
                  return (
                    <View key={prod._id} style={styles.productSelectItemRow}>
                      <View style={styles.productSelectItemTextWrapper}>
                        <Text style={styles.productSelectItemText} numberOfLines={1}>
                          {prod.productName}
                        </Text>
                      </View>
                      <View style={styles.qtySelectorContainer}>
                        <TouchableOpacity
                          style={styles.qtySelectorButton}
                          onPress={() => handleQtyChange(prod._id, false)}
                        >
                          <Minus size={12} color={theme.colors.text} />
                        </TouchableOpacity>
                        <Text style={styles.qtySelectorText}>{qty}</Text>
                        <TouchableOpacity
                          style={styles.qtySelectorButton}
                          onPress={() => handleQtyChange(prod._id, true)}
                        >
                          <Plus size={12} color={theme.colors.text} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>{t('isActive')}</Text>
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
            title={editPackageId ? t('saveChanges') : t('create')}
            onPress={handleSave}
            loading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default CreatePackageScreen;
