import * as React from "react"
import type {
  ListBoxItemProps,
  ListBoxProps,
  ListBoxSectionProps
} from "react-aria-components"
import {
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Separator
} from "react-aria-components"
import type { ButtonProps } from "./button"
import { buttonStyles } from "./button"
import { cn, composeClassName } from "./utils"

type PaginationProps = React.ComponentProps<"nav">

const Pagination = (props: PaginationProps) => (
  <nav
    aria-label="pagination"
    {...props}
    className={cn(
      "mx-auto flex w-full justify-center gap-[5px]",
      props.className
    )}
  />
)

type PaginationSectionProps<T> = ListBoxSectionProps<T> & {
  ref?: React.RefObject<HTMLElement>
}

const PaginationSection = <T extends object>(
  props: PaginationSectionProps<T>
) => (
  <ListBoxSection
    {...props}
    className={cn("flex h-9 gap-[5px]", props.className)}
  />
)

type PaginationListProps<T> = ListBoxProps<T> & {
  ref?: React.RefObject<HTMLDivElement>
}

const PaginationList = <T extends object>(props: PaginationListProps<T>) => (
  <ListBox
    orientation="horizontal"
    aria-label={props["aria-label"] || "Pagination"}
    layout="grid"
    {...props}
    className={composeClassName(
      props.className,
      "flex flex-row items-center gap-[5px]"
    )}
  />
)

const renderListItem = (
  props: ListBoxItemProps & {
    "textValue"?: string
    "aria-current"?: string | undefined
    "isDisabled"?: boolean
    "className"?: string
  },
  children: React.ReactNode
) => <ListBoxItem {...props}>{children}</ListBoxItem>

type PaginationItemProps = ListBoxItemProps & {
  children?: React.ReactNode
  className?: string
  intent?: ButtonProps["intent"]
  size?: ButtonProps["size"]
  shape?: "square" | "circle"
  isCurrent?: boolean
  segment?:
    | "label"
    | "separator"
    | "ellipsis"
    | "default"
    | "last"
    | "first"
    | "previous"
    | "next"
}

const PaginationItem = ({
  segment = "default",
  size = "sm",
  intent = "outline",
  isCurrent,
  ...props
}: PaginationItemProps) => {
  const textValue =
    typeof props.children === "string"
      ? props.children
      : typeof props.children === "number"
        ? props.children.toString()
        : undefined

  const renderPaginationIndicator = (indicator: React.ReactNode) =>
    renderListItem(
      {
        "textValue": segment,
        "aria-current": isCurrent ? "page" : undefined,
        "isDisabled": isCurrent,
        "className": buttonStyles({
          intent: "outline",
          size: "sm",
          className: cn(
            "text-foreground focus-visible:border-primary focus-visible:bg-primary/10 focus-visible:ring-ring/20 cursor-default font-normal focus-visible:ring-4",
            props.className
          )
        }),
        ...props
      },
      indicator
    )

  switch (segment) {
    case "label":
      return renderListItem(
        {
          textValue: textValue,
          className: cn(
            "grid h-9 place-content-center px-3.5 tabular-nums",
            props.className
          ),
          ...props
        },
        props.children
      )
    case "separator":
      return renderListItem(
        {
          textValue: "Separator",
          ...props,
          className: cn("grid h-9 place-content-center", props.className)
        },
        <Separator
          orientation="vertical"
          className="bg-secondary-foreground/40 h-5 w-[1.5px] shrink-0 rotate-[14deg]"
        />
      )
    case "ellipsis":
      return renderListItem(
        {
          textValue: "More pages",
          ...props,
          className: cn(
            "focus-visible:border-primary focus-visible:bg-primary/10 focus-visible:ring-ring/20 flex size-9 items-center justify-center rounded-lg border border-transparent focus:outline-hidden focus-visible:ring-4",
            props.className
          )
        },
        <span
          aria-hidden
          className={cn(
            "flex size-9 items-center justify-center",
            props.className
          )}
        >
          <span data-slot="icon" className="lucide-ellipsis size-4" />
        </span>
      )
    case "previous":
      return renderPaginationIndicator(
        <span data-slot="icon" className="lucide-chevron-left" />
      )
    case "next":
      return renderPaginationIndicator(
        <span data-slot="icon" className="lucide-chevron-right" />
      )
    case "first":
      return renderPaginationIndicator(
        <span data-slot="icon" className="lucide-chevron-first" />
      )
    case "last":
      return renderPaginationIndicator(
        <span data-slot="icon" className="lucide-chevron-last" />
      )
    default:
      return renderListItem(
        {
          "textValue": textValue,
          "aria-current": isCurrent ? "page" : undefined,
          "isDisabled": isCurrent,
          ...props,
          "className": buttonStyles({
            intent: isCurrent ? "primary" : intent,
            size,
            className: cn(
              "focus-visible:border-primary focus-visible:bg-primary/10 focus-visible:ring-ring/20 min-w-10 cursor-default font-normal tabular-nums focus-visible:ring-4 disabled:cursor-default disabled:opacity-100",
              props.className
            )
          })
        },
        props.children
      )
  }
}

Pagination.Item = PaginationItem
Pagination.List = PaginationList
Pagination.Section = PaginationSection

export { Pagination }
export type {
  PaginationItemProps,
  PaginationListProps,
  PaginationProps,
  PaginationSectionProps
}
