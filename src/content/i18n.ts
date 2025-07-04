import { resources } from '@/content/resources';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: !import.meta.env.PROD,
    resources,
    returnObjects: true,
    keySeparator: '.',
  });

export default i18n;
