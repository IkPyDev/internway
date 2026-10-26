import { useState } from "react"
import { useSession } from "@/features/auth"
import { useCreateApplicationMutation } from "../api/mutations/useCreateApplicationMutation"
import { useCreateSavedMutation } from "../api/mutations/useCreateSavedMutation"
import { useDeleteSavedMutation } from "../api/mutations/useDeleteSavedMutation"
import { useVacancyQuery } from "../api/queries/useVacancyQuery"
import { useVacancyId } from "./useVacancyId"

/** One vacancy and, for a student, applying and saving. */
export function useVacancyDetail() {
  const id = useVacancyId() ?? 0
  const query = useVacancyQuery(id)
  const { user } = useSession()
  const apply = useCreateApplicationMutation(id)
  const save = useCreateSavedMutation()
  const unsave = useDeleteSavedMutation()
  const [coverLetter, setCoverLetter] = useState("")
  const saved = query.data?.saved === true

  return {
    vacancy: query.data,
    status: query.status,
    error: query.error,
    refetch: query.refetch,
    viewer: user?.role ?? "visitor",
    applied: query.data?.applied === true,
    coverLetter,
    setCoverLetter,
    submit: () => apply.mutate(coverLetter),
    applying: apply.isPending,
    applyError: apply.error,
    saved,
    toggleSave: () => (saved ? unsave.mutate(id) : save.mutate(id)),
    saving: save.isPending || unsave.isPending,
  }
}
