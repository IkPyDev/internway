import { useNavigate, useSearch } from "@tanstack/react-router"
import { ROUTES } from "@/constants"
import { parseInternshipsSearch } from "../lib/internships"
import type { InternshipsSearch } from "../types"

/** Filters live in the URL so a filtered list can be shared and survives reload. */
export function useInternshipsUrlParams() {
  const search = parseInternshipsSearch(useSearch({ strict: false }))
  const navigate = useNavigate()

  const update = (patch: Partial<InternshipsSearch>) =>
    navigate({
      to: ROUTES.internships,
      search: { ...search, page: undefined, ...patch },
      replace: true,
    })

  return { search, update }
}
