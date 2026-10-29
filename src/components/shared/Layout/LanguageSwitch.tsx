import { Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { LANGUAGES } from "@/constants"

/** A compact dropdown: globe icon and the current language code; the list shows each language's own name. */
export function LanguageSwitch() {
  const { i18n, t } = useTranslation()
  const current = LANGUAGES.find((l) => l.value === i18n.language) ?? LANGUAGES[1]
  return (
    <Select value={current.value} onValueChange={(v) => i18n.changeLanguage(v)}>
      <SelectTrigger
        size="sm"
        aria-label={t("common.language")}
        className="gap-1.5 rounded-full px-3 font-bold shadow-none"
      >
        <Globe className="size-4 text-navy-700" aria-hidden />
        {current.label}
      </SelectTrigger>
      <SelectContent position="popper" align="end">
        {LANGUAGES.map((l) => (
          <SelectItem key={l.value} value={l.value}>
            {l.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
