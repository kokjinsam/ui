"use client"

import * as React from "react"
import type {
  ListBoxProps,
  PopoverProps,
  SelectProps as SelectPrimitiveProps,
  ValidationResult
} from "react-aria-components"
import {
  Button,
  Select as SelectPrimitive,
  SelectValue,
  composeRenderProps
} from "react-aria-components"
import {
  DropdownItem,
  DropdownItemDetails,
  DropdownLabel,
  DropdownSection,
  DropdownSeparator
} from "./dropdown"
import { Description, FieldError, Label } from "./field"
import { ListBox } from "./list-box"
import type { PopoverContentProps } from "./popover"
import { PopoverContent } from "./popover"
import { cn, tv } from "./utils"

const selectTriggerStyles = tv({
  base: [
    "text-ui-base text-normal border-ui-line h-interactive-lg flex w-full cursor-default items-center gap-4 gap-x-2 rounded-lg border px-2.5 py-1 text-start transition",
    "group-data-[open]:ring-interactive-focus group-data-[open]:ring-2",
    "group-data-[disabled]:opacity-50",
    "forced-colors:group-invalid:border-[Mark]",
    "**:data-[slot=icon]:size-4"
  ],
  variants: {
    isDisabled: {
      true: [
        "opacity-50",
        "forced-colors:border-[GrayText] forced-colors:text-[GrayText]"
      ]
    }
  }
})

type SelectProps<T extends object> = SelectPrimitiveProps<T> & {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  items?: Iterable<T>
}

const Select = <T extends object>({
  label,
  description,
  errorMessage,
  ...props
}: SelectProps<T>) => (
  <SelectPrimitive
    {...props}
    className={cn("group flex w-full flex-col gap-y-1.5", props.className)}
  >
    {(values) => (
      <>
        {label && <Label>{label}</Label>}
        {typeof props.children === "function"
          ? props.children(values)
          : props.children}
        {description && <Description>{description}</Description>}
        <FieldError>{errorMessage}</FieldError>
      </>
    )}
  </SelectPrimitive>
)

type SelectListProps<T extends object> = Omit<
  ListBoxProps<T>,
  "layout" | "orientation"
> &
  Pick<PopoverProps, "placement"> & {
    items?: Iterable<T>
    classNames?: {
      popover?: PopoverContentProps["className"]
    }
  }

const SelectList = <T extends object>({
  items,
  classNames,
  ...props
}: SelectListProps<T>) => (
  <PopoverContent
    showArrow={false}
    placement={props.placement}
    className={classNames?.popover}
  >
    <ListBox
      layout="stack"
      orientation="vertical"
      items={items}
      {...props}
      className={cn("border-0 shadow-none", props.className)}
    />
  </PopoverContent>
)

type SelectTriggerProps = React.ComponentProps<typeof Button> & {
  prefix?: React.ReactNode
  className?: string
}

const SelectTrigger = (props: SelectTriggerProps) => (
  <Button
    className={composeRenderProps(props.className, (className, renderProps) =>
      selectTriggerStyles({
        ...renderProps,
        className
      })
    )}
  >
    {props.prefix && <span className="-mr-1">{props.prefix}</span>}
    <SelectValue
      data-slot="select-value"
      className={cn([
        "data-placeholder:text-muted",
        "text-ui-base grid flex-1 grid-cols-[auto_1fr] items-center",
        "*:data-[slot=avatar]:*:-mx-0.5 *:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:*:mr-2 *:data-[slot=avatar]:mr-2",
        "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:mr-2",
        "[&_[slot=description]]:hidden"
      ])}
    />
    <span
      data-slot="icon"
      aria-hidden
      className={cn([
        "lucide-chevron-down text-muted size-4 shrink-0 duration-300",
        "group-data-[open]:text-normal group-data-[open]:rotate-180",
        "group-data-[disabled]:opacity-50",
        "forced-colors:text-[ButtonText] forced-colors:group-data-[disabled]:text-[GrayText]"
      ])}
    />
  </Button>
)

const SelectSection = DropdownSection
const SelectSeparator = DropdownSeparator
const SelectLabel = DropdownLabel
const SelectOptionDetails = DropdownItemDetails
const SelectOption = DropdownItem

Select.OptionDetails = SelectOptionDetails
Select.Option = SelectOption
Select.Label = SelectLabel
Select.Separator = SelectSeparator
Select.Section = SelectSection
Select.Trigger = SelectTrigger
Select.List = SelectList

export { Select }
export type { SelectListProps, SelectProps, SelectTriggerProps }
