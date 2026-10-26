import { Plus, Trash2 } from "lucide-react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

interface ListEditorProps<T> {
  items: T[]
  empty: T
  max: number
  addLabel: string
  onChange: (items: T[]) => void
  children: (item: T, update: (patch: Partial<T>) => void) => ReactNode
}

/** A repeatable group of fields (jobs, links, certificates): edit, remove, add. */
export function ListEditor<T>({ items, empty, max, addLabel, onChange, children }: ListEditorProps<T>) {
  const { t } = useTranslation()
  return (
    <div className="grid gap-3">
      {items.map((item, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: rows have no id; removal re-keys the rest
        <div key={i} className="relative grid gap-3 rounded-lg border bg-muted/40 p-4 pr-12">
          {children(item, (patch) => onChange(items.map((x, j) => (j === i ? { ...x, ...patch } : x))))}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
            aria-label={t("resume.remove")}
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            <Trash2 aria-hidden />
          </Button>
        </div>
      ))}
      {items.length < max && (
        <Button
          type="button"
          variant="outline"
          className="w-fit rounded-full"
          onClick={() => onChange([...items, { ...empty }])}
        >
          <Plus aria-hidden /> {addLabel}
        </Button>
      )}
    </div>
  )
}
