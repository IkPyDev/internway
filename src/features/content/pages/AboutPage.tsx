import { Briefcase, Eye, GraduationCap, Handshake, School, TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"
import { FeatureCard, PageHero, Section } from "@/components/shared"
import { ContactForm } from "@/features/contact"

export function AboutPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        lead={t("about.lead")}
        image="/img/students-walking.jpg"
        position="center 30%"
      />

      <section className="container-page grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2">
        <img
          src="/img/visas.jpg"
          alt={t("about.photoAlt")}
          width={1024}
          height={809}
          loading="lazy"
          className="w-full rounded-xl shadow-card"
        />
        <div className="grid gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl">{t("about.goalTitle")}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t("about.goalText")}</p>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl">{t("about.experienceTitle")}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t("about.experienceText")}</p>
          </div>
        </div>
      </section>

      <Section tint title={t("about.whoTitle")}>
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={GraduationCap}
            title={t("about.who.students.title")}
            text={t("about.who.students.text")}
          />
          <FeatureCard
            icon={Briefcase}
            title={t("about.who.graduates.title")}
            text={t("about.who.graduates.text")}
          />
          <FeatureCard
            icon={School}
            title={t("about.who.partners.title")}
            text={t("about.who.partners.text")}
          />
        </div>
      </Section>

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
