import { useInternshipsQuery } from "../api/queries/useInternshipsQuery"

export function useLatestInternships(limit: number) {
  const query = useInternshipsQuery()
  return {
    items: query.data?.slice(0, limit) ?? [],
    status: query.status,
    error: query.error,
    refetch: query.refetch,
  }
}
