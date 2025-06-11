import * as React from "react"
import type {
  RadioGroupProps as RadioGroupPrimitiveProps,
  RadioProps as RadioPrimitiveProps,
  ValidationResult
} from "react-aria-components"
import {
  RadioGroup as RadioGroupPrimitive,
  Radio as RadioPrimitive
} from "react-aria-components"
import { Description, FieldError, Label } from "./field"
import { composeClassName, tv } from "./utils"

type RadioGroupProps = Omit<RadioGroupPrimitiveProps, "children"> & {
  label?: string
  children?: React.ReactNode
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  ref?: React.Ref<HTMLDivElement>
}

const RadioGroup = ({
  label,
  description,
  errorMessage,
  ...props
}: RadioGroupProps) => (
  <RadioGroupPrimitive
    {...props}
    className={composeClassName(props.className, "group flex flex-col gap-2")}
  >
    {label && <Label>{label}</Label>}
    <div className="flex gap-2 select-none group-data-[orientation=horizontal]:flex-wrap group-data-[orientation=horizontal]:gap-2 group-data-[orientation=vertical]:flex-col sm:group-data-[orientation=horizontal]:gap-4">
      {props.children}
    </div>
    {description && <Description>{description}</Description>}
    <FieldError>{errorMessage}</FieldError>
  </RadioGroupPrimitive>
)

const radioStyles = tv({
  base: "bg-muted size-4 shrink-0 rounded-full border transition",
  variants: {
    isSelected: {
      false: "border-input",
      true: "border-primary border-[4.5px]"
    },
    isFocused: {
      true: [
        "border-ring bg-primary/20 ring-ring/20 ring-4",
        "group-invalid:border-danger/70 group-invalid:bg-danger/20 group-invalid:ring-danger/20"
      ]
    },
    isInvalid: {
      true: "border-danger/70 bg-danger/20"
    },
    isDisabled: {
      true: "opacity-50"
    }
  }
})

type RadioProps = RadioPrimitiveProps & {
  description?: string
  label?: string
  ref?: React.Ref<HTMLLabelElement>
}

const Radio = ({ description, label, ...props }: RadioProps) => (
  <RadioPrimitive
    {...props}
    className={composeClassName(
      props.className,
      "group text-foreground disabled:text-foreground/50 flex items-center gap-2 text-sm transition forced-colors:disabled:text-[GrayText]"
    )}
  >
    {(renderProps) => (
      <div className="flex gap-2">
        <div
          className={radioStyles({
            ...renderProps,
            className: "description" in props ? "mt-1" : "mt-0.5"
          })}
        />
        <div className="flex flex-col gap-1">
          {label || description ? (
            <>
              {label && <Label>{label}</Label>}
              {description && (
                <Description className="block">{description}</Description>
              )}
            </>
          ) : (
            (props.children as React.ReactNode)
          )}
        </div>
      </div>
    )}
  </RadioPrimitive>
)

export { Radio, RadioGroup }
export type { RadioGroupProps, RadioProps }
