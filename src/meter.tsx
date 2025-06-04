import { motion } from "motion/react"
import * as React from "react"
import {
  Meter as MeterPrimitive,
  type MeterProps as MeterPrimitiveProps
} from "react-aria-components"
import { Label } from "./field"
import { cn, composeClassName } from "./utils"

type MeterProps = MeterPrimitiveProps & {
  label?: string
}

const Meter = ({ label, ...props }: MeterProps) => (
  <MeterPrimitive
    {...props}
    className={composeClassName(
      props.className,
      "flex min-w-56 flex-col gap-1"
    )}
  >
    {({ percentage, valueText }) => (
      <>
        <div className="flex w-full justify-between gap-2">
          <Label>{label}</Label>
          <span
            className={cn(
              "text-sm tabular-nums",
              percentage >= 80 ? "text-danger" : "text-muted-foreground"
            )}
          >
            {percentage >= 80 && (
              <span
                aria-label="Alert"
                className="lucide-circle-alert fill-danger/20 text-danger inline-block size-4 align-text-bottom"
              />
            )}
            {` ${valueText}`}
          </span>
        </div>
        <div className="bg-muted relative h-2 rounded-full outline -outline-offset-1 outline-transparent">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full forced-colors:bg-[Highlight]"
            initial={{ width: "0%", backgroundColor: getColor(0) }}
            animate={{
              width: `${percentage}%`,
              backgroundColor: getColor(percentage)
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </>
    )}
  </MeterPrimitive>
)

const getColor = (percentage: number) => {
  if (percentage < 30) {
    return "var(--primary)"
  }

  if (percentage < 50) {
    return "var(--success)"
  }

  if (percentage < 70) {
    return "#eab308"
  }

  if (percentage < 80) {
    return "var(--warning)"
  }

  return "var(--danger)"
}

export { Meter }
export type { MeterProps }
