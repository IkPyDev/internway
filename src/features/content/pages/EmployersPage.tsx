import { BadgeCheck, Building2, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import { FeatureCard, PageHero, Section } from "@/components/shared"
import { ROUTES } from "@/constants"
import { ContactForm } from "@/features/contact"
import { Plan } from "../components/Plan"
import { useTList } from "../hooks/useTList"

export function EmployersPage() {
  const { t } = useTranslation()
  const list = useTList()
  return (
    <>
      <PageHero
        eyebrow={t("employers.eyebrow")}
        title={t("employers.title")}
        lead={t("employers.lead")}
        image="/img/office-meeting.jpg"
        position="center 45%"
      />
      <Section eyebrow={t("employers.featuresEyebrow")} title={t("employers.featuresTitle")}>
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={Building2}
            title={t("employers.features.profile.title")}
            text={t("employers.features.profile.text")}
          />
          <FeatureCard
            icon={BadgeCheck}
            title={t("employers.features.verified.title")}
            text={t("employers.features.verified.text")}
          />
          <FeatureCard
            icon={Users}
            title={t("employers.features.candidates.title")}
            text={t("employers.features.candidates.text")}
          />
        </div>
      </Section>
      <Section tint eyebrow={t("employers.modelEyebrow")} title={t("employers.modelTitle")}>
        <div className="grid gap-5 md:grid-cols-2">
          <Plan
            name={t("employers.plans.now.name")}
            price={t("employers.plans.now.price")}
            text={t("employers.plans.now.text")}
            items={list("employers.plans.now.items")}
            cta={t("employers.plans.now.cta")}
            to={ROUTES.employers}
            hash="employer-form"
            flag={t("common.recommended")}
          />
          <Plan
            name={t("employers.plans.later.name")}
            price={t("employers.plans.later.price")}
            text={t("employers.plans.later.text")}
            items={list("employers.plans.later.items")}
            cta={t("employers.plans.later.cta")}
            to={ROUTES.employers}
            hash="employer-form"
          />
        </div>
      </Section>
      <Section id="employer-form" title={t("employers.formTitle")}>
        <ContactForm topic="employer" extraFields={["company", "country"]} />
      </Section>
    </>
  )
}
