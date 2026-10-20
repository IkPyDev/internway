import { ExternalLink } from "lucide-react"
import { useTranslation } from "react-i18next"
import { safeUrl } from "@/lib"
import type { SourceLink } from "../types"

export function SourceLinks({ links }: { links: SourceLink[] }) {
  const { t } = useTranslation()
  return (
    <aside className="mt-12 rounded-xl border bg-muted p-6 sm:p-8">
      <h2 className="text-2xl">{t("internships.sources.title")}</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">{t("internships.sources.text")}</p>
      <ul className="mt-5 flex flex-wrap gap-2.5">
        {links.map((l) => (
          <li key={l.name}>
            <a
              href={safeUrl(l.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] bg-card px-4 py-2 text-sm font-semibold transition hover:border-navy-900"
            >
              {l.name}
              <ExternalLink className="size-3.5 text-muted-foreground" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
