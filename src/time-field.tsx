import * as React from "react"
import type {
  TimeFieldProps as TimeFieldPrimitiveProps,
  TimeValue,
  ValidationResult
} from "react-aria-components"
import { TimeField as TimeFieldPrimitive } from "react-aria-components"
import { DateInput } from "./date-field"
import { Description, FieldError, FieldGroup, Label } from "./field"
import { composeClassName } from "./utils"

type TimeFieldProps<T extends TimeValue> = TimeFieldPrimitiveProps<T> & {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const TimeField = <T extends TimeValue>({
  prefix,
  suffix,
  label,
  description,
  errorMessage,
  ...props
}: TimeFieldProps<T>) => (
  <TimeFieldPrimitive
    {...props}
    className={composeClassName(
      props.className,
      "group/time-field flex flex-col gap-y-1"
    )}
  >
    {label && <Label>{label}</Label>}
    <FieldGroup>
      {prefix && typeof prefix === "string" ? (
        <span className="text-muted-foreground ml-2">{prefix}</span>
      ) : (
        prefix
      )}
      <DateInput className="flex w-fit min-w-28 justify-around p-2 whitespace-nowrap sm:text-sm" />
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
  </TimeFieldPrimitive>
)

export { TimeField }
export type { TimeFieldProps }
