import { Link } from "@tanstack/react-router"
import { FolderOpen, GraduationCap, Lock, ShieldCheck, Wrench } from "lucide-react"
import { useTranslation } from "react-i18next"
import { FeatureCard, PageHero, Section } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { StudentDirectory } from "@/features/student"

export function PortfolioPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero
        eyebrow={t("portfolio.eyebrow")}
        title={t("portfolio.title")}
        lead={t("portfolio.lead")}
        image="/img/laptop.jpg"
        position="center 45%"
        actions={
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gold px-7 font-bold text-navy-950 hover:bg-gold-hover"
          >
            <Link to={ROUTES.login}>{t("portfolio.create")}</Link>
          </Button>
        }
      />
      <Section
        eyebrow={t("portfolio.directory.eyebrow")}
        title={t("portfolio.directory.title")}
        lead={t("portfolio.directory.lead")}
      >
        <StudentDirectory />
      </Section>
      <Section tint title={t("portfolio.fieldsTitle")}>
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={GraduationCap}
            title={t("portfolio.fields.education.title")}
            text={t("portfolio.fields.education.text")}
          />
          <FeatureCard
            icon={Wrench}
            title={t("portfolio.fields.skills.title")}
            text={t("portfolio.fields.skills.text")}
          />
          <FeatureCard
            icon={FolderOpen}
            title={t("portfolio.fields.experience.title")}
            text={t("portfolio.fields.experience.text")}
          />
        </div>
      </Section>
      <Section title={t("portfolio.privacyTitle")}>
        <div className="grid gap-5 md:grid-cols-2">
          <FeatureCard
            icon={Lock}
            title={t("portfolio.privacy.visibility.title")}
            text={t("portfolio.privacy.visibility.text")}
          />
          <FeatureCard
            icon={ShieldCheck}
            title={t("portfolio.privacy.documents.title")}
            text={t("portfolio.privacy.documents.text")}
          />
        </div>
      </Section>
    </>
  )
}
