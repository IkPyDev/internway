import { BarChart3, Compass, Landmark } from "lucide-react"
import { useTranslation } from "react-i18next"
import { FeatureCard, PageHero, Section } from "@/components/shared"
import { ContactForm } from "@/features/contact"
import { PartnerUniversities } from "../components/PartnerUniversities"

export function UniversitiesPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero
        eyebrow={t("universities.eyebrow")}
        title={t("universities.title")}
        lead={t("universities.lead")}
        image="/img/graduates-selfie.jpg"
        position="center 80%"
      />
      <Section
        eyebrow={t("universities.partners.eyebrow")}
        title={t("universities.partners.title")}
        lead={t("universities.partners.lead")}
      >
        <PartnerUniversities />
      </Section>
      <Section tint title={t("universities.featuresTitle")}>
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={Compass}
            title={t("universities.features.guide.title")}
            text={t("universities.features.guide.text")}
          />
          <FeatureCard
            icon={BarChart3}
            title={t("universities.features.stats.title")}
            text={t("universities.features.stats.text")}
          />
          <FeatureCard
            icon={Landmark}
            title={t("universities.features.cabinet.title")}
            text={t("universities.features.cabinet.text")}
          />
        </div>
      </Section>
      <Section id="university-form" title={t("universities.formTitle")}>
        <ContactForm topic="university" extraFields={["university"]} />
      </Section>
    </>
  )
}
