import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { Bell } from 'lucide-react-native';
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
      <View style={styles.headerRow}>
        <View style={styles.headerLeftRow}>
          <TouchableOpacity
            style={styles.avatarCircle}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Profile')}
            accessibilityLabel={t('goToProfile') || 'Go to profile'}
          >
            <Text style={styles.avatarText}>{initials}</Text>
          </TouchableOpacity>
          <View style={styles.headerLeft}>
            <Text
              style={styles.greetingText}
              numberOfLines={1}
              fontSize={widthScale(12)}
              variant="bold"
            >
              {getGreeting()}
            </Text>
            <Text style={styles.userNameText} variant="semiBold" fontSize={widthScale(22)}>
              {firstName}
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Notifications')}
            accessibilityLabel={t('tabNotifications') || 'Notifications'}
          >
            <Bell size={20} color={theme.colors.text} />
            <View style={styles.badgeDot} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DashboardHeader;
