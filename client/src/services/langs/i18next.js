import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../../translations/en.json';
import tr from '../../translations/tr.json';

i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    tr: {
      translation: tr,
    },
  },
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false, // React içinde HTML ve JSX kullanımını etkinleştirir
  },
});

export default i18next;
