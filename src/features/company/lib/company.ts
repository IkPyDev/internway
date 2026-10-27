import type { CompanyFields } from "@/types"

/** The editable part of a company profile. */
export function companyFields(company: Partial<CompanyFields> | undefined): CompanyFields {
  const text = (key: keyof CompanyFields) => (company?.[key] as string | undefined) ?? ""
  return {
    name: text("name"),
    logo_id: company?.logo_id ?? null,
    description: text("description"),
    website: text("website"),
    industry: text("industry"),
    size: company?.size ?? "",
    country: text("country"),
    city: text("city"),
    contact_name: text("contact_name"),
    contact_position: text("contact_position"),
    contact_email: text("contact_email"),
    contact_phone: text("contact_phone"),
    linkedin: text("linkedin"),
    registration_no: text("registration_no"),
  }
}
