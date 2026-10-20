export type ContactFieldName = "name" | "contact" | "company" | "country" | "university" | "message"

export type ContactValues = Partial<Record<ContactFieldName, string>>

export interface ContactFormProps {
  /** Subject line suffix, e.g. "employer". Also the i18n key under contact.topic. */
  topic: "general" | "employer" | "university"
  extraFields?: ContactFieldName[]
}
