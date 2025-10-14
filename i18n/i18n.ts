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
