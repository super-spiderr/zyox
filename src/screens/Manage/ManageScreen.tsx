import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, GradientHeader } from '@/components';
import { useAppTheme } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { useNavigation } from '@react-navigation/native';
import {
  ShoppingCart,
  Users,
  UtensilsCrossed,
  Layers,
  Briefcase,
  ChevronRight,
} from 'lucide-react-native';
export const ManageScreen: React.FC = () => {
  const { theme, isDark } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<any>();

  const items = [
    {
      key: 'orders',
      icon: ShoppingCart,
      iconBg: theme.colors.infoBg,
      iconColor: theme.colors.infoText,
      label: t('orders') || 'Orders',
      sublabel: t('ordersDesc') || 'Manage, search, and track catering orders.',
      onPress: () => navigation.navigate('OrdersList'),
    },
    {
      key: 'customers',
      icon: Users,
      iconBg: theme.colors.purpleBg,
      iconColor: theme.colors.purpleText,
      label: t('customers') || 'Customers',
      sublabel: t('customersDesc') || 'Manage, search, and update client records.',
      onPress: () => navigation.navigate('CustomersList'),
    },
    {
      key: 'products',
      icon: UtensilsCrossed,
      iconBg: theme.colors.warningBg,
      iconColor: theme.colors.warningText,
      label: t('products') || 'Products',
      sublabel: t('productsDesc') || 'Manage, search, and update products.',
      onPress: () => navigation.navigate('Products'),
    },
    {
      key: 'categories',
      icon: Layers,
      iconBg: theme.colors.successBg,
      iconColor: theme.colors.successText,
      label: t('categories') || 'Categories',
      sublabel: t('categoriesDesc') || 'Manage, search, and update product categories.',
      onPress: () => navigation.navigate('Categories'),
    },
    {
      key: 'packages',
      icon: Briefcase,
      iconBg: theme.colors.skyBg,
      iconColor: theme.colors.skyText,
      label: t('packages') || 'Packages',
      sublabel: t('packagesDesc') || 'Manage, search, and update catering packages.',
      onPress: () => navigation.navigate('Packages'),
    },
  ] as const;

  return (
    <ScreenContainer
      scrollable={true}
      contentContainerStyle={styles.container}
      statusBarBgColor="transparent"
      ignoreTopSafeArea
      statusBarStyle={isDark ? 'light-content' : 'dark-content'}
    >
      <GradientHeader
        title={t('manageTitle') || 'Manage'}
        description={t('manageDesc') || 'Jump straight to orders, customers & your catalog.'}
      />

      <View style={styles.body}>
        <View style={styles.listContainer}>
          {items.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === items.length - 1;
            return (
              <TouchableOpacity
                key={item.key}
                style={[styles.row, !isLast && styles.borderBottom]}
                activeOpacity={0.7}
                onPress={item.onPress}
              >
                <View style={styles.rowLeft}>
                  <View style={[styles.iconWrapper, { backgroundColor: item.iconBg }]}>
                    <Icon size={20} color={item.iconColor} />
                  </View>
                  <View style={styles.rowLabelContainer}>
                    <Text style={styles.rowLabel}>{item.label}</Text>
                    <Text style={styles.rowSublabel} numberOfLines={1}>
                      {item.sublabel}
                    </Text>
                  </View>
                </View>

                <View style={styles.rowRight}>
                  <ChevronRight size={18} color={theme.colors.textSecondary} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ManageScreen;
