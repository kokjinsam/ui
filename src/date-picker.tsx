import type { DateDuration } from "@internationalized/date"
import * as React from "react"
import type {
  DatePickerProps as DatePickerPrimitiveProps,
  DateValue,
  DialogProps,
  PopoverProps,
  ValidationResult
} from "react-aria-components"
import { DatePicker as DatePickerPrimitive } from "react-aria-components"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { DateInput } from "./date-field"
import { Description, FieldError, FieldGroup, Label } from "./field"
import { Popover } from "./popover"
import { RangeCalendar } from "./range-calendar"
import { cn, composeClassName } from "./utils"

type DatePickerOverlayProps = Omit<
  DialogProps,
  "children" | "className" | "style"
> &
  Omit<PopoverProps, "children" | "className" | "style"> & {
    className?: string | ((values: { defaultClassName?: string }) => string)
    children?: React.ReactNode
    closeButton?: boolean
    range?: boolean
    visibleDuration?: DateDuration
    pageBehavior?: "visible" | "single"
  }

const DatePickerOverlay = ({
  visibleDuration = { months: 1 },
  closeButton = true,
  pageBehavior = "visible",
  placement = "bottom",
  range,
  ...props
}: DatePickerOverlayProps) => (
  <Popover.Content
    placement={placement}
    isDismissable={false}
    showArrow={false}
    {...props}
    className={cn(
      "flex max-w-none min-w-auto snap-x justify-center p-4 sm:min-w-[16.5rem] sm:p-2 sm:pt-3",
      visibleDuration?.months === 1 ? "sm:max-w-2xs" : "sm:max-w-none"
    )}
  >
    {range ? (
      <RangeCalendar
        pageBehavior={pageBehavior}
        visibleDuration={visibleDuration}
      />
    ) : (
      <Calendar />
    )}
    {closeButton && (
      <div className="mx-auto flex w-full max-w-[inherit] justify-center py-2.5 sm:hidden">
        <Popover.Close shape="circle" className="w-full">
          Close
        </Popover.Close>
      </div>
    )}
  </Popover.Content>
)

const DatePickerIcon = () => (
  <Button
    size="square-sm"
    intent="plain"
    className="outline-offset-0hover:bg-transparent pressed:bg-transparent **:data-[slot=icon]:text-muted-foreground mr-1 h-7 w-8 rounded"
  >
    <span
      data-slot="icon"
      aria-hidden
      className="lucide-calendar-days group-open:text-foreground ml-2"
    />
  </Button>
)

type DatePickerProps<T extends DateValue> = DatePickerPrimitiveProps<T> &
  Pick<DatePickerOverlayProps, "placement"> & {
    label?: string
    description?: string
    errorMessage?: string | ((validation: ValidationResult) => string)
  }

const DatePicker = <T extends DateValue>({
  label,
  description,
  errorMessage,
  placement,
  ...props
}: DatePickerProps<T>) => (
  <DatePickerPrimitive
    {...props}
    className={composeClassName(
      props.className,
      "group/date-picker flex flex-col gap-y-1"
    )}
  >
    {label && <Label>{label}</Label>}
    <FieldGroup className="min-w-40">
      <DateInput className="w-full px-2 text-base sm:text-sm" />
      <DatePickerIcon />
    </FieldGroup>
    {description && <Description>{description}</Description>}
    <FieldError>{errorMessage}</FieldError>
    <DatePickerOverlay placement={placement} />
  </DatePickerPrimitive>
)

export { DatePicker, DatePickerIcon, DatePickerOverlay }
export type { DatePickerProps, DateValue, ValidationResult }
