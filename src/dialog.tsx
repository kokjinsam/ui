import * as React from "react"
import type { HeadingProps } from "react-aria-components"
import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  Heading,
  Text,
  composeRenderProps
} from "react-aria-components"
import type { ButtonProps } from "./button"
import { Button } from "./button"
import { ScrollArea } from "./scroll-area"
import { cn } from "./utils"

const Dialog = ({
  role = "dialog",
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive>) => (
  <DialogPrimitive
    role={role}
    className={cn(
      "peer/dialog group/dialog relative max-h-[inherit] overflow-hidden outline-hidden",
      className
    )}
    {...props}
  />
)

const Trigger = (props: React.ComponentProps<typeof ButtonPrimitive>) => (
  <ButtonPrimitive {...props} />
)

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
}

const Header = ({ className, ...props }: DialogHeaderProps) => {
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
      className={cn("ring-modifier-border px-4 py-3 ring", className)}
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
    className={cn("text-normal text-ui-md font-semibold", props.className)}
  />
)

type DialogDescriptionProps = React.ComponentProps<"div">

const Description = ({ className, ref, ...props }: DialogDescriptionProps) => (
  <Text
    slot="description"
    className={cn("text-muted-fg text-sm", className)}
    ref={ref}
    {...props}
  />
)

type DialogBodyProps = React.ComponentProps<typeof ScrollArea>

const Body = ({ className, ref, ...props }: DialogBodyProps) => (
  <div
    data-slot="dialog-body"
    ref={ref}
    className="isolate h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding,0px)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))]"
  >
    <ScrollArea {...props} className={cn("h-full", className)} />
  </div>
)

type DialogFooterProps = React.ComponentProps<"div">

const Footer = ({ className, ...props }: DialogFooterProps) => {
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
      className={cn(
        "ring-modifier-border bg-secondary flex h-11 items-center justify-end gap-x-2 pr-2 pl-3 ring",
        className
      )}
      {...props}
    />
  )
}

const Close = ({
  className,
  intent = "outline",
  ref,
  ...props
}: ButtonProps) => {
  return (
    <Button
      slot="close"
      className={className}
      ref={ref}
      intent={intent}
      {...props}
    />
  )
}

type CloseButtonIndicatorProps = Omit<ButtonProps, "children"> & {
  className?: string
  isDismissable?: boolean | undefined
}

const CloseIndicator = (props: CloseButtonIndicatorProps) => {
  return props.isDismissable ? (
    <ButtonPrimitive
      aria-label="Close"
      slot="close"
      className={composeRenderProps(props.className, (className) =>
        cn(
          "close hover:bg-secondary focus:bg-secondary focus-visible:ring-primary absolute top-1 right-1 z-50 grid size-8 place-content-center rounded-xl focus:outline-hidden focus-visible:ring-1 sm:top-2 sm:right-2 sm:size-7 sm:rounded-md",
          className
        )
      )}
    >
      <div className="lucide-x size-4" />
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
  CloseButtonIndicatorProps,
  DialogBodyProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogTitleProps
}
