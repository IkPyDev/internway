import { Building2, GraduationCap } from "lucide-react"
import type { FormEvent } from "react"
import { useTranslation } from "react-i18next"
import { FormError } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib"
import { useLoginFlow } from "../hooks/useLoginFlow"

const ROLES = [
  { icon: GraduationCap, key: "student" },
  { icon: Building2, key: "employer" },
] as const

const submit = (fn: () => void) => (e: FormEvent) => {
  e.preventDefault()
  fn()
}

export function LoginPage() {
  const { t } = useTranslation()
  const flow = useLoginFlow()

  return (
    <section className="relative isolate grid min-h-[calc(100vh-72px)] place-items-center bg-navy-950 px-4 py-12">
      <img
        src="/img/students-walking.jpg"
        alt=""
        className="absolute inset-0 -z-20 size-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-navy-950/55" aria-hidden />
      <div className="grid w-full max-w-md gap-4 rounded-2xl border bg-card px-7 py-10 shadow-card">
        <img
          src="/img/logo.jpg"
          alt="InternWay"
          width={96}
          height={101}
          className="mx-auto mix-blend-multiply"
        />
        <div className="text-center">
          <h1 className="text-3xl">{t(`login.${flow.step}.title`)}</h1>
          <p className="mt-1 text-muted-foreground">{t(`login.${flow.step}.lead`, { email: flow.email })}</p>
        </div>

        {flow.step === "email" && (
          <form className="grid gap-3" onSubmit={submit(flow.submitEmail)}>
            <Label htmlFor="email">{t("login.emailLabel")}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={flow.email}
              onChange={(e) => flow.setEmail(e.target.value)}
            />
            <Button type="submit" className="rounded-full font-bold" disabled={flow.busy}>
              {t("login.getCode")}
            </Button>
          </form>
        )}

        {flow.step === "code" && (
          <form className="grid gap-3" onSubmit={submit(flow.submitCode)}>
            <Label htmlFor="code">{t("login.codeLabel")}</Label>
            <Input
              id="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={flow.code}
              onChange={(e) => flow.setCode(e.target.value)}
              className="text-center text-xl tracking-[0.5em]"
            />
            <Button type="submit" className="rounded-full font-bold" disabled={flow.busy}>
              {t("login.signIn")}
            </Button>
            <Button type="button" variant="ghost" className="rounded-full" onClick={flow.back}>
              {t("login.changeEmail")}
            </Button>
          </form>
        )}

        {flow.step === "profile" && (
          <form className="grid gap-3" onSubmit={submit(flow.submitProfile)}>
            <fieldset className="grid grid-cols-2 gap-2.5">
              <legend className="sr-only">{t("login.role")}</legend>
              {ROLES.map(({ icon: Icon, key }) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={flow.role === key}
                  onClick={() => flow.setRole(key)}
                  className={cn(
                    "grid gap-1 rounded-lg border-[1.5px] p-3.5 text-center text-sm transition",
                    flow.role === key ? "border-navy-700 bg-[#e8edfb]" : "hover:bg-muted",
                  )}
                >
                  <Icon className="mx-auto size-5 text-navy-700" aria-hidden />
                  <b>{t(`login.roles.${key}.title`)}</b>
                  <span className="text-xs text-muted-foreground">{t(`login.roles.${key}.text`)}</span>
                </button>
              ))}
            </fieldset>
            <Label htmlFor="name">{t("login.name")}</Label>
            <Input
              id="name"
              autoComplete="name"
              required
              value={flow.name}
              onChange={(e) => flow.setName(e.target.value)}
            />
            {flow.role === "employer" && (
              <>
                <Label htmlFor="company">{t("login.company")}</Label>
                <Input
                  id="company"
                  autoComplete="organization"
                  required
                  value={flow.company}
                  onChange={(e) => flow.setCompany(e.target.value)}
                />
              </>
            )}
            <Button type="submit" className="rounded-full font-bold" disabled={flow.busy}>
              {t("login.continue")}
            </Button>
          </form>
        )}

        <FormError error={flow.error} />
      </div>
    </section>
  )
}
