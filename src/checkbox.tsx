import * as React from "react"
import type {
  CheckboxGroupProps as CheckboxGroupPrimitiveProps,
  CheckboxProps as CheckboxPrimitiveProps,
  ValidationResult
} from "react-aria-components"
import {
  CheckboxGroup as CheckboxGroupPrimitive,
  Checkbox as CheckboxPrimitive,
  composeRenderProps
} from "react-aria-components"
import { Description, FieldError, Label } from "./field"
import { cn, tv } from "./utils"

type CheckboxGroupProps = CheckboxGroupPrimitiveProps & {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

const CheckboxGroup = (props: CheckboxGroupProps) => {
  return (
    <CheckboxGroupPrimitive
      {...props}
      className={cn("flex flex-col gap-y-2", props.className)}
    >
      {props.label && <Label>{props.label}</Label>}
      {props.children as React.ReactNode}
      {props.description && (
        <Description className="block">{props.description}</Description>
      )}
      <FieldError>{props.errorMessage}</FieldError>
    </CheckboxGroupPrimitive>
  )
}

const checkboxStyles = tv({
  slots: {
    container: "group text-ui-base flex items-center gap-2",
    box: [
      "ring-modifier-border text-normal flex size-4 shrink-0 items-center justify-center rounded-sm ring",
      "*:data-[slot=icon]:size-3"
    ]
  },
  variants: {
    isSelected: {
      true: {
        box: "bg-interactive-accent text-on-accent"
      }
    },
    isDisabled: {
      true: {
        container: "opacity-50"
      }
    }
  }
})

type CheckboxProps = CheckboxPrimitiveProps & {
  description?: string
  label?: string
}

const Checkbox = (props: CheckboxProps) => {
  const { container: containerStyles, box: boxStyles } = checkboxStyles({
    isDisabled: props.isDisabled,
    isSelected: props.isSelected
  })

  return (
    <CheckboxPrimitive
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        containerStyles({ ...renderProps, className })
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <div
          className={cn(
            "flex gap-x-2",
            props.description ? "items-start" : "items-center"
          )}
        >
          <div
            className={boxStyles({
              ...renderProps,
              isSelected: isSelected || isIndeterminate
            })}
          >
            {isIndeterminate ? (
              <span data-slot="icon" className="lucide-minus" />
            ) : isSelected ? (
              <span data-slot="icon" className="lucide-check-medium" />
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <>
              {props.label ? (
                <Label
                  className={cn(
                    props.description && "text-ui-base/4 font-normal"
                  )}
                >
                  {props.label}
                </Label>
              ) : (
                (props.children as React.ReactNode)
              )}
              {props.description && (
                <Description>{props.description}</Description>
              )}
            </>
          </div>
        </div>
      )}
    </CheckboxPrimitive>
  )
}

export { Checkbox, CheckboxGroup }
export type { CheckboxGroupProps, CheckboxProps }
