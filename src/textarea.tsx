"use client"

import * as React from "react"
import type {
  TextFieldProps as TextFieldPrimitiveProps,
  ValidationResult
} from "react-aria-components"
import {
  TextAreaContext,
  TextArea as TextAreaPrimitive,
  TextField as TextFieldPrimitive,
  useContextProps
} from "react-aria-components"
import type { TextareaAutosizeProps as TextareaAutosizeImplProps } from "react-textarea-autosize"
import TextareaAutosizeImpl from "react-textarea-autosize"
import { Description, FieldError, Label } from "./field"
import { cn } from "./utils"

const textareaClasses = () =>
  cn(
    "border-line field-sizing-content max-h-96 min-h-16 w-full min-w-0 rounded-sm border px-2.5 py-1 text-base shadow-xs outline-hidden",
    "focus-within:ring-control-focus focus-within:ring-2 focus-within:outline-none",
    "disabled:opacity-50"
  )

type TextareaProps = TextFieldPrimitiveProps & {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
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
    className={cn("group flex flex-col gap-y-1.5", props.className)}
  >
    {label && <Label>{label}</Label>}
    <TextAreaPrimitive
      placeholder={placeholder}
      className={textareaClasses()}
    />
    {description && <Description>{description}</Description>}
    <FieldError>{errorMessage}</FieldError>
  </TextFieldPrimitive>
)

type TextareaAutosizePrimitiveProps = TextareaAutosizeImplProps

const TextareaAutosizePrimitive = (props: TextareaAutosizePrimitiveProps) => {
  const ref = React.useRef(null)
  const [textareaProps, _ref] = useContextProps(props, ref, TextAreaContext)

  return <TextareaAutosizeImpl ref={ref} {...textareaProps} {...props} />
}

type TextareaAutosizeProps = TextFieldPrimitiveProps &
  TextareaAutosizePrimitiveProps & {
    label?: string
    placeholder?: string
    description?: string
    errorMessage?: string | ((validation: ValidationResult) => string)
  }

const TextareaAutosize = ({
  placeholder,
  label,
  description,
  errorMessage,
  ...props
}: TextareaAutosizeProps) => {
  const { isDisabled, isReadOnly, isRequired, isInvalid, ...textareaProps } =
    props

  return (
    <TextFieldPrimitive
      {...props}
      className={cn("group flex flex-col gap-y-1.5", props.className)}
    >
      {label && <Label>{label}</Label>}
      <TextareaAutosizePrimitive
        {...textareaProps}
        placeholder={placeholder}
        disabled={props.isDisabled}
        required={props.isRequired}
        readOnly={props.isReadOnly}
        className={textareaClasses()}
      />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TextFieldPrimitive>
  )
}

export { Textarea, TextareaAutosize }
export type { TextareaAutosizeProps, TextareaProps }
