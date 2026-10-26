import { useNavigate, useSearch } from "@tanstack/react-router"
import { ROUTES } from "@/constants"
import { useUpdateModerationMutation } from "../api/mutations/useUpdateModerationMutation"
import { useUpdateUserMutation } from "../api/mutations/useUpdateUserMutation"
import { parseAdminSearch } from "../lib/admin"
import type { AdminSearch, AdminView, ModeratedTable } from "../types"

const NO_VIEW: AdminView = { user: undefined, company: undefined, vacancy: undefined }

/** Tab, filters and the open detail (all in the URL) plus every admin action. */
export function useAdminPanel() {
  const search = parseAdminSearch(useSearch({ strict: false }))
  const navigate = useNavigate()
  const moderation = useUpdateModerationMutation()
  const users = useUpdateUserMutation()
  const go = (patch: AdminSearch, replace: boolean) =>
    navigate({ to: ROUTES.admin, search: { ...search, ...patch }, replace })

  return {
    ...search,
    tab: search.tab ?? "overview",
    update: (patch: AdminSearch) => go(patch, true),
    /** Opens one detail; a history entry, so Back closes it. */
    open: (view: AdminView) => go({ ...NO_VIEW, ...view }, false),
    close: () => go(NO_VIEW, true),
    approve: (table: ModeratedTable, id: number) => moderation.mutate({ table, id, status: "approved" }),
    reject: (table: ModeratedTable, id: number, reason: string) =>
      moderation.mutate({ table, id, status: "rejected", reason }),
    setBlocked: (id: number, blocked: boolean) => users.mutate({ id, blocked }),
    busy: moderation.isPending || users.isPending,
    actionError: moderation.error ?? users.error,
  }
}
