"use client"

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
import { cn } from "./utils"

type RadioGroupProps = RadioGroupPrimitiveProps & {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

const RadioGroup = ({
  label,
  description,
  errorMessage,
  ...props
}: RadioGroupProps) => (
  <RadioGroupPrimitive
    {...props}
    className={cn("group flex flex-col gap-2", props.className)}
  >
    {(values) => (
      <>
        {label && <Label>{label}</Label>}
        <div className="flex gap-2 select-none group-data-[orientation=horizontal]:flex-wrap group-data-[orientation=horizontal]:gap-2 group-data-[orientation=vertical]:flex-col sm:group-data-[orientation=horizontal]:gap-4">
          {typeof props.children === "function"
            ? props.children(values)
            : props.children}
        </div>
        {description && <Description>{description}</Description>}
        <FieldError>{errorMessage}</FieldError>
      </>
    )}
  </RadioGroupPrimitive>
)

type RadioProps = RadioPrimitiveProps & {
  description?: string
  label?: string
}

const Radio = ({ description, label, ...props }: RadioProps) => (
  <RadioPrimitive
    {...props}
    className={cn(
      "group text-normal flex items-center gap-2 text-base transition",
      "data-[disabled]:opacity-50",
      "forced-colors:disabled:text-[GrayText]",
      props.className
    )}
  >
    <div className="flex gap-2">
      <div
        className={cn(
          "bg-control border-line size-4 shrink-0 rounded-full border transition",
          "description" in props ? "mt-1" : "mt-0.5",
          "group-data-[selected]:border-interactive group-data-[selected]:border-4",
          "group-data-[focused]:border-control-focus group-data-[focused]:ring-control-focus group-data-[focused]:ring-2"
        )}
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
  </RadioPrimitive>
)

export { Radio, RadioGroup }
export type { RadioGroupProps, RadioProps }
