/** Returns the URL only when it is http(s); anything else (javascript:, data:) becomes "#". */
export function safeUrl(url: string | null | undefined): string {
  return url && /^https?:\/\//i.test(url) ? url : "#"
}
