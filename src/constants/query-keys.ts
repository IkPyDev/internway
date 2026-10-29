import { createEntityKeys } from "@/lib"

/** The single registry of TanStack Query keys. */
export const QUERY_KEYS = {
  internships: createEntityKeys("internships"),
  companies: createEntityKeys("companies"),
  me: createEntityKeys("me"),
  resume: createEntityKeys("resume"),
  students: createEntityKeys("students"),
  vacancies: createEntityKeys("vacancies"),
  myVacancies: createEntityKeys("myVacancies"),
  saved: createEntityKeys("saved"),
  company: createEntityKeys("company"),
  applications: createEntityKeys("applications"),
  admin: createEntityKeys("admin"),
} as const
