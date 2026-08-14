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

  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F2042',

  // Primary (brand base #53039D)
  primary50: '#F5ECFD',
  primary100: '#E9D4FC',
  primary200: '#D3A8FA',
  primary300: '#B56CF9',
  primary400: '#8408F7',
  primary500: '#53039D',
  primary600: '#42037D',
  primary700: '#32035E',
  primary800: '#250444',
  primary900: '#1A042F',
  primaryTint900: '#311849',
  primaryTint950: '#0F0D12',

  // Yellow (based on login accent #febf1b)
  yellow50: '#FFFDF2',
  yellow100: '#FFFBE0',
  yellow200: '#FFF4B8',
  yellow300: '#FEE785',
  yellow400: '#FDD752',
  yellow500: '#febf1b',
  yellow600: '#DB9E0D',
  yellow700: '#B78107',
  yellow900: '#7A5101',
  yellow: '#febf1b',

  // Error (red - used on login screen)
  error50: '#FEF2F2',
  error100: '#FEE2E2',
  error300: '#F87171',
  error500: '#EF4444',
  error600: '#DC2626',
  error700: '#B91C1C',
  errorDarkBg: '#3B1212',

  // Green (money-in / veg-indicator / CTA accent — kept distinct from the
  // purple brand so "paid", "veg", and "add to cart" read unambiguously)
  green100: '#C8E6C9',
  green500: '#1DA750',
  green600: '#158F42',
  green700: '#0F7A38',

  // Extra helper tags mapped to standard gray/skeleton
  skeletonDark: '#2D3748',
  skeletonLight: '#E2E8F0',
};

export const lightColors = {
  background: '#efeff7ff',
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
  warningText: palette.yellow700,

  infoBg: palette.primary50,
  infoText: palette.primary600,

  purpleBg: palette.primary50,
  purpleText: palette.primary600,

  skyBg: palette.primary50,
  skyText: palette.primary700,

  overlay: 'rgba(0, 0, 0, 0.4)',
  overlayStrong: 'rgba(0, 0, 0, 0.6)',

  inputBg: palette.gray100,
  imagePlaceholderBg: palette.gray200,
  categoryBadgeBg: palette.gray100,

  // Card/button gradient end stop
  cardGradEnd: palette.cardGradDarkEnd,

  // Per-context tinted surfaces
  infoSurfaceBg: palette.primary50,
  cardAltBg: palette.white,
  mutedBg: palette.gray100,
  mutedText: palette.gray500,
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

  // WhatsApp brand action (bg/text theme-aware, icon keeps brand green)
  whatsappBg: '#E6F4EA',
  whatsappText: '#137333',
  whatsappIcon: '#25D366',

  // Call action (purple family)
  callBg: palette.primary100,
  callText: palette.primary700,
  callIcon: palette.primary700,

  // Order payment status badges
  paidBg: '#E6F4EA',
  paidText: '#137333',

  // Deterministic avatar background/text pairs
  avatarPalette: [
    { bg: palette.primary100, text: palette.primary700 },
    { bg: palette.yellow100, text: palette.yellow900 },
    { bg: '#E6F4EA', text: '#137333' },
    { bg: '#E2F0FD', text: '#0B57D0' },
  ],
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
  warningText: palette.yellow300,

  infoBg: 'rgba(83, 3, 157, 0.15)',
  infoText: palette.primary400,

  purpleBg: palette.primaryTint900,
  purpleText: palette.primary300,

  skyBg: palette.primaryTint900,
  skyText: palette.primary300,

  overlay: 'rgba(0, 0, 0, 0.6)',
  overlayStrong: 'rgba(0, 0, 0, 0.75)',

  inputBg: palette.gray800,
  imagePlaceholderBg: palette.slate800,
  categoryBadgeBg: palette.slate800,

  // Card/button gradient end stop
  cardGradEnd: palette.cardGradLightEnd,

  // Per-context tinted surfaces
  infoSurfaceBg: palette.slate800,
  cardAltBg: palette.gray800,
  mutedBg: palette.gray800,
  mutedText: palette.gray400,
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

  // WhatsApp brand action (bg/text theme-aware, icon keeps brand green)
  whatsappBg: 'rgba(19, 115, 51, 0.18)',
  whatsappText: '#4ADE80',
  whatsappIcon: '#25D366',

  // Call action (purple family)
  callBg: palette.primaryTint900,
  callText: palette.primary300,
  callIcon: palette.primary300,

  // Order payment status badges
  paidBg: 'rgba(19, 115, 51, 0.18)',
  paidText: '#4ADE80',

  // Deterministic avatar background/text pairs
  avatarPalette: [
    { bg: palette.primaryTint900, text: palette.primary300 },
    { bg: 'rgba(254, 191, 27, 0.15)', text: palette.yellow300 },
    { bg: 'rgba(19, 115, 51, 0.18)', text: '#4ADE80' },
    { bg: 'rgba(11, 87, 208, 0.18)', text: '#7CACF8' },
  ],
};

export type Colors = typeof lightColors;
