import { useEffect, useState } from "react"
import type { ResumeFields } from "@/types"
import { useCreateFileMutation } from "../api/mutations/useCreateFileMutation"
import { useUpdateResumeMutation } from "../api/mutations/useUpdateResumeMutation"
import { useResumeQuery } from "../api/queries/useResumeQuery"
import { resumeFields, uploadError } from "../lib/resume"

export function useResumeForm() {
  const query = useResumeQuery()
  const save = useUpdateResumeMutation()
  const upload = useCreateFileMutation()
  const [fields, setFields] = useState<ResumeFields>(() => resumeFields(null))
  const [fileError, setFileError] = useState<string>()

  useEffect(() => {
    if (query.data !== undefined) setFields(resumeFields(query.data))
  }, [query.data])

  return {
    resume: query.data,
    status: query.status,
    error: query.error,
    refetch: query.refetch,
    fields,
    set: <K extends keyof ResumeFields>(key: K, value: ResumeFields[K]) =>
      setFields((f) => ({ ...f, [key]: value })),
    /** Uploads a file and resolves to its id, or null after showing why it was refused. */
    upload: async (file: File, accept: string): Promise<string | null> => {
      const local = uploadError(file, accept)
      setFileError(local)
      upload.reset()
      if (local) return null
      try {
        return (await upload.mutateAsync(file)).id
      } catch {
        return null
      }
    },
    uploading: upload.isPending,
    /** A local refusal code (size, type) or the server's error, whichever happened last. */
    fileError,
    uploadFailure: upload.error,
    submit: () => save.mutate(fields),
    saving: save.isPending,
    saved: save.isSuccess,
    saveError: save.error,
  }
}
