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

const CheckboxGroup = ({
  label,
  description,
  errorMessage,
  children,
  ...props
}: CheckboxGroupProps) => (
  <CheckboxGroupPrimitive
    {...props}
    className={cn("flex flex-col gap-y-2", props.className)}
  >
    {label && <Label>{label}</Label>}
    {children as React.ReactNode}
    {description && <Description className="block">{description}</Description>}
    <FieldError>{errorMessage}</FieldError>
  </CheckboxGroupPrimitive>
)

const checkboxStyles = tv({
  base: "group flex items-center gap-2 text-sm transition",
  variants: {
    isDisabled: {
      true: "opacity-50"
    }
  }
})

const boxStyles = tv({
  base: [
    "inset-ring-modifier-border text-normal flex size-4 shrink-0 items-center justify-center rounded-sm inset-ring",
    "*:data-[slot=icon]:size-3 *:data-[slot=icon]:align-middle"
  ],
  variants: {
    isSelected: {
      true: "border-interactive-accent bg-interactive-accent text-on-accent"
    },
    isFocused: {
      true: "border-primary ring-interactive-focus ring-2"
    }
  }
})

type CheckboxProps = CheckboxPrimitiveProps & {
  description?: string
  label?: string
}

const Checkbox = ({
  description,
  label,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <CheckboxPrimitive
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className })
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <div
          className={cn(
            "flex gap-x-2",
            description ? "items-start" : "items-center"
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
              <span data-slot="icon" className="lucide-check" />
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <>
              {label ? (
                <Label
                  className={cn(description && "text-ui-base/5 font-normal")}
                >
                  {label}
                </Label>
              ) : (
                (props.children as React.ReactNode)
              )}
              {description && <Description>{description}</Description>}
            </>
          </div>
        </div>
      )}
    </CheckboxPrimitive>
  )
}

export { Checkbox, CheckboxGroup }
export type { CheckboxGroupProps, CheckboxProps }
