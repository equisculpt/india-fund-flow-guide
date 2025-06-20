
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TranslatedTextProps {
  text: string;
  fallback?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  text, 
  fallback, 
  className = '', 
  as: Component = 'span' 
}) => {
  const { translateSync, currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(fallback || text);

  useEffect(() => {
    console.log(`TranslatedText: Translating "${text}" to ${currentLanguage.nativeName}`);
    
    if (currentLanguage.code === 'en') {
      setTranslatedText(fallback || text);
      return;
    }

    // Use translateSync which handles caching and background translation
    const translated = translateSync(text, fallback);
    setTranslatedText(translated);
    
    console.log(`TranslatedText: Result "${translated}" for ${currentLanguage.nativeName}`);
  }, [text, fallback, currentLanguage.code, translateSync]);

  return (
    <Component className={className}>
      {translatedText}
    </Component>
  );
};

export default TranslatedText;
