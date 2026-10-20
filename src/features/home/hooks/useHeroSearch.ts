import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { ROUTES } from "@/constants"
import { type FieldKey, parseInternshipsSearch } from "@/features/internships"

export function useHeroSearch() {
  const [q, setQ] = useState("")
  const [field, setField] = useState<FieldKey | undefined>(undefined)
  const navigate = useNavigate()
  const submit = () =>
    navigate({ to: ROUTES.internships, search: parseInternshipsSearch({ q: q.trim(), field }) })
  return { q, setQ, field, setField, submit }
}
