import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ICU from 'i18next-icu';

import en from './en/translation.json';
import ja from './ja/translation.json';
import { convertLanguageJsonToObject } from './translations';

export const LANGUAGE_EN = 'en';
export const LANGUAGE_JA = 'ja';

export const translationsJson = {
  [LANGUAGE_EN]: {
    translation: en,
  },
  [LANGUAGE_JA]: {
    translation: ja,
  },
};

export const languages = Object.keys(translationsJson);
export const DEFAULT_LANGUAGE = LANGUAGE_JA;

// Create the 'translations' object to provide full intellisense support for the static json files.
convertLanguageJsonToObject(en);
convertLanguageJsonToObject(ja);

export const i18n = i18next
  .use(ICU)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .use(LanguageDetector)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .init({
    resources: translationsJson,
    fallbackLng: DEFAULT_LANGUAGE,
    debug: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
