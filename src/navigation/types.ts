import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Orders: undefined;
  CreatePlaceholder: undefined;
  Customers: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Categories: undefined;
  Products: undefined;
  Packages: undefined;
  Profile: undefined;
  Notifications: undefined;
  CreateOrder: {
    editOrderId?: string;
    appliedCoupon?: string;
    discountAmount?: number;
    selectCustomerId?: string;
  } | undefined;
  OrderDetail: {
    orderId: string;
  };
  ApplyCoupon: {
    orderTotal: number;
    currentCoupon?: string;
  };
  CreateCustomer: {
    editCustomerId?: string;
    selectedContact?: { name: string; phone: string; };
  } | undefined;
  SelectContact: undefined;
  Success: {
    title: string;
    message: string;
    buttonTitle?: string;
    navigateTo: string;
    navigationParams?: any;
  };
  CreateProduct: {
    editProductId?: string;
  } | undefined;
  CreateCategory: {
    editCategoryId?: string;
  } | undefined;
  CreatePackage: {
    editPackageId?: string;
  } | undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
