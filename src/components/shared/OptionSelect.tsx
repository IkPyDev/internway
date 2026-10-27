import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OptionSelectProps<T extends string> {
  /** "" shows the placeholder. */
  value: T | ""
  options: readonly T[]
  label: (option: T) => string
  onChange: (value: T) => void
  placeholder?: string
  required?: boolean
}

/** A select over a fixed option list; `onChange` only ever gets one of `options`. */
export function OptionSelect<T extends string>({
  value,
  options,
  label,
  onChange,
  placeholder,
  required,
}: OptionSelectProps<T>) {
  return (
    // Narrowing cast: the items come from `options`.
    <Select value={value || undefined} required={required} onValueChange={(v) => onChange(v as T)}>
      <SelectTrigger className="w-full font-normal">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {label(o)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
