import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, ArrowUpDown, Filter } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from './Text';
import { useAppTheme, palette } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

interface GradientHeaderProps {
  title: string;
  description?: string;
  count?: number;
  countLabel?: string;
  onBackPress?: () => void;
  onSortToggle?: () => void;
  sortActive?: boolean;
  onFilterPress?: () => void;
  action?: React.ReactNode;
  style?: ViewStyle;
}

export const GradientHeader: React.FC<GradientHeaderProps> = ({
  title,
  description,
  count,
  countLabel,
  onBackPress,
  onSortToggle,
  sortActive,
  onFilterPress,
  action,
  style,
}) => {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const onGradientText = '#FFFFFF';
  const onGradientMuted = 'rgba(255,255,255,0.6)';
  const onGradientChip = 'rgba(255,255,255,0.18)';

  const hasActions = Boolean(onSortToggle || onFilterPress || action);

  return (
    <View style={[styles.headerWrapper, style]}>
      {/* Background Gradient with rounded bottom corners */}
      <LinearGradient
        colors={[palette.primary900, palette.primary600]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative concentric circles */}
      <View style={styles.circleLarge} pointerEvents="none" />
      <View style={styles.circleMedium} pointerEvents="none" />

      <View style={[styles.headerContent, { paddingTop: Math.max(insets.top, 12) + 6 }]}>
        {/* Top Navigation Row: Back button, Title & Action buttons */}
        <View style={styles.navRow}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: onGradientChip }]}
              onPress={onBackPress || (() => navigation.goBack())}
              activeOpacity={0.7}
            >
              <ArrowLeft size={20} color={onGradientText} />
            </TouchableOpacity>
            <View style={styles.headerTitleWrap}>
              <Text
                variant="bold"
                style={[styles.headerTitle, { color: onGradientText }]}
                numberOfLines={1}
              >
                {title}
              </Text>
            </View>
          </View>

          {hasActions && (
            <View style={styles.headerActions}>
              {onSortToggle && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: onGradientChip }]}
                  onPress={onSortToggle}
                  activeOpacity={0.7}
                >
                  <ArrowUpDown size={16} color={sortActive ? onGradientText : onGradientMuted} />
                </TouchableOpacity>
              )}
              {onFilterPress && (
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    !action && styles.actionButtonLast,
                    { backgroundColor: onGradientChip },
                  ]}
                  onPress={onFilterPress}
                  activeOpacity={0.7}
                >
                  <Filter size={16} color={onGradientText} />
                </TouchableOpacity>
              )}
              {action}
            </View>
          )}
        </View>

        {/* Metadata Info Row below navigation */}
        {description && (
          <View style={styles.metaRow}>
            <Text style={[styles.descText, { color: 'rgba(255,255,255,0.8)' }]}>{description}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

interface GradientHeaderActionProps {
  icon: React.ReactNode;
  onPress: () => void;
}

export const GradientHeaderAction: React.FC<GradientHeaderActionProps> = ({ icon, onPress }) => {
  const onGradientChip = 'rgba(255,255,255,0.18)';

  return (
    <TouchableOpacity
      style={[styles.actionButton, styles.actionButtonLast, { backgroundColor: onGradientChip }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: heightScale(16),
  },
  headerContent: {
    paddingHorizontal: widthScale(16),
    paddingBottom: heightScale(18),
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: heightScale(40),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: widthScale(8),
  },
  backButton: {
    width: widthScale(36),
    height: widthScale(36),
    borderRadius: widthScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthScale(10),
  },
  headerTitleWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: widthScale(18),
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: widthScale(36),
    height: widthScale(36),
    borderRadius: widthScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthScale(8),
  },
  actionButtonLast: {
    marginRight: 0,
  },
  metaRow: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: heightScale(14),
    gap: heightScale(6),
  },
  descText: {
    fontSize: widthScale(12),
  },
  descTextWithBadge: {
    marginTop: heightScale(2),
  },
  circleLarge: {
    position: 'absolute',
    right: -widthScale(60),
    bottom: -widthScale(70),
    width: widthScale(220),
    height: widthScale(220),
    borderRadius: widthScale(110),
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  circleMedium: {
    position: 'absolute',
    right: -widthScale(20),
    top: -widthScale(50),
    width: widthScale(150),
    height: widthScale(150),
    borderRadius: widthScale(75),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});

export default GradientHeader;
