import * as React from "react"
import type {
  FieldErrorProps as FieldErrorPrimitiveProps,
  GroupProps,
  InputProps as InputPrimitiveProps,
  LabelProps,
  TextFieldProps as TextFieldPrimitiveProps,
  TextProps,
  ValidationResult
} from "react-aria-components"
import {
  FieldError as FieldErrorPrimitive,
  Group,
  Input as InputPrimitive,
  Label as LabelPrimitive,
  Text,
  composeRenderProps
} from "react-aria-components"
import { focusStyles } from "./primitive"
import { composeClassName, tv } from "./utils"

type FieldProps = {
  "label"?: string
  "placeholder"?: string
  "description"?: string
  "errorMessage"?: string | ((validation: ValidationResult) => string)
  "aria-label"?: TextFieldPrimitiveProps["aria-label"]
  "aria-labelledby"?: TextFieldPrimitiveProps["aria-labelledby"]
}

const fieldStyles = tv({
  slots: {
    description: "text-muted-foreground text-sm/6 text-pretty",
    label:
      "text-secondary-foreground w-fit cursor-default text-sm/6 font-medium",
    fieldError: "text-danger text-sm/6 forced-colors:text-[Mark]"
  }
})

const { description, label, fieldError } = fieldStyles()

const Label = (props: LabelProps) => (
  <LabelPrimitive
    {...props}
    className={label({ className: props.className })}
  />
)

type DescriptionProps = TextProps & {
  isWarning?: boolean
}

const Description = (props: DescriptionProps) => {
  const isWarning = props.isWarning ?? false

  return (
    <Text
      slot="description"
      {...props}
      className={description({
        className: isWarning ? "text-warning" : props.className
      })}
    />
  )
}

type FieldErrorProps = FieldErrorPrimitiveProps

const FieldError = (props: FieldErrorProps) => (
  <FieldErrorPrimitive
    {...props}
    className={composeClassName(props.className, fieldError())}
  />
)

const fieldGroupStyles = tv({
  base: [
    "[--gutter-x:--spacing(2.5)] [--padding-inset:--spacing(6)]",
    "group border-input flex h-10 items-center overflow-hidden rounded-lg border shadow-xs transition duration-200 ease-out",
    "group-invalid:focus-within:border-danger group-invalid:focus-within:ring-danger/20 relative focus-within:ring-4",
    "[&>[role=progressbar]:first-child]:ml-(--gutter-x) [&>[role=progressbar]:last-child]:mr-(--gutter-x)",
    "*:data-[slot=icon]:z-10 **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0 **:[button]:shrink-0",
    "[&>button:has([data-slot=icon])]:absolute [&>button:has([data-slot=icon]):first-child]:left-0 [&>button:has([data-slot=icon]):last-child]:right-0",
    "*:data-[slot=icon]:text-muted-foreground *:data-[slot=icon]:pointer-events-none *:data-[slot=icon]:absolute *:data-[slot=icon]:top-[calc(var(--spacing)*2.7)]",
    "[&>[data-slot=icon]:first-child]:left-(--gutter-x) [&>[data-slot=icon]:last-child]:right-(--gutter-x)",
    "[&:has([data-slot=icon]+input)]:pl-(--padding-inset) [&:has(input+[data-slot=icon])]:pr-(--padding-inset)",
    "[&:has([data-slot=icon]+[role=group])]:pl-(--padding-inset) [&:has([role=group]+[data-slot=icon])]:pr-(--padding-inset)",
    "has-[[data-slot=icon]:last-child]:[&_input]:pr-[calc(var(--padding-inset)+1)]",
    "*:[button]:h-8 *:[button]:rounded-[calc(var(--radius-sm)-1px)] *:[button]:px-(--gutter-x)",
    "[&>button:first-child]:ml-[calc(var(--spacing)*0.7)] [&>button:last-child]:mr-[calc(var(--spacing)*0.7)]"
  ],
  variants: {
    isFocusWithin: focusStyles.variants.isFocused,
    isInvalid: focusStyles.variants.isInvalid,
    isDisabled: {
      true: "opacity-50 forced-colors:border-[GrayText]"
    }
  }
})

type FieldGroupProps = GroupProps & {
  ref?: React.RefObject<HTMLDivElement>
}

const FieldGroup = (props: FieldGroupProps) => (
  <Group
    {...props}
    className={composeRenderProps(props.className, (className, renderProps) =>
      fieldGroupStyles({
        ...renderProps,
        className
      })
    )}
  />
)

type InputProps = InputPrimitiveProps & {
  ref?: React.RefObject<HTMLInputElement>
}

const Input = (props: InputProps) => (
  <InputPrimitive
    {...props}
    className={composeClassName(
      props.className,
      "text-foreground placeholder-muted-foreground w-full min-w-0 bg-transparent px-(--gutter-x) py-2 text-base outline-hidden focus:outline-hidden sm:text-sm/6 [&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden"
    )}
  />
)

export { Description, FieldError, FieldGroup, Input, Label, fieldStyles }
export type { DescriptionProps, FieldErrorProps, FieldProps, InputProps }
