import { Link } from "@tanstack/react-router"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { ROUTES } from "@/constants"
import { REGIONS } from "../constants"
import { useInternshipFacets } from "../hooks/useInternshipFacets"

export function DestinationGrid() {
  const { t } = useTranslation()
  const facets = useInternshipFacets()

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {REGIONS.map((r) => (
        <li key={r.key}>
          <Link
            to={ROUTES.internships}
            search={{ region: r.key }}
            className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl bg-navy-950 p-5 text-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-float max-sm:aspect-[16/11] sm:p-6"
          >
            <img
              src={r.photo}
              alt=""
              width={720}
              height={900}
              loading="lazy"
              className="absolute inset-0 -z-20 size-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/95 via-navy-950/45 to-navy-950/5"
              aria-hidden
            />
            <b className="block font-serif text-3xl font-normal">{t(r.label)}</b>
            <span className="mt-1 text-sm text-mist">
              {t("internships.count", { count: facets?.regions[r.key] ?? 0 })}
            </span>
            <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-navy-950 transition group-hover:bg-gold-hover">
              {t("home.destinations.cta")}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        </li>
      ))}
      <li>
        <Link
          to={ROUTES.internships}
          className="flex h-full min-h-40 flex-col justify-between rounded-xl border-2 border-dashed border-navy-900/25 p-6 transition hover:border-gold"
        >
          <ArrowUpRight className="size-6 text-gold-700" aria-hidden />
          <b className="font-serif text-3xl font-normal">{t("home.latest.all")}</b>
        </Link>
      </li>
    </ul>
  )
}
