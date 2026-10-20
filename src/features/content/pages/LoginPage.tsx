import { Link } from "@tanstack/react-router"
import { Building2, GraduationCap } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"

export function LoginPage() {
  const { t } = useTranslation()
  const roles = [
    { icon: GraduationCap, key: "student" },
    { icon: Building2, key: "employer" },
  ] as const
  return (
    <section className="grid min-h-[calc(100vh-72px)] place-items-center bg-[radial-gradient(800px_400px_at_50%_0%,#e8edfb,transparent)] px-4 py-12">
      <div className="grid w-full max-w-md gap-3 rounded-2xl border bg-card px-7 py-10 text-center shadow-card">
        <img
          src="/img/logo.jpg"
          alt="InternWay"
          width={96}
          height={101}
          className="mx-auto mix-blend-multiply"
        />
        <h1 className="text-3xl">{t("login.title")}</h1>
        <p className="text-muted-foreground">{t("login.lead")}</p>
        <div className="my-2 grid grid-cols-2 gap-2.5">
          {roles.map(({ icon: Icon, key }) => (
            <div key={key} className="grid gap-1 rounded-lg border-[1.5px] p-3.5 text-sm">
              <Icon className="mx-auto size-5 text-navy-700" aria-hidden />
              <b>{t(`login.roles.${key}.title`)}</b>
              <span className="text-xs text-muted-foreground">{t(`login.roles.${key}.text`)}</span>
            </div>
          ))}
        </div>
        <Button asChild className="rounded-full font-bold">
          <Link to={ROUTES.about} hash="contact">
            {t("login.notify")}
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full font-bold">
          <Link to={ROUTES.internships}>{t("login.browse")}</Link>
        </Button>
      </div>
    </section>
  )
}
