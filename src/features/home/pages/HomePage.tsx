import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { CtaBand, Section, Steps } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { TopCompanies } from "@/features/companies"
import { DestinationGrid, FieldGrid, LatestInternships, PopularSearches } from "@/features/internships"
import { LatestVacancies } from "@/features/vacancies"
import { AbroadGallery } from "../components/AbroadGallery"
import { Hero } from "../components/Hero"
import { HowWeHelp } from "../components/HowWeHelp"
import { useHomeStats } from "../hooks/useHomeStats"

export function HomePage() {
  const { t } = useTranslation()
  const { internships, companies } = useHomeStats()

  return (
    <>
      <Hero
        stats={[
          { value: internships?.total ?? null, label: t("home.stats.total") },
          { value: internships?.today ?? null, label: t("home.today") },
          { value: companies, label: t("home.stats.companies") },
          { value: internships?.programs ?? null, label: t("home.stats.programs") },
        ]}
      />

      <HowWeHelp />

      <LatestVacancies />

      <Section
        tint
        eyebrow={t("home.fields.eyebrow")}
        title={t("home.fields.title")}
        lead={t("home.fields.lead")}
      >
        <FieldGrid />
      </Section>

      <Section
        eyebrow={t("home.destinations.eyebrow")}
        title={t("home.destinations.title")}
        lead={t("home.destinations.lead")}
      >
        <DestinationGrid />
      </Section>

      <Section
        tint
        eyebrow={t("home.abroad.eyebrow")}
        title={t("home.abroad.title")}
        lead={t("home.abroad.lead")}
      >
        <AbroadGallery />
      </Section>

      <Section
        eyebrow={t("home.popular.eyebrow")}
        title={t("home.popular.title")}
        lead={t("home.popular.lead")}
      >
        <PopularSearches />
      </Section>

      <Section tint eyebrow={t("home.latest.eyebrow")} title={t("home.latest.title")}>
        <LatestInternships />
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="rounded-full px-7 font-bold">
            <Link to={ROUTES.internships}>{t("home.latest.all")} →</Link>
          </Button>
        </div>
      </Section>

      <CtaBand
        title={t("home.cta.title")}
        text={t("home.cta.text")}
        to={ROUTES.students}
        image="/img/students-cafe.jpg"
        position="center 50%"
        label={t("home.cta.label")}
      />

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

      <Section tint id="how" eyebrow={t("home.how.eyebrow")} title={t("home.how.title")}>
        <Steps
          items={[1, 2, 3, 4].map((i) => ({
            title: t(`home.how.${i}.title`),
            text: t(`home.how.${i}.text`),
          }))}
        />
      </Section>
    </>
  )
}
