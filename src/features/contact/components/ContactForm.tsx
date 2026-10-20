import { useTranslation } from "react-i18next"
import { Note } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useContactForm } from "../hooks/useContactForm"
import type { ContactFieldName, ContactFormProps } from "../types"

const BASE_FIELDS: ContactFieldName[] = ["name", "contact"]
const AUTOCOMPLETE: Partial<Record<ContactFieldName, string>> = {
  name: "name",
  contact: "email",
  country: "country-name",
  company: "organization",
}

export function ContactForm({ topic, extraFields = [] }: ContactFormProps) {
  const { t } = useTranslation()
  const { values, setField, submit, enabled } = useContactForm(topic)

  return (
    <form
      className="grid max-w-3xl gap-4 rounded-xl border bg-card p-7"
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {[...BASE_FIELDS, ...extraFields].map((name) => (
          <div key={name} className="grid gap-1.5">
            <Label htmlFor={`${topic}-${name}`}>{t(`contact.field.${name}`)}</Label>
            <Input
              id={`${topic}-${name}`}
              required={name !== "country"}
              autoComplete={AUTOCOMPLETE[name]}
              value={values[name] ?? ""}
              onChange={(e) => setField(name, e.target.value)}
              className="h-11"
            />
          </div>
        ))}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor={`${topic}-message`}>{t("contact.field.message")}</Label>
        <Textarea
          id={`${topic}-message`}
          required
          rows={4}
          value={values.message ?? ""}
          onChange={(e) => setField("message", e.target.value)}
        />
      </div>
      <Button type="submit" disabled={!enabled} className="justify-self-start rounded-full px-6 font-bold">
        {t("contact.send")}
      </Button>
      {!enabled && <Note>{t("contact.notConfigured")}</Note>}
    </form>
  )
}
