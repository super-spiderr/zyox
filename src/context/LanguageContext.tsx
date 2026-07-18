import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Language, TranslationKey } from '@/constants/translations';
import { useTranslation } from 'react-i18next';
import { storage } from '@/utils/storage';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, options?: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();

  // Synchronously fetch persisted language on load, fallback to 'ta'
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    (storage.getString('user-language') as Language) || 'ta',
  );

  useEffect(() => {
    // Keep i18next instance synchronized with local state
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const setLanguage = useCallback((lang: Language) => {
    storage.set('user-language', lang);
    setCurrentLanguage(lang);
  }, []);

  const translate = useCallback(
    (key: TranslationKey, options?: any): string => {
      return t(key, options);
    },
    [t],
  );

  const contextValue = useMemo(
    () => ({
      language: currentLanguage,
      setLanguage,
      t: translate,
    }),
    [currentLanguage, setLanguage, translate],
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
