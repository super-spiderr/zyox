import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { MainTabParamList } from './types';
import DashboardScreen from '@/screens/Dashboard/DashboardScreen';
import OrdersScreen from '@/screens/Orders/OrdersScreen';
import CustomersScreen from '@/screens/Customers';
import SettingsScreen from '@/screens/Settings';
import { useAppTheme, Theme, palette } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useOrders, useCustomers } from '@/hooks/queries';

import { Home, ShoppingCart, Settings, Plus, X, Users, Sparkles } from 'lucide-react-native';
import { Text } from '@/components';
import Svg, { Path, Rect, Defs, Filter, FeDropShadow } from 'react-native-svg';
import { widthScale } from '@/utils/scaling';

const ordersIcon = require('@/assets/images/orders_icon.png');
const customersIcon = require('@/assets/images/customers_icon.png');
const productsIcon = require('@/assets/images/products_icon.png');
const packagesIcon = require('@/assets/images/packages_icon.png');
const categoriesIcon = require('@/assets/images/categories_icon.png');

const Tab = createBottomTabNavigator<MainTabParamList>();

const CreatePlaceholderScreen = () => null;

// Each creation action gets its own accent so the sheet reads at a glance
// instead of five identical monochrome tiles.
const CREATE_ORDER_GRADIENT = [palette.primary500, palette.primary600];
const CREATE_CUSTOMER_GRADIENT = [palette.secondary500, palette.secondary700];
const CREATE_PRODUCT_GRADIENT = [palette.warning500, palette.warning700];
const CREATE_PACKAGE_GRADIENT = [palette.purple500, palette.purple600];
const CREATE_CATEGORY_GRADIENT = [palette.rose400, palette.rose700];

interface ActionTileProps {
  visible: boolean;
  index: number;
  gradient: string[];
  onPress: () => void;
  style: object;
  touchableStyle: object;
  children: React.ReactNode;
}

const ActionTile: React.FC<ActionTileProps> = ({
  visible,
  index,
  gradient,
  onPress,
  style,
  touchableStyle,
  children,
}) => {
  const anim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 320,
        delay: index * 70,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, index, anim]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: anim,
          transform: [
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) },
          ],
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={touchableStyle}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

interface TabBgProps {
  width: number;
  height: number;
  theme: Theme;
}

const TabBg: React.FC<TabBgProps> = ({ width, height, theme }) => {
  const d = `
    M 0,24
    A 24,24 0 0 1 24,0
    L ${width / 2 - 48},0
    C ${width / 2 - 28},0 ${width / 2 - 32},34 ${width / 2},34
    C ${width / 2 + 32},34 ${width / 2 + 28},0 ${width / 2 + 48},0
    L ${width - 24},0
    A 24,24 0 0 1 ${width},24
    L ${width},${height}
    L 0,${height}
    Z
  `;

  return (
    <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
      <Defs>
        <Filter id="dropShadow" height="100%" width="100%">
          <FeDropShadow dx="5" dy="-2" stdDeviation="8" floodColor={palette.black} floodOpacity="0.5" />
        </Filter>
      </Defs>
      {/* Plugs the notch gap so scrolled content never peeks through behind the FAB */}
      <Rect x={0} y={0} width={width} height={height} fill={theme.colors.secondaryLight} />
      <Path d={d} fill={theme.colors.secondaryLight} />
      <Path d={d} fill="none" stroke={theme.colors.border} strokeWidth="0.5" />
    </Svg>
  );
};

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  onPlusPress: () => void;
}

