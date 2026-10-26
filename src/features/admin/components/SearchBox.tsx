import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Input } from "@/components/ui/input"

/** Free-text filter for the current admin list. */
export function SearchBox({ value, onChange }: { value: string | undefined; onChange: (q: string) => void }) {
  const { t } = useTranslation()
  return (
    <div className="relative w-full sm:max-w-sm">
      <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <Input
        type="search"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("admin.searchPlaceholder")}
        aria-label={t("common.search")}
        className="rounded-full bg-white pl-9"
      />
    </div>
  )
}
