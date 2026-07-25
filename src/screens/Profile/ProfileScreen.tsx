import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenContainer, Text, Button, Skeleton, GradientHeader } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { useProfile } from '@/hooks/queries';
import { useAppTheme } from '@/theme';
import { Sun, Moon } from 'lucide-react-native';
import { getInitials } from '@/utils/avatar';

export const ProfileScreen: React.FC = () => {
  const { logout } = useAuth();
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const { theme, isDark, themeMode, setThemeMode } = useAppTheme();

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const { data: profile, isLoading, error, refetch } = useProfile();

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

  if (isLoading) {
    return (
      <ScreenContainer statusBarBgColor="transparent" ignoreTopSafeArea>
        <GradientHeader title={t('profileTitle') || 'User Profile'} />
        <View style={styles.container}>
          <View style={styles.header}>
            {/* Avatar Circle Skeleton */}
            <Skeleton variant="circle" width={80} height={80} style={styles.skeletonAvatar} />
            {/* Name skeleton */}
            <Skeleton variant="text" width={150} height={24} style={styles.skeletonName} />
            {/* Email skeleton */}
            <Skeleton variant="text" width={200} height={14} style={styles.skeletonEmail} />
            {/* Badges skeleton */}
            <View style={styles.skeletonBadges}>
              <Skeleton variant="rect" width={60} height={20} borderRadius={10} />
              <Skeleton variant="rect" width={80} height={20} borderRadius={10} />
            </View>
          </View>

          {/* Card skeleton */}
          <View style={styles.skeletonCard}>
            <Skeleton variant="text" width="95%" height={16} />
            <Skeleton variant="text" width="85%" height={16} />
            <Skeleton variant="text" width="90%" height={16} />
            <Skeleton variant="text" width="80%" height={16} />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  if (error || !profile) {
    return (
      <ScreenContainer statusBarBgColor="transparent" ignoreTopSafeArea>
        <GradientHeader title={t('profileTitle') || 'User Profile'} />
        <View style={styles.container}>
          <View style={styles.errorContainer}>
            <Text variant="h3" color="error" style={styles.errorTitle}>
              {t('profileFetchFailed')}
            </Text>
            <Text variant="bodyMedium" color="textSecondary" style={styles.errorText}>
              {error?.message || 'Please check your connection and try again.'}
            </Text>
            <Button
              title={t('profileRetry')}
              onPress={() => refetch()}
              style={styles.errorButton}
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer statusBarBgColor="transparent" ignoreTopSafeArea>
      <GradientHeader title={t('profileTitle') || 'User Profile'} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* User Header Profile Card */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text variant="bold" color="white" style={styles.avatarText}>
              {getInitials(profile?.firstName, 'U')}
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

        <Button
          title={t('signOut')}
          variant="outline"
          onPress={logout}
          style={styles.signOutButton}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default ProfileScreen;
