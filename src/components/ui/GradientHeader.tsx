import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleSheet,
  ViewStyle,
} from 'react-native';
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
  image: ImageSourcePropType;
  onBackPress?: () => void;
  onSortToggle?: () => void;
  sortActive?: boolean;
  onFilterPress?: () => void;
  /**
   * Generic action slot rendered alongside (or instead of) the built-in
   * sort/filter buttons — e.g. pass a <GradientHeaderAction> wrapping a
   * "create" icon to swap in a screen-specific action instead of filter.
   */
  action?: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Rounded gradient hero header shared across list/create screens (Customers,
 * Products, Packages, ...): back button, title, optional count/description,
 * optional sort+filter actions, and a decorative illustration bleeding off
 * the corner. Extends up behind the status bar — the screen using this must
 * pass `ignoreTopSafeArea` + a matching `statusBarStyle` to its
 * ScreenContainer (see CustomersScreen for the reference implementation).
 */
export const GradientHeader: React.FC<GradientHeaderProps> = ({
  title,
  description,
  count,
  countLabel,
  image,
  onBackPress,
  onSortToggle,
  sortActive,
  onFilterPress,
  action,
  style,
}) => {
  const { theme, isDark } = useAppTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Same theme gradient formula as StatsCard/Button.
  const startColor = theme.colors.primary;
  const endColor = theme.colors.cardGradEnd;
  const colors = isDark ? [endColor, startColor, endColor] : [startColor, endColor, startColor];

  const onGradientText = theme.colors.primaryText;
  const onGradientMuted = isDark ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.75)';
  const onGradientChip = isDark ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)';

  const hasActions = Boolean(onSortToggle || onFilterPress || action);

  return (
    <View style={[styles.shadowWrap, style]}>
      <View style={[styles.gradient, { paddingTop: Math.max(insets.top, 12) + 10 }]}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill]}
        />
        <Image source={image} style={styles.bannerImage} />

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
                color={onGradientText}
                style={styles.headerTitle}
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
                  <ArrowUpDown size={15} color={sortActive ? onGradientText : onGradientMuted} />
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
                  <Filter size={15} color={onGradientText} />
                </TouchableOpacity>
              )}
              {action}
            </View>
          )}
        </View>

        {(typeof count === 'number' || description) && (
          <View style={styles.descWrap}>
            {typeof count === 'number' && (
              <Text color={onGradientMuted} style={styles.headerSubtitle}>
                {count} {countLabel}
              </Text>
            )}
            {description && (
              <Text variant="medium" color={onGradientMuted} style={styles.descText}>
                {description}
              </Text>
            )}
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

/**
 * Small circular translucent button matching GradientHeader's built-in
 * sort/filter buttons — use this to build a custom `action` for GradientHeader,
 * e.g. a "create" icon that navigates to a create screen.
 */
export const GradientHeaderAction: React.FC<GradientHeaderActionProps> = ({ icon, onPress }) => {
  const { isDark } = useAppTheme();
  const onGradientChip = isDark ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)';

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
  shadowWrap: {
    marginBottom: heightScale(16),
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
  gradient: {
    overflow: 'hidden',
    paddingHorizontal: widthScale(16),
    paddingBottom: heightScale(16),
  },
  bannerImage: {
    position: 'absolute',
    right: -widthScale(8),
    bottom: -widthScale(16),
    width: widthScale(126),
    height: widthScale(102),
    resizeMode: 'contain',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: widthScale(8),
  },
  backButton: {
    width: widthScale(32),
    height: widthScale(32),
    borderRadius: widthScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthScale(10),
  },
  headerTitleWrap: {
    flexShrink: 1,
  },
  headerTitle: {
    fontSize: widthScale(18),
    flexShrink: 1,
  },
  headerSubtitle: {
    fontSize: widthScale(11),
    marginTop: heightScale(1),
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: widthScale(32),
    height: widthScale(32),
    borderRadius: widthScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthScale(8),
  },
  actionButtonLast: {
    marginRight: 0,
  },
  descWrap: {
    maxWidth: '62%',
    marginTop: heightScale(14),
  },
  descText: {
    fontSize: widthScale(10),
    lineHeight: heightScale(17),
  },
});

export default GradientHeader;
