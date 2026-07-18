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
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  gray950: '#030712',
  gray450: '#959595',

  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F2042',

  // Primary (Cobalt Blue theme)
  primary50: '#EFF6FF',
  primary100: '#DBEAFE',
  primary200: '#BFDBFE',
  primary300: '#93C5FD',
  primary400: '#60A5FA',
  primary500: '#2563EB',
  primary600: '#1D4ED8',
  primary700: '#1E40AF',
  primaryDark900: '#0F2042',

  // Secondary / Success (green)
  secondary50: '#F0FDF4',
  secondary100: '#DCFCE7',
  secondary300: '#34D399',
  secondary500: '#22C55E',
  secondary600: '#16A34A',
  secondary700: '#15803D',
  secondaryDarkBg: '#062E1D',

  // Emerald (used for profile/success accents, distinct from secondary green)
  emerald500: '#10B981',

  // Mint (invoice template success chip, slightly different from secondary100)
  mint100: '#D1FAE5',
  emerald600: '#059669',

  // Error (red)
  error50: '#FEF2F2',
  error100: '#FEE2E2',
  error300: '#F87171',
  error500: '#EF4444',
  error600: '#DC2626',
  error700: '#B91C1C',
  errorDarkBg: '#3B1212',

  // Warning (amber)
  warning50: '#FEF3C7',
  warning300: '#FBBF24',
  warning500: '#F59E0B',
  warning600: '#D97706',
  warning700: '#B45309',

  // Purple
  purple50: '#F3E8FF',
  purple500: '#8B5CF6',
  purple600: '#6D28D9',
  purpleDarkBg: '#2E1C4B',

  // Sky
  sky50: '#E0F2FE',
  sky200: '#BAE6FD',
  sky400: '#38BDF8',
  sky600: '#0284C7',
  sky700: '#0369A1',

  // Rose
  rose400: '#FB7185',
  rose700: '#BE123C',

  // Google-brand chip colors (order ticket source badges)
  googleGreenBg: '#E6F4EA',
  googleGreenText: '#137333',
  googleAmberBg: '#FEF7E0',
  googleAmberText: '#B06000',
  googleBlueBg: '#E8F0FE',
  googleBlueText: '#1A73E8',
  googleRedBg: '#FCE8E6',
  googleRedText: '#C5221F',

  // Misc solid dark bg shades used behind status cards on dark theme
  darkBgApp: '#0B0F19',
  darkBgCustomer: '#0A1526',
  darkBgCustomerAlt: '#0A2540',
  darkBgPackage: '#1C3144',
  darkBgOrderSuccess: '#0B2E1D',
  darkBgOrderError: '#311C1C',

  // Invoice template greys (kept distinct from the RN gray scale on purpose)
  invoiceText: '#333333',
  invoiceMuted: '#666666',
  invoiceSubtle: '#555555',
  invoiceBorder: '#EEEEEE',

  // Splash / auth
  loginPlaceholder: '#8F8F8F',
  loginFieldBg: '#F0F0F0',
  splashGray: '#2A2A2A',

  // Extra shades surfaced during the color-centralization pass
  darkBgBusiness: '#2D1A10',
  warning400: '#FCD34D',
  skeletonDark: '#2D3748',
  skeletonLight: '#E2E8F0',
  gray800Alt: '#1E2937',
  amber50: '#FFFBEB',
  amber200: '#FDE68A',
  darkBgWarning: '#2D1F10',
  primary900: '#1E3A8A',
  successPastelBg: '#E6F7ED',
  infoPastelBg: '#EBF3FF',
  warningPastelBg: '#FFF7EC',
  successPastelText: '#2E7D32',
  infoPastelText: '#1565C0',
  warningPastelText: '#E65100',
  blue500: '#3B82F6',
};

