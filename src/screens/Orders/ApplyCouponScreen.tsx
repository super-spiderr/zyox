import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { ScreenContainer, Text } from '@/components';
import { useAppTheme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';
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
      contentContainerStyle={StyleSheet.flatten([
        styles.container,
        { backgroundColor: theme.colors.background },
      ])}
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
      <View style={[styles.inputSection, { borderBottomColor: theme.colors.border }]}>
        <Text style={styles.sectionLabel}>Enter Promo Code</Text>
        <View style={styles.promoRow}>
          <TextInput
            style={[
              styles.textInput,
              {
                borderColor: theme.colors.border,
                color: theme.colors.text,
                backgroundColor: theme.colors.cardAltBg,
              },
            ]}
            placeholder="e.g. ZYOX500"
            placeholderTextColor={theme.colors.textMuted}
            value={promoCode}
            onChangeText={setPromoCode}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            style={[
              styles.applyBtn,
              {
                backgroundColor: promoCode.trim() ? theme.colors.primary : theme.colors.border,
              },
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
                {
                  backgroundColor: theme.colors.card,
                  borderColor: isCurrentlyApplied
                    ? palette.secondary500
                    : isEligible
                    ? theme.colors.border
                    : theme.colors.border,
                  opacity: isEligible ? 1 : 0.6,
                },
              ]}
            >
              <View style={styles.couponTop}>
                <View
                  style={[
                    styles.badgeContainer,
                    {
                      backgroundColor: isCurrentlyApplied
                        ? palette.secondary100
                        : isEligible
                        ? theme.colors.couponEligibleBg
                        : theme.colors.couponInactiveBg,
                      borderColor: isCurrentlyApplied ? palette.secondary500 : theme.colors.border,
                    },
                  ]}
                >
                  <Ticket size={16} color={isCurrentlyApplied ? palette.secondary600 : theme.colors.primary} />
                  <Text
                    style={[
                      styles.badgeText,
                      { color: isCurrentlyApplied ? palette.secondary700 : theme.colors.primary },
                    ]}
                    variant="bold"
                  >
                    {coupon.code}
                  </Text>
                </View>

                {isCurrentlyApplied ? (
                  <View style={styles.appliedRow}>
                    <CheckCircle2 size={16} color={palette.secondary500} />
                    <Text style={styles.appliedText} variant="semiBold">
                      Applied
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.cardApplyBtn,
                      { borderColor: isEligible ? palette.secondary500 : theme.colors.border },
                    ]}
                    onPress={() => handleApplyCoupon(coupon)}
                    disabled={!isEligible && !isCurrentlyApplied}
                  >
                    <Text
                      style={{ color: isEligible ? palette.secondary600 : theme.colors.textMuted }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: heightScale(10),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthScale(16),
    marginBottom: heightScale(16),
  },
  backButton: {
    padding: widthScale(6),
    marginRight: widthScale(10),
  },
  headerTitle: {
    fontSize: widthScale(18),
  },
  inputSection: {
    paddingHorizontal: widthScale(16),
    paddingBottom: heightScale(18),
    borderBottomWidth: 1,
  },
  sectionLabel: {
    fontSize: widthScale(13),
    color: palette.gray500,
    marginBottom: heightScale(8),
  },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: heightScale(46),
    borderWidth: 1,
    borderRadius: widthScale(8),
    paddingHorizontal: widthScale(14),
    fontSize: widthScale(14),
    marginRight: widthScale(10),
  },
  applyBtn: {
    height: heightScale(46),
    paddingHorizontal: widthScale(18),
    borderRadius: widthScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtnText: {
    color: palette.white,
    fontSize: widthScale(13),
  },
  listContainer: {
    paddingHorizontal: widthScale(16),
    paddingTop: heightScale(18),
    paddingBottom: heightScale(40),
  },
  couponHeading: {
    fontSize: widthScale(15),
    marginBottom: heightScale(14),
  },
  couponCard: {
    borderWidth: 1,
    borderRadius: widthScale(12),
    padding: widthScale(16),
    marginBottom: heightScale(16),
    borderStyle: 'dashed',
  },
  couponTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightScale(10),
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthScale(10),
    paddingVertical: heightScale(6),
    borderRadius: widthScale(6),
    borderWidth: 1,
    gap: widthScale(6),
  },
  badgeText: {
    fontSize: widthScale(14),
  },
  cardApplyBtn: {
    paddingVertical: heightScale(4),
    paddingHorizontal: widthScale(12),
    borderWidth: 1,
    borderRadius: widthScale(6),
  },
  appliedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthScale(4),
  },
  appliedText: {
    color: palette.secondary500,
    fontSize: widthScale(14),
  },
  couponDesc: {
    fontSize: widthScale(12),
    color: palette.gray500,
    lineHeight: heightScale(18),
  },
  minSpendWarning: {
    marginTop: heightScale(10),
    paddingTop: heightScale(8),
    borderTopWidth: 0.5,
    borderTopColor: palette.gray200,
  },
  warningText: {
    color: palette.error500,
  },
});

export default ApplyCouponScreen;
