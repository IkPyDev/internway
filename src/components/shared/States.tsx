import { CircleAlert, SearchX } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-16 text-center text-muted-foreground">
      <SearchX className="mx-auto mb-3 size-10 text-navy-700" aria-hidden />
      <p>{text}</p>
    </div>
  )
}

export function ErrorState({ error, onRetry }: { error: Error | null; onRetry: () => void }) {
  const { t } = useTranslation()
  return (
    <div className="py-16 text-center text-muted-foreground" role="alert">
      <CircleAlert className="mx-auto mb-3 size-10 text-destructive" aria-hidden />
      <p className="mb-4">{t("common.loadError", { message: error?.message ?? "" })}</p>
      <Button variant="outline" className="rounded-full" onClick={onRetry}>
        {t("common.retry")}
      </Button>
    </div>
  )
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="card-grid" aria-busy>
      {Array.from({ length: count }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholders never reorder
        <Skeleton key={i} className="h-56 rounded-xl" />
      ))}
    </div>
  )
}
