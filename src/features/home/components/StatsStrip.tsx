import { useTranslation } from "react-i18next"

interface StatsStripProps {
  total: number | null
  companies: number | null
  programs: number | null
}

export function StatsStrip({ total, companies, programs }: StatsStripProps) {
  const { t } = useTranslation()
  const stats = [
    { value: total?.toLocaleString(), label: t("home.stats.total") },
    { value: companies?.toLocaleString(), label: t("home.stats.companies") },
    { value: programs?.toLocaleString(), label: t("home.stats.programs") },
    { value: "40+", label: t("home.stats.sources") },
  ]
  return (
    <section className="relative z-10 -mt-11">
      <div className="container-page grid grid-cols-2 overflow-hidden rounded-xl border bg-card shadow-card lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col p-5 sm:p-6 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} lg:border-l lg:first:border-l-0`}
          >
            <b className="text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
              {s.value ?? "—"}
            </b>
            <span className="text-sm text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
