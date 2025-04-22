import * as React from "react"
import type { VariantProps } from "./utils"
import { tv } from "./utils"

const badgeIntents = {
  primary: "bg-primary-alt text-normal group-hover:bg-modifier-hover",
  success:
    "bg-modifier-success/20 text-success group-hover:bg-modifier-success-hover/25",
  info: "bg-modifier-info/20 text-info group-hover:bg-modifier-info-hover/25",
  warning:
    "bg-modifier-warning/20 text-warning group-hover:bg-modifier-warning-hover/25",
  danger:
    "bg-modifier-danger/20 text-danger group-hover:bg-modifier-danger-hover/25"
}
const badgeShapes = {
  square: "rounded-sm px-1.5",
  circle: "px-2 rounded-full"
}

const badgeStyles = tv({
  base: "inline-flex items-center gap-x-1.5 py-0.5 text-xs/5 font-medium **:data-[slot=icon]:size-3 forced-colors:outline",
  variants: {
    intent: { ...badgeIntents },
    shape: { ...badgeShapes }
  },
  defaultVariants: {
    intent: "primary",
    shape: "circle"
  }
})

type BadgeProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeStyles>

const Badge = ({ intent, shape, ...props }: BadgeProps) => {
  return (
    <span
      {...props}
      className={badgeStyles({ intent, shape, className: props.className })}
    />
  )
}

export { Badge, badgeIntents, badgeShapes, badgeStyles }
export type { BadgeProps }
