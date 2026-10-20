import { CardGridSkeleton, ErrorState } from "@/components/shared"
import { useTopCompanies } from "../hooks/useTopCompanies"
import { CompanyCard } from "./CompanyCard"

export function TopCompanies({ limit = 6 }: { limit?: number }) {
  const { items, status, error, refetch } = useTopCompanies(limit)
  if (status === "pending") return <CardGridSkeleton count={3} />
  if (status === "error") return <ErrorState error={error} onRetry={() => refetch()} />
  return (
    <div className="card-grid">
      {items.map((c) => (
        <CompanyCard key={c.name} company={c} />
      ))}
    </div>
  )
}
