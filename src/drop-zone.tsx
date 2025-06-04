import * as React from "react"
import type { DropZoneProps as DropZonePrimitiveProps } from "react-aria-components"
import {
  DropZone as DropPrimitiveZone,
  composeRenderProps
} from "react-aria-components"
import { focusStyles } from "./primitive"
import { tv } from "./utils"

const dropZoneStyles = tv({
  extend: focusStyles,
  base: "group flex max-h-[200px] max-w-xl flex-col items-center justify-center gap-2 rounded-md border border-dashed p-6 text-sm has-[slot=description]:text-center",
  variants: {
    isDropTarget: {
      true: "border-primary bg-primary/10 ring-ring/20 [&_.text-muted-foreground]:text-primary-foreground border-solid ring-4"
    }
  }
})

type DropZoneProps = DropZonePrimitiveProps

const DropZone = (props: DropZoneProps) => (
  <DropPrimitiveZone
    {...props}
    className={composeRenderProps(props.className, (className, renderProps) =>
      dropZoneStyles({ ...renderProps, className })
    )}
  />
)

export { DropZone }
export type { DropZoneProps }
