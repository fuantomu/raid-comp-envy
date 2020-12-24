import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import getConfig from "./getConfig";
import publicPath from "./publicPath";

const { defaultLocale } = getConfig();

export default i18n
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    ns: "common",
    defaultNS: "common",
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    load: "currentOnly",
    lowerCaseLng: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: publicPath("/locales/{{lng}}/{{ns}}.json"),
    },
  });
