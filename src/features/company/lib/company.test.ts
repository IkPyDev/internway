import { companyFields } from "./company"

describe("companyFields", () => {
  it("fills gaps with empty values and keeps only editable fields", () => {
    expect(companyFields(undefined)).toMatchObject({
      name: "",
      logo_id: null,
      size: "",
      contact_email: "",
      registration_no: "",
    })
    const fields = companyFields({ name: "Acme", size: "11-50", id: 1 } as never)
    expect(fields).toMatchObject({ name: "Acme", size: "11-50" })
    expect("id" in fields).toBe(false)
  })
})
