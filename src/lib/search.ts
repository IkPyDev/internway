/** Splits a free-text query into lowercase words. */
export function toWords(q: string | undefined): string[] {
  return (q ?? "").toLowerCase().split(/\s+/).filter(Boolean)
}

/** Reads a string search param; anything else is treated as absent. */
export function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined
}

/** Reads a page number; page 1 is absent so it never shows in the URL. */
export function readPage(value: unknown): number | undefined {
  const n = Number(value)
  return Number.isInteger(n) && n > 1 ? n : undefined
}

/** Reads a value that must be one of the allowed keys. */
export function readEnum<T extends string>(value: unknown, allowed: readonly T[]): T | undefined {
  return allowed.includes(value as T) ? (value as T) : undefined
}

/** Reads a positive whole-number id. */
export function readId(value: unknown): number | undefined {
  const n = Number(value)
  return Number.isInteger(n) && n > 0 ? n : undefined
}
