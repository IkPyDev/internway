export interface Page<T> {
  items: T[]
  page: number
  pages: number
  total: number
}

/** Slices a list into one page, clamping the page number into range. */
export function paginate<T>(list: T[], page: number, size: number): Page<T> {
  const pages = Math.max(1, Math.ceil(list.length / size))
  const p = Math.min(Math.max(1, page), pages)
  return { items: list.slice((p - 1) * size, p * size), page: p, pages, total: list.length }
}
