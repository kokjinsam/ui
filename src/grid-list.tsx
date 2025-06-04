import * as React from "react"
import type { GridListItemProps, GridListProps } from "react-aria-components"
import {
  Button,
  GridListItem as GridListItemPrimitive,
  GridList as GridListPrimitive,
  composeRenderProps
} from "react-aria-components"
import { Checkbox } from "./checkbox"
import { cn, composeClassName, tv } from "./utils"

const GridList = <T extends object>(props: GridListProps<T>) => (
  <GridListPrimitive
    className={composeClassName(
      props.className,
      "*:data-drop-target:border-accent relative max-h-96 scroll-py-1 overflow-y-scroll overscroll-contain rounded-lg border *:data-drop-target:border"
    )}
    {...props}
  />
)

const itemStyles = tv({
  base: "group text-foreground relative -mb-px flex cursor-default gap-3 border-y px-3 py-2 outline-hidden -outline-offset-2 transition select-none [--selected-item-hovered:--color-muted]/70 [--selected-item:var(--color-muted)]/80 first:rounded-t-md first:border-t-0 last:mb-0 last:rounded-b-md last:border-b-0 sm:text-sm",
  variants: {
    isHovered: { true: "bg-subtle" },
    isSelected: {
      true: "border-border/50 z-20 bg-(--selected-item) hover:bg-(--selected-item-hovered)"
    },
    isFocused: {
      true: "outline-hidden"
    },
    isFocusVisible: {
      true: "selected:bg-(--selected-item) ring-ring bg-(--selected-item) ring-1 outline-hidden hover:bg-(--selected-item-hovered)"
    },
    isDisabled: {
      true: "text-muted-foreground/70 forced-colors:text-[GrayText]"
    }
  }
})

const GridListItem = (props: GridListItemProps) => {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)

  return (
    <GridListItemPrimitive
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        itemStyles({ ...renderProps, className })
      )}
    >
      {(values) => (
        <>
          {values.allowsDragging && (
            <Button
              slot="drag"
              className="*:data-[slot=icon]:text-muted-foreground cursor-grab data-dragging:cursor-grabbing"
            >
              <span data-slot="icon" className="lucide-grip-vertical" />
            </Button>
          )}

          <span
            aria-hidden
            className="bg-primary group-selected:block absolute inset-y-0 left-0 hidden h-full w-0.5"
          />
          {values.selectionMode === "multiple" &&
            values.selectionBehavior === "toggle" && (
              <Checkbox className="-mr-2" slot="selection" />
            )}
          {typeof props.children === "function"
            ? props.children(values)
            : props.children}
        </>
      )}
    </GridListItemPrimitive>
  )
}

const GridEmptyState = (props: React.ComponentProps<"div">) => (
  <div {...props} className={cn("p-6", props.className)} />
)

GridList.Item = GridListItem
GridList.EmptyState = GridEmptyState

export { GridList }
export type { GridListItemProps, GridListProps }
