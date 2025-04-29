"use client"

import * as React from "react"
import type {
  ComboBoxProps as ComboboxPrimitiveProps,
  InputProps,
  ListBoxProps,
  ValidationResult
} from "react-aria-components"
import {
  Button as ButtonPrimitive,
  ComboBoxContext,
  ComboBoxStateContext,
  ComboBox as ComboboxPrimitive,
  useSlottedContext
} from "react-aria-components"
import { Button } from "./button"
import { DropdownItem, DropdownLabel, DropdownSection } from "./dropdown"
import { Description, FieldError, FieldGroup, Input, Label } from "./field"
import { ListBox } from "./list-box"
import type { PopoverContentProps } from "./popover"
import { PopoverContent } from "./popover"
import { cn } from "./utils"

type ComboBoxProps<T extends object> = Omit<
  ComboboxPrimitiveProps<T>,
  "children"
> & {
  label?: string
  placeholder?: string
  description?: string | null
  errorMessage?: string | ((validation: ValidationResult) => string)
  children: React.ReactNode
}

const ComboBox = <T extends object>({
  label,
  description,
  errorMessage,
  ...props
}: ComboBoxProps<T>) => {
  return (
    <ComboboxPrimitive
      {...props}
      className={cn("group flex w-full flex-col gap-y-1.5", props.className)}
    >
      {label && <Label>{label}</Label>}
      {props.children}
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </ComboboxPrimitive>
  )
}

type ComboBoxListProps<T extends object> = Omit<
  ListBoxProps<T>,
  "layout" | "orientation"
> &
  Pick<PopoverContentProps, "placement"> & {
    classNames?: {
      popover?: PopoverContentProps["className"]
    }
  }

const ComboBoxList = <T extends object>({
  items,
  classNames,
  ...props
}: ComboBoxListProps<T>) => (
  <PopoverContent
    showArrow={false}
    isNonModal
    className={cn("sm:min-w-(--trigger-width)", classNames?.popover)}
    placement={props.placement}
  >
    <ListBox
      className={cn("border-0 shadow-none", props.className)}
      layout="stack"
      orientation="vertical"
      items={items}
      {...props}
    >
      {props.children}
    </ListBox>
  </PopoverContent>
)

const ComboBoxInput = (props: InputProps) => {
  const context = useSlottedContext(ComboBoxContext)!

  return (
    <FieldGroup className="relative pl-0">
      <Input {...props} placeholder={props?.placeholder} />
      <Button
        size="square-md"
        intent="plain"
        className={cn([
          "h-7 w-8 rounded outline-offset-0",
          "hover:bg-transparent",
          "active:bg-transparent",
          "data-[pressed]:bg-transparent",
          "**:data-[slot=icon]:data-[pressed]:text-normal **:data-[slot=icon]:text-muted **:data-[slot=icon]:hover:text-normal"
        ])}
      >
        {!context?.inputValue && (
          <span
            className={cn([
              "lucide-chevron-down size-4 shrink-0 transition duration-200",
              "group-data-[open]:text-normal group-data-[open]:rotate-180"
            ])}
          />
        )}
      </Button>
      {context?.inputValue && <ComboBoxClearButton />}
    </FieldGroup>
  )
}

const ComboBoxClearButton = () => {
  const state = React.use(ComboBoxStateContext)

  return (
    <ButtonPrimitive
      className={cn([
        "text-muted absolute inset-y-0 right-0 flex items-center pr-2",
        "hover:text-normal",
        "focus:outline-hidden"
      ])}
      slot={null}
      aria-label="Clear"
      onPress={() => {
        state?.setSelectedKey(null)
        state?.open()
      }}
    >
      <span className="lucide-x animate-in size-4" />
    </ButtonPrimitive>
  )
}

const ComboBoxOption = DropdownItem
const ComboBoxLabel = DropdownLabel
const ComboBoxSection = DropdownSection

ComboBox.Input = ComboBoxInput
ComboBox.List = ComboBoxList
ComboBox.Option = ComboBoxOption
ComboBox.Label = ComboBoxLabel
ComboBox.Section = ComboBoxSection

export { ComboBox }
export type { ComboBoxListProps, ComboBoxProps }
