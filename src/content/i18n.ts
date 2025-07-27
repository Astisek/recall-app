import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { resources } from '@/content/resources';

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
