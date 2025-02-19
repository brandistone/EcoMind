import type { TooltipProps } from "recharts"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"
import type { CarbonData } from "../types"

type Props = TooltipProps<ValueType, NameType>

export function CarbonTooltip({ active, payload }: Props) {
  if (!active || !payload || !payload.length) return null

  const data = payload[0].payload as CarbonData
  const value = payload[0].value as number

  return (
    <div className="bg-black/80 border border-green-500/30 p-2 rounded-lg">
      <p className="text-sm text-gray-400">
        {new Date(data.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </p>
      <p className="text-sm font-bold text-white">{value.toFixed(1)} kg CO2</p>
    </div>
  )
}

