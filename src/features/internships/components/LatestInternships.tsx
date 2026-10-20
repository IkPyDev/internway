import { CardGridSkeleton, ErrorState } from "@/components/shared"
import { useLatestInternships } from "../hooks/useLatestInternships"
import { InternshipCard } from "./InternshipCard"

export function LatestInternships({ limit = 6 }: { limit?: number }) {
  const { items, status, error, refetch } = useLatestInternships(limit)
  if (status === "pending") return <CardGridSkeleton count={limit} />
  if (status === "error") return <ErrorState error={error} onRetry={() => refetch()} />
  return (
    <div className="card-grid">
      {items.map((item) => (
        <InternshipCard key={item.url} item={item} />
      ))}
    </div>
  )
}
