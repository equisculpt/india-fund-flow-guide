
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
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const loadTranslation = async () => {
      if (currentLanguage.code === 'en') {
        setTranslatedText(fallback || text);
        return;
      }

      setIsTranslating(true);
      try {
        const translated = await translate(text, fallback);
        setTranslatedText(translated);
        console.log(`Translated "${text}" to "${translated}" for ${currentLanguage.nativeName}`);
      } catch (error) {
        console.warn('Translation failed, using original text:', error);
        setTranslatedText(fallback || text);
      } finally {
        setIsTranslating(false);
      }
    };

    loadTranslation();
  }, [text, fallback, currentLanguage.code, translate]);

  return (
    <Component className={className}>
      {isTranslating ? `${translatedText}...` : translatedText}
    </Component>
  );
};

export default TranslatedText;
