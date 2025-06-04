import { AnimatePresence, motion } from "motion/react"
import * as React from "react"
import { use } from "react"
import type {
  DialogProps,
  DialogTriggerProps,
  HeadingProps,
  ModalOverlayProps,
  TextProps
} from "react-aria-components"
import {
  Button as ButtonPrimitive,
  Dialog,
  DialogTrigger,
  Heading,
  ModalOverlay,
  Modal as ModalPrimitive,
  OverlayTriggerStateContext,
  Text
} from "react-aria-components"
import type { ButtonProps } from "./button"
import { Button } from "./button"
import { cn } from "./utils"

const DrawerRoot = motion.create(ModalPrimitive)
const DrawerOverlay = motion.create(ModalOverlay)

const Drawer = (props: DialogTriggerProps) => <DialogTrigger {...props} />

type DrawerContentProps = Omit<
  ModalOverlayProps,
  "className" | "children" | "isDismissable"
> &
  Pick<
    DialogProps,
    "aria-label" | "aria-labelledby" | "role" | "children" | "className"
  > & {
    isFloat?: boolean
    isBlurred?: boolean
    className?: string
    style?: React.CSSProperties
    side?: "top" | "bottom" | "left" | "right"
    notch?: boolean
  }

const DrawerContent = ({
  side = "bottom",
  isFloat = false,
  isBlurred = true,
  notch = true,
  ...props
}: DrawerContentProps) => {
  const state = use(OverlayTriggerStateContext)!

  return (
    <AnimatePresence>
      {(props?.isOpen || state?.isOpen) && (
        <DrawerOverlay
          isDismissable
          isOpen={props?.isOpen || state?.isOpen}
          onOpenChange={props?.onOpenChange || state?.setOpen}
          animate={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          className="fixed inset-0 z-50 will-change-auto [--visual-viewport-vertical-padding:32px]"
        >
          {({ state }) => (
            <DrawerRoot
              className={cn(
                "bg-background text-foreground ring-input fixed max-h-full touch-none overflow-hidden align-middle ring will-change-transform",
                side === "top" &&
                  (isFloat
                    ? "inset-x-2 top-2 rounded-lg"
                    : "inset-x-0 top-0 rounded-b-2xl"),
                side === "right" &&
                  [
                    "w-full max-w-xs overflow-y-auto",
                    "**:[[slot=header]]:text-left",
                    isFloat
                      ? "inset-y-2 right-2 rounded-lg"
                      : "inset-y-0 right-0 h-auto"
                  ].join(" "),
                side === "bottom" &&
                  (isFloat
                    ? "inset-x-2 bottom-2 rounded-lg"
                    : "inset-x-0 bottom-0 rounded-t-2xl"),
                side === "left" &&
                  [
                    "w-full max-w-xs overflow-y-auto",
                    "**:[[slot=header]]:text-left",
                    isFloat
                      ? "inset-y-2 left-2 rounded-lg"
                      : "inset-y-0 left-0 h-auto"
                  ].join(" "),
                props.className
              )}
              animate={{ x: 0, y: 0 }}
              initial={{
                x: side === "left" ? "-100%" : side === "right" ? "100%" : 0,
                y: side === "top" ? "-100%" : side === "bottom" ? "100%" : 0
              }}
              exit={{
                x: side === "left" ? "-100%" : side === "right" ? "100%" : 0,
                y: side === "top" ? "-100%" : side === "bottom" ? "100%" : 0
              }}
              drag={side === "left" || side === "right" ? "x" : "y"}
              whileDrag={{ cursor: "grabbing" }}
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              onDragEnd={(_, { offset, velocity }) => {
                if (
                  side === "bottom" &&
                  (velocity.y > 150 || offset.y > screen.height * 0.25)
                ) {
                  state.close()
                }
                if (
                  side === "top" &&
                  (velocity.y < -150 || offset.y < screen.height * 0.25)
                ) {
                  state.close()
                }
                if (side === "left" && velocity.x < -150) {
                  state.close()
                }
                if (side === "right" && velocity.x > 150) {
                  state.close()
                }
              }}
              dragElastic={{
                top: side === "top" ? 1 : 0,
                bottom: side === "bottom" ? 1 : 0,
                left: side === "left" ? 1 : 0,
                right: side === "right" ? 1 : 0
              }}
              dragPropagation
            >
              <Dialog
                aria-label="Drawer"
                role="dialog"
                className={cn(
                  "relative flex flex-col overflow-hidden outline-hidden will-change-auto",
                  side === "top" || side === "bottom"
                    ? "mx-auto max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))] max-w-lg"
                    : "h-full"
                )}
              >
                {notch && side === "bottom" && (
                  <div className="notch bg-foreground/20 sticky top-0 mx-auto mt-2.5 h-1.5 w-10 shrink-0 touch-pan-y rounded-full" />
                )}
                {props.children as React.ReactNode}
                {notch && side === "top" && (
                  <div className="notch bg-foreground/20 sticky bottom-0 mx-auto mb-2.5 h-1.5 w-10 shrink-0 touch-pan-y rounded-full" />
                )}
              </Dialog>
            </DrawerRoot>
          )}
        </DrawerOverlay>
      )}
    </AnimatePresence>
  )
}

type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>

const DrawerHeader = (props: DrawerHeaderProps) => (
  <div
    slot="header"
    {...props}
    className={cn(
      "flex flex-col p-4 text-center sm:text-left",
      props.className
    )}
  />
)

type DrawerTitleProps = HeadingProps

const DrawerTitle = (props: DrawerTitleProps) => (
  <Heading
    slot="title"
    {...props}
    className={cn("text-lg/8 font-semibold", props.className)}
  />
)

type DrawerDescriptionProps = TextProps

const DrawerDescription = (props: DrawerDescriptionProps) => (
  <Text
    slot="description"
    {...props}
    className={cn("text-muted-foreground text-sm", props.className)}
  />
)

type DrawerBodyProps = React.HTMLAttributes<HTMLDivElement>

const DrawerBody = (props: DrawerBodyProps) => (
  <div
    slot="body"
    {...props}
    className={cn(
      "isolate flex max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))] flex-col overflow-auto px-4 py-1 will-change-scroll",
      props.className
    )}
  />
)

type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>

const DrawerFooter = (props: DrawerFooterProps) => (
  <div
    slot="footer"
    {...props}
    className={cn(
      "isolate mt-auto flex flex-col-reverse justify-end gap-2 p-4 sm:flex-row",
      props.className
    )}
  />
)

type DrawerCloseProps = ButtonProps

const DrawerClose = ({ intent = "outline", ...props }: DrawerCloseProps) => (
  <Button slot="close" {...props} intent={intent} />
)

Drawer.Trigger = ButtonPrimitive
Drawer.Footer = DrawerFooter
Drawer.Header = DrawerHeader
Drawer.Title = DrawerTitle
Drawer.Description = DrawerDescription
Drawer.Body = DrawerBody
Drawer.Content = DrawerContent
Drawer.Close = DrawerClose

export { Drawer }
export type {
  DrawerBodyProps,
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerTitleProps
}
