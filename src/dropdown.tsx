"use client"

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
    "group text-normal text-ui-base/5 relative cursor-default rounded-[calc(var(--radius-lg)-1px)] px-2 py-1.5 outline-0 forced-color-adjust-none select-none",
    "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto]",
    "supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
    "not-has-data-[slot=dropdown-item-details]:items-center",
    "has-data-[slot=dropdown-item-details]:**:data-[slot=checked-icon]:mt-[1.5px]",
    "forced-color:text-[Highlight] forced-colors:text-[LinkText]",
    "**:data-[slot=avatar]:mr-2 **:data-[slot=avatar]:size-5 **:data-[slot=avatar]:*:mr-2 **:data-[slot=avatar]:*:size-5",
    "*:data-[slot=icon]:mr-2",
    "**:data-[slot=icon]:text-muted **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0 **:data-[slot=icon]:align-middle",
    "focus:data-danger:**:data-[slot=icon]:text-danger",
    "data-[slot=menu-radio]:*:data-[slot=icon]:size-3",
    "forced-colors:**:data-[slot=icon]:text-[CanvasText] forced-colors:group-focus:**:data-[slot=icon]:text-[Canvas]",
    "[&>[slot=label]+[data-slot=icon]]:absolute [&>[slot=label]+[data-slot=icon]]:right-0",
    "hover:bg-modifier-hover",
    "data-danger:text-danger",
    "data-danger:hover:bg-modifier-danger/10",
    "data-danger:**:data-[slot=icon]:text-danger",
    "focus:data-danger:**:data-[slot=icon]:text-error"
  ],
  variants: {
    isDisabled: {
      true: "text-muted forced-colors:text-[GrayText]"
    },
    isSelected: {
      true: "**:data-[slot=avatar]:hidden **:data-[slot=avatar]:*:hidden **:data-[slot=icon]:hidden"
    }
  }
})

const dropdownSectionStyles = tv({
  slots: {
    section: "col-span-full grid grid-cols-[auto_1fr]",
    header: "text-muted text-ui-sm col-span-full px-2 py-1 font-medium"
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
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)

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
            <div
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

type DropdownItemDetailProps = TextProps & {
  label?: TextProps["children"]
  description?: TextProps["children"]
  classNames?: {
    label?: TextProps["className"]
    description?: TextProps["className"]
  }
}

const DropdownItemDetails = ({
  label,
  description,
  classNames,
  ...props
}: DropdownItemDetailProps) => {
  const { slot, children, title, ...restProps } = props

  return (
    <div
      data-slot="dropdown-item-details"
      className="col-start-2 flex flex-col gap-y-0.5"
      {...restProps}
    >
      {label && (
        <Text
          slot={slot ?? "label"}
          className={cn("text-ui-base font-medium", classNames?.label)}
          {...restProps}
        >
          {label}
        </Text>
      )}
      {description && (
        <Text
          slot={slot ?? "description"}
          className={cn("text-muted text-ui-base", classNames?.description)}
          {...restProps}
        >
          {description}
        </Text>
      )}
      {!title && children}
    </div>
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

type DropdownSeparatorProps = SeparatorProps

const DropdownSeparator = (props: DropdownSeparatorProps) => (
  <Separator
    orientation="horizontal"
    {...props}
    className={cn(
      "bg-modifier-border col-span-full -mx-1 my-1 h-px",
      props.className
    )}
  />
)

type DropdownKeyboardProps = React.ComponentProps<typeof Keyboard>

const DropdownKeyboard = (props: DropdownKeyboardProps) => {
  return (
    <Keyboard
      {...props}
      classNames={{
        base: cn(
          // TODO: fix
          "group-hover:text-primary-fg group-focus:text-primary-fg absolute right-2 pl-2",
          props.className
        )
      }}
    />
  )
}

export {
  DropdownItem,
  DropdownItemDetails,
  DropdownKeyboard,
  DropdownLabel,
  DropdownSection,
  DropdownSeparator,
  dropdownItemStyles,
  dropdownSectionStyles
}
export type {
  DropdownItemDetailProps,
  DropdownItemProps,
  DropdownKeyboardProps,
  DropdownLabelProps,
  DropdownSectionProps,
  DropdownSeparatorProps
}
