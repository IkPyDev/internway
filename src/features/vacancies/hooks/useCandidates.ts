import { useNavigate, useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import { ROUTES } from "@/constants"
import { useSession } from "@/features/auth"
import type { ApplicationStatus } from "@/types"
import { useUpdateApplicationMutation } from "../api/mutations/useUpdateApplicationMutation"
import { useCandidatesQuery } from "../api/queries/useCandidatesQuery"
import { parseCandidatesSearch } from "../lib/vacancies"
import { useVacancyId } from "./useVacancyId"

/** Applicants to one vacancy, a status filter in the URL, and the pipeline moves. */
export function useCandidates() {
  const vacancyId = useVacancyId() ?? 0
  const { status: filter } = parseCandidatesSearch(useSearch({ strict: false }))
  const navigate = useNavigate()
  const query = useCandidatesQuery(vacancyId)
  const update = useUpdateApplicationMutation()
  const { user } = useSession()
  const all = query.data?.items ?? []

  const counts = useMemo(() => {
    const c: Partial<Record<ApplicationStatus, number>> = {}
    for (const a of all) c[a.status] = (c[a.status] ?? 0) + 1
    return c
  }, [all])

  return {
    title: query.data?.title ?? "",
    filter,
    setFilter: (status: ApplicationStatus | undefined) =>
      navigate({
        to: ROUTES.candidates,
        params: { id: String(vacancyId) },
        search: { status },
        replace: true,
      }),
    total: all.length,
    counts,
    items: filter ? all.filter((a) => a.status === filter) : all,
    status: query.status,
    error: query.error,
    refetch: query.refetch,
    /** The admin may look but only the company decides. */
    canDecide: user?.role === "employer",
    decide: (id: number, status: ApplicationStatus, note: string) => update.mutate({ id, status, note }),
    deciding: update.isPending,
    decideError: update.error,
  }
}
