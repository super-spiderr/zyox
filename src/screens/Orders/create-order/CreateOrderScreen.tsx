import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  Share,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { ScreenContainer, Text, Button, DatePickerModal } from '@/components';
import { useAppTheme, palette } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { CustomerPickerModal } from './components';
import {
  ArrowLeft,
  Search,
  ChevronRight,
  ChevronDown,
  Tag,
  ChefHat,
  Calendar,
  Check,
} from 'lucide-react-native';
import { generatePDF } from 'react-native-html-to-pdf';
import { generateInvoiceHTML } from '@/utils/invoiceTemplate';
import { Order, OrderItem, OrderPayload, PaymentStatus, OrderStatus } from '@/api/order';
import { Customer } from '@/store/customerStore';
import {
  useCustomers,
  useProducts,
  usePackages,
  useOrders,
  useCreateOrder,
  useUpdateOrder,
} from '@/hooks/queries';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateOrder'>;

export const CreateOrderScreen: React.FC<Props> = ({ route, navigation }) => {
  const editOrderId = route.params?.editOrderId;

  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  // Screen Step: 1 = Customer/Event Details, 2 = Menu Selection, 3 = Checkout
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedCustomerName, setSelectedCustomerName] = useState('');
  const [showCustomerPicker, setShowCustomerPicker] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(() => {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  });
  const [showEventDatePicker, setShowEventDatePicker] = useState(false);
  const [showCompletedDatePicker, setShowCompletedDatePicker] = useState(false);
  const [guestCount, setGuestCount] = useState('');
  const [notes, setNotes] = useState('');

  // Cart State (itemId -> item details). Catering orders price per selected
  // item for the whole event (driven by guest count), not per-item quantity,
  // so each entry represents a single inclusion rather than a count.
  const [selectedCart, setSelectedCart] = useState<
    Record<
      string,
      {
        type: 'PRODUCT' | 'PACKAGE';
        name: string;
        unitPrice: number;
        vegType?: 'VEG' | 'NON_VEG';
      }
    >
  >({});

  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState('0');

  // Menu Search, Tab, & Form Errors State
  const [itemSearchQuery, setItemSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'PRODUCTS' | 'PACKAGES'>('PRODUCTS');
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Checkout State
  const [advanceAmount, setAdvanceAmount] = useState('0');
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('PENDING');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('PENDING');
  const [completedAt, setCompletedAt] = useState('');
  const [quotationUrl, setQuotationUrl] = useState('');
  const [invoiceUrl, setInvoiceUrl] = useState('');

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleSharePDF = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const cust = customers.find(c => (c._id || c.id) === selectedCustomerId);
      const customerName = cust ? cust.customerName : 'Customer';
      const customerPhone = cust ? cust.phoneNumber : '';

      // Prepare order items. Item prices are per-guest, so quantity carries
      // the guest count rather than a per-item count picked in the UI.
      const items: OrderItem[] = Object.entries(selectedCart).map(([itemId, val]) => ({
        type: val.type,
        itemId,
        name: val.name,
        quantity: guestCountNum || 1,
        unitPrice: val.unitPrice,
      }));

      // Construct temporary order object for template rendering
      const tempOrder: Order = {
        _id: editOrderId || 'draft',
        customerId: selectedCustomerId,
        attributes: {
          eventName: eventName.trim(),
          guestCount: parseInt(guestCount) || 0,
        },
        deliveryDate: eventDate.trim(),
        orderItems: items,
        discountAmount: parseFloat(discountAmount) || 0,
        advanceAmount: parseFloat(advanceAmount) || 0,
        paymentStatus,
        orderStatus,
        completedAt: completedAt.trim() || undefined,
        quotationUrl: quotationUrl.trim() || undefined,
        invoiceUrl: invoiceUrl.trim() || undefined,
        notes: notes.trim() || undefined,
      };

      const htmlContent = generateInvoiceHTML(tempOrder, {
        name: customerName,
        phone: customerPhone,
      });

      const options = {
        html: htmlContent,
        fileName: `invoice_${
          editOrderId ? editOrderId.substring(editOrderId.length - 6).toUpperCase() : 'draft'
        }`,
        directory: 'Documents',
      };

      const file = await generatePDF(options);
      if (file?.filePath) {
        await Share.share({
          url: Platform.OS === 'ios' ? file.filePath : `file://${file.filePath}`,
          title: 'Catering Invoice PDF',
        });
      } else {
        Alert.alert('Error', 'Could not generate invoice PDF file path');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to generate and share PDF invoice');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Queries
  const { data: customers = [] } = useCustomers();
  const { data: products = [] } = useProducts();
  const { data: packages = [] } = usePackages();
  const { data: orders = [] } = useOrders();

  const editOrder = useMemo(() => {
    if (!editOrderId) return null;
    return orders.find(o => o._id === editOrderId) || null;
  }, [orders, editOrderId]);

  // Handle Return Params from ApplyCouponScreen
  useEffect(() => {
    if (route.params?.appliedCoupon !== undefined) {
      setAppliedCoupon(route.params.appliedCoupon);
    }
    if (route.params?.discountAmount !== undefined) {
      setDiscountAmount(String(route.params.discountAmount));
    }
  }, [route.params?.appliedCoupon, route.params?.discountAmount]);

  // Handle Pre-selected Customer from route params
  useEffect(() => {
    const selectCustId = route.params?.selectCustomerId;
    if (selectCustId && customers.length > 0) {
      setSelectedCustomerId(selectCustId);
      const cust = customers.find(c => (c._id || c.id) === selectCustId);
      setSelectedCustomerName(cust ? cust.customerName : '');
    }
  }, [route.params?.selectCustomerId, customers]);

  // Edit Order Initialization
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (editOrder && !initialized && customers.length > 0) {
      const custId =
        typeof editOrder.customerId === 'object' ? editOrder.customerId._id : editOrder.customerId;
      setSelectedCustomerId(custId);

      const cust = customers.find(c => (c._id || c.id) === custId);
      setSelectedCustomerName(cust ? cust.customerName : '');

      setEventName(editOrder.attributes?.eventName || '');
      if (editOrder.deliveryDate) {
        setEventDate(editOrder.deliveryDate.split('T')[0]);
      }
      setGuestCount(String(editOrder.attributes?.guestCount ?? ''));
      setDiscountAmount(String(editOrder.discountAmount));
      setAdvanceAmount(String(editOrder.advanceAmount));
      setPaymentStatus(editOrder.paymentStatus);
      setOrderStatus(editOrder.orderStatus);
      setCompletedAt(editOrder.completedAt || '');
      setQuotationUrl(editOrder.quotationUrl || '');
      setInvoiceUrl(editOrder.invoiceUrl || '');
      setNotes(editOrder.notes || '');

      // Load cart items
      const cart: Record<
        string,
        {
          type: 'PRODUCT' | 'PACKAGE';
          name: string;
          unitPrice: number;
          vegType?: 'VEG' | 'NON_VEG';
        }
      > = {};
      editOrder.orderItems?.forEach(item => {
        cart[item.itemId] = {
          type: item.type,
          name: item.name,
          unitPrice: item.unitPrice,
        };
      });
      setSelectedCart(cart);
      setInitialized(true);
    }
  }, [editOrder, customers, initialized]);

  // Mutations
  const createMutation = useCreateOrder({
    onSuccess: newOrder => {
      navigation.navigate('Success', {
        title: t('success') || 'Success!',
        message: 'Order created successfully!',
        buttonTitle: t('ok') || 'OK',
        navigateTo: 'OrderDetail',
        navigationParams: { orderId: newOrder._id },
      });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to create order');
    },
  });

  const updateMutation = useUpdateOrder({
    onSuccess: () => {
      navigation.navigate('Success', {
        title: t('success') || 'Success!',
        message: 'Order updated successfully!',
        buttonTitle: t('ok') || 'OK',
        navigateTo: 'OrderDetail',
        navigationParams: { orderId: editOrderId },
      });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update order');
    },
  });

  const filteredMenuItems = useMemo(() => {
    const q = itemSearchQuery.trim().toLowerCase();
    if (activeTab === 'PRODUCTS') {
      let filtered = products;
      if (q) {
        filtered = filtered.filter(p => p.productName.toLowerCase().includes(q));
      }
      if (filterVegOnly) {
        filtered = filtered.filter(p => p.productType === 'VEG');
      }
      return filtered.map(p => ({
        id: p._id,
        name: p.productName,
        price: p.price,
        type: 'PRODUCT' as const,
        productType: p.productType,
        imageUrl: p.imageUrl,
      }));
    } else {
      let filtered = packages.filter(pkg => pkg.isActive);
      if (q) {
        filtered = filtered.filter(pkg => pkg.name.toLowerCase().includes(q));
      }
      if (filterVegOnly) {
        filtered = filtered.filter(pkg => pkg.packageType === 'VEG');
      }
      return filtered.map(pkg => ({
        id: pkg._id,
        name: pkg.name,
        price: pkg.price,
        type: 'PACKAGE' as const,
        productType: pkg.packageType,
        imageUrl: pkg.imageUrl,
      }));
    }
  }, [products, packages, activeTab, itemSearchQuery, filterVegOnly]);

  // Cart Totals
  const totalItemsCount = useMemo(() => {
    return Object.keys(selectedCart).length;
  }, [selectedCart]);

  // Item prices are per-guest (per plate), so the line/order total scales
  // with guest count rather than a per-item quantity.
  const guestCountNum = useMemo(() => Number.parseInt(guestCount, 10) || 0, [guestCount]);

  const perGuestSubtotal = useMemo(() => {
    return Object.values(selectedCart).reduce((sum, item) => sum + item.unitPrice, 0);
  }, [selectedCart]);

  const orderItemsTotal = useMemo(() => {
    return perGuestSubtotal * guestCountNum;
  }, [perGuestSubtotal, guestCountNum]);

  const grandTotal = useMemo(() => {
    const disc = parseFloat(discountAmount) || 0;
    return Math.max(0, orderItemsTotal - disc);
  }, [orderItemsTotal, discountAmount]);

  const remainingBalance = useMemo(() => {
    const adv = parseFloat(advanceAmount) || 0;
    return grandTotal - adv;
  }, [grandTotal, advanceAmount]);

  // Cart operations
  const handleAddItemToCart = (
    itemId: string,
    name: string,
    price: number,
    type: 'PRODUCT' | 'PACKAGE',
    vegType?: 'VEG' | 'NON_VEG',
  ) => {
    setSelectedCart(prev => ({
      ...prev,
      [itemId]: { type, name, unitPrice: price, vegType },
    }));
  };

  const handleRemoveItemFromCart = (itemId: string) => {
    setSelectedCart(prev => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  };

  // Step Navigations
  const handleNextStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedCustomerId) {
      newErrors.customer = t('fieldRequired');
    }
    if (!eventName.trim()) {
      newErrors.eventName = t('fieldRequired');
    }
    const guests = parseInt(guestCount);
    if (!guestCount.trim() || isNaN(guests) || guests <= 0) {
      newErrors.guestCount = t('validationGuestCount');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (totalItemsCount === 0) {
      Alert.alert('Empty Cart', 'Please select at least one item/combo from the menu.');
      return;
    }
    setStep(3);
  };

  // Save/Checkout Action
  const handlePlaceOrder = () => {
    const items: OrderItem[] = Object.entries(selectedCart).map(([itemId, val]) => ({
      type: val.type,
      itemId,
      name: val.name,
      quantity: guestCountNum || 1,
      unitPrice: val.unitPrice,
    }));

    const payload: OrderPayload = {
      customerId: selectedCustomerId,
      eventName: eventName.trim(),
      deliveryDate: eventDate.trim(),
      guestCount: parseInt(guestCount),
      orderItems: items,
      discountAmount: parseFloat(discountAmount) || 0,
      advanceAmount: parseFloat(advanceAmount) || 0,
      paymentStatus,
      orderStatus,
      completedAt: completedAt.trim() || undefined,
      quotationUrl: quotationUrl.trim() || undefined,
      invoiceUrl: invoiceUrl.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    if (editOrderId) {
      updateMutation.mutate({ id: editOrderId, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  // Render Functions
  const renderStepIndicator = () => {
    const renderDot = (num: 1 | 2 | 3, label: string) => {
      const isActive = step === num;
      const isCompleted = step > num;
      return (
        <View style={styles.stepItem}>
          <View
            style={[
              styles.stepDotOuter,
              isActive && { backgroundColor: theme.colors.primaryLight },
            ]}
          >
            <View
              style={[
                styles.stepDot,
                {
                  backgroundColor: isActive
                    ? theme.colors.primary
                    : isCompleted
                    ? palette.green500
                    : theme.colors.card,
                  borderWidth: isActive || isCompleted ? 0 : 1.5,
                  borderColor: theme.colors.border,
                  shadowOpacity: isActive ? 0.15 : 0,
                  elevation: isActive ? 3 : 0,
                },
              ]}
            >
              {isCompleted ? (
                <Check size={14} color={palette.white} strokeWidth={3} />
              ) : (
                <Text
                  style={[
                    styles.stepDotText,
                    !isActive && { color: theme.colors.textMuted },
                  ]}
                  variant="bold"
                >
                  {num}
                </Text>
              )}
            </View>
          </View>
          <Text
            style={[
              styles.stepText,
              {
                color: isActive
                  ? theme.colors.text
                  : isCompleted
                  ? palette.green500
                  : theme.colors.textSecondary,
                fontFamily: isActive
                  ? theme.typography.fonts.urbanist.bold
                  : theme.typography.fonts.urbanist.regular,
              },
            ]}
          >
            {label}
          </Text>
        </View>
      );
    };

    const renderDivider = (afterStep: 1 | 2) => (
      <View
        style={[
          styles.stepDivider,
          { backgroundColor: step > afterStep ? palette.green500 : theme.colors.border },
        ]}
      />
    );

    return (
      <View style={styles.stepsContainer}>
        {renderDot(1, 'Details')}
        {renderDivider(1)}
        {renderDot(2, 'Menu')}
        {renderDivider(2)}
        {renderDot(3, 'Summary')}
      </View>
    );
  };

  // Render Step 1
  const renderStep1Content = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      <Text style={styles.formSectionTitle} variant="bold">
        Customer & Event Info
      </Text>

      {/* Customer Input */}
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>{t('selectCustomer')} *</Text>
        <TouchableOpacity
          style={[styles.formInput, styles.selectTrigger, !!errors.customer && styles.inputError]}
          activeOpacity={0.7}
          onPress={() => setShowCustomerPicker(true)}
        >
          <Text
            style={styles.selectTriggerText}
            color={selectedCustomerName ? 'text' : 'textMuted'}
            numberOfLines={1}
          >
            {selectedCustomerName || 'Search customer name...'}
          </Text>
          <ChevronDown size={18} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        {errors.customer ? <Text style={styles.errorText}>{errors.customer}</Text> : null}
      </View>

      {/* Event Name */}
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>{t('eventName')} *</Text>
        <TextInput
          style={[styles.formInput, !!errors.eventName && styles.inputError]}
          placeholder="e.g. Wedding Reception"
          placeholderTextColor={theme.colors.textMuted}
          value={eventName}
          onChangeText={val => {
            setEventName(val);
            if (errors.eventName) {
              setErrors(prev => ({ ...prev, eventName: '' }));
            }
          }}
        />
        {errors.eventName ? <Text style={styles.errorText}>{errors.eventName}</Text> : null}
      </View>

      {/* Event Date & Guest Count Row */}
      <View style={styles.justifyBetweenRow}>
        <View style={[styles.formGroup, { flex: 0.48 }]}>
          <Text style={styles.formLabel}>{t('eventDate')} *</Text>
          <TouchableOpacity
            style={[styles.formInput, styles.selectTrigger]}
            activeOpacity={0.7}
            onPress={() => setShowEventDatePicker(true)}
          >
            <Text style={styles.selectTriggerText} numberOfLines={1}>
              {eventDate}
            </Text>
            <Calendar size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.formGroup, { flex: 0.48 }]}>
          <Text style={styles.formLabel}>{t('guestCount')} *</Text>
          <TextInput
            style={[styles.formInput, !!errors.guestCount && styles.inputError]}
            placeholder="e.g. 150"
            placeholderTextColor={theme.colors.textMuted}
            keyboardType="numeric"
            value={guestCount}
            onChangeText={val => {
              setGuestCount(val);
              if (errors.guestCount) {
                setErrors(prev => ({ ...prev, guestCount: '' }));
              }
            }}
          />
          {errors.guestCount ? <Text style={styles.errorText}>{errors.guestCount}</Text> : null}
        </View>
      </View>

      {/* Notes */}
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>{t('notes')}</Text>
        <TextInput
          style={[styles.formInput, styles.notesInput]}
          placeholder="Catering guidelines or preferences..."
          placeholderTextColor={theme.colors.textMuted}
          multiline
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      <Button title="Choose Menu Items" onPress={handleNextStep1} style={styles.nextButton} />
    </ScrollView>
  );

  // Render Step 2
  const renderStep2Content = () => (
    <View style={styles.flexOne}>
      <View style={styles.stepContainerHeader}>
        {/* Search */}
        <View style={styles.searchRow}>
          <Search size={18} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items or combos..."
            placeholderTextColor={theme.colors.textMuted}
            value={itemSearchQuery}
            onChangeText={setItemSearchQuery}
          />
        </View>

        {/* Veg/Nonveg Filters & Tabs */}
        <View style={styles.filterRow}>
          <View style={styles.filterTabs}>
            <TouchableOpacity
              style={[
                styles.filterTab,
                {
                  backgroundColor:
                    activeTab === 'PRODUCTS' ? theme.colors.background : palette.transparent,
                },
              ]}
              onPress={() => setActiveTab('PRODUCTS')}
            >
              <Text
                style={[
                  styles.filterTabText,
                  {
                    color:
                      activeTab === 'PRODUCTS' ? theme.colors.primary : theme.colors.textSecondary,
                  },
                ]}
                variant="bold"
              >
                Products
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterTab,
                {
                  backgroundColor:
                    activeTab === 'PACKAGES' ? theme.colors.background : palette.transparent,
                },
              ]}
              onPress={() => setActiveTab('PACKAGES')}
            >
              <Text
                style={[
                  styles.filterTabText,
                  {
                    color:
                      activeTab === 'PACKAGES' ? theme.colors.primary : theme.colors.textSecondary,
                  },
                ]}
                variant="bold"
              >
                Combos
              </Text>
            </TouchableOpacity>
          </View>

          {/* Veg Toggle */}
          <TouchableOpacity
            style={[
              styles.vegToggleContainer,
              {
                backgroundColor: filterVegOnly ? theme.colors.successBg : palette.transparent,
              },
            ]}
            onPress={() => setFilterVegOnly(!filterVegOnly)}
          >
            <View style={styles.vegDot} />
            <Text
              style={[
                styles.vegToggleText,
                { color: filterVegOnly ? palette.green500 : theme.colors.textSecondary },
              ]}
            >
              Veg Only
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.menuList} showsVerticalScrollIndicator={false}>
        {filteredMenuItems.map(item => {
          const isAdded = !!selectedCart[item.id];
          const isVeg = item.productType === 'VEG';

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItemRow, isAdded && styles.menuItemRowSelected]}
              activeOpacity={0.7}
              onPress={() =>
                isAdded
                  ? handleRemoveItemFromCart(item.id)
                  : handleAddItemToCart(item.id, item.name, item.price, item.type, item.productType)
              }
            >
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.menuItemThumb} />
              ) : (
                <View style={[styles.menuItemThumb, styles.menuItemThumbPlaceholder]}>
                  <ChefHat size={20} color={theme.colors.textMuted} />
                </View>
              )}

              <View style={styles.menuItemInfo}>
                <View style={styles.menuItemNameRow}>
                  <View
                    style={[
                      styles.vegDotSmall,
                      { backgroundColor: isVeg ? palette.green500 : palette.error500 },
                    ]}
                  />
                  <Text style={styles.menuItemName} variant="semibold" numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
                <Text style={styles.menuItemPrice}>
                  ₹{item.price.toLocaleString()} / guest
                </Text>
              </View>

              <View style={[styles.checkCircle, isAdded && styles.checkCircleActive]}>
                {isAdded && <Check size={14} color={palette.white} strokeWidth={3} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Selection Summary Bar */}
      {totalItemsCount > 0 && (
        <TouchableOpacity
          style={styles.cartBarWrapper}
          activeOpacity={0.9}
          onPress={handleNextStep2}
        >
          <View style={styles.cartBarLeft}>
            <Text style={styles.cartBarCount} variant="bold">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
            </Text>
            <Text style={styles.cartBarPrice}>₹{orderItemsTotal.toLocaleString()} total</Text>
          </View>
          <View style={styles.cartBarRight}>
            <Text style={styles.cartBarBtnText} variant="bold">
              Continue
            </Text>
            <ChevronRight size={16} color={palette.white} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  // Render Step 3 (Checkout Confirmation Screen)
  const renderStep3Content = () => (
    <View style={styles.flexOne}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.formSectionTitle} variant="bold">
          Review Order
        </Text>

        {/* Selected Items */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionCardHeaderRow}>
            <Text style={styles.sectionCardTitle} variant="bold">
              Selected Items
            </Text>
            <Text style={styles.sectionCardSubtitle}>
              {guestCountNum || 0} {guestCountNum === 1 ? 'guest' : 'guests'}
            </Text>
          </View>
          {Object.entries(selectedCart).map(([itemId, val]) => (
            <View key={itemId} style={styles.checkoutItemRow}>
              <View style={styles.checkoutItemInfo}>
                <Text style={styles.checkoutItemName} numberOfLines={1}>
                  {val.name}
                </Text>
                <Text style={styles.checkoutItemMeta}>
                  ₹{val.unitPrice.toLocaleString()} × {guestCountNum || 0} guests
                </Text>
              </View>
              <Text style={styles.checkoutItemTotal}>
                ₹{(val.unitPrice * guestCountNum).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Financial calculations */}
        <View style={styles.checkoutSummaryBlock}>
        {/* Coupon trigger */}
        {appliedCoupon ? (
          <View style={styles.couponAppliedBadge}>
            <View style={styles.paymentHeader}>
              <Tag size={14} color={palette.green600} />
              <Text style={styles.couponAppliedText} variant="bold">
                Coupon '{appliedCoupon}' Applied!
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setAppliedCoupon('');
                setDiscountAmount('0');
              }}
            >
              <Text style={styles.couponRemoveText} variant="bold">
                REMOVE
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.couponTrigger}
            onPress={() =>
              navigation.navigate('ApplyCoupon', {
                orderTotal: orderItemsTotal,
                currentCoupon: appliedCoupon,
              })
            }
          >
            <View style={styles.couponTriggerLeft}>
              <Tag size={16} color={theme.colors.primary} />
              <Text
                style={[styles.couponTriggerText, { color: theme.colors.primary }]}
                variant="bold"
              >
                Apply Coupon / Offers
              </Text>
            </View>
            <ChevronRight size={16} color={theme.colors.primary} />
          </TouchableOpacity>
        )}

        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Items Subtotal</Text>
          <Text style={styles.billVal}>₹{orderItemsTotal.toLocaleString()}</Text>
        </View>

        {parseFloat(discountAmount) > 0 && (
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Coupon Discount</Text>
            <Text style={[styles.billVal, { color: palette.error500 }]}>
              -₹{parseFloat(discountAmount).toLocaleString()}
            </Text>
          </View>
        )}

        <View style={styles.billTotalRow}>
          <Text style={styles.billTotalLabel} variant="bold">
            Grand Total
          </Text>
          <Text style={styles.billTotalVal} variant="bold">
            ₹{grandTotal.toLocaleString()}
          </Text>
        </View>

        {/* Advance & Remaining Balance */}
        <View style={styles.financeInputsRow}>
          <View style={styles.financeInputGroup}>
            <Text style={styles.formLabel}>Advance Paid (₹)</Text>
            <TextInput
              style={styles.financeInput}
              keyboardType="numeric"
              value={advanceAmount}
              onChangeText={setAdvanceAmount}
            />
          </View>

          <View style={styles.financeInputGroup}>
            <Text style={[styles.formLabel, styles.balanceLabel]}>Remaining Balance</Text>
            <View
              style={[
                styles.financeInput,
                { justifyContent: 'center', backgroundColor: theme.colors.inputBg },
              ]}
            >
              <Text
                style={{ color: remainingBalance > 0 ? theme.colors.error : palette.green500 }}
                variant="bold"
              >
                ₹{remainingBalance.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>

        {/* Status details */}
        <View style={styles.sectionCard}>
          <Text style={[styles.sectionCardTitle, styles.sectionCardTitleSpaced]} variant="bold">
            Order &amp; Payment Status
          </Text>

          <Text style={styles.statusLabel}>Order Status</Text>
          <View style={styles.statusGroupRow}>
            {(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as const).map(status => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusBtn,
                  orderStatus === status ? styles.statusBtnActive : undefined,
                ]}
                onPress={() => setOrderStatus(status)}
              >
                <Text
                  style={[
                    styles.statusText,
                    orderStatus === status ? styles.statusTextActive : undefined,
                  ]}
                  variant="semiBold"
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.statusLabel}>Payment Status</Text>
          <View style={styles.statusGroupRowLast}>
            {(['PENDING', 'PARTIAL', 'PAID'] as const).map(status => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusBtn,
                  paymentStatus === status ? styles.statusBtnActive : undefined,
                ]}
                onPress={() => setPaymentStatus(status)}
              >
                <Text
                  style={[
                    styles.statusText,
                    paymentStatus === status ? styles.statusTextActive : undefined,
                  ]}
                  variant="semiBold"
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Details */}
        <View style={styles.sectionCard}>
          <Text style={[styles.sectionCardTitle, styles.sectionCardTitleSpaced]} variant="bold">
            Additional Details
          </Text>

          <View style={styles.notesSection}>
            {orderStatus === 'COMPLETED' && (
              <View>
                <Text style={styles.formLabel}>Completed At</Text>
                <TouchableOpacity
                  style={[styles.formInput, styles.selectTrigger]}
                  activeOpacity={0.7}
                  onPress={() => setShowCompletedDatePicker(true)}
                >
                  <Text
                    style={styles.selectTriggerText}
                    color={completedAt ? 'text' : 'textMuted'}
                    numberOfLines={1}
                  >
                    {completedAt || 'Select date...'}
                  </Text>
                  <Calendar size={16} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>
            )}

            <View>
              <Text style={styles.formLabel}>Quotation Link</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Drive URL link..."
                placeholderTextColor={theme.colors.textMuted}
                value={quotationUrl}
                onChangeText={setQuotationUrl}
              />
            </View>

            <View>
              <Text style={styles.formLabel}>Invoice PDF Link</Text>
              <TextInput
                style={styles.formInput}
                placeholder="PDF document link..."
                placeholderTextColor={theme.colors.textMuted}
                value={invoiceUrl}
                onChangeText={setInvoiceUrl}
              />
            </View>
          </View>
        </View>

        {editOrderId && (
          <Button
            title="Share Invoice PDF"
            variant="outline"
            onPress={handleSharePDF}
            loading={isGeneratingPdf}
            style={styles.checkoutButton}
          />
        )}
      </ScrollView>

      {/* Sticky Total + Confirm Footer */}
      <View style={styles.checkoutFooter}>
        <View>
          <Text style={styles.footerTotalLabel}>Grand Total</Text>
          <Text style={styles.footerTotalValue} variant="bold">
            ₹{grandTotal.toLocaleString()}
          </Text>
        </View>
        <Button
          title={editOrderId ? 'Save Changes' : 'Confirm & Place Order'}
          onPress={handlePlaceOrder}
          loading={createMutation.isPending || updateMutation.isPending}
          style={styles.footerButton}
        />
      </View>
    </View>
  );

  return (
    <ScreenContainer scrollable={false} contentContainerStyle={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexOne}
      >
        {/* Header bar */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (step > 1) {
                setStep(prev => (prev - 1) as 1 | 2 | 3);
              } else {
                navigation.goBack();
              }
            }}
          >
            <ArrowLeft size={22} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} variant="bold">
            {editOrderId ? t('editOrder') : t('createOrder')}
          </Text>
        </View>

        {renderStepIndicator()}

        {step === 1 && renderStep1Content()}
        {step === 2 && renderStep2Content()}
        {step === 3 && renderStep3Content()}
      </KeyboardAvoidingView>

      <CustomerPickerModal
        visible={showCustomerPicker}
        onClose={() => setShowCustomerPicker(false)}
        customers={customers}
        selectedCustomerId={selectedCustomerId}
        onSelect={(customer: Customer) => {
          setSelectedCustomerId(customer._id || customer.id);
          setSelectedCustomerName(customer.customerName);
          if (errors.customer) {
            setErrors(prev => ({ ...prev, customer: '' }));
          }
        }}
      />

      <DatePickerModal
        visible={showEventDatePicker}
        onClose={() => setShowEventDatePicker(false)}
        value={eventDate}
        onChange={setEventDate}
        title={t('eventDate') || 'Event Date'}
      />

      <DatePickerModal
        visible={showCompletedDatePicker}
        onClose={() => setShowCompletedDatePicker(false)}
        value={completedAt}
        onChange={setCompletedAt}
        title="Completed At"
      />
    </ScreenContainer>
  );
};

export default CreateOrderScreen;
