import { Link } from "@tanstack/react-router"
import {
  BrainCircuit,
  Briefcase,
  Code2,
  Cog,
  FlaskConical,
  Landmark,
  type LucideIcon,
  Megaphone,
  Palette,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { ROUTES } from "@/constants"
import { FIELDS } from "../constants"
import { useInternshipFacets } from "../hooks/useInternshipFacets"
import type { FieldKey } from "../types"

const ICONS: Record<FieldKey, LucideIcon> = {
  software: Code2,
  data: BrainCircuit,
  engineering: Cog,
  business: Briefcase,
  finance: Landmark,
  marketing: Megaphone,
  design: Palette,
  research: FlaskConical,
}

export function FieldGrid() {
  const { t } = useTranslation()
  const facets = useInternshipFacets()

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {FIELDS.map((f) => {
        const Icon = ICONS[f.key]
        return (
          <li key={f.key}>
            <Link
              to={ROUTES.internships}
              search={{ field: f.key }}
              className="group flex h-full items-center gap-4 rounded-xl border bg-card p-5 transition duration-300 hover:-translate-y-0.5 hover:border-navy-900 hover:shadow-card"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-navy-950 text-gold transition group-hover:bg-gold group-hover:text-navy-950">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <b className="block font-bold">{t(f.label)}</b>
                <span className="text-sm text-muted-foreground">
                  {t("internships.count", { count: facets?.fields[f.key] ?? 0 })}
                </span>
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
