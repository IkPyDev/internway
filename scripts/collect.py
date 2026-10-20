"""Collects internships from public APIs, RSS feeds and ATS boards into public/data/internships.json, newest first."""
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

OUT = Path(__file__).parent.parent / "public" / "data"
UA = {"User-Agent": "uz-intern-aggregator/0.1 (+personal research)"}
INTERN = re.compile(
    r"\b(interns?\b|internships?|trainee|traineeship|praktik|praktikum|werkstudent|working student|"
    r"apprentice|graduate program|fellowship|junior fellow|stagiaire|summer analyst|co-op|work and travel)",
    re.I,
)

RSS = {
    "opportunitydesk": "https://opportunitydesk.org/category/internships/feed/",
    "opportunitiescorners": "https://opportunitiescorners.com/category/internships/feed/",
    "opportunitiesforyouth": "https://opportunitiesforyouth.org/feed/",
    "profellow": "https://www.profellow.com/feed/",
}
# Public ATS job boards: (ats, token).
BOARDS = [
    ("greenhouse", t) for t in [
        "stripe", "airbnb", "datadog", "cloudflare", "gitlab", "figma", "discord", "reddit",
        "dropbox", "duolingo", "twitch", "robinhood", "databricks", "mongodb", "elastic",
        "celonis", "n26", "hellofresh", "getyourguide", "trivago", "booking", "wise",
        "canonical", "grafanalabs", "okta", "samsara", "asana", "coursera", "pinterest",
    ]
] + [
    ("lever", t) for t in ["spotify", "palantir", "wealthsimple", "binance", "kraken", "jumptrading"]
] + [
    ("ashby", t) for t in ["openai", "notion", "ramp", "linear", "deel", "revolut", "supabase"]
]


def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.read()


def iso(ts):
    """Converts a unix timestamp, RFC 822 or ISO string to an ISO date."""
    if ts in (None, ""):
        return None
    try:
        if isinstance(ts, (int, float)) or str(ts).isdigit():
            n = int(ts)
            return datetime.fromtimestamp(n / 1000 if n > 1e12 else n, timezone.utc).isoformat()
        if re.match(r"\d{4}-\d{2}-\d{2}", str(ts)):
            d = datetime.fromisoformat(str(ts).replace("Z", "+00:00"))
            return (d if d.tzinfo else d.replace(tzinfo=timezone.utc)).isoformat()
        return parsedate_to_datetime(str(ts)).astimezone(timezone.utc).isoformat()
    except Exception:
        return None


def item(source, title, company, location, url, date, kind="job"):
    return {"source": source, "kind": kind, "title": (title or "").strip(), "company": company or "",
            "location": location or "", "url": url, "date": iso(date)}


def simplify():
    data = json.loads(fetch("https://raw.githubusercontent.com/SimplifyJobs/Summer2027-Internships/dev/.github/scripts/listings.json"))
    return [item("simplify", d["title"], d["company_name"], ", ".join(d.get("locations") or []), d["url"], d.get("date_posted"))
            for d in data if d.get("active") and d.get("is_visible", True)]


def arbeitnow():
    out = []
    for page in range(1, 8):
        rows = json.loads(fetch(f"https://www.arbeitnow.com/api/job-board-api?page={page}")).get("data", [])
        if not rows:
            break
        out += [item("arbeitnow", d["title"], d["company_name"], d.get("location"), d["url"], d.get("created_at"))
                for d in rows if INTERN.search(d["title"]) or "internship" in (d.get("job_types") or [])]
    return out


def remotive():
    rows = json.loads(fetch("https://remotive.com/api/remote-jobs?search=intern"))["jobs"]
    return [item("remotive", d["title"], d["company_name"], d.get("candidate_required_location"), d["url"], d.get("publication_date"))
            for d in rows if INTERN.search(d["title"])]


def himalayas():
    out = []
    for off in range(0, 1000, 100):
        rows = json.loads(fetch(f"https://himalayas.app/jobs/api?limit=100&offset={off}")).get("jobs", [])
        if not rows:
            break
        out += [item("himalayas", d["title"], d.get("companyName"), ", ".join(d.get("locationRestrictions") or []) or "Remote",
                     d.get("applicationLink") or d.get("guid"), d.get("pubDate"))
                for d in rows if INTERN.search(d["title"])]
    return out


def rss(name, url):
    root = ET.fromstring(fetch(url))
    return [item(name, i.findtext("title"), "", "", i.findtext("link"), i.findtext("pubDate"), kind="program")
            for i in root.iter("item")]


def board(ats, token):
    if ats == "greenhouse":
        rows = json.loads(fetch(f"https://boards-api.greenhouse.io/v1/boards/{token}/jobs"))["jobs"]
        rows = [(d["title"], d.get("location", {}).get("name"), d["absolute_url"], d.get("updated_at")) for d in rows]
    elif ats == "lever":
        rows = json.loads(fetch(f"https://api.lever.co/v0/postings/{token}?mode=json"))
        rows = [(d["text"], d.get("categories", {}).get("location"), d["hostedUrl"], d.get("createdAt")) for d in rows]
    else:
        rows = json.loads(fetch(f"https://api.ashbyhq.com/posting-api/job-board/{token}"))["jobs"]
        rows = [(d["title"], d.get("location"), d["jobUrl"], d.get("publishedAt")) for d in rows]
    return [item(f"{ats}:{token}", t, token, loc, u, dt) for t, loc, u, dt in rows if INTERN.search(t)]


def main():
    tasks = {"simplify": simplify, "arbeitnow": arbeitnow, "remotive": remotive, "himalayas": himalayas}
    tasks |= {n: (lambda n=n, u=u: rss(n, u)) for n, u in RSS.items()}
    tasks |= {f"{a}:{t}": (lambda a=a, t=t: board(a, t)) for a, t in BOARDS}

    results, report = [], {}
    with ThreadPoolExecutor(12) as ex:
        futs = {n: ex.submit(f) for n, f in tasks.items()}
        for n, fut in futs.items():
            try:
                rows = fut.result()
                results += rows
                report[n] = len(rows)
            except Exception as e:
                report[n] = f"ERR {type(e).__name__}: {str(e)[:60]}"

    # Drop duplicate URLs and sort newest first.
    uniq = {r["url"]: r for r in results if r["url"]}
    feed = sorted(uniq.values(), key=lambda r: r["date"] or "", reverse=True)

    OUT.mkdir(exist_ok=True)
    seen_path = Path(__file__).parent / ".seen.json"
    seen = set(json.loads(seen_path.read_text())) if seen_path.exists() else set()
    for r in feed:
        r["new"] = bool(seen) and r["url"] not in seen
    seen_path.write_text(json.dumps([r["url"] for r in feed]))
    (OUT / "internships.json").write_text(json.dumps(feed, ensure_ascii=False, separators=(",", ":")))

    for n, c in sorted(report.items(), key=lambda kv: str(kv[1])):
        print(f"{n:32} {c}")
    print(f"\nTOTAL: {len(feed)} (new: {sum(r['new'] for r in feed)})")


if __name__ == "__main__":
    sys.exit(main())
