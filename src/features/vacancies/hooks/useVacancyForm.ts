import { useRouter } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { ROUTES } from "@/constants"
import type { VacancyFields } from "@/types"
import { useCreateVacancyMutation } from "../api/mutations/useCreateVacancyMutation"
import { useUpdateVacancyMutation } from "../api/mutations/useUpdateVacancyMutation"
import { useVacancyQuery } from "../api/queries/useVacancyQuery"
import { vacancyFields } from "../lib/vacancies"
import { useVacancyId } from "./useVacancyId"

/** Create a vacancy, or edit one when the route has an `$id`. */
export function useVacancyForm() {
  const id = useVacancyId()
  const router = useRouter()
  const query = useVacancyQuery(id)
  const create = useCreateVacancyMutation()
  const update = useUpdateVacancyMutation(id ?? 0)
  const save = id === undefined ? create : update
  const [fields, setFields] = useState<VacancyFields>(() => vacancyFields(undefined))

  useEffect(() => {
    if (query.data) setFields(vacancyFields(query.data))
  }, [query.data])

  return {
    editing: id !== undefined,
    status: id === undefined ? "success" : query.status,
    error: query.error,
    refetch: query.refetch,
    fields,
    set: <K extends keyof VacancyFields>(key: K, value: VacancyFields[K]) =>
      setFields((f) => ({ ...f, [key]: value })),
    submit: () => save.mutate(fields, { onSuccess: () => router.history.push(ROUTES.myVacancies) }),
    saving: save.isPending,
    saveError: save.error,
  }
}
