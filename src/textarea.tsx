import * as React from "react"
import type {
  TextFieldProps as TextFieldPrimitiveProps,
  ValidationResult
} from "react-aria-components"
import {
  TextArea as TextAreaPrimitive,
  TextField as TextFieldPrimitive,
  composeRenderProps
} from "react-aria-components"
import { Description, FieldError, Label } from "./field"
import { focusStyles } from "./primitive"
import { composeClassName, tv } from "./utils"

const textareaStyles = tv({
  extend: focusStyles,
  base: "border-input placeholder-muted-foreground field-sizing-content max-h-96 min-h-16 w-full min-w-0 rounded-lg border px-2.5 py-2 text-base shadow-xs outline-hidden transition duration-200 disabled:opacity-50 sm:text-sm"
})

type TextareaProps = Omit<TextFieldPrimitiveProps, "className"> & {
  autoSize?: boolean
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  className?: string
}

const Textarea = ({
  placeholder,
  label,
  description,
  errorMessage,
  ...props
}: TextareaProps) => (
  <TextFieldPrimitive
    {...props}
    className={composeClassName(
      props.className,
      "group flex flex-col gap-y-1.5"
    )}
  >
    {label && <Label>{label}</Label>}
    <TextAreaPrimitive
      placeholder={placeholder}
      className={composeRenderProps(props.className, (className, renderProps) =>
        textareaStyles({
          ...renderProps,
          className
        })
      )}
    />
    {description && <Description>{description}</Description>}
    <FieldError>{errorMessage}</FieldError>
  </TextFieldPrimitive>
)

export { Textarea }
export type { TextareaProps }
