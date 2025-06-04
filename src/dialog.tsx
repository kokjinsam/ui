import * as React from "react"
import type { HeadingProps } from "react-aria-components"
import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  Heading,
  Text
} from "react-aria-components"
import type { ButtonProps } from "./button"
import { Button } from "./button"
import { useMediaQuery } from "./hooks"
import { cn, composeClassName } from "./utils"

type DialogProps = React.ComponentProps<typeof DialogPrimitive>

const Dialog = ({ role = "dialog", ...props }: DialogProps) => (
  <DialogPrimitive
    role={role}
    {...props}
    className={cn(
      "peer/dialog group/dialog relative flex max-h-[inherit] flex-col overflow-hidden outline-hidden [scrollbar-width:thin] [&::-webkit-scrollbar]:size-0.5",
      props.className
    )}
  />
)

type DialogTriggerProps = React.ComponentProps<typeof ButtonPrimitive>

const DialogTrigger = (props: DialogTriggerProps) => (
  <ButtonPrimitive {...props} />
)

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
}

const DialogHeader = (props: DialogHeaderProps) => {
  const headerRef = React.useRef<HTMLHeadingElement>(null)

  React.useEffect(() => {
    const header = headerRef.current
    if (!header) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        header.parentElement?.style.setProperty(
          "--dialog-header-height",
          `${entry.target.clientHeight}px`
        )
      }
    })

    observer.observe(header)
    return () => observer.unobserve(header)
  }, [])

  return (
    <div
      data-slot="dialog-header"
      ref={headerRef}
      className={cn(
        "relative flex flex-col gap-0.5 p-4",
        "sm:gap-1 sm:p-6",
        "[&[data-slot=dialog-header]:has(+[data-slot=dialog-footer])]:pb-0",
        props.className
      )}
    >
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      {props.description && (
        <DialogDescription>{props.description}</DialogDescription>
      )}
      {!props.title && typeof props.children === "string" ? (
        <DialogTitle {...props} />
      ) : (
        props.children
      )}
    </div>
  )
}

type DialogTitleProps = Omit<HeadingProps, "level"> & {
  level?: 1 | 2 | 3 | 4
}

const DialogTitle = ({ level = 2, ...props }: DialogTitleProps) => (
  <Heading
    slot="title"
    level={level}
    {...props}
    className={cn(
      "text-foreground flex flex-1 items-center",
      level === 1 && "text-lg font-semibold sm:text-xl",
      level === 2 && "text-lg font-semibold sm:text-xl",
      level === 3 && "text-base font-semibold sm:text-lg",
      level === 4 && "text-base font-semibold",
      props.className
    )}
  />
)

type DialogDescriptionProps = React.ComponentProps<"div">

const DialogDescription = (props: DialogDescriptionProps) => (
  <Text
    slot="description"
    {...props}
    className={cn("text-muted-foreground text-sm", props.className)}
  />
)

type DialogBodyProps = React.ComponentProps<"div">

const DialogBody = (props: DialogBodyProps) => (
  <div
    data-slot="dialog-body"
    {...props}
    className={cn(
      "isolate flex max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))] flex-1 flex-col overflow-auto px-4 py-1 sm:px-6",
      props.className
    )}
  />
)

type DialogFooterProps = React.ComponentProps<"div">

const DialogFooter = (props: DialogFooterProps) => {
  const footerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const footer = footerRef.current

    if (!footer) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        footer.parentElement?.style.setProperty(
          "--dialog-footer-height",
          `${entry.target.clientHeight}px`
        )
      }
    })

    observer.observe(footer)
    return () => {
      observer.unobserve(footer)
    }
  }, [])

  return (
    <div
      ref={footerRef}
      data-slot="dialog-footer"
      {...props}
      className={cn(
        "isolate mt-auto flex flex-col-reverse justify-between gap-3 p-4 pt-3 sm:flex-row sm:p-6 sm:pt-5",
        props.className
      )}
    />
  )
}

type DialogCloseProps = ButtonProps

const DialogClose = ({ intent = "outline", ...props }: DialogCloseProps) => (
  <Button slot="close" intent={intent} {...props} />
)

type DialogCloseIndicatorProps = Omit<ButtonProps, "children"> & {
  isDismissable?: boolean | undefined
}

const DialogCloseIndicator = (props: DialogCloseIndicatorProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)")
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (isMobile && buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [isMobile])

  return props.isDismissable ? (
    <ButtonPrimitive
      {...(isMobile ? { autoFocus: true } : {})}
      aria-label="Close"
      slot="close"
      className={composeClassName(
        props.className,
        "close hover:bg-secondary focus:bg-secondary focus-visible:ring-primary absolute top-1 right-1 z-50 grid size-8 place-content-center rounded-xl focus:outline-hidden focus-visible:ring-1 sm:top-2 sm:right-2 sm:size-7 sm:rounded-md"
      )}
    >
      <span data-slot="icon" className="lucide-x size-4" />
    </ButtonPrimitive>
  ) : null
}

Dialog.Trigger = DialogTrigger
Dialog.Header = DialogHeader
Dialog.Title = DialogTitle
Dialog.Description = DialogDescription
Dialog.Body = DialogBody
Dialog.Footer = DialogFooter
Dialog.Close = DialogClose
Dialog.CloseIndicator = DialogCloseIndicator

export { Dialog }
export type {
  DialogBodyProps,
  DialogCloseIndicatorProps,
  DialogCloseProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps
}
