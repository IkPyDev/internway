import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { CardGridSkeleton, EmptyState, ErrorState } from "@/components/shared"

interface QueueStatesProps {
  status: "pending" | "error" | "success"
  error: Error | null
  refetch: () => void
  empty: boolean
  children: ReactNode
}

/** Loading / error / empty around an admin list. */
export function QueueStates({ status, error, refetch, empty, children }: QueueStatesProps) {
  const { t } = useTranslation()
  if (status === "pending") return <CardGridSkeleton count={3} />
  if (status === "error") return <ErrorState error={error} onRetry={refetch} />
  if (empty) return <EmptyState text={t("admin.empty")} />
  return children
}
