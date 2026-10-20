import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

interface PagerProps {
  page: number
  pages: number
  onChange: (page: number) => void
}

export function Pager({ page, pages, onChange }: PagerProps) {
  const { t } = useTranslation()
  if (pages <= 1) return null
  return (
    <nav className="mt-10 flex items-center justify-center gap-4" aria-label={t("common.pages")}>
      <Button
        variant="outline"
        className="rounded-full"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        ← {t("common.prev")}
      </Button>
      <span className="text-muted-foreground">
        {page} / {pages}
      </span>
      <Button
        variant="outline"
        className="rounded-full"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
      >
        {t("common.next")} →
      </Button>
    </nav>
  )
}
