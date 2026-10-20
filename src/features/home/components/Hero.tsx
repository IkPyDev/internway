import { Link } from "@tanstack/react-router"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { parseInternshipsSearch, QUICK_REGIONS, REGIONS } from "@/features/internships"
import { useHeroSearch } from "../hooks/useHeroSearch"

const REGION_LABEL = Object.fromEntries(REGIONS.map((r) => [r.key, r.label]))

interface HeroProps {
  today: number | null
  regions: number | null
}

export function Hero({ today, regions }: HeroProps) {
  const { t } = useTranslation()
  const { q, setQ, submit } = useHeroSearch()

  return (
    <section className="hero-bg relative overflow-hidden pt-16 pb-28 text-white sm:pt-20">
      <div className="chessboard absolute inset-0 opacity-[0.07]" aria-hidden />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <span className="eyebrow text-[#7fe39b]">{t("home.eyebrow")}</span>
          <h1 className="text-4xl leading-[1.08] font-extrabold sm:text-6xl">
            {t("home.titleStart")} <span className="text-gradient">{t("home.titleAccent")}</span>{" "}
            {t("home.titleEnd")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#c9d3f2]">{t("home.lead")}</p>
          <form
            aria-label={t("common.search")}
            className="mt-8 mb-5 flex max-w-xl gap-2 rounded-2xl bg-white p-2 shadow-float max-sm:flex-col sm:rounded-full"
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
          >
            <label className="relative flex-1">
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
                className="h-12 w-full rounded-full bg-transparent pr-4 pl-11 text-foreground outline-none"
              />
            </label>
            <Button
              type="submit"
              size="lg"
              className="h-12 rounded-full bg-green-500 px-7 font-bold hover:bg-green-600"
            >
              {t("common.search")}
            </Button>
          </form>
          <div className="flex flex-wrap gap-2">
            {QUICK_REGIONS.map((key) => (
              <Link
                key={key}
                to={ROUTES.internships}
                search={parseInternshipsSearch({ region: key })}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold transition hover:bg-white/20"
              >
                {t(REGION_LABEL[key])}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative justify-self-center max-lg:order-first">
          <div className="grid aspect-square w-[min(380px,72vw)] animate-rise place-items-center rounded-[36px] bg-white p-7 shadow-float ring-[10px] ring-white/5 max-lg:w-[min(260px,70vw)]">
            <img
              src="/img/logo.jpg"
              alt={t("home.logoAlt")}
              width={420}
              height={443}
              className="size-full object-contain"
            />
          </div>
          <StatBubble className="-bottom-9 -left-6 text-green-600" value={today} label={t("home.today")} />
          <StatBubble
            className="top-6 -right-6 [animation-delay:-2.5s]"
            value={regions}
            label={t("home.regions")}
          />
        </div>
      </div>
    </section>
  )
}

function StatBubble({ value, label, className }: { value: number | null; label: string; className: string }) {
  return (
    <div
      className={`absolute flex animate-bob flex-col rounded-2xl bg-white px-4.5 py-3 text-foreground shadow-float ${className}`}
    >
      <b className="text-2xl font-extrabold">{value?.toLocaleString() ?? "—"}</b>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
