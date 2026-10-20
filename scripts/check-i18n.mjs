#!/usr/bin/env node
// Fails when uz.json and ru.json do not have exactly the same keys (there is no fallback locale).
import { readFileSync } from "node:fs"

const dir = new URL("../src/config/i18n/locales/", import.meta.url)
const flat = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v) ? flat(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  )
const [uz, ru] = ["uz", "ru"].map(
  (l) => new Set(flat(JSON.parse(readFileSync(new URL(`${l}.json`, dir), "utf8")))),
)
const missing = [
  ...[...uz].filter((k) => !ru.has(k)).map((k) => `ru missing ${k}`),
  ...[...ru].filter((k) => !uz.has(k)).map((k) => `uz missing ${k}`),
]
console.log(`i18n: ${uz.size} uz keys · ${ru.size} ru keys`)
for (const m of missing) console.log(`  ✗ ${m}`)
process.exit(missing.length ? 1 : 0)
