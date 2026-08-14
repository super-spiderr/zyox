import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';
import { ScreenContainer, Text, Input, Button, LanguageSelector } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import { palette, useAppTheme } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, Lock, ShieldCheck } from 'lucide-react-native';
import getStyles from './styles';
import { widthScale } from '@/utils/scaling';

const zyoxLogo = require('@/assets/images/zyox logo.png');
const mascot = require('@/assets/images/mascot_rocket_ride.png');

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = () => {
  const { login, isLoading } = useAuth();
  const { t, language } = useLanguage();

  const { theme, isDark } = useAppTheme();
  const styles = useStyles(getStyles);
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('admin@zyox.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError(t('fillAllFields'));
      return;
    }
    setError('');
    try {
      await login(email, password);
    } catch {
      setError(t('loginFailed'));
    }
  };

  return (
    <ScreenContainer
      contentContainerStyle={styles.container}
      scrollable={true}
      ignoreTopSafeArea={true}
      statusBarStyle={isDark ? 'light-content' : 'dark-content'}
    >
      <View style={[styles.screenContent, { paddingTop: Math.max(insets.top + 20, 16) }]}>
        <LanguageSelector style={styles.floatingLangSelector} />

        {/* Logo: the primary brand mark, centered at the top */}
        <View style={styles.logoRow}>
          <Image source={zyoxLogo} style={styles.headerLogo} resizeMode="contain" />
        </View>

        <View style={styles.welcomeBlock}>
          <Text variant="bold" fontSize={36} color="text" style={styles.welcomeHeading}>
            Welcome to{' '}
            <Text variant="bold" fontSize={36} color={palette.black} style={styles.highlightWord}>
              {t('loginTitle')}
            </Text>
          </Text>
          <Text
            variant="tiroTamilRegular"
            fontSize={16}
            color="textSecondary"
            style={styles.formTitle}
          >
            {t('letsBegin')}
          </Text>
          <Text
            variant="tiroTamilRegular"
            lineHeight={20}
            fontSize={language === 'ta' ? widthScale(10) : widthScale(12)}
            color="textSecondary"
            style={styles.formDesc}
          >
            {t('letsBeginDesc')}
          </Text>
        </View>

        <View style={styles.form}>
          <Text variant="tiroTamilRegular" color="text" style={styles.fieldLabel}>
            {t('email')}
          </Text>
          <Input
            placeholder={t('emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
            error={error && !email ? t('emailRequired') : undefined}
            icon={<Mail size={16} color={theme.colors.textMuted} />}
          />

          <Text variant="tiroTamilRegular" color="text" style={styles.fieldLabel}>
            {t('password')}
          </Text>
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={error && !password ? t('passwordRequired') : undefined}
            icon={<Lock size={16} color={theme.colors.textMuted} />}
          />

          {error ? (
            <Text variant="tiroTamilRegular" color="error" style={styles.error}>
              {error}
            </Text>
          ) : null}

          <Button
            title={t('signIn')}
            onPress={handleLogin}
            loading={isLoading}
            style={styles.button}
          />

          <View style={styles.adminCaptionRow}>
            <ShieldCheck
              size={13}
              color={theme.colors.textSecondary}
              style={styles.adminCaptionIcon}
            />
            <Text variant="tiroTamilRegular" color="textSecondary" style={styles.adminCaption}>
              {t('forgotPasswordAdmin')}
            </Text>
          </View>
        </View>

        {/* Mascot: sits in normal flow so it can never overlap the form
            above it, aligned to the bottom-right corner */}
        <View style={styles.mascotRow}>
          <Image source={mascot} style={styles.mascotImage} resizeMode="contain" />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default LoginScreen;
