import { useAdminCompanyQuery } from "../api/queries/useAdminCompanyQuery"
import { useAdminUserQuery } from "../api/queries/useAdminUserQuery"
import { useAdminList } from "./useAdminList"

export const useUserDetail = (id: number) => useAdminUserQuery(id)

export const useCompanyDetail = (id: number) => useAdminCompanyQuery(id)

/** A vacancy from the admin list (it already holds every field). */
export function useVacancyDetail(id: number) {
  const list = useAdminList("vacancies")
  return { ...list, vacancy: list.items.find((v) => v.id === id) }
}
