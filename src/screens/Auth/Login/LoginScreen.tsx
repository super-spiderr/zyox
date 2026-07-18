import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';
import { ScreenContainer, Text, Input, Button, LanguageSelector } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, Lock, ShieldCheck } from 'lucide-react-native';
import { palette } from '@/theme';
import getStyles from './LoginScreen.styles';

const ordersIcon = require('@/assets/images/orders_icon.png');
const packagesIcon = require('@/assets/images/packages_icon.png');

const ON_BLACK_TEXT = palette.white;
// Translucent overlay on a permanently-dark surface — no opaque palette
// equivalent applies, kept as a literal.
const ON_BLACK_MUTED = 'rgba(255,255,255,0.7)';
const BUTTON_GRADIENT = [palette.white, palette.loginFieldBg];

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = () => {
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();
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
    >
      <View style={styles.screenContainer}>
        <Image source={ordersIcon} style={[styles.heroDecoration, styles.heroDecorationTopLeft]} />
        <Image
          source={packagesIcon}
          style={[styles.heroDecoration, styles.heroDecorationBottomRight]}
        />
        <View style={styles.screenContent}>
          <View style={[styles.brandBlock, { marginTop: Math.max(insets.top, 16) + 8 }]}>
            <Text variant="bold" fontSize={38} color={ON_BLACK_TEXT} style={styles.titleText}>
              Welcome to
            </Text>
            <Text variant="bold" fontSize={48} color={ON_BLACK_TEXT} style={styles.titleText}>
              {t('loginTitle')}
            </Text>
            <Text variant="medium" color={ON_BLACK_MUTED} style={styles.subtitle}>
              {t('loginDesc')}
            </Text>
          </View>

          <View style={styles.form}>
            <Text variant="medium" color={ON_BLACK_TEXT} style={styles.fieldLabel}>
              {t('email')}
            </Text>
            <Input
              variant="light"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChangeText={setEmail}
              error={error && !email ? t('emailRequired') : undefined}
              icon={<Mail size={16} color={palette.loginPlaceholder} />}
            />

            <Text variant="medium" color={ON_BLACK_TEXT} style={styles.fieldLabel}>
              {t('password')}
            </Text>
            <Input
              variant="light"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={error && !password ? t('passwordRequired') : undefined}
              icon={<Lock size={16} color={palette.loginPlaceholder} />}
            />

            {error ? (
              <Text variant="caption" color="error" style={styles.error}>
                {error}
              </Text>
            ) : null}

            <Button
              title={t('signIn')}
              onPress={handleLogin}
              loading={isLoading}
              gradient={BUTTON_GRADIENT}
              textColor={palette.black}
              style={styles.button}
            />

            <View style={styles.adminCaptionRow}>
              <ShieldCheck size={13} color={ON_BLACK_MUTED} style={styles.adminCaptionIcon} />
              <Text variant="caption" color={ON_BLACK_MUTED} style={styles.adminCaption}>
                {t('forgotPasswordAdmin')}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <LanguageSelector
        variant="onDark"
        style={[styles.floatingLangSelector, { top: Math.max(insets.top, 16) }]}
      />
    </ScreenContainer>
  );
};

export default LoginScreen;
