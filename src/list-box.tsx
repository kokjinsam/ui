"use client"

import * as React from "react"
import type {
  ListBoxItemProps as ListBoxItemPrimitiveProps,
  ListBoxProps as ListBoxPrimitiveProps
} from "react-aria-components"
import {
  ListBoxItem as ListBoxItemPrimitive,
  ListBox as ListBoxPrimitive,
  composeRenderProps
} from "react-aria-components"
import {
  DropdownItemDetails,
  DropdownLabel,
  DropdownSection,
  dropdownItemStyles
} from "./dropdown"
import { cn } from "./utils"

type ListBoxProps<T extends object> = ListBoxPrimitiveProps<T>

const ListBox = <T extends object>(props: ListBoxProps<T>) => (
  <ListBoxPrimitive
    {...props}
    className={cn(
      "grid max-h-[inherit] w-full min-w-56 grid-cols-[auto_1fr] overflow-auto rounded-lg border px-1 pt-1 pb-1.5 shadow-lg outline-hidden",
      "*:[[role='group']+[role=group]]:mt-4",
      "*:[[role='group']+[role=separator]]:mt-1",
      props.className
    )}
  />
)

type ListBoxItemProps<T extends object> = ListBoxItemPrimitiveProps<T>

const ListBoxItem = <T extends object>(props: ListBoxItemProps<T>) => {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)

  return (
    <ListBoxItemPrimitive
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropdownItemStyles({
          ...renderProps,
          className
        })
      )}
    >
      {(renderProps) => {
        const { allowsDragging, isSelected, isFocused, isDragging } =
          renderProps

        return (
          <>
            {allowsDragging && (
              <span
                className={cn(
                  "text-muted size-4 shrink-0 transition",
                  isFocused && "text-normal",
                  isDragging && "text-normal",
                  isSelected && "text-accent-fg/70"
                )}
              />
            )}
            {isSelected && (
              <span
                data-slot="checked-icon"
                className="lucide-check -mx-0.5 mr-2 size-4"
              />
            )}
            {typeof props.children === "function" ? (
              props.children(renderProps)
            ) : typeof props.children === "string" ? (
              <DropdownLabel>{props.children}</DropdownLabel>
            ) : (
              props.children
            )}
          </>
        )
      }}
    </ListBoxItemPrimitive>
  )
}

type ListBoxSectionProps = React.ComponentProps<typeof DropdownSection>

const ListBoxSection = (props: ListBoxSectionProps) => (
  <DropdownSection
    className={cn("gap-y-1 [&_.lbi:last-child]:-mb-1.5", props.className)}
    {...props}
  />
)

const ListBoxItemDetails = DropdownItemDetails

ListBox.Section = ListBoxSection
ListBox.ItemDetails = ListBoxItemDetails
ListBox.Item = ListBoxItem

export { ListBox, ListBoxItem, ListBoxSection }
export type { ListBoxItemProps, ListBoxSectionProps }
