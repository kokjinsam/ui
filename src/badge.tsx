"use client"

import * as React from "react"
import type { VariantProps } from "./utils"
import { tv } from "./utils"

const badgeIntents = {
  // TODO: update color for primary
  primary: "bg-ui-primary text-normal group-hover:bg-ui-secondary",
  success:
    "bg-modifier-success text-on-accent group-hover:bg-modifier-success-hover",
  info: "bg-modifier-info text-on-accent group-hover:bg-modifier-info-hover",
  warning:
    "bg-modifier-warning text-on-accent group-hover:bg-modifier-warning-hover",
  danger:
    "bg-modifier-danger text-on-accent group-hover:bg-modifier-danger-hover"
}
const badgeShapes = {
  square: "rounded-sm px-1.5",
  circle: "px-2 rounded-full"
}

const badgeStyles = tv({
  base: [
    "text-ui-sm/5 inline-flex items-center gap-x-1.5 py-0.5 font-medium",
    "**:data-[slot=icon]:size-3",
    "forced-colors:outline"
  ],
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
