import { render, screen } from "@testing-library/react"
import { normalizeInternships } from "../lib/internships"
import { InternshipCard } from "./InternshipCard"

describe("InternshipCard", () => {
  it("renders the title and a safe external link", () => {
    const [item] = normalizeInternships([
      {
        source: "greenhouse:stripe",
        kind: "job",
        title: "Data Intern",
        company: "Stripe",
        location: "Berlin, Germany",
        url: "javascript:alert(1)",
        date: null,
      },
    ])
    render(<InternshipCard item={item} />)
    expect(screen.getByText("Data Intern")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute("href", "#")
    expect(screen.getByText("Germaniya")).toBeInTheDocument()
  })
})
