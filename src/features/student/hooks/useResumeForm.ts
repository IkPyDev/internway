import { useEffect, useState } from "react"
import type { ResumeFields } from "@/types"
import { useUpdateResumeMutation } from "../api/mutations/useUpdateResumeMutation"
import { useResumeQuery } from "../api/queries/useResumeQuery"
import { resumeFields } from "../lib/resume"

export function useResumeForm() {
  const query = useResumeQuery()
  const save = useUpdateResumeMutation()
  const [fields, setFields] = useState<ResumeFields>(() => resumeFields(null))

  useEffect(() => {
    if (query.data !== undefined) setFields(resumeFields(query.data))
  }, [query.data])

  return {
    resume: query.data,
    status: query.status,
    error: query.error,
    refetch: query.refetch,
    fields,
    set: (key: keyof ResumeFields, value: string) => setFields((f) => ({ ...f, [key]: value })),
    submit: () => save.mutate(fields),
    saving: save.isPending,
    saved: save.isSuccess,
    saveError: save.error,
  }
}
