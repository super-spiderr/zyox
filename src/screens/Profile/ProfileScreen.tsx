import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Button, Skeleton } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './ProfileScreen.styles';
import { useProfile } from '@/hooks/queries';
import { useAppTheme } from '@/theme';
import { Sun, Moon, ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen: React.FC = () => {
  const { logout } = useAuth();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const { theme, isDark, themeMode, setThemeMode } = useAppTheme();
  const navigation = useNavigation<any>();

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const { data: profile, isLoading, error, refetch, isFetching } = useProfile();

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  if (isLoading) {
    return (
      <ScreenContainer contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <Text variant="h3" color="text">
            {t('profileTitle')}
          </Text>
          <View style={{ width: 34 }} />
        </View>
        <View style={styles.header}>
          {/* Avatar Circle Skeleton */}
          <Skeleton
            variant="circle"
            width={80}
            height={80}
            style={{ alignSelf: 'center', marginBottom: 16 }}
          />
          {/* Name skeleton */}
          <Skeleton
            variant="text"
            width={150}
            height={24}
            style={{ alignSelf: 'center', marginBottom: 8 }}
          />
          {/* Email skeleton */}
          <Skeleton
            variant="text"
            width={200}
            height={14}
            style={{ alignSelf: 'center', marginBottom: 16 }}
          />
          {/* Badges skeleton */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
            <Skeleton variant="rect" width={60} height={20} borderRadius={10} />
            <Skeleton variant="rect" width={80} height={20} borderRadius={10} />
          </View>
        </View>

        {/* Card skeleton */}
        <View style={[styles.card, { padding: 16, gap: 16 }]}>
          <Skeleton variant="text" width="95%" height={16} />
          <Skeleton variant="text" width="85%" height={16} />
          <Skeleton variant="text" width="90%" height={16} />
          <Skeleton variant="text" width="80%" height={16} />
        </View>
      </ScreenContainer>
    );
  }

  if (error || !profile) {
    return (
      <ScreenContainer contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <Text variant="h3" color="text">
            {t('profileTitle')}
          </Text>
          <View style={{ width: 34 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text variant="h3" color="error" style={styles.errorTitle}>
            {t('profileFetchFailed')}
          </Text>
          <Text variant="bodyMedium" color="textSecondary" style={styles.errorText}>
            {error?.message || 'Please check your connection and try again.'}
          </Text>
          <Button title={t('profileRetry')} onPress={() => refetch()} style={styles.errorButton} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable={true} contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <Text variant="h3" color="text">
          {t('profileTitle') || 'User Profile'}
        </Text>
        <View style={{ width: 34 }} /> {/* balance spacing */}
      </View>

      <View>
        {/* User Header Profile Card */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text variant="bold" color="white" style={styles.avatarText}>
              {getInitials(profile.firstName)}
            </Text>
          </View>
          <Text variant="h2" color="text" style={styles.name}>
            {profile.firstName}
          </Text>
          <Text variant="bodyMedium" color="textSecondary" style={styles.email}>
            {profile.email}
          </Text>
          <View style={styles.badgeRow}>
            <View style={styles.roleBadge}>
              <Text variant="bold" color="primary" style={styles.roleText}>
                {profile.role}
              </Text>
            </View>
            {profile.isActive && (
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text variant="bold" style={styles.statusText}>
                  {t('profileActive')}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Detailed Info Card */}
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text variant="bold" color="textSecondary" style={styles.infoLabel}>
              {t('profileRole')}
            </Text>
            <Text variant="bodyMedium" color="text" style={styles.infoValue}>
              {profile.role}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="bold" color="textSecondary" style={styles.infoLabel}>
              {t('profileMemberSince')}
            </Text>
            <Text variant="bodyMedium" color="text" style={styles.infoValue}>
              {formatDate(profile.createdAt)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="bold" color="textSecondary" style={styles.infoLabel}>
              {t('profileLastActive')}
            </Text>
            <Text variant="bodyMedium" color="text" style={styles.infoValue}>
              {formatDate(profile.lastLoginAt)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="bold" color="textSecondary" style={styles.infoLabel}>
              {t('profileAccountId')}
            </Text>
            <Text
              variant="bodyMedium"
              color="textSecondary"
              style={styles.infoValue}
              numberOfLines={1}
            >
              {profile._id}
            </Text>
          </View>
          <View style={styles.lastInfoRow}>
            <Text variant="bold" color="textSecondary" style={styles.infoLabel}>
              {t('profileThemeMode')}
            </Text>
            <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7}>
              {isDark ? (
                <Sun size={20} color={theme.colors.primary} />
              ) : (
                <Moon size={20} color={theme.colors.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Button
        title={t('signOut')}
        variant="outline"
        onPress={logout}
        style={styles.signOutButton}
      />
    </ScreenContainer>
  );
};

export default ProfileScreen;