const PulsingFAB = ({
  onPress,
  theme,
  hasDrafts,
  styles,
}: {
  onPress: () => void;
  theme: Theme;
  hasDrafts: boolean;
  styles: any;
}) => {
  const pulseAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    let animation: Animated.CompositeAnimation | null = null;
    if (hasDrafts) {
      pulseAnim.setValue(0);
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );
      animation.start();
    } else {
      pulseAnim.setValue(0);
    }
    return () => {
      if (animation) animation.stop();
    };
  }, [hasDrafts, pulseAnim]);

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.45],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 0.1, 0.8, 1],
    outputRange: [0, 0.5, 0.2, 0],
  });

  const { isDark } = useAppTheme();
  const startColor = theme.colors.primary;
  const endColor = theme.colors.cardGradEnd;
  const colors = isDark ? [endColor, startColor, endColor] : [startColor, endColor, startColor];

  return (
    <View style={styles.plusButtonWrapper}>
      {hasDrafts && (
        <Animated.View
          style={[
            styles.pulseRing,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        />
      )}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={[
          styles.plusButton,
          {
            backgroundColor: startColor,
            shadowColor: startColor,
          },
        ]}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          angle={180}
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: 88,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <Plus color={theme.colors.primaryText} size={26} strokeWidth={2.5} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  onPlusPress,
}) => {
  const { theme } = useAppTheme();
  const styles = getStyles(theme);
  const { width } = Dimensions.get('window');
  const height = Platform.OS === 'ios' ? 95 : 80;

  // Read orders and customers from React Query cache
  const { data: orders = [] } = useOrders();
  const { data: customers = [] } = useCustomers();

  const activeOrdersCount = orders.filter(order => order.orderStatus !== 'CANCELLED').length;
  const activeCustomersCount = customers.filter(customer => customer.isActive !== false).length;
  const draftCount = orders.filter(order => order.orderStatus === 'PENDING').length;
  const hasDrafts = draftCount > 0;

  return (
    <View style={styles.tabBarContainer}>
      {/* Curved Symmetrical SVG Background */}
      <TabBg width={width} height={height} theme={theme} />

      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'CreatePlaceholder') {
            onPlusPress();
            return;
          }

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const renderIcon = (color: string) => {
          const size = 22;
          if (route.name === 'Home') {
            return <Home color={color} size={size} />;
          } else if (route.name === 'Orders') {
            return <ShoppingCart color={color} size={size} />;
          } else if (route.name === 'Customers') {
            return <Users color={color} size={size} />;
          } else if (route.name === 'Settings') {
            return <Settings color={color} size={size} />;
          }
          return null;
        };

        const getBadgeCount = () => {
          if (route.name === 'Orders') return activeOrdersCount;
          if (route.name === 'Customers') return activeCustomersCount;
          return 0;
        };

        const badgeCount = getBadgeCount();

        if (route.name === 'CreatePlaceholder') {
          return (
            <View key={route.key} style={styles.tabItemWrapper}>
              <PulsingFAB onPress={onPress} theme={theme} hasDrafts={hasDrafts} styles={styles} />
              <Text style={styles.plusPlaceholderText}> </Text>
            </View>
          );
        }

        return (
          <View key={route.key} style={styles.tabItemWrapper}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                {renderIcon(isFocused ? theme.colors.primary : theme.colors.textSecondary)}
                {badgeCount > 0 && (
                  <View style={styles.tabBadgeContainer}>
                    <Text style={styles.tabBadgeText} fontSize={8} variant="semiBold">
                      {badgeCount}
                    </Text>
                  </View>
                )}
              </View>

              <Text
                variant="semiBold"
                fontSize={widthScale(10)}
                style={[
                  styles.labelText,
                  isFocused ? styles.activeLabelText : styles.inactiveLabelText,
                ]}
              >
                {options.title || route.name}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export const MainTab = () => {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const styles = getStyles(theme);

  const goCreate = (screen: string) => {
    setModalVisible(false);
    navigation.navigate(screen);
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => <CustomTabBar {...props} onPlusPress={() => setModalVisible(true)} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={DashboardScreen} options={{ title: t('tabHome') }} />
        <Tab.Screen name="Orders" component={OrdersScreen} options={{ title: t('tabOrders') }} />
        <Tab.Screen
          name="CreatePlaceholder"
          component={CreatePlaceholderScreen}
          options={{ title: '' }}
        />
        <Tab.Screen
          name="Customers"
          component={CustomersScreen}
          options={{ title: t('tabCustomers') }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: t('tabSettings') || 'Settings' }}
        />
      </Tab.Navigator>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
                <View style={styles.grabber} />

                {/* Header */}
                <View style={styles.modalHeader}>
                  <View style={styles.modalHeaderText}>
                    <View style={styles.titleRow}>
                      <Sparkles size={16} color={theme.colors.primary} />
                      <Text variant="h3" color="text" style={styles.modalTitle}>
                        {t('create') || 'Create New'}
                      </Text>
                    </View>
                    <Text variant="medium" fontSize={12} style={styles.modalSubtitle}>
                      Choose what you&apos;d like to add
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <X size={18} color={theme.colors.textSecondary} />
                  </TouchableOpacity>
                </View>

                {/* Hero: most common action gets top billing */}
                <ActionTile
                  visible={modalVisible}
                  index={0}
                  gradient={CREATE_ORDER_GRADIENT}
                  onPress={() => goCreate('CreateOrder')}
                  style={styles.heroTile}
                  touchableStyle={styles.heroTouchable}
                >
                  <Image source={ordersIcon} style={styles.heroImage} fadeDuration={0} />
                  <View style={styles.heroTextWrap}>
                    <Text variant="bold" style={styles.heroEyebrow}>
                      QUICK START
                    </Text>
                    <Text variant="bold" fontSize={17} style={styles.heroTitle}>
                      {t('createOrder') || 'Create Order'}
                    </Text>
                    <Text variant="medium" fontSize={12} style={styles.heroCaption}>
                      Start a new booking
                    </Text>
                  </View>
                </ActionTile>

                {/* Grid */}
                <View style={styles.gridContainer}>
                  <ActionTile
                    visible={modalVisible}
                    index={1}
                    gradient={CREATE_CUSTOMER_GRADIENT}
                    onPress={() => goCreate('CreateCustomer')}
                    style={styles.gridItem}
                    touchableStyle={styles.gridTouchable}
                  >
                    <Image source={customersIcon} style={styles.gridImage} fadeDuration={0} />
                    <Text variant="bold" fontSize={13} style={styles.gridLabel}>
                      {t('createCustomer') || 'Create Customer'}
                    </Text>
                    <Text variant="medium" fontSize={10} style={styles.gridCaption}>
                      Add a client
                    </Text>
                  </ActionTile>

                  <ActionTile
                    visible={modalVisible}
                    index={2}
                    gradient={CREATE_PRODUCT_GRADIENT}
                    onPress={() => goCreate('CreateProduct')}
                    style={styles.gridItem}
                    touchableStyle={styles.gridTouchable}
                  >
                    <Image source={productsIcon} style={styles.gridImage} fadeDuration={0} />
                    <Text variant="bold" fontSize={13} style={styles.gridLabel}>
                      {t('createProduct') || 'Create Product'}
                    </Text>
                    <Text variant="medium" fontSize={10} style={styles.gridCaption}>
                      Add inventory item
                    </Text>
                  </ActionTile>

                  <ActionTile
                    visible={modalVisible}
                    index={3}
                    gradient={CREATE_PACKAGE_GRADIENT}
                    onPress={() => goCreate('CreatePackage')}
                    style={styles.gridItem}
                    touchableStyle={styles.gridTouchable}
                  >
                    <Image source={packagesIcon} style={styles.gridImage} fadeDuration={0} />
                    <Text variant="bold" fontSize={13} style={styles.gridLabel}>
                      {t('createPackage') || 'Create Package'}
                    </Text>
                    <Text variant="medium" fontSize={10} style={styles.gridCaption}>
                      Create a menu package
                    </Text>
                  </ActionTile>

                  <ActionTile
                    visible={modalVisible}
                    index={4}
                    gradient={CREATE_CATEGORY_GRADIENT}
                    onPress={() => goCreate('CreateCategory')}
                    style={styles.gridItem}
                    touchableStyle={styles.gridTouchable}
                  >
                    <Image source={categoriesIcon} style={styles.gridImage} fadeDuration={0} />
                    <Text variant="bold" fontSize={13} style={styles.gridLabel}>
                      {t('createCategory') || 'Create Category'}
                    </Text>
                    <Text variant="medium" fontSize={10} style={styles.gridCaption}>
                      Organize your items
                    </Text>
                  </ActionTile>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const getStyles = (theme: Theme) => {
  const isDark = theme.isDark;
  const { width } = Dimensions.get('window');
  const gridItemWidth = (width - 40 - 12) / 2;

  return StyleSheet.create({
    tabBarContainer: {
      backgroundColor: palette.transparent, // Must be transparent so the curved SVG cutout shows through
      height: Platform.OS === 'ios' ? 95 : 80,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingBottom: Platform.OS === 'ios' ? 18 : 4,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      // Shadow styling
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 10,
    },
    tabItemWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabButton: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      //height: 28,
    },
    labelText: {
      marginTop: 4,
      textAlign: 'center',
    },
    activeLabelText: {
      color: theme.colors.primary,
    },
    inactiveLabelText: {
      color: theme.colors.textSecondary,
    },
    plusButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 6,
      zIndex: 2,
    },
    plusButtonWrapper: {
      position: 'absolute',
      top: -64,
      width: 56,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    pulseRing: {
      position: 'absolute',
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: palette.gray450, // source hex had a redundant fully-opaque 'ff' alpha suffix
      zIndex: 1,
    },
    tabBadgeContainer: {
      position: 'absolute',
      top: -6,
      right: -14,
      backgroundColor: theme.colors.primary,
      borderRadius: 9,
      minWidth: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 3,
      borderWidth: 1.5,
      borderColor: theme.colors.secondaryLight,
    },
    tabBadgeText: {
      color: theme.colors.primaryText,
    },
    plusPlaceholderText: {
      fontSize: 10,
      marginTop: 4,
      height: 12,
    },
    modalOverlay: {
      flex: 1,
      // Fixed 0.6 overlay regardless of theme mode (not the same as
      // theme.colors.overlayStrong, which is 0.75 in dark mode) — left as a
      // literal to keep the visual identical.
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 40,
    },
    grabber: {
      alignSelf: 'center',
      width: widthScale(40),
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.border,
      marginBottom: 16,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 18,
    },
    modalHeaderText: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(6),
    },
    modalTitle: {
      fontSize: 18,
    },
    modalSubtitle: {
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    closeButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heroTile: {
      width: '100%',
      height: widthScale(108),
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 12,
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.3 : 0.12,
      shadowRadius: 10,
      elevation: 4,
    },
    heroTouchable: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: widthScale(18),
    },
    heroImage: {
      position: 'absolute',
      right: -widthScale(6),
      bottom: -widthScale(10),
      width: widthScale(120),
      height: widthScale(100),
      resizeMode: 'contain',
    },
    heroTextWrap: {
      maxWidth: '62%',
    },
    heroEyebrow: {
      fontSize: 9,
      letterSpacing: 0.8,
      color: 'rgba(255,255,255,0.75)',
      marginBottom: 4,
    },
    heroTitle: {
      color: palette.white,
    },
    heroCaption: {
      color: 'rgba(255,255,255,0.85)',
      marginTop: 3,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 12,
    },
    gridItem: {
      width: gridItemWidth,
      height: gridItemWidth * 1.05,
      borderRadius: 18,
      overflow: 'hidden',
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: isDark ? 0.28 : 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    gridTouchable: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: widthScale(10),
    },
    gridImage: {
      width: widthScale(78),
      height: widthScale(65),
      resizeMode: 'contain',
      marginBottom: 4,
    },
    gridLabel: {
      color: palette.white,
      textAlign: 'center',
    },
    gridCaption: {
      color: 'rgba(255,255,255,0.85)',
      textAlign: 'center',
      marginTop: 2,
    },
  });
};

export default MainTab;
