import { Link } from "@tanstack/react-router"
import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  Code2,
  Cog,
  FlaskConical,
  Globe2,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Leaf,
  type LucideIcon,
  Megaphone,
  Palette,
  Scale,
  Truck,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { ROUTES } from "@/constants"
import { cn } from "@/lib"
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
  healthcare: HeartPulse,
  education: GraduationCap,
  hospitality: Hotel,
  logistics: Truck,
  law: Scale,
  agriculture: Leaf,
  ngo: Globe2,
}

/** Unsplash photo ids (free licence) shown on top of each field card. */
const PHOTOS: Record<FieldKey, string> = {
  software: "1517694712202-14dd9538aa97",
  data: "1551288049-bebda4e38f71",
  engineering: "1581091226825-a6a2a5aee158",
  business: "1454165804606-c3d57bc86b40",
  finance: "1554224155-6726b3ff858f",
  marketing: "1460925895917-afdab827c52f",
  design: "1561070791-2526d30994b5",
  research: "1532094349884-543bc11b234d",
  healthcare: "1576091160550-2173dba999ef",
  education: "1503676260728-1c00da094a0b",
  hospitality: "1566073771259-6a8506099945",
  logistics: "1586528116311-ad8dd3c8310d",
  law: "1589829545856-d10d557cf95f",
  agriculture: "1500937386664-56d1dfef3854",
  ngo: "1488521787991-ed7bbaae773c",
}

/** Every field as a photo card in one endless, slowly scrolling row; it pauses under the pointer or focus. */
export function FieldGrid() {
  const { t } = useTranslation()
  const facets = useInternshipFacets()

  return (
    <div className="-mx-4 overflow-hidden px-4 py-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] motion-reduce:overflow-x-auto">
      <ul
        className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${FIELDS.length * 5}s` }}
      >
        {[0, 1].map((copy) =>
          FIELDS.map((f) => {
            const Icon = ICONS[f.key]
            return (
              <li
                key={`${copy}-${f.key}`}
                className={cn("w-56 shrink-0 sm:w-60", copy === 1 && "motion-reduce:hidden")}
                aria-hidden={copy === 1 || undefined}
                inert={copy === 1 || undefined}
              >
                <Link
                  to={ROUTES.internships}
                  search={{ field: f.key }}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-navy-900 hover:shadow-float"
                >
                  <span className="block aspect-[16/9] overflow-hidden bg-navy-950">
                    <img
                      src={`https://images.unsplash.com/photo-${PHOTOS[f.key]}?auto=format&fit=crop&w=600&q=70`}
                      alt=""
                      width={600}
                      height={338}
                      loading="lazy"
                      className="size-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="flex flex-1 items-center gap-3 p-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-navy-950 text-gold transition group-hover:bg-gold group-hover:text-navy-950">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <b className="block text-sm leading-snug font-bold">{t(f.label)}</b>
                      <span className="text-xs text-muted-foreground">
                        {t("internships.count", { count: facets?.fields[f.key] ?? 0 })}
                      </span>
                    </span>
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border text-navy-900 transition group-hover:border-gold group-hover:bg-gold">
                      <ArrowRight className="size-3.5" aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            )
          }),
        )}
      </ul>
    </div>
  )
}
