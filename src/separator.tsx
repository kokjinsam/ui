import * as React from "react"
import {
  Separator as Divider,
  type SeparatorProps as DividerProps
} from "react-aria-components"
import { cn } from "./utils"

type SeparatorProps = DividerProps & {
  className?: string
}

const Separator = ({ className, ...props }: SeparatorProps) => (
  <Divider
    {...props}
    className={cn(
      "bg-border shrink-0 forced-colors:bg-[ButtonBorder]",
      props.orientation === "horizontal" ? "h-px w-full" : "w-px",
      className
    )}
  />
)

export { Separator }
export type { SeparatorProps }
