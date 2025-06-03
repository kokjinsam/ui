import * as React from "react"
import type { ColorAreaProps } from "react-aria-components"
import { ColorArea as ColorAreaPrimitive } from "react-aria-components"
import { ColorThumb } from "./color-thumb"
import { cn } from "./utils"

const ColorArea = (props: ColorAreaProps) => (
  <ColorAreaPrimitive
    data-slot="color-area"
    {...props}
    className={cn(
      "bg-muted size-56 shrink-0 rounded-md forced-colors:bg-[GrayText]",
      props.className
    )}
    style={({ defaultStyle, isDisabled }) => ({
      ...defaultStyle,
      background: isDisabled ? undefined : defaultStyle.background
    })}
  >
    <ColorThumb />
  </ColorAreaPrimitive>
)

export { ColorArea }
