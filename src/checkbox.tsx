"use client"

import * as React from "react"
import type {
  CheckboxGroupProps as CheckboxGroupPrimitiveProps,
  CheckboxProps as CheckboxPrimitiveProps,
  ValidationResult
} from "react-aria-components"
import {
  CheckboxGroup as CheckboxGroupPrimitive,
  Checkbox as CheckboxPrimitive
} from "react-aria-components"
import { Description, FieldError, Label } from "./field"
import { cn } from "./utils"

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

type CheckboxProps = CheckboxPrimitiveProps & {
  description?: string
  label?: string
}

const Checkbox = ({ description, label, ...props }: CheckboxProps) => (
  <CheckboxPrimitive
    {...props}
    className={cn(
      "group flex items-center gap-2 text-sm transition",
      "data-[disabled]:opacity-50",
      props.className
    )}
  >
    {({ isSelected, isIndeterminate }) => (
      <div
        className={cn(
          "flex gap-x-2",
          description ? "items-start" : "items-center"
        )}
      >
        <div
          className={cn(
            "text-normal mt-[3px] flex size-4 shrink-0 items-center justify-center rounded-sm",
            "*:data-[slot=icon]:size-3 *:data-[slot=icon]:align-middle",
            "bg-control inset-ring-line inset-ring",
            "group-data-[selected]:inset-ring-interactive group-data-[selected]:bg-interactive group-data-[selected]:text-on-accent",
            "group-data-[indeterminate]:inset-ring-interactive group-data-[indeterminate]:bg-interactive group-data-[indeterminate]:text-on-accent",
            "group-data-[focused]:border-control-focus group-data-[focused]:ring-control-focus group-data-[focused]:ring-2"
          )}
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
              <Label className={cn(description && "text-base/5 font-normal")}>
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
