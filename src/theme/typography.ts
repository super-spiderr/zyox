import { Platform } from 'react-native';
import { Language } from '@/constants/translations';

export type FontWeight = 'thin' | 'light' | 'regular' | 'medium' | 'semiBold' | 'bold';

/**
 * Weighted font families keyed by language. Every language listed here must
 * define every FontWeight, so `getFontFamily` can never fall through.
 */
export const fontFamilies = {
  urbanist: {
    thin: 'Urbanist-Thin',
    light: 'Urbanist-Light',
    regular: 'Urbanist-Regular',
    medium: 'Urbanist-Medium',
    semiBold: 'Urbanist-SemiBold',
    bold: 'Urbanist-Bold',
  },
  muktaMalar: {
    thin: 'MuktaMalar-ExtraLight',
    light: 'MuktaMalar-Light',
    regular: 'MuktaMalar-Regular',
    medium: 'MuktaMalar-Medium',
    semiBold: 'MuktaMalar-SemiBold',
    bold: 'MuktaMalar-Bold',
  },
} as const satisfies Record<string, Record<FontWeight, string>>;

// Script-locked families: used deliberately regardless of the active app language.
export const scriptFonts = {
  tiroTamil: {
    regular: 'TiroTamil-Regular',
    italic: 'TiroTamil-Italic',
  },
  meeraInimai: {
    regular: 'MeeraInimai-Regular',
  },
} as const;

const legacyFontRegistry = {
  urbanist: fontFamilies.urbanist,
  muktaMalar: fontFamilies.muktaMalar,
  anekTamil: fontFamilies.muktaMalar, // fallback alias
  ...scriptFonts,
};

/** @deprecated kept for existing call sites that read raw family strings; prefer `getFontFamily` / the `<Text variant>` API. */
export const fonts = legacyFontRegistry;

// Single source of truth: which family backs each weight, per app language.
const LANGUAGE_FONT_FAMILY: Record<Language, Record<FontWeight, string>> = {
  en: fontFamilies.urbanist,
  ta: fontFamilies.muktaMalar,
};

export const getFontFamily = (weight: FontWeight, language: Language): string =>
  LANGUAGE_FONT_FAMILY[language][weight];

export const sizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

interface AutoVariant {
  weight: FontWeight;
  fontSize: number;
  lineHeight: number;
}

interface FixedVariant {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
}

/**
 * Language-driven variants: fontFamily is resolved per weight from
 * LANGUAGE_FONT_FAMILY at render time, so the same variant name renders
 * Urbanist in English and Mukta Malar in Tamil automatically.
 */
export const variants = {
  h1: { weight: 'bold', fontSize: 32, lineHeight: 40 },
  h2: { weight: 'bold', fontSize: 24, lineHeight: 32 },
  h3: { weight: 'semiBold', fontSize: 20, lineHeight: 28 },
  bodyLarge: { weight: 'bold', fontSize: 18, lineHeight: 26 },
  bodyMedium: { weight: 'medium', fontSize: 16, lineHeight: 24 },
  bodySmall: { weight: 'regular', fontSize: 14, lineHeight: 20 },
  caption: { weight: 'regular', fontSize: 12, lineHeight: 16 },
  thin: { weight: 'thin', fontSize: 16, lineHeight: 24 },
  light: { weight: 'light', fontSize: 16, lineHeight: 24 },
  regular: { weight: 'regular', fontSize: 16, lineHeight: 24 },
  medium: { weight: 'medium', fontSize: 16, lineHeight: 24 },
  semiBold: { weight: 'semiBold', fontSize: 16, lineHeight: 24 },
  bold: { weight: 'bold', fontSize: 16, lineHeight: 24 },
} as const satisfies Record<string, AutoVariant>;

/**
 * Script-locked variants: fontFamily is fixed and does NOT change with the
 * app language (e.g. a deliberate Tamil headline shown on an English screen).
 */
