#!/usr/bin/env node
// Fails when the locale files do not all have exactly the same keys (there is no fallback locale).
import { readFileSync } from "node:fs"

const LOCALES = ["uz", "en", "ru"]
const dir = new URL("../src/config/i18n/locales/", import.meta.url)
const flat = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v) ? flat(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  )
const keys = Object.fromEntries(
  LOCALES.map((l) => [l, new Set(flat(JSON.parse(readFileSync(new URL(`${l}.json`, dir), "utf8"))))]),
)
const all = new Set(LOCALES.flatMap((l) => [...keys[l]]))
const missing = LOCALES.flatMap((l) =>
  [...all].filter((k) => !keys[l].has(k)).map((k) => `${l} missing ${k}`),
)
console.log(`i18n: ${LOCALES.map((l) => `${keys[l].size} ${l}`).join(" · ")} keys`)
for (const m of missing) console.log(`  ✗ ${m}`)
process.exit(missing.length ? 1 : 0)
