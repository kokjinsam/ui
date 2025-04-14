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

const modalContentStyles = tv({
  slots: {
    overlay: [
      "z-modal bg-modifier-cover/85 fixed top-0 left-0 isolate flex h-(--visual-viewport-height) w-full items-end justify-end",
      "sm:block",
      "[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:80px]"
    ],
    container: [
      "bg-primary/70 ring-modifier-border max-h-full w-full overflow-hidden p-0.5 text-left align-middle shadow-lg ring",
      "sm:fixed sm:top-1/2 sm:left-[50vw] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg"
    ],
    content: ["border-normal bg-primary rounded-lg border"]
  },
  variants: {
    isEntering: {
      true: {
        overlay: "fade-in animate-in duration-200 ease-out",
        container: [
          "fade-in slide-in-from-bottom animate-in duration-200 ease-out",
          "sm:zoom-in-95 sm:slide-in-from-bottom-0"
        ]
      }
    },
    isExiting: {
      true: {
        overlay: "fade-out animate-out ease-in",
        container:
          "slide-out-to-bottom sm:slide-out-to-bottom-0 sm:zoom-out-95 animate-out duration-150 ease-in"
      }
    },
    size: {
      "xs": { container: "sm:max-w-xs" },
      "sm": { container: "sm:max-w-sm" },
      "md": { container: "sm:max-w-md" },
      "lg": { container: "sm:max-w-lg" },
      "xl": { container: "sm:max-w-xl" },
      "2xl": { container: "sm:max-w-2xl" },
      "3xl": { container: "sm:max-w-3xl" },
      "4xl": { container: "sm:max-w-4xl" },
      "5xl": { container: "sm:max-w-5xl" }
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
    classNames?: {
      overlay?: ModalOverlayProps["className"]
      container?: ModalOverlayProps["className"]
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
  const {
    overlay: overlayStyles,
    container: containerStyles,
    content: contentStyles
  } = modalContentStyles()

  return (
    <ModalOverlay
      isDismissable={isDismissable}
      className={composeRenderProps(
        classNames?.overlay,
        (className, renderProps) => overlayStyles({ ...renderProps, className })
      )}
      {...props}
    >
      <ModalPrimitive
        isDismissable={isDismissable}
        className={composeRenderProps(
          classNames?.container,
          (className, renderProps) =>
            containerStyles({ ...renderProps, size, className })
        )}
        {...props}
      >
        <Dialog role={role} className={contentStyles({ size })}>
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
