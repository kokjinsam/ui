"use client"

import * as React from "react"
import type { HeadingProps } from "react-aria-components"
import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  Heading,
  Text
} from "react-aria-components"
import { Button, type ButtonProps } from "./button"
import { cn } from "./utils"

type DialogProps = React.ComponentProps<typeof DialogPrimitive>

const Dialog = ({ role = "dialog", ...props }: DialogProps) => (
  <DialogPrimitive
    role={role}
    {...props}
    className={cn(
      "peer/dialog group/dialog relative max-h-[inherit] overflow-hidden outline-hidden",
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
      className={cn("ring-line relative px-4 py-2.5 ring", props.className)}
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

type DialogTitleProps = HeadingProps

const DialogTitle = (props: DialogTitleProps) => (
  <Heading
    slot="title"
    {...props}
    className={cn("text-normal text-base font-semibold", props.className)}
  />
)

type DialogDescriptionProps = React.ComponentProps<"div">

const DialogDescription = (props: DialogDescriptionProps) => (
  <Text
    slot="description"
    {...props}
    className={cn("text-muted text-sm", props.className)}
  />
)

type DialogBodyProps = {
  className?: string
  children: React.ReactNode
}

const DialogBody = (props: DialogBodyProps) => (
  <div
    data-slot="dialog-body"
    className={cn(
      "isolate max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))] overflow-auto px-4 pt-4 pb-6",
      props.className
    )}
  >
    {props.children}
  </div>
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
        "ring-line bg-surface-secondary isolate flex h-11 items-center justify-end gap-x-2 pr-2 pl-3 ring",
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
  className?: string
  isDismissable?: boolean | undefined
}

const DialogCloseIndicator = (props: DialogCloseIndicatorProps) => {
  return props.isDismissable ? (
    <ButtonPrimitive
      aria-label="Close"
      slot="close"
      className={cn(
        "close absolute top-2 right-2 z-50 grid size-7 place-content-center rounded-lg",
        "hover:bg-surface-secondary",
        "focus:bg-surface-secondary focus:outline-hidden",
        "focus-visible:ring-control-focus focus-visible:ring-2",
        props.className
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
