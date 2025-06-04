import * as React from "react"
import type {
  ListBoxItemProps,
  SectionProps,
  SeparatorProps,
  TextProps
} from "react-aria-components"
import {
  Collection,
  Header,
  ListBoxItem as ListBoxItemPrimitive,
  ListBoxSection,
  Separator,
  Text,
  composeRenderProps
} from "react-aria-components"
import { Keyboard } from "./keyboard"
import { cn, tv } from "./utils"

const dropdownItemStyles = tv({
  base: [
    "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] not-has-[[slot=description]]:items-center has-data-[[slot=description]]:**:data-[slot=checked-icon]:mt-[1.5px] supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
    "group forced-color:text-[Highlight] text-foreground relative cursor-default rounded-[calc(var(--radius-lg)-1px)] px-[calc(var(--spacing)*2.3)] py-[calc(var(--spacing)*1.3)] text-base outline-0 forced-color-adjust-none select-none sm:text-sm/6 forced-colors:text-[LinkText]",
    "**:data-[slot=avatar]:mr-2 **:data-[slot=avatar]:size-6 **:data-[slot=avatar]:*:mr-2 **:data-[slot=avatar]:*:size-6 sm:**:data-[slot=avatar]:size-5 sm:**:data-[slot=avatar]:*:size-5",
    "data-danger:**:data-[slot=icon]:text-danger/60 **:data-[slot=icon]:text-muted-foreground focus:data-danger:**:data-[slot=icon]:text-danger **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0",
    "*:data-[slot=icon]:mr-2",
    "forced-colors:**:data-[slot=icon]:text-[CanvasText] forced-colors:group-focus:**:data-[slot=icon]:text-[Canvas]",
    "[&>[slot=label]+[data-slot=icon]]:absolute [&>[slot=label]+[data-slot=icon]]:right-0"
  ],
  variants: {
    isDisabled: {
      true: "text-muted-foreground forced-colors:text-[GrayText]"
    },
    isSelected: {
      true: "**:data-[slot=avatar]:hidden **:data-[slot=avatar]:*:hidden **:data-[slot=icon]:hidden"
    },
    isFocused: {
      false: "data-danger:text-danger",
      true: [
        "**:data-[slot=icon]:text-accent-foreground **:[kbd]:text-accent-foreground",
        "bg-accent text-accent-foreground forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "data-danger:bg-danger/10 data-danger:text-danger",
        "data-[slot=description]:text-accent-foreground data-[slot=label]:text-accent-foreground [&_.text-muted-foreground]:text-accent-foreground/80"
      ]
    }
  }
})

const dropdownSectionStyles = tv({
  slots: {
    section: "col-span-full grid grid-cols-[auto_1fr]",
    header:
      "text-muted-foreground col-span-full px-2.5 py-1 text-sm font-medium sm:text-xs"
  }
})

const { section, header } = dropdownSectionStyles()

type DropdownSectionProps<T> = SectionProps<T> & {
  title?: string
}

const DropdownSection = <T extends object>(props: DropdownSectionProps<T>) => (
  <ListBoxSection className={section({ className: props.className })}>
    {"title" in props && <Header className={header()}>{props.title}</Header>}
    <Collection items={props.items}>{props.children}</Collection>
  </ListBoxSection>
)

type DropdownItemProps = ListBoxItemProps

const DropdownItem = (props: DropdownItemProps) => {
  const textValue =
    typeof props.children === "string" ? props.children : undefined

  return (
    <ListBoxItemPrimitive
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropdownItemStyles({ ...renderProps, className })
      )}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          {isSelected && (
            <span
              data-slot="checked-icon"
              className="lucide-check -mx-0.5 mr-2"
            />
          )}
          {typeof children === "string" ? (
            <DropdownLabel>{children}</DropdownLabel>
          ) : (
            children
          )}
        </>
      ))}
    </ListBoxItemPrimitive>
  )
}

type DropdownLabelProps = TextProps

const DropdownLabel = (props: DropdownLabelProps) => (
  <Text
    slot="label"
    {...props}
    className={cn("col-start-2", props.className)}
  />
)

type DropdownDescriptionProps = TextProps

const DropdownDescription = (props: DropdownDescriptionProps) => (
  <Text
    slot="description"
    {...props}
    className={cn("text-muted-foreground col-start-2 text-sm", props.className)}
  />
)

type DropdownSeparatorProps = SeparatorProps

const DropdownSeparator = (props: DropdownSeparatorProps) => (
  <Separator
    orientation="horizontal"
    {...props}
    className={cn("bg-border col-span-full -mx-1 my-1 h-px", props.className)}
  />
)

type DropdownKeyboardProps = React.ComponentProps<typeof Keyboard>

const DropdownKeyboard = (props: DropdownKeyboardProps) => (
  <Keyboard
    {...props}
    classNames={{
      ...props.classNames,
      base: cn(
        "group-hover:text-primary-foreground group-focus:text-primary-foreground absolute right-2 pl-2",
        props.classNames?.base
      )
    }}
  />
)

export {
  DropdownDescription,
  DropdownItem,
  DropdownKeyboard,
  DropdownLabel,
  DropdownSection,
  DropdownSeparator,
  dropdownItemStyles,
  dropdownSectionStyles
}
export type {
  DropdownDescriptionProps,
  DropdownItemProps,
  DropdownKeyboardProps,
  DropdownLabelProps,
  DropdownSectionProps,
  DropdownSeparatorProps
}
