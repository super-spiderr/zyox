import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { Bell, Plus, UserPlus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@/theme';
import { widthScale } from '@/utils/scaling';

interface DashboardHeaderProps {
  firstName: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ firstName }) => {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const styles = useStyles(theme => getStyles(theme, insets));
  const navigation = useNavigation<any>();
  const { theme } = useAppTheme();

  // Animation values for cross-fading illustrations
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const [showFirstImage, setShowFirstImage] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstImage(prev => !prev);
    }, 4000); // Swap every 4 seconds

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showFirstImage ? 1 : 0,
      duration: 800, // 800ms transition
      useNativeDriver: true,
    }).start();
  }, [showFirstImage, fadeAnim]);

  // Dynamic welcome greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return t('goodMorning');
    } else if (hour >= 12 && hour < 17) {
      return t('goodAfternoon');
    } else {
      return t('goodEvening');
    }
  };

  // Initials for Avatar Circle
  const initials = firstName ? firstName.trim().charAt(0).toUpperCase() : 'V';

  return (
    <View style={styles.headerContainer}>
      {/* Top Row: Greeting + Actions */}
      <View style={styles.headerRow}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText} variant="semiBold" fontSize={widthScale(16)}>
            {getGreeting()}
          </Text>
          <Text style={styles.userNameText} variant="bold" fontSize={widthScale(18)}>
            {firstName}!
          </Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.bellButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Notifications')}
            accessibilityLabel={t('tabNotifications') || 'Notifications'}
          >
            <Bell size={24} color={theme.colors.dashboardTitle} />
            <View style={styles.redBadge} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.avatarCircle}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Profile')}
            accessibilityLabel={t('goToProfile') || 'Go to profile'}
          >
            <Text style={styles.avatarText} variant="bold" fontSize={widthScale(16)}>
              {initials}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dual action buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('CreateOrder')}
        >
          <Plus size={16} color="#FFFFFF" style={{ marginRight: widthScale(4) }} />
          <Text
            style={styles.buttonText}
            variant="bold"
            fontSize={widthScale(13)}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {t('orders') || 'Order'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.customerButton]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('CreateCustomer')}
        >
          <UserPlus
            size={16}
            color={theme.colors.dashboardTitle}
            style={{ marginRight: widthScale(4) }}
          />
          <Text
            style={styles.customerButtonText}
            variant="bold"
            fontSize={widthScale(13)}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {t('customer') || 'Customer'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardHeader;
