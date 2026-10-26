import { useWithdrawApplicationMutation } from "../api/mutations/useWithdrawApplicationMutation"
import { useMyApplicationsQuery } from "../api/queries/useMyApplicationsQuery"

export function useMyApplications() {
  const query = useMyApplicationsQuery()
  const withdraw = useWithdrawApplicationMutation()
  return {
    items: query.data ?? [],
    status: query.status,
    error: query.error,
    refetch: query.refetch,
    withdraw: (id: number) => withdraw.mutate(id),
    withdrawing: withdraw.isPending,
    withdrawError: withdraw.error,
  }
}
