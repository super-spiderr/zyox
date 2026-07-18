import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Text } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';

interface DashboardQuickActionsProps {
  onNewOrderPress: () => void;
  onCategoriesPress: () => void;
  onProductsPress: () => void;
  onCustomersPress: () => void;
  onPackagesPress: () => void;
}

export const DashboardQuickActions: React.FC<DashboardQuickActionsProps> = ({
  onNewOrderPress,
  onCategoriesPress,
  onProductsPress,
  onCustomersPress,
  onPackagesPress,
}) => {
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  const cards = [
    {
      key: 'newOrder',
      title: t('newOrder'),
      onPress: onNewOrderPress,
      image: require('@/assets/images/orders_icon.png'),
      cardStyle: styles.heroCard,
      titleStyle: styles.heroCardTitle,
    },
    {
      key: 'customers',
      title: t('customers'),
      onPress: onCustomersPress,
      image: require('@/assets/images/customers_icon.png'),
      cardStyle: styles.quickCard,
      titleStyle: styles.quickCardTitle,
    },
    {
      key: 'products',
      title: t('products'),
      onPress: onProductsPress,
      image: require('@/assets/images/products_icon.png'),
      cardStyle: styles.quickCard,
      titleStyle: styles.quickCardTitle,
    },
    {
      key: 'categories',
      title: t('categories'),
      onPress: onCategoriesPress,
      image: require('@/assets/images/categories_icon.png'),
      cardStyle: styles.quickCard,
      titleStyle: styles.quickCardTitle,
    },
    {
      key: 'packages',
      title: t('packages'),
      onPress: onPackagesPress,
      image: require('@/assets/images/packages_icon.png'),
      cardStyle: styles.quickCard,
      titleStyle: styles.quickCardTitle,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="bold" fontSize={16}>
        {t('quickActions')}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sliderScrollView}
        contentContainerStyle={styles.sliderContentContainer}
      >
        {cards.map(card => {
          return (
            <TouchableOpacity
              key={card.key}
              style={[styles.quickCard, card.cardStyle]}
              activeOpacity={0.8}
              onPress={card.onPress}
            >
              <Text
                style={[styles.quickCardTitle, card.titleStyle]}
                variant="bold"
                fontSize={14}
                numberOfLines={2}
              >
                {card.title}
              </Text>
              <Image source={card.image} style={styles.cornerImage} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DashboardQuickActions;
