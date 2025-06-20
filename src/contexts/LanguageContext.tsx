
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TranslationService } from '@/services/translationService';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தমிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગुજરાતી' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कॉशुर' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্' },
  { code: 'brx', name: 'Bodo', nativeName: 'बर' }
];

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, fallback?: string) => Promise<string>;
  translateSync: (key: string, fallback?: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);
  const [translationCache, setTranslationCache] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      const language = SUPPORTED_LANGUAGES.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, []);

  const setLanguage = async (language: Language) => {
    setIsLoading(true);
    try {
      setCurrentLanguage(language);
      localStorage.setItem('preferred-language', language.code);
      
      // Clear cache when language changes
      if (language.code === 'en') {
        setTranslationCache({});
      }
      
      console.log('Language changed to:', language.nativeName);
    } catch (error) {
      console.error('Error setting language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const translate = async (key: string, fallback?: string): Promise<string> => {
    if (currentLanguage.code === 'en') {
      return fallback || key;
    }

    // Check cache first
    const cacheKey = `${currentLanguage.code}:${key}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    try {
      const translated = await TranslationService.translateContent(fallback || key, currentLanguage.code);
      
      // Only cache if translation was successful and different from original
      if (translated && translated !== (fallback || key)) {
        setTranslationCache(prev => ({
          ...prev,
          [cacheKey]: translated
        }));
      }
      
      return translated;
    } catch (error) {
      console.warn('Translation error, using original text:', error);
      return fallback || key;
    }
  };

  const translateSync = (key: string, fallback?: string): string => {
    if (currentLanguage.code === 'en') {
      return fallback || key;
    }

    // Check cache for immediate return
    const cacheKey = `${currentLanguage.code}:${key}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    // Return original while translation loads in background
    if (fallback || key) {
      translate(key, fallback).then(translated => {
        if (translated !== (fallback || key)) {
          // Force re-render by updating cache
          setTranslationCache(prev => ({
            ...prev,
            [cacheKey]: translated
          }));
        }
      }).catch(() => {
        // Silently handle translation errors
      });
    }

    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      translate,
      translateSync,
      isLoading
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
