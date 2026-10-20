import { Eye, Handshake, TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"
import { FeatureCard, PageHero, Section } from "@/components/shared"
import { ContactForm } from "@/features/contact"

export function AboutPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero eyebrow={t("about.eyebrow")} title={t("about.title")} lead={t("about.lead")} />
      <Section title={t("about.valuesTitle")}>
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={Handshake}
            title={t("about.values.trust.title")}
            text={t("about.values.trust.text")}
          />
          <FeatureCard
            icon={TrendingUp}
            title={t("about.values.growth.title")}
            text={t("about.values.growth.text")}
          />
          <FeatureCard
            icon={Eye}
            title={t("about.values.openness.title")}
            text={t("about.values.openness.text")}
          />
        </div>
      </Section>
      <Section tint id="contact" eyebrow={t("about.contactEyebrow")} title={t("about.contactTitle")}>
        <ContactForm topic="general" />
      </Section>
    </>
  )
}