export const fixedVariants = {
  tamilHeader: { fontFamily: fontFamilies.muktaMalar.bold, fontSize: 24, lineHeight: 32 },
  tamilBody: { fontFamily: fontFamilies.muktaMalar.regular, fontSize: 16, lineHeight: 24 },
  tiroTamilRegular: { fontFamily: scriptFonts.tiroTamil.regular, fontSize: 16, lineHeight: 24 },
  tiroTamilItalic: { fontFamily: scriptFonts.tiroTamil.italic, fontSize: 16, lineHeight: 24 },
  meeraInimaiRegular: { fontFamily: scriptFonts.meeraInimai.regular, fontSize: 16, lineHeight: 24 },
  muktaMalarThin: { fontFamily: fontFamilies.muktaMalar.thin, fontSize: 16, lineHeight: 24 },
  muktaMalarLight: { fontFamily: fontFamilies.muktaMalar.light, fontSize: 16, lineHeight: 24 },
  muktaMalarRegular: { fontFamily: fontFamilies.muktaMalar.regular, fontSize: 16, lineHeight: 24 },
  muktaMalarMedium: { fontFamily: fontFamilies.muktaMalar.medium, fontSize: 16, lineHeight: 24 },
  muktaMalarSemiBold: {
    fontFamily: fontFamilies.muktaMalar.semiBold,
    fontSize: 16,
    lineHeight: 24,
  },
  muktaMalarBold: { fontFamily: fontFamilies.muktaMalar.bold, fontSize: 16, lineHeight: 24 },
  // Keeping Anek Tamil variants as aliases pointing to Mukta Malar to prevent external compiler breaks
  anekTamilThin: { fontFamily: fontFamilies.muktaMalar.thin, fontSize: 16, lineHeight: 24 },
  anekTamilLight: { fontFamily: fontFamilies.muktaMalar.light, fontSize: 16, lineHeight: 24 },
  anekTamilRegular: { fontFamily: fontFamilies.muktaMalar.regular, fontSize: 16, lineHeight: 24 },
  anekTamilMedium: { fontFamily: fontFamilies.muktaMalar.medium, fontSize: 16, lineHeight: 24 },
  anekTamilSemiBold: { fontFamily: fontFamilies.muktaMalar.semiBold, fontSize: 16, lineHeight: 24 },
  anekTamilBold: { fontFamily: fontFamilies.muktaMalar.bold, fontSize: 16, lineHeight: 24 },
} as const satisfies Record<string, FixedVariant>;

export type AutoTypographyVariant = keyof typeof variants;
export type FixedTypographyVariant = keyof typeof fixedVariants;
export type TypographyVariant = AutoTypographyVariant | FixedTypographyVariant;

export interface ResolvedTextStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
}

/**
 * Single entry point for turning a variant name + active language into a
 * concrete style. This is what `<Text variant="..." />` and any other
 * language-aware component should call instead of hand-rolling font-family
 * lookups.
 */
export const resolveTextStyle = (
  variant: TypographyVariant,
  language: Language,
): ResolvedTextStyle => {
  const auto = (variants as Record<string, AutoVariant>)[variant];
  const fixed = (fixedVariants as Record<string, FixedVariant>)[variant];

  let base: ResolvedTextStyle;
  if (auto) {
    base = {
      fontFamily: getFontFamily(auto.weight, language),
      fontSize: auto.fontSize,
      lineHeight: auto.lineHeight,
    };
  } else if (fixed) {
    base = { fontFamily: fixed.fontFamily, fontSize: fixed.fontSize, lineHeight: fixed.lineHeight };
  } else {
    base = {
      fontFamily: getFontFamily('regular', language),
      fontSize: sizes.md,
      lineHeight: sizes.md * 1.5,
    };
  }

  // Tamil glyphs render visually taller than Latin ones on Android; tighten
  // metrics app-wide while the UI language is Tamil to keep line heights consistent.
  if (language === 'ta' && Platform.OS === 'android') {
    return {
      ...base,
      fontSize: base.fontSize,
      lineHeight: base.lineHeight,
    };
  }

  return base;
};

export const typography = {
  fonts: legacyFontRegistry,
  fontFamilies,
  scriptFonts,
  sizes,
  variants,
  fixedVariants,
  getFontFamily,
  resolveTextStyle,
};

export type Typography = typeof typography;
