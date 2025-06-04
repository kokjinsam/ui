import * as React from "react"
import type { FileTriggerProps as FileTriggerPrimitiveProps } from "react-aria-components"
import { FileTrigger as FileTriggerPrimitive } from "react-aria-components"
import { Button, type buttonStyles } from "./button"
import type { VariantProps } from "./utils"

type FileTriggerProps = FileTriggerPrimitiveProps &
  VariantProps<typeof buttonStyles> & {
    withIcon?: boolean
    isDisabled?: boolean
    className?: string
  }

const FileTrigger = ({
  intent = "outline",
  size = "md",
  shape = "square",
  withIcon = true,
  className,
  ...props
}: FileTriggerProps) => (
  <FileTriggerPrimitive {...props}>
    <Button
      className={className}
      isDisabled={props.isDisabled}
      intent={intent}
      size={size}
      shape={shape}
    >
      {withIcon &&
        (props.defaultCamera ? (
          <span data-slot="icon" className="lucide-camera" />
        ) : props.acceptDirectory ? (
          <span data-slot="icon" className="lucide-folder" />
        ) : (
          <span data-slot="icon" className="lucide-paperclip" />
        ))}
      {props.children ? (
        props.children
      ) : (
        <>
          {props.allowsMultiple
            ? "Browse a files"
            : props.acceptDirectory
              ? "Browse"
              : "Browse a file"}
          ...
        </>
      )}
    </Button>
  </FileTriggerPrimitive>
)

export { FileTrigger }
export type { FileTriggerProps }
