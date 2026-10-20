import { useState } from "react"
import { useTranslation } from "react-i18next"
import { appConfig } from "@/config/app"
import type { ContactFieldName, ContactFormProps, ContactValues } from "../types"

/** Holds the form values and opens the user's mail client addressed to VITE_CONTACT_EMAIL. */
export function useContactForm(topic: ContactFormProps["topic"]) {
  const { t } = useTranslation()
  const [values, setValues] = useState<ContactValues>({})
  const enabled = appConfig.contactEmail !== ""

  const setField = (name: ContactFieldName, value: string) => setValues((v) => ({ ...v, [name]: value }))

  const submit = () => {
    if (!enabled) return
    const subject = `InternWay: ${t(`contact.topic.${topic}`)}`
    const body = Object.entries(values)
      .map(([k, v]) => `${t(`contact.field.${k}`)}: ${v}`)
      .join("\n")
    window.location.href = `mailto:${appConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return { values, setField, submit, enabled }
}
