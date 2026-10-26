import { useParams } from "@tanstack/react-router"
import { usePublicCompanyQuery } from "../api/queries/usePublicCompanyQuery"

export function usePublicCompany() {
  const { id } = useParams({ strict: false })
  const query = usePublicCompanyQuery(Number(id))
  return { company: query.data, status: query.status, error: query.error, refetch: query.refetch }
}
