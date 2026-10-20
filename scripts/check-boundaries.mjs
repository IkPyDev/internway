#!/usr/bin/env node
// Enforces architecture.json: R1 barrel-only cross-feature imports, R2 no feature cycles, R3 downward-only layers.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const manifest = JSON.parse(readFileSync(join(ROOT, "architecture.json"), "utf8"))
const FEATURES = manifest.features.root
const EXTS = [".ts", ".tsx", ".js", ".jsx", ".json"]
const IMPORT_RE = /^\s*(import|export)\s+(type\s+)?(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/gm

const files = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(ts|tsx)$/.test(name)) files.push(relative(ROOT, p))
  }
}
walk(join(ROOT, manifest.srcRoot))

const layerOf = (file) =>
  manifest.layers.findIndex((l) => l.paths.some((p) => file === p || file.startsWith(`${p}/`)))
const featureOf = (file) => (file.startsWith(`${FEATURES}/`) ? file.split("/")[2] : null)

function resolveImport(from, spec) {
  let base
  const alias = Object.keys(manifest.alias).find((a) => spec.startsWith(a))
  if (alias) base = join(manifest.alias[alias], spec.slice(alias.length))
  else if (spec.startsWith(".")) base = join(dirname(from), spec)
  else return null
  for (const c of [base, ...EXTS.map((e) => base + e), ...EXTS.map((e) => join(base, `index${e}`))]) {
    if (existsSync(join(ROOT, c)) && statSync(join(ROOT, c)).isFile()) return c
  }
  return base
}

const violations = { R1: [], R2: [], R3: [] }
const graph = new Map()

for (const file of files) {
  const src = readFileSync(join(ROOT, file), "utf8")
  const fromLayer = layerOf(file)
  const fromFeature = featureOf(file)
  for (const m of src.matchAll(IMPORT_RE)) {
    const typeOnly = Boolean(m[2])
    const target = resolveImport(file, m[3])
    if (!target) continue
    const toFeature = featureOf(target)
    const toLayer = layerOf(target)

    if (fromFeature && toFeature && fromFeature !== toFeature) {
      const barrel = `${FEATURES}/${toFeature}/${manifest.features.publicSurface}`
      if (target !== barrel) violations.R1.push(`${file} → ${target}`)
      if (!typeOnly) {
        if (!graph.has(fromFeature)) graph.set(fromFeature, new Set())
        graph.get(fromFeature).add(toFeature)
      }
    }
    if (!typeOnly && fromLayer !== -1 && toLayer !== -1 && toLayer < fromLayer) {
      violations.R3.push(
        `${file} (${manifest.layers[fromLayer].name}) → ${target} (${manifest.layers[toLayer].name})`,
      )
    }
  }
}

// R2: depth-first search for back edges in the feature graph.
const state = new Map()
const visit = (node, path) => {
  state.set(node, "open")
  for (const next of graph.get(node) ?? []) {
    if (state.get(next) === "open") violations.R2.push([...path.slice(path.indexOf(next)), next].join(" → "))
    else if (!state.has(next)) visit(next, [...path, next])
  }
  state.set(node, "done")
}
for (const node of graph.keys()) if (!state.has(node)) visit(node, [node])

const edges = [...graph].reduce((n, [, s]) => n + s.size, 0)
console.log(
  `boundaries: ${files.length} files · ${graph.size} features importing others · ${edges} feature edges`,
)
let failed = false
for (const [rule, list] of Object.entries(violations)) {
  console.log(`  ${rule} ${manifest.rules[rule]}: ${list.length}`)
  for (const v of list) console.log(`    ✗ ${v}`)
  failed ||= list.length > 0
}
process.exit(failed ? 1 : 0)
