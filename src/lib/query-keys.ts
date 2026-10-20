/** Builds the query-key family for one entity, so every hook shares the same keys. */
export function createEntityKeys<const E extends string>(entity: E) {
  return {
    all: [entity] as const,
    list: (filters?: object) => [entity, "list", filters ?? null] as const,
    detail: (id: string | number) => [entity, "detail", id] as const,
  }
}
