"use client"

import * as React from "react"
import type {
  DialogProps,
  DialogTriggerProps,
  ModalOverlayProps
} from "react-aria-components"
import {
  DialogTrigger,
  Modal,
  ModalOverlay,
  composeRenderProps
} from "react-aria-components"
import { Dialog } from "./dialog"
import type { VariantProps } from "./utils"
import { cn, tv } from "./utils"

const overlayStyles = tv({
  base: [
    "[--visual-viewport-vertical-padding:16px]",
    "bg-modifier-cover z-modal fixed top-0 left-0 isolate flex h-(--visual-viewport-height) w-full items-center justify-center"
  ],
  variants: {
    isEntering: {
      true: "fade-in animate-in duration-300 ease-out"
    },
    isExiting: {
      true: "fade-out animate-out duration-200 ease-in"
    }
  }
})

type Sides = "top" | "bottom" | "left" | "right"

const generateCompoundVariants = (sides: Array<Sides>) => {
  return sides.map((side) => ({
    side,
    isFloat: true,
    className:
      side === "top"
        ? "top-2 inset-x-2 rounded-xl border-b-0"
        : side === "bottom"
          ? "bottom-2 inset-x-2 rounded-xl border-t-0"
          : side === "left"
            ? "left-2 inset-y-2 rounded-xl border-r-0"
            : "right-2 inset-y-2 rounded-xl border-l-0"
  }))
}

const contentStyles = tv({
  base: "border-normal bg-primary text-normal z-modal fixed shadow-lg transition ease-in-out",
  variants: {
    isEntering: {
      true: "animate-in duration-300"
    },
    isExiting: {
      true: "animate-out duration-200"
    },
    side: {
      top: "data-entering:slide-in-from-top data-exiting:slide-out-to-top inset-x-0 top-0 rounded-b-2xl border-b",
      bottom:
        "data-entering:slide-in-from-bottom data-exiting:slide-out-to-bottom inset-x-0 bottom-0 rounded-t-2xl border-t",
      left: "data-entering:slide-in-from-left data-exiting:slide-out-to-left inset-y-0 left-0 h-auto w-full max-w-xs overflow-y-auto border-r",
      right:
        "data-entering:slide-in-from-right data-exiting:slide-out-to-right inset-y-0 right-0 h-auto w-full max-w-xs overflow-y-auto border-l"
    },
    isFloat: {
      false: "border-normal",
      true: "ring-modifier-border"
    }
  },
  compoundVariants: generateCompoundVariants(["top", "bottom", "left", "right"])
})

type SheetProps = DialogTriggerProps

const Sheet = (props: SheetProps) => <DialogTrigger {...props} />

type SheetContentProps = Omit<
  React.ComponentProps<typeof Modal>,
  "children" | "className"
> &
  Omit<ModalOverlayProps, "className"> &
  VariantProps<typeof overlayStyles> & {
    "aria-label"?: DialogProps["aria-label"]
    "aria-labelledby"?: DialogProps["aria-labelledby"]
    "role"?: DialogProps["role"]
    "closeButton"?: boolean
    "isBlurred"?: boolean
    "isFloat"?: boolean
    "side"?: Sides
    "classNames"?: {
      overlay?: ModalOverlayProps["className"]
      content?: ModalOverlayProps["className"]
    }
  }

const SheetContent = ({
  classNames,
  isDismissable = true,
  side = "right",
  role = "dialog",
  closeButton = true,
  isFloat = true,
  children,
  ...props
}: SheetContentProps) => {
  const _isDismissable = role === "alertdialog" ? false : isDismissable

  return (
    <ModalOverlay
      isDismissable={_isDismissable}
      className={composeRenderProps(
        classNames?.overlay,
        (className, renderProps) => {
          return overlayStyles({
            ...renderProps,
            className
          })
        }
      )}
      {...props}
    >
      <Modal
        className={composeRenderProps(
          classNames?.content,
          (className, renderProps) =>
            contentStyles({
              ...renderProps,
              side,
              isFloat,
              className
            })
        )}
        {...props}
      >
        {(values) => (
          <Dialog
            role={role}
            aria-label={props["aria-label"] ?? undefined}
            className="h-full"
          >
            <>
              {typeof children === "function" ? children(values) : children}
              {closeButton && (
                <Dialog.CloseIndicator
                  className="top-2.5 right-2.5"
                  isDismissable={_isDismissable}
                />
              )}
            </>
          </Dialog>
        )}
      </Modal>
    </ModalOverlay>
  )
}

type SheetBodyProps = React.ComponentProps<typeof Dialog.Body>

const SheetBody = (props: SheetBodyProps) => (
  <Dialog.Body
    {...props}
    className={cn(
      "h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))]"
    )}
  />
)

const SheetTrigger = Dialog.Trigger
const SheetFooter = Dialog.Footer
const SheetHeader = Dialog.Header
const SheetTitle = Dialog.Title
const SheetDescription = Dialog.Description
const SheetClose = Dialog.Close

Sheet.Trigger = SheetTrigger
Sheet.Footer = SheetFooter
Sheet.Header = SheetHeader
Sheet.Title = SheetTitle
Sheet.Description = SheetDescription
Sheet.Body = SheetBody
Sheet.Close = SheetClose
Sheet.Content = SheetContent

export { Sheet }
export type { SheetContentProps, SheetProps, Sides }
