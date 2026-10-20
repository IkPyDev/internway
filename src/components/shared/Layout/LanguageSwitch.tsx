import { useTranslation } from "react-i18next"
import { LANGUAGES } from "@/constants"
import { cn } from "@/lib"

export function LanguageSwitch() {
  const { i18n, t } = useTranslation()
  return (
    <fieldset className="flex rounded-full border p-0.5">
      <legend className="sr-only">{t("common.language")}</legend>
      {LANGUAGES.map((l) => (
        <button
          key={l.value}
          type="button"
          aria-pressed={i18n.language === l.value}
          onClick={() => i18n.changeLanguage(l.value)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-bold transition",
            i18n.language === l.value
              ? "bg-navy-900 text-white"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l.label}
        </button>
      ))}
    </fieldset>
  )
}
