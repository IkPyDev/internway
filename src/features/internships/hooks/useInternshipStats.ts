import { useMemo } from "react"
import { useInternshipsQuery } from "../api/queries/useInternshipsQuery"
import { internshipStats } from "../lib/internships"

export function useInternshipStats() {
  const { data } = useInternshipsQuery()
  return useMemo(() => (data ? internshipStats(data) : null), [data])
}
