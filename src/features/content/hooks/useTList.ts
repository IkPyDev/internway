import { useTranslation } from "react-i18next"

/** Reads a translated array (e.g. a plan's bullet list) from the locale file. */
export function useTList() {
  const { t } = useTranslation()
  return (key: string) => {
    const value = t(key, { returnObjects: true })
    return Array.isArray(value) ? value.map(String) : []
  }
}
