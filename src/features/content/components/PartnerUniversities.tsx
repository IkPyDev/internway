import { ExternalLink } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn, safeUrl } from "@/lib"
import { PARTNER_UNIVERSITIES } from "../constants"

/** Logo grid of partner universities; each card opens the university's own site. */
export function PartnerUniversities() {
  const { t } = useTranslation()
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {PARTNER_UNIVERSITIES.map((u) => (
        <li key={u.url}>
          <a
            href={safeUrl(u.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover group flex h-full flex-col gap-3 rounded-xl border bg-card p-4"
          >
            <span
              className={cn(
                "flex h-24 items-center justify-center rounded-lg p-3",
                u.dark ? "bg-navy-900" : "bg-muted/40",
              )}
            >
              {u.logo ? (
                <img
                  src={`/img/universities/${u.logo}`}
                  alt=""
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span
                  className="grid size-14 place-items-center rounded-full bg-navy-900 font-serif text-xl text-white"
                  aria-hidden
                >
                  {u.name.slice(0, 1)}
                </span>
              )}
            </span>
            <span className="line-clamp-3 text-sm font-semibold leading-snug">{u.name}</span>
            <span className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
              {t(`universities.cities.${u.city}`)}
              <ExternalLink className="size-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden />
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
