export const palette = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  cardGradDarkEnd: '#2A2A2A',
  cardGradLightEnd: '#D0D0D0',

  // Grays / Slates
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray450: '#959595',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  gray950: '#030712',

  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F2042',

  // Primary (Hostinger Purple theme — brand base #673DE6)
  primary50: '#F3EFFD',
  primary100: '#E4D9FB',
  primary200: '#C9B3F7',
  primary300: '#A98CF0',
  primary400: '#8A66E8',
  primary500: '#673DE6',
  primary600: '#5527D6',
  primary700: '#431DB0',
  primary800: '#31148C',
  primary900: '#240E6B',
  primaryDark900: '#2A1170',
  primaryTint900: '#241847',
  primaryTint950: '#101011',

  // Yellow (based on login accent #febf1b)
  yellow50: '#FFFDF2',
  yellow100: '#FFFBE0',
  yellow200: '#FFF4B8',
  yellow300: '#FEE785',
  yellow400: '#FDD752',
  yellow500: '#febf1b',
  yellow600: '#DB9E0D',
  yellow700: '#B78107',
  yellow800: '#936403',
  yellow900: '#7A5101',
  yellow: '#febf1b',

  // Error (red - used on login screen)
  error50: '#FEF2F2',
  error100: '#FEE2E2',
  error200: '#FECACA',
  error300: '#F87171',
  error400: '#EF4444',
  error500: '#EF4444',
  error600: '#DC2626',
  error700: '#B91C1C',
  errorDarkBg: '#3B1212',

  // Extra helper tags mapped to standard gray/skeleton
  skeletonDark: '#2D3748',
  skeletonLight: '#E2E8F0',
};

export const lightColors = {
  background: '#EDEDF7',
  surface: '#F6F6F6',
  surfaceBorder: '#E2E2E2',
  text: '#000000',
  textSecondary: '#5E5E5E',
  textMuted: '#8F8F8F',

  primary: palette.primary500,
  primaryLight: palette.primary50,
  primaryText: '#FFFFFF',

  secondary: '#5E5E5E',
  secondaryLight: '#F6F6F6',
  green: palette.primary500,
  error: palette.error500,
  errorLight: palette.error50,

  border: '#E2E2E2',
  card: '#FFFFFF',

  // Shared status/badge triads (bg / border / text) - aligned to primary and yellow theme
  successBg: palette.primary50,
  successBorder: palette.primary100,
  successText: palette.primary700,

  errorBg: palette.error50,
  errorBorder: palette.error100,
  errorText: palette.error700,

  warningBg: palette.yellow50,
  warningBorder: palette.yellow300,
  warningText: palette.yellow700,

  infoBg: palette.primary50,
  infoBorder: palette.primary100,
  infoText: palette.primary600,

  purpleBg: palette.primary50,
  purpleText: palette.primary600,

  skyBg: palette.primary50,
  skyBorder: palette.primary100,
  skyText: palette.primary700,

  overlay: 'rgba(0, 0, 0, 0.4)',
  overlayStrong: 'rgba(0, 0, 0, 0.6)',

  inputBg: palette.gray100,
  imagePlaceholderBg: palette.gray200,
  categoryBadgeBg: palette.gray100,

  // Card/button gradient end stop
  cardGradEnd: palette.cardGradDarkEnd,

  // Per-context tinted surfaces
  customerInfoBg: palette.primary50,
  infoSurfaceBg: palette.primary50,
  neutralSurfaceBg: palette.gray100,
  cardAltBg: palette.white,
  mutedBg: palette.gray100,
  mutedBorder: palette.gray200,
  mutedText: palette.gray500,
  dangerIconBg: palette.error50,
  skySurfaceBg: palette.primary50,
  warningSurfaceBg: palette.yellow50,
  businessBadgeBorder: palette.yellow400,
  warningTextStrong: palette.yellow700,
  infoTextStrong: palette.primary500,
  packageIconBg: palette.primary50,
  couponEligibleBg: palette.primary50,
  couponInactiveBg: palette.gray100,
  warningBgSoft: palette.yellow50,
  warningBorderSoft: palette.yellow200,
  infoBgSoft: palette.primary50,
  infoBorderSoft: palette.primary100,
  panelBg: palette.gray50,
  panelBgMuted: palette.gray100,
  linkText: palette.primary700,
  linkBorder: palette.primary100,
  skeletonBg: palette.skeletonLight,
  yellow: palette.yellow,
  primaryTint950: palette.primaryTint950,
  dashboardTitle: '#1B194B',
  inactiveChipText: '#1B194B',
};

export const darkColors = {
  background: palette.primaryTint950,
  surface: '#121212',
  surfaceBorder: '#2E2E2E',
  text: '#FFFFFF',
  textSecondary: '#A6A6A6',
  textMuted: '#757575',

  primary: palette.primary400,
  primaryLight: palette.primaryTint900,
  primaryText: '#FFFFFF',

  secondary: '#A6A6A6',
  secondaryLight: '#121212',
  green: palette.primary400,
  error: palette.error500,
  errorLight: palette.errorDarkBg,

  border: '#2E2E2E',
  card: '#1F1F1F',

  // Shared status/badge triads (bg / border / text) - aligned to primary and yellow theme
  successBg: palette.primaryTint900,
  successBorder: palette.primary500,
  successText: palette.primary200,

  errorBg: palette.errorDarkBg,
  errorBorder: palette.error600,
  errorText: palette.error300,

  warningBg: 'rgba(254, 191, 27, 0.15)',
  warningBorder: palette.yellow600,
  warningText: palette.yellow300,

  infoBg: 'rgba(103, 61, 230, 0.15)',
  infoBorder: palette.primary400,
  infoText: palette.primary400,

  purpleBg: palette.primaryTint900,
  purpleText: palette.primary300,

  skyBg: palette.primaryTint900,
  skyBorder: palette.primary400,
  skyText: palette.primary300,

  overlay: 'rgba(0, 0, 0, 0.6)',
  overlayStrong: 'rgba(0, 0, 0, 0.75)',

  inputBg: palette.gray800,
  imagePlaceholderBg: palette.slate800,
  categoryBadgeBg: palette.slate800,

  // Card/button gradient end stop
  cardGradEnd: palette.cardGradLightEnd,

  // Per-context tinted surfaces
  customerInfoBg: palette.primaryTint900,
  infoSurfaceBg: palette.slate800,
  neutralSurfaceBg: palette.gray800,
  cardAltBg: palette.gray800,
  mutedBg: palette.gray800,
  mutedBorder: palette.gray700,
  mutedText: palette.gray400,
  dangerIconBg: palette.errorDarkBg,
  skySurfaceBg: palette.primaryTint900,
  warningSurfaceBg: palette.primaryTint900,
  businessBadgeBorder: palette.yellow600,
  warningTextStrong: palette.yellow300,
  infoTextStrong: palette.primary400,
  packageIconBg: palette.primaryTint900,
  couponEligibleBg: palette.primary900,
  couponInactiveBg: palette.gray700,
  warningBgSoft: palette.primaryTint900,
  warningBorderSoft: palette.yellow600,
  infoBgSoft: palette.slate900,
  infoBorderSoft: palette.primary500,
  panelBg: palette.gray900,
  panelBgMuted: palette.gray900,
  linkText: palette.primary300,
  linkBorder: palette.slate700,
  skeletonBg: palette.skeletonDark,
  yellow: palette.yellow,
  primaryTint950: palette.primaryTint950,
  dashboardTitle: palette.white,
  inactiveChipText: '#A6A6A6',
};

export type Colors = typeof lightColors;
