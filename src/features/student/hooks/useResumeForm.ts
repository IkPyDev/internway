import { useEffect, useState } from "react"
import { useSession } from "@/features/auth"
import type { ResumeFields } from "@/types"
import { useUpdateResumeMutation } from "../api/mutations/useUpdateResumeMutation"
import { useResumeQuery } from "../api/queries/useResumeQuery"
import { resumeFields } from "../lib/resume"
import { useFileUpload } from "./useFileUpload"

export function useResumeForm() {
  const query = useResumeQuery()
  const save = useUpdateResumeMutation()
  const files = useFileUpload()
  const { user } = useSession()
  const [fields, setFields] = useState<ResumeFields>(() => resumeFields(null))

  useEffect(() => {
    if (query.data !== undefined) setFields(resumeFields(query.data))
  }, [query.data])

  return {
    resume: query.data,
    status: query.status,
    error: query.error,
    refetch: query.refetch,
    /** The account email; employers see it with the resume. */
    email: user?.email ?? "",
    fields,
    set: <K extends keyof ResumeFields>(key: K, value: ResumeFields[K]) =>
      setFields((f) => ({ ...f, [key]: value })),
    ...files,
    submit: () => save.mutate(fields),
    saving: save.isPending,
    saved: save.isSuccess,
    saveError: save.error,
  }
}
