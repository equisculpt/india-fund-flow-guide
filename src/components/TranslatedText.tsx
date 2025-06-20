
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
  const { translate, currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(fallback || text);

  useEffect(() => {
    const loadTranslation = async () => {
      if (currentLanguage.code === 'en') {
        setTranslatedText(fallback || text);
        return;
      }

      try {
        const translated = await translate(text, fallback);
        setTranslatedText(translated);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslatedText(fallback || text);
      }
    };

    loadTranslation();
  }, [text, fallback, currentLanguage.code, translate]);

  return <Component className={className}>{translatedText}</Component>;
};

export default TranslatedText;
