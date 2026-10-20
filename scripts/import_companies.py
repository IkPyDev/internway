"""Builds public/data/companies.json from the WAYU spreadsheet in data/. Needs openpyxl."""
import json
from pathlib import Path

import openpyxl

ROOT = Path(__file__).parent.parent


def rows(ws):
    it = ws.iter_rows(values_only=True)
    head = [str(h).strip() if h else "" for h in next(it)]
    for r in it:
        d = {h: (str(v).strip() if v is not None else "") for h, v in zip(head, r)}
        if d.get("Company"):
            yield d


def main():
    wb = openpyxl.load_workbook(ROOT / "data" / "companies_source.xlsx", data_only=True)
    out = {}
    for d in rows(wb["WAYU Shortlist 40"]):
        out[d["Company"].lower()] = {
            "name": d["Company"], "country": d["Country"], "city": d["City"], "field": d["Field"],
            "program": d["Position / Program"], "evidence": d["Internship Evidence"],
            "eligibility": d["International Student Eligibility"], "payment": d["Payment"],
            "accommodation": d["Accommodation"], "duration": d["Duration"], "contact": d["Contact Target"],
            "fit": d["International Fit"], "priority": d["Priority"], "url": d["Official Evidence / Source"],
            "verified": True,
        }
    for d in rows(wb["Original 500 Extract"]):
        out.setdefault(d["Company"].lower(), {
            "name": d["Company"], "country": d["Country"], "city": d["City"], "field": d["Field"],
            "program": d["Original Internship Program"], "evidence": d["Status"], "eligibility": "",
            "payment": d["Payment"], "accommodation": d["Accommodation"], "duration": d["Duration"],
            "contact": d["Contact"], "fit": "", "priority": "", "url": d["Careers Page"], "verified": False,
        })
    companies = sorted(out.values(), key=lambda c: (c["priority"] or "Z", c["country"], c["name"]))
    (ROOT / "public" / "data" / "companies.json").write_text(json.dumps(companies, ensure_ascii=False, indent=1))
    print(f"wrote {len(companies)} companies")


if __name__ == "__main__":
    main()