export const lightColors = {
  background: '#FFFFFF',
  surface: '#F6F6F6',
  surfaceBorder: '#E2E2E2',
  text: '#000000',
  textSecondary: '#5E5E5E',
  textMuted: '#8F8F8F',

  primary: '#000000',
  primaryLight: '#F3F3F3',
  primaryText: '#FFFFFF',

  secondary: '#5E5E5E',
  secondaryLight: '#F6F6F6',
  green: '#05944F',
  error: '#E11900',
  errorLight: '#FFF0F0',

  border: '#E2E2E2',
  card: '#FFFFFF',

  // Shared status/badge triads (bg / border / text)
  successBg: palette.secondary50,
  successBorder: palette.secondary100,
  successText: palette.secondary700,

  errorBg: palette.error50,
  errorBorder: palette.error100,
  errorText: palette.error700,

  warningBg: palette.warning50,
  warningBorder: palette.warning300,
  warningText: palette.warning700,

  infoBg: palette.primary50,
  infoBorder: palette.primary100,
  infoText: palette.primary600,

  purpleBg: palette.purple50,
  purpleText: palette.purple600,

  skyBg: palette.sky50,
  skyBorder: palette.sky200,
  skyText: palette.sky700,

  overlay: 'rgba(0, 0, 0, 0.4)',
  overlayStrong: 'rgba(0, 0, 0, 0.6)',

  inputBg: palette.gray100,
  imagePlaceholderBg: palette.gray200,
  categoryBadgeBg: palette.gray100,

  // Card/button gradient end stop
  cardGradEnd: palette.cardGradDarkEnd,

  // Per-context tinted surfaces (promoted from scattered isDark ternaries)
  customerInfoBg: palette.primary50,
  infoSurfaceBg: palette.primary50,
  neutralSurfaceBg: palette.gray100,
  cardAltBg: palette.white,
  mutedBg: palette.gray100,
  mutedBorder: palette.gray200,
  mutedText: palette.gray500,
  dangerIconBg: palette.error50,
  skySurfaceBg: palette.sky50,
  warningSurfaceBg: palette.warning50,
  businessBadgeBorder: palette.warning400,
  warningTextStrong: palette.warning600,
  infoTextStrong: palette.primary500,
  packageIconBg: palette.sky50,
  couponEligibleBg: palette.primary50,
  couponInactiveBg: palette.gray100,
  warningBgSoft: palette.amber50,
  warningBorderSoft: palette.amber200,
  infoBgSoft: palette.primary50,
  infoBorderSoft: palette.primary100,
  panelBg: palette.gray50,
  panelBgMuted: palette.gray100,
  linkText: palette.primary700,
  linkBorder: palette.primary100,
  skeletonBg: palette.skeletonLight,
};

export const darkColors = {
  background: '#000000',
  surface: '#121212',
  surfaceBorder: '#2E2E2E',
  text: '#FFFFFF',
  textSecondary: '#A6A6A6',
  textMuted: '#757575',

  primary: '#FFFFFF',
  primaryLight: '#1F1F1F',
  primaryText: '#000000',

  secondary: '#A6A6A6',
  secondaryLight: '#121212',
  green: '#05944F',
  error: '#E11900',
  errorLight: '#3A1010',

  border: '#2E2E2E',
  card: '#1F1F1F',

  // Shared status/badge triads (bg / border / text)
  successBg: palette.secondaryDarkBg,
  successBorder: palette.secondary600,
  successText: palette.secondary300,

  errorBg: palette.errorDarkBg,
  errorBorder: palette.error600,
  errorText: palette.error300,

  warningBg: 'rgba(245, 158, 11, 0.15)',
  warningBorder: palette.warning600,
  warningText: palette.warning300,

  infoBg: 'rgba(37, 99, 235, 0.15)',
  infoBorder: palette.primary400,
  infoText: palette.primary400,

  purpleBg: palette.purpleDarkBg,
  purpleText: palette.purple500,

  skyBg: palette.sky700,
  skyBorder: palette.sky600,
  skyText: palette.sky400,

  overlay: 'rgba(0, 0, 0, 0.6)',
  overlayStrong: 'rgba(0, 0, 0, 0.75)',

  inputBg: palette.gray800,
  imagePlaceholderBg: palette.slate800,
  categoryBadgeBg: palette.slate800,

  // Card/button gradient end stop
  cardGradEnd: palette.cardGradLightEnd,

  // Per-context tinted surfaces (promoted from scattered isDark ternaries)
  customerInfoBg: palette.darkBgCustomer,
  infoSurfaceBg: palette.slate800,
  neutralSurfaceBg: palette.gray800,
  cardAltBg: palette.gray800,
  mutedBg: palette.gray800Alt,
  mutedBorder: palette.gray700,
  mutedText: palette.gray400,
  dangerIconBg: palette.darkBgOrderError,
  skySurfaceBg: palette.darkBgCustomerAlt,
  warningSurfaceBg: palette.darkBgBusiness,
  businessBadgeBorder: palette.warning600,
  warningTextStrong: palette.warning300,
  infoTextStrong: palette.primary400,
  packageIconBg: palette.darkBgPackage,
  couponEligibleBg: palette.primary900,
  couponInactiveBg: palette.gray700,
  warningBgSoft: palette.darkBgWarning,
  warningBorderSoft: palette.warning600,
  infoBgSoft: palette.slate900,
  infoBorderSoft: palette.primary500,
  panelBg: palette.gray900,
  panelBgMuted: palette.gray900,
  linkText: palette.primary300,
  linkBorder: palette.slate700,
  skeletonBg: palette.skeletonDark,
};

export type Colors = typeof lightColors;
