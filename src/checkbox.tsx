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
  ...props
}: CheckboxGroupProps) => (
  <CheckboxGroupPrimitive
    {...props}
    className={cn("flex flex-col gap-y-2", props.className)}
  >
    {(values) => (
      <>
        {label && <Label>{label}</Label>}
        {typeof props.children === "function"
          ? props.children(values)
          : props.children}
        {description && (
          <Description className="block">{description}</Description>
        )}
        <FieldError>{errorMessage}</FieldError>
      </>
    )}
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
  base: "inset-ring-fg/10 text-bg flex size-4 shrink-0 items-center justify-center rounded inset-ring transition *:data-[slot=icon]:size-3",
  variants: {
    isSelected: {
      false: "bg-muted",
      true: [
        "inset-ring-primary bg-primary text-primary-fg",
        "group-invalid:inset-ring-danger/70 group-invalid:bg-danger group-invalid:text-danger-fg"
      ]
    },
    isFocused: {
      true: [
        "inset-ring-primary ring-ring/20 ring-4",
        "group-invalid:border-danger/70 group-invalid:text-danger-fg group-invalid:ring-danger/20"
      ]
    },
    isInvalid: {
      true: "border-danger/70 bg-danger/20 text-danger-fg ring-danger/20"
    }
  }
})

type CheckboxProps = CheckboxPrimitiveProps & {
  description?: string
  label?: string
}

const Checkbox = ({ description, label, ...props }: CheckboxProps) => (
  <CheckboxPrimitive
    {...props}
    className={composeRenderProps(props.className, (className, renderProps) =>
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
            <span
              data-slot="checkbox-indicator"
              className="lucide-minus size-3.5"
            />
          ) : isSelected ? (
            <span
              data-slot="checkbox-indicator"
              className="lucide-check size-3.5"
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <>
            {label ? (
              <Label className={cn(description && "text-sm/4 font-normal")}>
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

export { Checkbox, CheckboxGroup }
export type { CheckboxGroupProps, CheckboxProps }
