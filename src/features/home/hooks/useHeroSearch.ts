import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { ROUTES } from "@/constants"
import { parseInternshipsSearch } from "@/features/internships"

export function useHeroSearch() {
  const [q, setQ] = useState("")
  const navigate = useNavigate()
  const submit = () => navigate({ to: ROUTES.internships, search: parseInternshipsSearch({ q: q.trim() }) })
  return { q, setQ, submit }
}
