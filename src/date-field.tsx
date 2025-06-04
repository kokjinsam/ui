import * as React from "react"
import type {
  DateFieldProps as DateFieldPrimitiveProps,
  DateInputProps as DateInputPrimitiveProps,
  DateValue,
  ValidationResult
} from "react-aria-components"
import {
  DateField as DateFieldPrimitive,
  DateInput as DateInputPrimitive,
  DateSegment
} from "react-aria-components"
import { Description, FieldError, FieldGroup, Label } from "./field"
import { composeClassName, tv } from "./utils"

type DateFieldProps<T extends DateValue> = DateFieldPrimitiveProps<T> & {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const DateField = <T extends DateValue>({
  prefix,
  suffix,
  label,
  description,
  errorMessage,
  ...props
}: DateFieldProps<T>) => {
  return (
    <DateFieldPrimitive
      {...props}
      className={composeClassName(
        props.className,
        "group flex flex-col gap-y-1.5"
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        {prefix && typeof prefix === "string" ? (
          <span className="text-muted-foreground ml-2">{prefix}</span>
        ) : (
          prefix
        )}
        <DateInput />
        {suffix ? (
          typeof suffix === "string" ? (
            <span className="text-muted-foreground mr-2">{suffix}</span>
          ) : (
            suffix
          )
        ) : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </DateFieldPrimitive>
  )
}

const segmentStyles = tv({
  base: "type-literal:px-0 text-foreground inline shrink-0 rounded p-0.5 tracking-wider tabular-nums caret-transparent outline-0 forced-color-adjust-none sm:text-sm forced-colors:text-[ButtonText]",
  variants: {
    isPlaceholder: {
      true: "text-muted-foreground"
    },
    isDisabled: {
      true: "text-foreground/50 forced-colors:text-[GrayText]"
    },
    isFocused: {
      true: [
        "bg-accent text-accent-foreground forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "data-invalid:bg-danger data-invalid:text-danger-foreground"
      ]
    }
  }
})

type DateInputProps = Omit<DateInputPrimitiveProps, "children">

const DateInput = (props: Omit<DateInputProps, "children">) => {
  return (
    <DateInputPrimitive
      {...props}
      className={composeClassName(
        props.className,
        "text-foreground placeholder-muted-foreground bg-transparent p-2 text-base"
      )}
    >
      {(segment) => <DateSegment segment={segment} className={segmentStyles} />}
    </DateInputPrimitive>
  )
}

export { DateField, DateInput, segmentStyles }
export type { DateFieldProps }
