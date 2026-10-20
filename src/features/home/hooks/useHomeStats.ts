import { useTopCompanies } from "@/features/companies"
import { useInternshipStats } from "@/features/internships"

/** Headline numbers for the home page; null while loading. */
export function useHomeStats() {
  const internships = useInternshipStats()
  const companies = useTopCompanies(0).total
  return { internships, companies }
}
