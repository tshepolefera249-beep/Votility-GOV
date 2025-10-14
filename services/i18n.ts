export const translations: Record<string, Record<string, string>> = {
  en: { welcome: 'Welcome', vote: 'Vote', results: 'Results' },
  zu: { welcome: 'Siyakwamukela', vote: 'Vota', results: 'Imiphumela' },
  af: { welcome: 'Welkom', vote: 'Stem', results: 'Resultate' }
};

let currentLang = 'en';

export function setLanguage(lang: string) {
  currentLang = lang;
}

export function t(key: string) {
  return translations[currentLang][key] || key;
}
