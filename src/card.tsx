import * as React from "react"
import { cn } from "./utils"

type CardProps = React.HTMLAttributes<HTMLDivElement>

const Card = (props: CardProps) => (
  <div
    data-slot="card"
    {...props}
    className={cn(
      "group/card bg-background text-foreground **:data-[slot=table-header]:bg-muted/50 flex flex-col gap-(--card-spacing) rounded-lg border py-(--card-spacing) shadow-xs [--card-spacing:--spacing(6)] has-[table]:overflow-hidden has-[table]:not-has-data-[slot=card-footer]:pb-0 has-[table]:**:data-[slot=card-footer]:border-t **:[table]:overflow-hidden",
      props.className
    )}
  />
)

type HeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
}

const CardHeader = ({ title, description, ...props }: HeaderProps) => (
  <div
    data-slot="card-header"
    {...props}
    className={cn(
      "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto]",
      props.className
    )}
  >
    {title && <CardTitle>{title}</CardTitle>}
    {description && <CardDescription>{description}</CardDescription>}
    {!title && typeof props.children === "string" ? (
      <CardTitle>{props.children}</CardTitle>
    ) : (
      props.children
    )}
  </div>
)

type CardTitleProps = React.ComponentProps<"div">

const CardTitle = (props: CardTitleProps) => (
  <div
    data-slot="card-title"
    {...props}
    className={cn(
      "text-lg leading-none font-semibold tracking-tight",
      props.className
    )}
  />
)

type CardDescriptionProps = React.ComponentProps<"div">

const CardDescription = (props: CardDescriptionProps) => (
  <div
    data-slot="card-description"
    {...props}
    className={cn(
      "text-muted-foreground row-start-2 text-sm text-pretty",
      props.className
    )}
  />
)

type CardActionProps = React.HTMLAttributes<HTMLDivElement>

const CardAction = (props: CardActionProps) => (
  <div
    data-slot="card-action"
    {...props}
    className={cn(
      "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
      props.className
    )}
  />
)

type CardContentProps = React.HTMLAttributes<HTMLDivElement>

const CardContent = (props: CardContentProps) => (
  <div
    data-slot="card-content"
    {...props}
    className={cn("px-(--card-spacing) has-[table]:border-t", props.className)}
  />
)

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

const CardFooter = (props: CardFooterProps) => (
  <div
    data-slot="card-footer"
    {...props}
    className={cn(
      "flex items-center px-(--card-spacing) group-has-[table]/card:pt-(--card-spacing) [.border-t]:pt-6",
      props.className
    )}
  />
)

Card.Content = CardContent
Card.Description = CardDescription
Card.Footer = CardFooter
Card.Header = CardHeader
Card.Title = CardTitle
Card.Action = CardAction

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
}
