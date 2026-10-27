import { useEffect, useState } from "react"
import { useFileUpload } from "@/features/student"
import type { CompanyFields } from "@/types"
import { useCreateInviteMutation } from "../api/mutations/useCreateInviteMutation"
import { useDeleteInviteMutation } from "../api/mutations/useDeleteInviteMutation"
import { useDeleteMemberMutation } from "../api/mutations/useDeleteMemberMutation"
import { useUpdateCompanyMutation } from "../api/mutations/useUpdateCompanyMutation"
import { useCompanyQuery } from "../api/queries/useCompanyQuery"
import { companyFields } from "../lib/company"

/** The company profile form and the owner's team management. */
export function useCompanyProfile() {
  const query = useCompanyQuery()
  const save = useUpdateCompanyMutation()
  const invite = useCreateInviteMutation()
  const cancelInvite = useDeleteInviteMutation()
  const removeMember = useDeleteMemberMutation()
  const files = useFileUpload()
  const [fields, setFields] = useState<CompanyFields>(() => companyFields(undefined))
  const [inviteEmail, setInviteEmail] = useState("")

  useEffect(() => {
    if (query.data) setFields(companyFields(query.data))
  }, [query.data])

  return {
    company: query.data,
    status: query.status,
    error: query.error,
    refetch: query.refetch,
    canEdit: query.data?.isOwner === true,
    fields,
    set: <K extends keyof CompanyFields>(key: K, value: CompanyFields[K]) =>
      setFields((f) => ({ ...f, [key]: value })),
    ...files,
    submit: () => save.mutate(fields),
    saving: save.isPending,
    saved: save.isSuccess,
    saveError: save.error,
    inviteEmail,
    setInviteEmail,
    sendInvite: () => invite.mutate(inviteEmail, { onSuccess: () => setInviteEmail("") }),
    cancelInvite: (id: number) => cancelInvite.mutate(id),
    removeMember: (id: number) => removeMember.mutate(id),
    teamBusy: invite.isPending || cancelInvite.isPending || removeMember.isPending,
    teamError: invite.error ?? cancelInvite.error ?? removeMember.error,
  }
}
