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
import { ScreenContainer, Text, Button } from '@/components';
import { useAppTheme, palette } from '@/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { ArrowLeft, Search, ChevronRight, Tag, ChefHat, ShoppingBag } from 'lucide-react-native';
import { generatePDF } from 'react-native-html-to-pdf';
import { generateInvoiceHTML } from '@/utils/invoiceTemplate';
import { Order, OrderItem, OrderPayload, PaymentStatus, OrderStatus } from '@/api/order';
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
  const [customerSearch, setCustomerSearch] = useState('');
  const [showCustomerPicker, setShowCustomerPicker] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(() => {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  });
  const [guestCount, setGuestCount] = useState('');
  const [notes, setNotes] = useState('');

  // Cart State (Swiggy-style mapping: itemId -> item details)
  const [selectedCart, setSelectedCart] = useState<
    Record<
      string,
      {
        type: 'PRODUCT' | 'PACKAGE';
        name: string;
        quantity: number;
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

      // Prepare order items
      const items: OrderItem[] = Object.entries(selectedCart).map(([itemId, val]) => ({
        type: val.type,
        itemId,
        name: val.name,
        quantity: val.quantity,
        unitPrice: val.unitPrice,
      }));

      // Construct temporary order object for template rendering
      const tempOrder: Order = {
        _id: editOrderId || 'draft',
        customerId: selectedCustomerId,
        eventName: eventName.trim(),
        eventDate: eventDate.trim(),
        guestCount: parseInt(guestCount) || 0,
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
      setCustomerSearch(cust ? cust.customerName : '');
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
      setCustomerSearch(cust ? cust.customerName : '');

      setEventName(editOrder.eventName);
      if (editOrder.eventDate) {
        setEventDate(editOrder.eventDate.split('T')[0]);
      }
      setGuestCount(String(editOrder.guestCount));
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
          quantity: number;
          unitPrice: number;
          vegType?: 'VEG' | 'NON_VEG';
        }
      > = {};
      editOrder.orderItems?.forEach(item => {
        cart[item.itemId] = {
          type: item.type,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        };
      });
      setSelectedCart(cart);
      setInitialized(true);
    }
  }, [editOrder, customers, initialized]);

  // Mutations
  const createMutation = useCreateOrder({
    onSuccess: () => {
      navigation.navigate('Success', {
        title: t('success') || 'Success!',
        message: 'Order created successfully!',
        buttonTitle: t('ok') || 'OK',
        navigateTo: 'Main',
        navigationParams: { screen: 'Orders' },
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
        navigateTo: 'Main',
        navigationParams: { screen: 'Orders' },
      });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update order');
    },
  });

  // Pickers filtering
  const filteredCustomersPicker = useMemo(() => {
    const q = customerSearch.trim().toLowerCase();
    if (!q) return customers.slice(0, 5);
    return customers.filter(c => c.customerName.toLowerCase().includes(q));
  }, [customers, customerSearch]);

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
      let filtered = packages;
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
    return Object.values(selectedCart).reduce((sum, item) => sum + item.quantity, 0);
  }, [selectedCart]);

  const orderItemsTotal = useMemo(() => {
    return Object.values(selectedCart).reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );
  }, [selectedCart]);

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
      [itemId]: { type, name, quantity: 1, unitPrice: price, vegType },
    }));
  };

  const handleIncrementQty = (itemId: string) => {
    setSelectedCart(prev => {
      const current = prev[itemId];
      if (!current) return prev;
      return {
        ...prev,
        [itemId]: { ...current, quantity: current.quantity + 1 },
      };
    });
  };

  const handleDecrementQty = (itemId: string) => {
    setSelectedCart(prev => {
      const current = prev[itemId];
      if (!current) return prev;
      if (current.quantity <= 1) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return {
        ...prev,
        [itemId]: { ...current, quantity: current.quantity - 1 },
      };
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
      quantity: val.quantity,
      unitPrice: val.unitPrice,
    }));

    const payload: OrderPayload = {
      customerId: selectedCustomerId,
      eventName: eventName.trim(),
      eventDate: eventDate.trim(),
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
              styles.stepDot,
              {
                backgroundColor: isActive
                  ? theme.colors.primary
                  : isCompleted
                  ? palette.secondary500
                  : theme.colors.border,
              },
            ]}
          >
            <Text style={styles.stepDotText} variant="bold">
              {num}
            </Text>
          </View>
          <Text
            style={[
              styles.stepText,
              {
                color: isActive
                  ? theme.colors.text
                  : isCompleted
                  ? palette.secondary500
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

    return (
      <View style={styles.stepsContainer}>
        {renderDot(1, 'Details')}
        <View style={styles.stepDivider} />
        {renderDot(2, 'Menu')}
        <View style={styles.stepDivider} />
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
        <TextInput
          style={[styles.formInput, !!errors.customer && styles.inputError]}
          placeholder="Search customer name..."
          placeholderTextColor={theme.colors.textMuted}
          value={customerSearch}
          onChangeText={val => {
            setCustomerSearch(val);
            setShowCustomerPicker(true);
          }}
          onFocus={() => setShowCustomerPicker(true)}
        />
        {errors.customer ? <Text style={styles.errorText}>{errors.customer}</Text> : null}

        {showCustomerPicker && (
          <View style={styles.pickerContainer}>
            <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="always">
              {filteredCustomersPicker.map(c => (
                <TouchableOpacity
                  key={c._id || c.id}
                  style={styles.pickerItem}
                  onPress={() => {
                    setSelectedCustomerId(c._id || c.id);
                    setCustomerSearch(c.customerName);
                    setShowCustomerPicker(false);
                    if (errors.customer) {
                      setErrors(prev => ({ ...prev, customer: '' }));
                    }
                  }}
                >
                  <Text style={styles.pickerItemText}>
                    {c.customerName} ({c.phoneNumber})
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
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
          <TextInput
            style={styles.formInput}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={theme.colors.textMuted}
            value={eventDate}
            onChangeText={setEventDate}
          />
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
                { color: filterVegOnly ? palette.secondary500 : theme.colors.textSecondary },
              ]}
            >
              Veg Only
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.menuList} showsVerticalScrollIndicator={false}>
        {filteredMenuItems.map(item => {
          const qty = selectedCart[item.id]?.quantity || 0;
          const isVeg = item.productType === 'VEG';

          return (
            <View key={item.id} style={styles.menuItemCard}>
              <View style={styles.menuItemLeft}>
                <View style={styles.typeBadgeContainer}>
                  <View
                    style={[
                      styles.vegNonvegBorder,
                      { borderColor: isVeg ? palette.secondary500 : palette.error500 },
                    ]}
                  >
                    <View
                      style={[
                        styles.vegNonvegCircle,
                        { backgroundColor: isVeg ? palette.secondary500 : palette.error500 },
                      ]}
                    />
                  </View>
                </View>

                <Text style={styles.menuItemName} variant="bold">
                  {item.name}
                </Text>
                <Text style={styles.menuItemPrice}>₹{item.price.toLocaleString()}</Text>
              </View>

              <View style={styles.menuItemRight}>
                {item.imageUrl ? (
                  <Image source={{ uri: item.imageUrl }} style={styles.menuItemImg} />
                ) : (
                  <View
                    style={[
                      styles.menuItemImgPlaceholder,
                      { backgroundColor: theme.colors.inputBg },
                    ]}
                  >
                    <ChefHat size={32} color={theme.colors.textMuted} />
                  </View>
                )}

                {/* Swiggy Style ADD / Quantity Counter */}
                <View style={styles.addBtnWrapper}>
                  {qty === 0 ? (
                    <TouchableOpacity
                      style={styles.swiggyAddBtn}
                      activeOpacity={0.8}
                      onPress={() =>
                        handleAddItemToCart(
                          item.id,
                          item.name,
                          item.price,
                          item.type,
                          item.productType,
                        )
                      }
                    >
                      <Text style={styles.swiggyAddText} variant="bold">
                        ADD
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.swiggyQtyBtn}>
                      <TouchableOpacity onPress={() => handleDecrementQty(item.id)}>
                        <Text style={styles.qtyBtnText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyNumText} variant="bold">
                        {qty}
                      </Text>
                      <TouchableOpacity onPress={() => handleIncrementQty(item.id)}>
                        <Text style={styles.qtyBtnText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Swiggy Style Cart Floating Bottom Bar */}
      {totalItemsCount > 0 && (
        <TouchableOpacity
          style={styles.cartBarWrapper}
          activeOpacity={0.9}
          onPress={handleNextStep2}
        >
          <View style={styles.cartBarLeft}>
            <ShoppingBag size={18} color={palette.white} />
            <Text style={styles.cartBarCount} variant="bold">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
            </Text>
            <Text style={styles.dividerPipe}>|</Text>
            <Text style={styles.cartBarPrice} variant="bold">
              ₹{orderItemsTotal.toLocaleString()}
            </Text>
          </View>
          <View style={styles.cartBarRight}>
            <Text style={styles.cartBarBtnText} variant="bold">
              View Cart
            </Text>
            <ChevronRight size={16} color={palette.white} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  // Render Step 3 (Checkout Confirmation Screen)
  const renderStep3Content = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.formSectionTitle} variant="bold">
        Checkout Confirmation
      </Text>

      {/* Cart Summary */}
      <View style={styles.checkoutHeader}>
        <Text style={styles.formLabel}>Selected Menu Items</Text>
        {Object.entries(selectedCart).map(([itemId, val]) => (
          <View key={itemId} style={styles.checkoutItemRow}>
            <Text style={styles.checkoutItemName} numberOfLines={1}>
              {val.name}
            </Text>
            <Text style={styles.checkoutItemQty}>x{val.quantity}</Text>
            <Text style={styles.checkoutItemTotal}>
              ₹{(val.quantity * val.unitPrice).toLocaleString()}
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
              <Tag size={14} color={palette.secondary600} />
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
                style={{ color: remainingBalance > 0 ? theme.colors.error : palette.secondary500 }}
                variant="bold"
              >
                ₹{remainingBalance.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Status details */}
      <View>
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
        <View style={styles.statusGroupRow}>
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

      {/* Meta urls */}
      <View style={styles.notesSection}>
        <View>
          <Text style={styles.formLabel}>Completed At (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.formInput}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={theme.colors.textMuted}
            value={completedAt}
            onChangeText={setCompletedAt}
          />
        </View>

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

      {editOrderId && (
        <Button
          title="Share Invoice PDF"
          variant="outline"
          onPress={handleSharePDF}
          loading={isGeneratingPdf}
          style={styles.checkoutButton}
        />
      )}

      <Button
        title={editOrderId ? 'Save Changes' : 'Confirm & Place Order'}
        onPress={handlePlaceOrder}
        loading={createMutation.isPending || updateMutation.isPending}
        style={styles.actionButtonSpacing}
      />
    </ScrollView>
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
            {editOrderId ? 'Edit Order' : 'Create Order'}
          </Text>
        </View>

        {renderStepIndicator()}

        {step === 1 && renderStep1Content()}
        {step === 2 && renderStep2Content()}
        {step === 3 && renderStep3Content()}
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default CreateOrderScreen;
