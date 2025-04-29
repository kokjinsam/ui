"use client"

import * as React from "react"
import type {
  DialogProps,
  DialogTriggerProps,
  ModalOverlayProps,
  PopoverProps as PopoverPrimitiveProps
} from "react-aria-components"
import {
  DialogTrigger,
  OverlayArrow,
  PopoverContext,
  Popover as PopoverPrimitive,
  composeRenderProps,
  useSlottedContext
} from "react-aria-components"
import { tv } from "tailwind-variants"
import type {
  DialogBodyProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogTitleProps
} from "./dialog"
import { Dialog } from "./dialog"
import { cn } from "./utils"

type PopoverProps = DialogTriggerProps

const Popover = (props: PopoverProps) => <DialogTrigger {...props} />

const PopoverTitle = (props: DialogTitleProps) => (
  <Dialog.Title {...props} className={cn("sm:leading-none", props.className)} />
)

const PopoverHeader = (props: DialogHeaderProps) => (
  <Dialog.Header {...props} className={cn("sm:p-4", props.className)} />
)

const PopoverFooter = (props: DialogFooterProps) => (
  <Dialog.Footer {...props} className={cn("sm:p-4", props.className)} />
)

const PopoverBody = (props: DialogBodyProps) => (
  <Dialog.Body {...props} className={cn("sm:px-4 sm:pt-0", props.className)} />
)

const content = tv({
  base: [
    "peer/popover-content bg-ui-primary text-normal border-ui-line-hover max-w-xs rounded-xl border bg-clip-padding shadow-xs transition-transform",
    "sm:max-w-3xl",
    "forced-colors:bg-[Canvas]"
  ],
  variants: {
    isPicker: {
      true: "max-h-72 min-w-(--trigger-width) overflow-y-auto",
      false: "min-w-80"
    },
    isMenu: {
      true: ""
    },
    isEntering: {
      true: [
        "fade-in animate-in duration-150 ease-out",
        "data-[placement=left]:slide-in-from-right-1 data-[placement=right]:slide-in-from-left-1 data-[placement=top]:slide-in-from-bottom-1 data-[placement=bottom]:slide-in-from-top-1"
      ]
    },
    isExiting: {
      true: [
        "fade-out animate-out duration-100 ease-in",
        "data-[placement=left]:slide-out-to-right-1 data-[placement=right]:slide-out-to-left-1 data-[placement=top]:slide-out-to-bottom-1 data-[placement=bottom]:slide-out-to-top-1"
      ]
    }
  }
})

type PopoverContentProps = Omit<
  PopoverPrimitiveProps,
  "children" | "className"
> &
  Omit<ModalOverlayProps, "className"> &
  Pick<DialogProps, "aria-label" | "aria-labelledby"> & {
    children: React.ReactNode
    showArrow?: boolean
    style?: React.CSSProperties
    className?: string | ((values: { defaultClassName?: string }) => string)
  }

const PopoverContent = ({
  children,
  showArrow = true,
  ...props
}: PopoverContentProps) => {
  const popoverContext = useSlottedContext(PopoverContext)!
  const isSubmenuTrigger = popoverContext?.trigger === "SubmenuTrigger"
  const isComboBoxTrigger = popoverContext?.trigger === "ComboBox"
  const offset = showArrow ? 12 : 8
  const effectiveOffset = isSubmenuTrigger ? offset - 5 : offset

  return (
    <PopoverPrimitive
      offset={effectiveOffset}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        content({ ...renderProps, className })
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className={cn([
              "fill-ui-primary stroke-ui-line-hover block",
              "group-data-[placement=bottom]:rotate-180",
              "group-data-[placement=left]:-rotate-90",
              "group-data-[placement=right]:rotate-90",
              "forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
            ])}
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {!isComboBoxTrigger ? (
        <Dialog role="dialog" aria-label={props["aria-label"] ?? "List item"}>
          {children}
        </Dialog>
      ) : (
        children
      )}
    </PopoverPrimitive>
  )
}

const PopoverTrigger = Dialog.Trigger
const PopoverClose = Dialog.Close
const PopoverDescription = Dialog.Description

Popover.Trigger = PopoverTrigger
Popover.Close = PopoverClose
Popover.Description = PopoverDescription
Popover.Content = PopoverContent
Popover.Body = PopoverBody
Popover.Footer = PopoverFooter
Popover.Header = PopoverHeader
Popover.Title = PopoverTitle

export { Popover, PopoverContent }
export type { PopoverContentProps, PopoverProps }
