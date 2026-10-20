import { useTranslation } from "react-i18next"
import { FilterPill } from "@/components/shared"
import { REGIONS } from "../constants"
import type { RegionKey } from "../types"

interface RegionPillsProps {
  active: RegionKey | undefined
  total: number
  counts: Record<RegionKey, number>
  onSelect: (region: RegionKey | undefined) => void
}

export function RegionPills({ active, total, counts, onSelect }: RegionPillsProps) {
  const { t } = useTranslation()
  return (
    <div className="mt-5 mb-2 flex flex-wrap gap-2">
      <FilterPill
        label={t("common.all")}
        count={total}
        active={active === undefined}
        onClick={() => onSelect(undefined)}
      />
      {REGIONS.map((r) => (
        <FilterPill
          key={r.key}
          label={t(r.label)}
          count={counts[r.key]}
          active={active === r.key}
          onClick={() => onSelect(r.key)}
        />
      ))}
    </div>
  )
}
