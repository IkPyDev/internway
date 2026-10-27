import type { CompanySize, CompanyTextFields } from "@/types"

export const COMPANY_SIZES: CompanySize[] = ["1-10", "11-50", "51-200", "201-1000", "1000+"]

type TextField = { key: keyof CompanyTextFields; required?: boolean; type?: string; wide?: boolean }

/** The registration form's text fields by section; `required` mirrors the server's `company.ts`. */
export const COMPANY_SECTIONS: { key: string; fields: TextField[] }[] = [
  {
    key: "about",
    fields: [
      { key: "name", required: true, wide: true },
      { key: "industry", required: true },
      { key: "website", required: true, type: "url" },
      { key: "country", required: true },
      { key: "city", required: true },
      { key: "linkedin", type: "url" },
    ],
  },
  {
    key: "contact",
    fields: [
      { key: "contact_name", required: true },
      { key: "contact_position", required: true },
      { key: "contact_email", required: true, type: "email" },
      { key: "contact_phone", required: true, type: "tel" },
    ],
  },
]
