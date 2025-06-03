import * as React from "react"
import type { VariantProps } from "./utils"
import { tv } from "./utils"

const badgeIntents = {
  primary: [
    "[--badge-primary:color-mix(in_oklab,var(--color-primary)_10%,white_90%)] [--badge-primary-foreground:color-mix(in_oklab,var(--color-primary)_60%,white_40%)]",
    "bg-(--badge-primary) text-primary",
    "group-hover:bg-[color-mix(in_oklab,var(--color-primary)_15%,white_85%)]",
    "dark:bg-primary/15 dark:text-(--badge-primary-foreground)",
    "dark:group-hover:bg-primary/25"
  ],
  secondary: [
    "bg-secondary group-hover:bg-muted dark:bg-secondary dark:group-hover:bg-muted text-secondary-foreground"
  ],
  success: [
    "bg-emerald-500/15 text-emerald-700 group-hover:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-hover:bg-emerald-500/20"
  ],
  info: "bg-sky-500/15 text-sky-700 group-hover:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-hover:bg-sky-500/20",
  warning:
    "bg-amber-400/20 text-amber-700 group-hover:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-hover:bg-amber-400/15",
  danger:
    "bg-red-500/15 text-red-700 group-hover:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-hover:bg-red-500/20"
}

const badgeShapes = {
  square: "rounded-md px-1.5",
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

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeStyles> & {
    className?: string
    children: React.ReactNode
  }

const Badge = ({ intent, shape, ...props }: BadgeProps) => (
  <span
    {...props}
    className={badgeStyles({ intent, shape, className: props.className })}
  />
)

export { Badge, badgeIntents, badgeShapes, badgeStyles }
export type { BadgeProps }
