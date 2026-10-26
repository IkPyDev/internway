import { useDeleteSavedMutation } from "../api/mutations/useDeleteSavedMutation"
import { useSavedQuery } from "../api/queries/useSavedQuery"

export function useSavedVacancies() {
  const query = useSavedQuery()
  const unsave = useDeleteSavedMutation()
  return {
    items: query.data ?? [],
    status: query.status,
    error: query.error,
    refetch: query.refetch,
    remove: (vacancyId: number) => unsave.mutate(vacancyId),
  }
}
