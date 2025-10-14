import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.fallbacks = true;
i18n.translations = {
  en: { welcome: 'Welcome', vote: 'Vote' },
  af: { welcome: 'Welkom', vote: 'Stemming' },
  zu: { welcome: 'Siyakwamukela', vote: 'Vota' },
  xh: { welcome: 'Wamkelekile', vote: 'Vota' }
};

i18n.locale = Localization.locale;

export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import af from './locales/af.json';
import zu from './locales/zu.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    af: { translation: af },
    zu: { translation: zu }
  },
  interpolation: { escapeValue: false },
});

export default i18n;
