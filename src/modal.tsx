"use client"

import * as React from "react"
import type {
  DialogProps,
  DialogTriggerProps,
  ModalOverlayProps
} from "react-aria-components"
import {
  DialogTrigger,
  ModalOverlay,
  Modal as ModalPrimitive,
  composeRenderProps
} from "react-aria-components"
import { Dialog } from "./dialog"
import type { VariantProps } from "./utils"
import { tv } from "./utils"

type ModalProps = DialogTriggerProps

const Modal = (props: ModalProps) => <DialogTrigger {...props} />

const modalOverlayStyles = tv({
  base: [
    "[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:32px]",
    "z-modal bg-modifier-cover fixed top-0 left-0 isolate flex h-(--visual-viewport-height) w-full items-end justify-end text-center",
    "sm:block"
  ],
  variants: {
    isEntering: {
      true: "fade-in animate-in duration-200 ease-out"
    },
    isExiting: {
      true: "fade-out animate-out ease-in"
    }
  }
})

const modalContentStyles = tv({
  base: [
    "bg-primary text-normal ring-modifier-border max-h-full w-full overflow-hidden rounded-t-2xl text-left align-middle shadow-lg ring",
    "sm:fixed sm:top-1/2 sm:left-[50vw] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl"
  ],
  variants: {
    isEntering: {
      true: [
        "fade-in slide-in-from-bottom animate-in duration-200 ease-out",
        "sm:zoom-in-95 sm:slide-in-from-bottom-0"
      ]
    },
    isExiting: {
      true: [
        "slide-out-to-bottom sm:slide-out-to-bottom-0 sm:zoom-out-95 animate-out duration-150 ease-in"
      ]
    },
    size: {
      "xs": "sm:max-w-xs",
      "sm": "sm:max-w-sm",
      "md": "sm:max-w-md",
      "lg": "sm:max-w-lg",
      "xl": "sm:max-w-xl",
      "2xl": "sm:max-w-2xl",
      "3xl": "sm:max-w-3xl",
      "4xl": "sm:max-w-4xl",
      "5xl": "sm:max-w-5xl"
    }
  },
  defaultVariants: {
    size: "lg"
  }
})

type ModalContentProps = Omit<ModalOverlayProps, "className" | "children"> &
  Pick<DialogProps, "aria-label" | "aria-labelledby" | "role" | "children"> &
  VariantProps<typeof modalContentStyles> & {
    closeButton?: boolean
    isBlurred?: boolean
    classNames?: {
      overlay?: ModalOverlayProps["className"]
      content?: ModalOverlayProps["className"]
    }
  }

const ModalContent = ({
  classNames,
  isDismissable: isDismissableInternal,
  children,
  size,
  role = "dialog",
  closeButton = true,
  ...props
}: ModalContentProps) => {
  const isDismissable = isDismissableInternal ?? role !== "alertdialog"

  return (
    <ModalOverlay
      isDismissable={isDismissable}
      className={composeRenderProps(
        classNames?.overlay,
        (className, renderProps) =>
          modalOverlayStyles({ ...renderProps, className })
      )}
      {...props}
    >
      <ModalPrimitive
        isDismissable={isDismissable}
        className={composeRenderProps(
          classNames?.content,
          (className, renderProps) =>
            modalContentStyles({
              ...renderProps,
              size,
              className
            })
        )}
        {...props}
      >
        <Dialog role={role}>
          {(values) => (
            <>
              {typeof children === "function" ? children(values) : children}
              {closeButton && (
                <Dialog.CloseIndicator isDismissable={isDismissable} />
              )}
            </>
          )}
        </Dialog>
      </ModalPrimitive>
    </ModalOverlay>
  )
}

const ModalTrigger = Dialog.Trigger
const ModalHeader = Dialog.Header
const ModalTitle = Dialog.Title
const ModalDescription = Dialog.Description
const ModalFooter = Dialog.Footer
const ModalBody = Dialog.Body
const ModalClose = Dialog.Close

Modal.Trigger = ModalTrigger
Modal.Header = ModalHeader
Modal.Title = ModalTitle
Modal.Description = ModalDescription
Modal.Footer = ModalFooter
Modal.Body = ModalBody
Modal.Close = ModalClose
Modal.Content = ModalContent

export { Modal }
export type { ModalContentProps, ModalProps }
