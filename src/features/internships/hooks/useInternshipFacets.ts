import { useMemo } from "react"
import { useInternshipsQuery } from "../api/queries/useInternshipsQuery"
import { countFields, countRegions } from "../lib/internships"

/** Listing counts per field and per region over the whole dataset; null while loading. */
export function useInternshipFacets() {
  const { data } = useInternshipsQuery()
  return useMemo(() => (data ? { fields: countFields(data), regions: countRegions(data) } : null), [data])
}
