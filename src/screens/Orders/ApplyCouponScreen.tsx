import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { ScreenContainer, Text } from '@/components';
import { useAppTheme } from '@/theme';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './ApplyCouponScreen.styles';
import { ArrowLeft, Ticket, CheckCircle2 } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'ApplyCoupon'>;

interface Coupon {
  code: string;
  description: string;
  discount: number;
  minSpend: number;
}

const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'ZYOX100',
    description: 'Get flat ₹100 off on your catering order! No minimum order value.',
    discount: 100,
    minSpend: 0,
  },
  {
    code: 'ZYOX500',
    description: 'Get flat ₹500 off on your catering order. Valid on orders above ₹1,000.',
    discount: 500,
    minSpend: 1000,
  },
  {
    code: 'ZYOX1000',
    description: 'Get flat ₹1,000 off on your catering order. Valid on orders above ₹2,000.',
    discount: 1000,
    minSpend: 2000,
  },
];

export const ApplyCouponScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme } = useAppTheme();
  const styles = useStyles(getStyles);

  const { orderTotal, currentCoupon } = route.params;
  const [promoCode, setPromoCode] = useState('');

  const handleApplyCoupon = (coupon: Coupon) => {
    if (orderTotal < coupon.minSpend) {
      Alert.alert(
        'Requirement Not Met',
        `This coupon requires a minimum order total of ₹${coupon.minSpend}. Currently, order total is ₹${orderTotal}.`,
      );
      return;
    }

    navigation.navigate('CreateOrder', {
      appliedCoupon: coupon.code,
      discountAmount: coupon.discount,
    });
  };

  const handleManualApply = () => {
    const codeUpper = promoCode.trim().toUpperCase();
    if (!codeUpper) return;

    const matched = AVAILABLE_COUPONS.find(c => c.code === codeUpper);
    if (!matched) {
      Alert.alert(
        'Invalid Coupon',
        'The coupon code you entered is invalid. Please try ZYOX100, ZYOX500, or ZYOX1000.',
      );
      return;
    }

    handleApplyCoupon(matched);
  };

  return (
    <ScreenContainer
      scrollable={false}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} variant="bold">
          Offers & Coupons
        </Text>
      </View>

      {/* Manual Input */}
      <View style={styles.inputSection}>
        <Text style={styles.sectionLabel}>Enter Promo Code</Text>
        <View style={styles.promoRow}>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. ZYOX500"
            placeholderTextColor={theme.colors.textMuted}
            value={promoCode}
            onChangeText={setPromoCode}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            style={[
              styles.applyBtn,
              promoCode.trim() ? styles.applyBtnActive : styles.applyBtnDisabled,
            ]}
            onPress={handleManualApply}
            disabled={!promoCode.trim()}
          >
            <Text style={styles.applyBtnText} variant="bold">
              APPLY
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Coupons List */}
      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.couponHeading} variant="semiBold">
          Available Coupons
        </Text>
        {AVAILABLE_COUPONS.map(coupon => {
          const isEligible = orderTotal >= coupon.minSpend;
          const isCurrentlyApplied = currentCoupon === coupon.code;

          return (
            <View
              key={coupon.code}
              style={[
                styles.couponCard,
                isCurrentlyApplied
                  ? styles.couponCardApplied
                  : isEligible
                  ? styles.couponCardEligible
                  : styles.couponCardInactive,
              ]}
            >
              <View style={styles.couponTop}>
                <View
                  style={[
                    styles.badgeContainer,
                    isCurrentlyApplied
                      ? styles.badgeContainerApplied
                      : isEligible
                      ? styles.badgeContainerEligible
                      : styles.badgeContainerInactive,
                  ]}
                >
                  <Ticket size={16} color={isCurrentlyApplied ? theme.colors.paidText : theme.colors.primary} />
                  <Text
                    style={[
                      styles.badgeText,
                      isCurrentlyApplied ? styles.badgeTextApplied : styles.badgeTextEligible,
                    ]}
                    variant="bold"
                  >
                    {coupon.code}
                  </Text>
                </View>

                {isCurrentlyApplied ? (
                  <View style={styles.appliedRow}>
                    <CheckCircle2 size={16} color={theme.colors.paidText} />
                    <Text style={styles.appliedText} variant="semiBold">
                      Applied
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.cardApplyBtn,
                      isEligible ? styles.cardApplyBtnEligible : styles.cardApplyBtnInactive,
                    ]}
                    onPress={() => handleApplyCoupon(coupon)}
                    disabled={!isEligible && !isCurrentlyApplied}
                  >
                    <Text
                      style={isEligible ? styles.cardApplyBtnTextEligible : styles.cardApplyBtnTextInactive}
                      variant="bold"
                    >
                      APPLY
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.couponDesc} variant="regular">
                {coupon.description}
              </Text>

              {!isEligible && (
                <View style={styles.minSpendWarning}>
                  <Text style={styles.warningText} variant="caption">
                    Spend ₹{(coupon.minSpend - orderTotal).toLocaleString()} more to unlock this
                    offer
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};

export default ApplyCouponScreen;
