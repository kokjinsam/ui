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
  DropdownDescription,
  DropdownItem,
  DropdownLabel,
  DropdownSection,
  DropdownSeparator
} from "./dropdown"
import { Description, FieldError, Label } from "./field"
import { ListBox } from "./list-box"
import type { PopoverContentProps } from "./popover"
import { PopoverContent } from "./popover"
import { focusStyles } from "./primitive"
import { composeClassName, tv } from "./utils"

const selectTriggerStyles = tv({
  extend: focusStyles,
  base: [
    "btr border-input flex h-10 w-full cursor-default items-center gap-4 gap-x-2 rounded-lg border py-2 pr-2 pl-3 text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition group-disabled:opacity-50 **:data-[slot=icon]:size-4 dark:shadow-none",
    "group-data-open:border-ring/70 group-data-open:ring-ring/20 group-data-open:ring-4",
    "text-foreground group-invalid:border-danger group-invalid:ring-danger/20 forced-colors:group-invalid:border-[Mark]"
  ],
  variants: {
    isDisabled: {
      true: "opacity-50 forced-colors:border-[GrayText] forced-colors:text-[GrayText]"
    }
  }
})

type SelectProps<T extends object> = SelectPrimitiveProps<T> & {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  items?: Iterable<T>
  className?: string
}

const Select = <T extends object>({
  label,
  description,
  errorMessage,
  ...props
}: SelectProps<T>) => (
  <SelectPrimitive
    {...props}
    className={composeClassName(
      props.className,
      "group flex w-full flex-col gap-y-1.5"
    )}
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
      className={composeClassName(
        props.className,
        "max-h-[inherit] min-w-[inherit] border-0 shadow-none"
      )}
      items={items}
      {...props}
    />
  </PopoverContent>
)

type SelectTriggerProps = React.ComponentProps<typeof Button> & {
  prefix?: React.ReactNode
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
      className="data-placeholder:text-muted-foreground grid flex-1 grid-cols-[auto_1fr] items-center text-base *:data-[slot=avatar]:*:-mx-0.5 *:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:*:mr-2 *:data-[slot=avatar]:mr-2 *:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:mr-2 sm:text-sm [&_[slot=description]]:hidden"
    />
    <span
      aria-hidden
      data-slot="icon"
      className="lucide-chevron-down text-muted-foreground group-data-open:text-foreground size-4 shrink-0 duration-300 group-disabled:opacity-50 group-data-open:rotate-180 forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]"
    />
  </Button>
)

const SelectSection = DropdownSection
const SelectSeparator = DropdownSeparator
const SelectLabel = DropdownLabel
const SelectDescription = DropdownDescription
const SelectOption = DropdownItem

Select.Description = SelectDescription
Select.Option = SelectOption
Select.Label = SelectLabel
Select.Separator = SelectSeparator
Select.Section = SelectSection
Select.Trigger = SelectTrigger
Select.List = SelectList

export { Select }
export type { SelectProps, SelectTriggerProps }
