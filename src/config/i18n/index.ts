import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import type { Language } from "@/types"
import ru from "./locales/ru.json"
import uz from "./locales/uz.json"

const STORAGE_KEY = "internway.lang"

function savedLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === "ru" ? "ru" : "uz"
  } catch {
    return "uz"
  }
}

export const i18n = i18next.createInstance()

i18n.use(initReactI18next).init({
  resources: { uz: { translation: uz }, ru: { translation: ru } },
  lng: savedLanguage(),
  fallbackLng: false,
  interpolation: { escapeValue: false },
})

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    // Storage can be blocked (private mode); the choice then lasts for this tab only.
  }
})
