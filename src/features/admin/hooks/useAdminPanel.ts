import { useNavigate, useSearch } from "@tanstack/react-router"
import { ROUTES } from "@/constants"
import { useUpdateModerationMutation } from "../api/mutations/useUpdateModerationMutation"
import { useUpdateUserMutation } from "../api/mutations/useUpdateUserMutation"
import { parseAdminSearch } from "../lib/admin"
import type { AdminSearch, ModeratedTable } from "../types"

/** Tab and status filter (in the URL) plus every admin action. */
export function useAdminPanel() {
  const search = parseAdminSearch(useSearch({ strict: false }))
  const navigate = useNavigate()
  const moderation = useUpdateModerationMutation()
  const users = useUpdateUserMutation()

  return {
    tab: search.tab ?? "overview",
    status: search.status,
    update: (patch: AdminSearch) =>
      navigate({ to: ROUTES.admin, search: { ...search, ...patch }, replace: true }),
    approve: (table: ModeratedTable, id: number) => moderation.mutate({ table, id, status: "approved" }),
    reject: (table: ModeratedTable, id: number, reason: string) =>
      moderation.mutate({ table, id, status: "rejected", reason }),
    setBlocked: (id: number, blocked: boolean) => users.mutate({ id, blocked }),
    busy: moderation.isPending || users.isPending,
    actionError: moderation.error ?? users.error,
  }
}
