import * as React from "react"
import type {
  ButtonProps,
  NumberFieldProps as NumberFieldPrimitiveProps,
  ValidationResult
} from "react-aria-components"
import {
  Button,
  NumberField as NumberFieldPrimitive
} from "react-aria-components"
import { Description, FieldError, FieldGroup, Input, Label } from "./field"
import { useMediaQuery } from "./hooks"
import { cn, composeClassName, tv } from "./utils"

const fieldBorderStyles = tv({
  base: "group-focus:border-primary/70 forced-colors:border-[Highlight]",
  variants: {
    isInvalid: {
      true: "group-focus:border-danger/70 forced-colors:border-[Mark]"
    },
    isDisabled: {
      true: "group-focus:border-input/70"
    }
  }
})

type NumberFieldProps = NumberFieldPrimitiveProps & {
  label?: string
  description?: string
  placeholder?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

const NumberField = ({
  label,
  placeholder,
  description,
  errorMessage,
  ...props
}: NumberFieldProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <NumberFieldPrimitive
      {...props}
      className={composeClassName(
        props.className,
        "group flex flex-col gap-y-1.5"
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup
        className={cn(
          "overflow-hidden",
          isMobile &&
            "**:[button]:h-10 **:[button]:rounded-none **:[button]:px-2"
        )}
      >
        {(renderProps) => (
          <>
            {isMobile ? (
              <StepperButton className="border-r" slot="decrement" />
            ) : null}
            <Input
              className="px-13 tabular-nums md:px-2.5"
              placeholder={placeholder}
            />
            {!isMobile ? (
              <div
                className={fieldBorderStyles({
                  ...renderProps,
                  className: "grid h-10 place-content-center sm:border-s"
                })}
              >
                <div className="flex h-full flex-col">
                  <StepperButton
                    slot="increment"
                    emblemType="chevron"
                    className="h-5 px-1"
                  />
                  <div
                    className={fieldBorderStyles({
                      ...renderProps,
                      className: "border-input border-b"
                    })}
                  />
                  <StepperButton
                    slot="decrement"
                    emblemType="chevron"
                    className="h-5 px-1"
                  />
                </div>
              </div>
            ) : (
              <StepperButton className="border-l" slot="increment" />
            )}
          </>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </NumberFieldPrimitive>
  )
}

type StepperButtonProps = ButtonProps & {
  slot: "increment" | "decrement"
  emblemType?: "chevron" | "default"
  className?: string
}

const StepperButton = ({
  slot,
  emblemType = "default",
  ...props
}: StepperButtonProps) => {
  const icon =
    emblemType === "chevron" ? (
      slot === "increment" ? (
        <span data-slot="icon" className="lucide-chevron-up size-5" />
      ) : (
        <span data-slot="icon" className="lucide-chevron-down size-5" />
      )
    ) : slot === "increment" ? (
      <span data-slot="icon" className="lucide-plus" />
    ) : (
      <span data-slot="icon" className="lucide-minus" />
    )

  return (
    <Button
      slot={slot}
      {...props}
      className={composeClassName(
        props.className,
        "pressed:text-primary-foreground text-muted-foreground group-disabled:bg-secondary/70 sm:pressed:bg-primary h-10 cursor-default forced-colors:group-disabled:text-[GrayText]"
      )}
    >
      {icon}
    </Button>
  )
}

export { NumberField }
export type { NumberFieldProps }
