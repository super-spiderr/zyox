import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Button } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './SettingsScreen.styles';
import { useAppTheme, palette } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { User, Languages, Sun, Moon, ChevronRight, LogOut } from 'lucide-react-native';

export const SettingsScreen: React.FC = () => {
  const { logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const styles = useStyles(getStyles);
  const { theme, isDark, themeMode, setThemeMode } = useAppTheme();
  const navigation = useNavigation<any>();

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <ScreenContainer contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} variant="h1">
          {t('settingsTitle') || 'Settings'}
        </Text>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{t('profileTitle') || 'Profile'}</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.lastRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconWrapper, { backgroundColor: theme.colors.primary + '15' }]}>
                <User size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.rowLabelContainer}>
                <Text style={styles.rowLabel}>{t('settingsProfile') || 'Account Details'}</Text>
                <Text style={styles.rowSublabel}>
                  {t('settingsProfileDesc') || 'View role, email, and metadata'}
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{t('preferences') || 'Preferences'}</Text>
        <View style={styles.card}>
          {/* Language Row */}
          <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={toggleLanguage}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconWrapper, { backgroundColor: `${palette.blue500}15` }]}>
                <Languages size={20} color={palette.blue500} />
              </View>
              <View style={styles.rowLabelContainer}>
                <Text style={styles.rowLabel}>{t('settingsLanguage') || 'Language'}</Text>
                <Text style={styles.rowSublabel}>{t('languageSelector') || 'Select Language'}</Text>
              </View>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>{language === 'en' ? 'English' : 'தமிழ்'}</Text>
              <ChevronRight size={16} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {/* Theme Row */}
          <TouchableOpacity style={styles.lastRow} activeOpacity={0.7} onPress={toggleTheme}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconWrapper, { backgroundColor: `${palette.purple500}15` }]}>
                {isDark ? (
                  <Sun size={20} color={palette.purple500} />
                ) : (
                  <Moon size={20} color={palette.purple500} />
                )}
              </View>
              <View style={styles.rowLabelContainer}>
                <Text style={styles.rowLabel}>{t('settingsTheme') || 'App Theme'}</Text>
                <Text style={styles.rowSublabel}>
                  {isDark ? t('toggleLightTheme') || 'Switch to Light Mode' : t('toggleDarkTheme') || 'Switch to Dark Mode'}
                </Text>
              </View>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>
                {themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
              </Text>
              <ChevronRight size={16} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign Out */}
      <Button
        title={t('signOut')}
        variant="outline"
        onPress={logout}
        icon={<LogOut size={16} color={theme.colors.primary} />}
        style={styles.signOutButton}
      />
    </ScreenContainer>
  );
};

export default SettingsScreen;
