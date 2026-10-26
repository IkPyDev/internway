import type { CompanyFields } from "@/types"

/** The editable part of a company profile. */
export function companyFields(company: Partial<CompanyFields> | undefined): CompanyFields {
  return {
    name: company?.name ?? "",
    description: company?.description ?? "",
    website: company?.website ?? "",
    industry: company?.industry ?? "",
    size: company?.size ?? "",
    country: company?.country ?? "",
    city: company?.city ?? "",
  }
}
