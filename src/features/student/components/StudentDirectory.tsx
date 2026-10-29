import { useTranslation } from "react-i18next"
import { CardGridSkeleton, EmptyState, ErrorState } from "@/components/shared"
import { useStudentDirectory } from "../hooks/useStudentDirectory"
import { StudentCard } from "./StudentCard"

/** The public student directory on the portfolio page. */
export function StudentDirectory() {
  const { t } = useTranslation()
  const { items, status, error, refetch } = useStudentDirectory()
  if (status === "pending") return <CardGridSkeleton count={3} />
  if (status === "error") return <ErrorState error={error} onRetry={() => refetch()} />
  if (!items.length) return <EmptyState text={t("portfolio.directory.empty")} />
  return (
    <div className="card-grid">
      {items.map((s) => (
        <StudentCard key={s.id} student={s} />
      ))}
    </div>
  )
}
