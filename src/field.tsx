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
import { cn, tv } from "./utils"

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
    description: "text-muted text-ui-base text-pretty",
    label: "text-normal text-ui-base w-fit cursor-default font-medium",
    fieldError: "text-error text-ui-base"
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
  ref?: React.RefObject<HTMLElement>
}

const Description = (props: DescriptionProps) => {
  const isWarning = props.isWarning ?? false

  return (
    <Text
      {...props}
      slot="description"
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
    className={cn(props.className, fieldError())}
  />
)

const fieldGroupStyles = tv({
  base: [
    "group border-normal h-interactive-lg relative isolate flex items-center overflow-hidden rounded-sm border shadow-xs transition duration-200 ease-out",
    "[&>[role=progressbar]:first-child]:ml-2.5 [&>[role=progressbar]:last-child]:mr-2.5",
    "**:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0 **:[button]:shrink-0",
    "[&>button:has([data-slot=icon])]:absolute [&>button:has([data-slot=icon]):first-child]:left-0 [&>button:has([data-slot=icon]):last-child]:right-0",
    "*:data-[slot=icon]:text-muted *:data-[slot=icon]:pointer-events-none *:data-[slot=icon]:absolute *:data-[slot=icon]:top-[calc(var(--spacing)*1.75)] *:data-[slot=icon]:z-10 *:data-[slot=icon]:size-4",
    "[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-2.5",
    "[&:has([data-slot=icon]+input)]:pl-6 [&:has(input+[data-slot=icon])]:pr-6",
    "[&:has([data-slot=icon]+[role=group])]:pl-6 [&:has([role=group]+[data-slot=icon])]:pr-6",
    "has-[[data-slot=icon]:last-child]:[&_input]:pr-7",
    "*:[button]:h-8 *:[button]:rounded-[calc(var(--radius-sm)-1px)] *:[button]:px-2.5",
    "[&>button:first-child]:ml-[calc(var(--spacing)*0.7)] [&>button:last-child]:mr-[calc(var(--spacing)*0.7)]"
  ],
  variants: {
    isDisabled: {
      true: "opacity-50 forced-colors:border-[GrayText]"
    }
  }
})

type FieldGroupProps = GroupProps

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

type InputProps = InputPrimitiveProps

const Input = (props: InputProps) => (
  <InputPrimitive
    {...props}
    className={cn(
      "text-normal text-ui-base placeholder-muted w-full min-w-0 border-none bg-transparent px-2.5 py-1 outline-hidden",
      "[&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden",
      "focus:ring-0 focus:outline-hidden",
      props.className
    )}
  />
)

export { Description, FieldError, FieldGroup, Input, Label, fieldStyles }
export type { FieldErrorProps, FieldProps, InputProps }
