import { Link } from "@tanstack/react-router"
import { Building2, GraduationCap, TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CtaBand, FeatureCard, Section, Steps } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { TopCompanies } from "@/features/companies"
import { LatestInternships } from "@/features/internships"
import { Hero } from "../components/Hero"
import { StatsStrip } from "../components/StatsStrip"
import { useHomeStats } from "../hooks/useHomeStats"

export function HomePage() {
  const { t } = useTranslation()
  const { internships, companies } = useHomeStats()

  return (
    <>
      <Hero today={internships?.today ?? null} regions={internships?.regions ?? null} />
      <StatsStrip
        total={internships?.total ?? null}
        programs={internships?.programs ?? null}
        companies={companies}
      />

      <Section
        eyebrow={t("home.directions.eyebrow")}
        title={t("home.directions.title")}
        lead={t("home.directions.lead")}
      >
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={GraduationCap}
            title={t("home.directions.students.title")}
            text={t("home.directions.students.text")}
          />
          <FeatureCard
            icon={Building2}
            title={t("home.directions.employers.title")}
            text={t("home.directions.employers.text")}
          />
          <FeatureCard
            icon={TrendingUp}
            title={t("home.directions.internships.title")}
            text={t("home.directions.internships.text")}
          />
        </div>
      </Section>

      <Section tint eyebrow={t("home.latest.eyebrow")} title={t("home.latest.title")}>
        <LatestInternships />
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="rounded-full px-7 font-bold">
            <Link to={ROUTES.internships}>{t("home.latest.all")} →</Link>
          </Button>
        </div>
      </Section>

      <Section
        eyebrow={t("home.partners.eyebrow")}
        title={t("home.partners.title")}
        lead={t("home.partners.lead")}
      >
        <TopCompanies />
        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full px-7 font-bold">
            <Link to={ROUTES.companies}>{t("home.partners.all")} →</Link>
          </Button>
        </div>
      </Section>

      <Section tint eyebrow={t("home.how.eyebrow")} title={t("home.how.title")}>
        <Steps
          items={[1, 2, 3, 4].map((i) => ({
            title: t(`home.how.${i}.title`),
            text: t(`home.how.${i}.text`),
          }))}
        />
      </Section>

      <CtaBand
        title={t("home.cta.title")}
        text={t("home.cta.text")}
        to={ROUTES.students}
        label={t("home.cta.label")}
      />
    </>
  )
}
