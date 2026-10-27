import { useSession } from "@/features/auth"
import { useUpdateVacancyStatusMutation } from "../api/mutations/useUpdateVacancyStatusMutation"
import { useMyVacanciesQuery } from "../api/queries/useMyVacanciesQuery"

/** The company's vacancies, its verification state, and close / reopen. */
export function useMyVacancies() {
  const query = useMyVacanciesQuery()
  const status = useUpdateVacancyStatusMutation()
  const { user } = useSession()
  return {
    items: query.data ?? [],
    status: query.status,
    error: query.error,
    refetch: query.refetch,
    companyStatus: user?.company?.status,
    /** False until the company form is filled in; posting is blocked until then. */
    profileComplete: user?.company?.complete !== false,
    setClosed: (id: number, closed: boolean) => status.mutate({ id, closed }),
    busy: status.isPending,
  }
}
