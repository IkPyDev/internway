import { useParams } from "@tanstack/react-router"

/** The numeric `$id` route param, or undefined on routes without one. */
export function useVacancyId(): number | undefined {
  const { id } = useParams({ strict: false })
  return id === undefined ? undefined : Number(id)
}
