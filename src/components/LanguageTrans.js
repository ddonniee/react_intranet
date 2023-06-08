import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// JSON 파일 import
import translationKo from "../utils/locales/translation.ko.json";
import translationEn from "../utils/locales/translation.en.json";

// 국가 코드와 JSON 파일 match
const resource = {
  ko: {
    translation: translationKo,
  },
  en: {
    translation: translationEn,
  },
};

i18n
  .use(LanguageDetector) // 사용자 언어 탐지
  .use(initReactI18next) // i18n 객체를 react-18next에 전달
  .init({
    // for all options read: https://www.i18next.com/overview/configuration-options
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: resource,
  });

export default i18n;