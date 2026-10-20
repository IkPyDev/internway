import { createEntityKeys } from "@/lib"

/** The single registry of TanStack Query keys. */
export const QUERY_KEYS = {
  internships: createEntityKeys("internships"),
  companies: createEntityKeys("companies"),
} as const
