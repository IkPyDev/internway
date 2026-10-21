import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { PageHero, Section, Steps } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { Disclaimer } from "../components/Disclaimer"
import { Plan } from "../components/Plan"
import { useTList } from "../hooks/useTList"

export function StudentsPage() {
  const { t } = useTranslation()
  const list = useTList()
  return (
    <>
      <PageHero
        eyebrow={t("students.eyebrow")}
        title={t("students.title")}
        lead={t("students.lead")}
        image="/img/cologne-night.jpg"
        position="center 50%"
        actions={
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gold px-7 font-bold text-navy-950 hover:bg-gold-hover"
          >
            <Link to={ROUTES.internships}>{t("students.browse")}</Link>
          </Button>
        }
      />
      <Section eyebrow={t("students.plansEyebrow")} title={t("students.plansTitle")}>
        <div className="grid gap-5 md:grid-cols-3">
          <Plan
            name={t("students.plans.free.name")}
            price={t("students.plans.free.price")}
            text={t("students.plans.free.text")}
            items={list("students.plans.free.items")}
            cta={t("students.plans.free.cta")}
            to={ROUTES.login}
          />
          <Plan
            name={t("students.plans.platform.name")}
            price={t("students.plans.platform.price")}
            text={t("students.plans.platform.text")}
            items={list("students.plans.platform.items")}
            cta={t("students.plans.platform.cta")}
            to={ROUTES.about}
            hash="contact"
          />
          <Plan
            name={t("students.plans.full.name")}
            price={t("students.plans.full.price")}
            text={t("students.plans.full.text")}
            items={list("students.plans.full.items")}
            cta={t("students.plans.full.cta")}
            to={ROUTES.about}
            hash="contact"
            flag={t("common.recommended")}
          />
        </div>
        <Disclaimer />
      </Section>
      <Section tint eyebrow={t("students.payEyebrow")} title={t("students.payTitle")}>
        <Steps
          items={[1, 2, 3, 4].map((i) => ({
            title: t(`students.pay.${i}.title`),
            text: t(`students.pay.${i}.text`),
          }))}
        />
      </Section>
    </>
  )
}
