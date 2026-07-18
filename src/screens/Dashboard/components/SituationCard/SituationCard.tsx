import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { palette } from '@/theme';
import { AlertTriangle, CheckCircle2, FileEdit, ArrowRight } from 'lucide-react-native';

interface SituationCardProps {
  draftsAgingCount: number;
  morningConfirmedCount: number;
  totalTodayCount: number;
  confirmingAging: boolean;
  onConfirmAgingDrafts: () => void;
  onMorningFullPress: () => void;
  onNoOrdersPress: () => void;
  onDefaultPress: () => void;
}

export const SituationCard: React.FC<SituationCardProps> = ({
  draftsAgingCount,
  morningConfirmedCount,
  totalTodayCount,
  confirmingAging,
  onConfirmAgingDrafts,
  onMorningFullPress,
  onNoOrdersPress,
  onDefaultPress,
}) => {
  const { t } = useLanguage();
  const styles = useStyles(getStyles);

  // Determine card type based on priorities
  let cardType: 'amber' | 'green' | 'cobalt' | 'default' = 'cobalt';
  
  if (draftsAgingCount > 0) {
    cardType = 'amber';
  } else if (morningConfirmedCount >= 6) {
    cardType = 'green';
  } else if (totalTodayCount === 0) {
    cardType = 'cobalt';
  } else {
    cardType = 'default';
  }

  // Define contents based on card type
  const getCardDetails = () => {
    switch (cardType) {
      case 'amber':
        return {
          title: t('draftsAging', { count: draftsAgingCount }) || `${draftsAgingCount} Drafts aging 30+ min — confirm now`,
          icon: <AlertTriangle size={22} color={palette.warning600} />,
          style: styles.cardAmber,
          textStyle: styles.textAmber,
          onPress: onConfirmAgingDrafts,
          showLoading: confirmingAging,
        };
      case 'green':
        return {
          title: t('slotFull', { slot: t('morning') || 'Morning', count: morningConfirmedCount }) || `Morning slot full — ${morningConfirmedCount} confirmed`,
          icon: <CheckCircle2 size={22} color={palette.secondary600} />,
          style: styles.cardGreen,
          textStyle: styles.textGreen,
          onPress: onMorningFullPress,
          showLoading: false,
        };
      case 'cobalt':
        return {
          title: t('noOrdersToday') || 'No orders yet today — start entering',
          icon: <FileEdit size={22} color={palette.primary500} />,
          style: styles.cardCobalt,
          textStyle: styles.textCobalt,
          onPress: onNoOrdersPress,
          showLoading: false,
        };
      case 'default':
      default:
        return {
          title: `${totalTodayCount} active orders today — keep tracking`,
          icon: <CheckCircle2 size={22} color={palette.primary500} />,
          style: styles.cardCobalt,
          textStyle: styles.textCobalt,
          onPress: onDefaultPress,
          showLoading: false,
        };
    }
  };

  const details = getCardDetails();

  return (
    <TouchableOpacity
      style={[styles.card, details.style]}
      activeOpacity={0.8}
      onPress={details.onPress}
      disabled={details.showLoading}
    >
      <View style={styles.leftBorder} />
      <View style={styles.contentRow}>
        <View style={styles.iconWrapper}>{details.icon}</View>
        <View style={styles.textContainer}>
          <Text style={[styles.titleText, details.textStyle]} variant="bold" fontSize={14}>
            {details.title}
          </Text>
        </View>
        <View style={styles.actionWrapper}>
          {details.showLoading ? (
            <ActivityIndicator size="small" color={palette.warning600} />
          ) : (
            <ArrowRight size={18} color={
              cardType === 'amber' ? palette.warning600 : cardType === 'green' ? palette.secondary600 : palette.primary500
            } />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SituationCard;
