import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AuthStack from './AuthStack';
import MainTab from './MainTab';
import CategoriesScreen from '@/screens/Categories/CategoriesScreen';
import ProductsScreen from '@/screens/Products/ProductsScreen';
import PackagesScreen from '@/screens/Packages/PackagesScreen';
import CreateOrderScreen from '@/screens/Orders/create-order/CreateOrderScreen';
import OrderDetailScreen from '@/screens/Orders/OrderDetailScreen';
import ApplyCouponScreen from '@/screens/Orders/ApplyCouponScreen';
import CreateCustomerScreen from '@/screens/Customers/CreateCustomerScreen';
import CreateProductScreen from '@/screens/Products/CreateProductScreen';
import CreateCategoryScreen from '@/screens/Categories/CreateCategoryScreen';
import CreatePackageScreen from '@/screens/Packages/CreatePackageScreen';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import NotificationsScreen from '@/screens/Notifications/NotificationsScreen';
import SelectContactScreen from '@/screens/Customers/SelectContactScreen';
import SuccessScreen from '@/screens/common/SuccessScreen';
import { useAuth } from '@/context/AuthContext';
import { useAppTheme } from '@/theme';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import SplashScreen from '@/screens/Splash/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme, isDark } = useAppTheme();
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
      primary: theme.colors.primary,
    },
  };

  if (!isSplashComplete) {
    return <SplashScreen onComplete={() => setIsSplashComplete(true)} />;
  }

  if (isLoading) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainTab} />
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="Packages" component={PackagesScreen} />
            <Stack.Screen name="CreateOrder" component={CreateOrderScreen} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
            <Stack.Screen name="ApplyCoupon" component={ApplyCouponScreen} />
            <Stack.Screen name="CreateCustomer" component={CreateCustomerScreen} />
            <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
            <Stack.Screen name="CreateCategory" component={CreateCategoryScreen} />
            <Stack.Screen name="CreatePackage" component={CreatePackageScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="SelectContact" component={SelectContactScreen} />
            <Stack.Screen name="Success" component={SuccessScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
