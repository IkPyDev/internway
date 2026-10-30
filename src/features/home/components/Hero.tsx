import { Link } from "@tanstack/react-router"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CountUp } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ROUTES } from "@/constants"
import { FIELDS, type FieldKey } from "@/features/internships"
import { cn } from "@/lib"
import { useHeroSearch } from "../hooks/useHeroSearch"

const ALL = "all"

interface HeroProps {
  stats: { value: number | null; label: string }[]
}

export function Hero({ stats }: HeroProps) {
  const { t } = useTranslation()
  const { q, setQ, field, setField, submit } = useHeroSearch()

  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-navy-950 text-white lg:min-h-[calc(100svh-5rem)]">
      <img
        src="/img/graduates.jpg"
        alt={t("home.photoAlt")}
        width={2400}
        height={1600}
        fetchPriority="high"
        className="absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-[center_40%] lg:w-[58%] lg:[mask-image:linear-gradient(to_right,transparent,black_22%)]"
      />
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />

      <div className="container-page flex flex-1 items-center py-14 sm:py-20 lg:py-12">
        <div className="max-w-3xl animate-rise">
          <span className="eyebrow text-mist">{t("home.eyebrow")}</span>
          <h1 className="text-[clamp(2.5rem,6.8vw,5rem)] leading-[1.04] text-balance [text-shadow:0_2px_26px_rgb(2_10_22/85%)]">
            {t("home.titleStart")} <span className="block text-gold">{t("home.titleAccent")}</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[#e6eef8]">{t("home.lead")}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-lg bg-gold px-7 font-bold text-navy-950 hover:bg-gold-hover"
            >
              <Link to={ROUTES.internships}>{t("home.ctaPrimary")} →</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-lg border-white/40 bg-white/5 px-7 font-bold text-white hover:bg-white/15 hover:text-white"
            >
              <Link to={ROUTES.home} hash="how">
                {t("home.ctaSecondary")}
              </Link>
            </Button>
          </div>

          <form
            aria-label={t("common.search")}
            className="mt-6 grid max-w-2xl gap-2 rounded-xl bg-white p-2 shadow-float sm:grid-cols-[1fr_190px_auto]"
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
          >
            <label className="relative">
              <span className="sr-only">{t("home.searchPlaceholder")}</span>
              <Search
                className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("home.searchPlaceholder")}
                className="h-12 w-full rounded-lg bg-transparent pr-4 pl-11 text-foreground outline-none"
              />
            </label>
            <Select
              value={field ?? ALL}
              onValueChange={(v) => setField(v === ALL ? undefined : (v as FieldKey))}
            >
              <SelectTrigger
                className="h-12! w-full border-0 bg-muted text-foreground shadow-none"
                aria-label={t("internships.fieldLabel")}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{t("internships.field.all")}</SelectItem>
                {FIELDS.map((f) => (
                  <SelectItem key={f.key} value={f.key}>
                    {t(f.label)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" size="lg" className="h-12 rounded-lg px-7 font-bold">
              {t("common.search")}
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/12 bg-navy-950/88 backdrop-blur-[3px]">
        <div className="container-page grid grid-cols-2 gap-x-5 gap-y-6 py-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label}>
              <b
                className={cn(
                  "block font-serif text-[clamp(1.95rem,4.3vw,3rem)] leading-none font-normal tracking-tight",
                  i === 1 && "text-gold",
                )}
              >
                {s.value === null ? "—" : <CountUp value={s.value} />}
              </b>
              <span className="mt-2 block text-sm text-mist">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
