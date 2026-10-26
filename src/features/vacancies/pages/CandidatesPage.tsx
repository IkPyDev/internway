import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import {
  CardGridSkeleton,
  EmptyState,
  ErrorState,
  FilterPill,
  FormError,
  PageShell,
} from "@/components/shared"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { CandidateCard } from "../components/CandidateCard"
import { CANDIDATE_FILTERS } from "../constants"
import { useCandidates } from "../hooks/useCandidates"

export function CandidatesPage() {
  const { t } = useTranslation()
  const c = useCandidates()

  return (
    <PageShell
      title={c.title || t("candidates.title")}
      lead={t("candidates.lead")}
      actions={
        c.canDecide && (
          <Button asChild variant="outline" className="rounded-full font-bold">
            <Link to={ROUTES.myVacancies}>{t("myVacancies.title")}</Link>
          </Button>
        )
      }
    >
      <div className="mb-6 flex flex-wrap gap-2">
        <FilterPill
          label={t("common.all")}
          count={c.total}
          active={!c.filter}
          onClick={() => c.setFilter(undefined)}
        />
        {CANDIDATE_FILTERS.filter((s) => c.counts[s]).map((s) => (
          <FilterPill
            key={s}
            label={t(`status.${s}`)}
            count={c.counts[s]}
            active={c.filter === s}
            onClick={() => c.setFilter(s)}
          />
        ))}
      </div>
      <div className="mb-4">
        <FormError error={c.decideError} />
      </div>
      {c.status === "pending" && <CardGridSkeleton count={2} />}
      {c.status === "error" && <ErrorState error={c.error} onRetry={() => c.refetch()} />}
      {c.status === "success" && c.items.length === 0 && <EmptyState text={t("candidates.empty")} />}
      <ul className="grid gap-4">
        {c.items.map((a) => (
          <CandidateCard
            key={a.id}
            candidate={a}
            canDecide={c.canDecide}
            busy={c.deciding}
            onDecide={(status, note) => c.decide(a.id, status, note)}
          />
        ))}
      </ul>
    </PageShell>
  )
}
