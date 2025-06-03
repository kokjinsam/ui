import * as React from "react"
import {
  Separator as Divider,
  type SeparatorProps
} from "react-aria-components"
import { cn } from "./utils"

const Separator = ({
  orientation = "horizontal",
  ...props
}: SeparatorProps) => (
  <Divider
    {...props}
    className={cn(
      "bg-border shrink-0 forced-colors:bg-[ButtonBorder]",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      props.className
    )}
  />
)

export { Separator }
export type { SeparatorProps }
