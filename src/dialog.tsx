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

const Trigger = (props: DialogTriggerProps) => <ButtonPrimitive {...props} />

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
}

const Header = (props: DialogHeaderProps) => {
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
      className={cn("ring-ui-line relative px-4 py-2.5 ring", props.className)}
    >
      {props.title && <Title>{props.title}</Title>}
      {props.description && <Description>{props.description}</Description>}
      {!props.title && typeof props.children === "string" ? (
        <Title {...props} />
      ) : (
        props.children
      )}
    </div>
  )
}

type DialogTitleProps = HeadingProps

const Title = (props: DialogTitleProps) => (
  <Heading
    slot="title"
    {...props}
    className={cn("text-normal text-ui-base font-semibold", props.className)}
  />
)

type DialogDescriptionProps = React.ComponentProps<"div">

const Description = (props: DialogDescriptionProps) => (
  <Text
    slot="description"
    {...props}
    className={cn("text-muted text-ui-sm", props.className)}
  />
)

type DialogBodyProps = {
  className?: string
  children: React.ReactNode
}

const Body = (props: DialogBodyProps) => (
  <div
    data-slot="dialog-body"
    className={cn([
      "isolate max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))] overflow-auto px-4 pt-4 pb-6",
      props.className
    ])}
  >
    {props.children}
  </div>
)

type DialogFooterProps = React.ComponentProps<"div">

const Footer = (props: DialogFooterProps) => {
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
        "ring-ui-line bg-ui-secondary isolate flex h-11 items-center justify-end gap-x-2 pr-2 pl-3 ring",
        props.className
      )}
    />
  )
}

type DialogCloseProps = ButtonProps

const Close = ({ intent = "outline", ...props }: DialogCloseProps) => (
  <Button slot="close" intent={intent} {...props} />
)

type DialogCloseIndicatorProps = Omit<ButtonProps, "children"> & {
  className?: string
  isDismissable?: boolean | undefined
}

const CloseIndicator = (props: DialogCloseIndicatorProps) => {
  return props.isDismissable ? (
    <ButtonPrimitive
      aria-label="Close"
      slot="close"
      className={cn(
        "close absolute top-2 right-2 z-50 grid size-7 place-content-center rounded-lg",
        "hover:bg-ui-secondary",
        "focus:bg-ui-secondary focus:outline-hidden",
        "focus-visible:ring-primary focus-visible:ring-1",
        props.className
      )}
    >
      <span data-slot="icon" className="lucide-x size-4" />
    </ButtonPrimitive>
  ) : null
}

Dialog.Trigger = Trigger
Dialog.Header = Header
Dialog.Title = Title
Dialog.Description = Description
Dialog.Body = Body
Dialog.Footer = Footer
Dialog.Close = Close
Dialog.CloseIndicator = CloseIndicator

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
