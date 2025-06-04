import * as React from "react"
import type { ListBoxItemProps, ListBoxProps } from "react-aria-components"
import {
  ListBoxItem as ListBoxItemPrimitive,
  ListBox as ListBoxPrimitive,
  composeRenderProps
} from "react-aria-components"
import {
  DropdownDescription,
  DropdownLabel,
  DropdownSection,
  dropdownItemStyles
} from "./dropdown"
import { cn, composeClassName } from "./utils"

const ListBox = <T extends object>(props: ListBoxProps<T>) => (
  <ListBoxPrimitive
    {...props}
    className={composeClassName(
      props.className,
      "grid max-h-96 w-full min-w-56 scroll-py-1 grid-cols-[auto_1fr] flex-col gap-y-1 overflow-y-scroll overscroll-contain rounded-xl border p-1 shadow-lg outline-hidden [scrollbar-width:thin] [&::-webkit-scrollbar]:size-0.5 *:[[role='group']+[role=group]]:mt-4 *:[[role='group']+[role=separator]]:mt-1"
    )}
  />
)

const ListBoxItem = <T extends object>(props: ListBoxItemProps<T>) => {
  const textValue =
    typeof props.children === "string" ? props.children : undefined

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
                data-slot="icon"
                className={cn(
                  "lucide-grip-vertical text-muted-foreground size-4 shrink-0 transition",
                  isFocused && "text-foreground",
                  isDragging && "text-foreground",
                  isSelected && "text-accent-foreground/70"
                )}
              />
            )}
            {isSelected && (
              <span
                data-slot="checked-icon"
                className="lucide-check -mx-0.5 mr-2"
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

const ListBoxLabel = DropdownLabel
const ListBoxDescription = DropdownDescription

ListBox.Section = ListBoxSection
ListBox.Label = ListBoxLabel
ListBox.Description = ListBoxDescription
ListBox.Item = ListBoxItem

export {
  ListBox,
  ListBoxDescription,
  ListBoxItem,
  ListBoxLabel,
  ListBoxSection
}
export type { ListBoxItemProps, ListBoxSectionProps }
