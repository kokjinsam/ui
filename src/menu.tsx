"use client"

import * as React from "react"
import type {
  ButtonProps,
  MenuItemProps as MenuItemPrimitiveProps,
  MenuProps as MenuPrimitiveProps,
  MenuSectionProps as MenuSectionPrimitiveProps,
  MenuTriggerProps as MenuTriggerPrimitiveProps,
  PopoverProps,
  SubmenuTriggerProps as SubmenuTriggerPrimitiveProps
} from "react-aria-components"
import {
  Button,
  Collection,
  Header,
  MenuItem as MenuItemPrimitive,
  Menu as MenuPrimitive,
  MenuSection as MenuSectionPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  SubmenuTrigger as SubmenuTriggerPrimitive,
  composeRenderProps
} from "react-aria-components"
import type { VariantProps } from "tailwind-variants"
import {
  DropdownItemDetails,
  DropdownKeyboard,
  DropdownLabel,
  DropdownSeparator,
  dropdownItemStyles,
  dropdownSectionStyles
} from "./dropdown"
import { PopoverContent } from "./popover"
import { cn } from "./utils"

type MenuProps = MenuTriggerPrimitiveProps

const Menu = (props: MenuProps) => <MenuTriggerPrimitive {...props} />

type MenuSubMenuProps = SubmenuTriggerPrimitiveProps

const MenuSubMenu = ({ delay = 0, ...props }: MenuSubMenuProps) => (
  <SubmenuTriggerPrimitive {...props} delay={delay} />
)

type MenuTriggerProps = ButtonProps

const MenuTrigger = (props: MenuTriggerProps) => (
  <Button
    data-slot="menu-trigger"
    {...props}
    className={cn(
      "relative inline text-left outline-hidden",
      "focus-visible:ring-interactive-focus focus-visible:ring",
      props.className
    )}
  >
    {(values) => (
      <>
        {typeof props.children === "function"
          ? props.children(values)
          : props.children}
      </>
    )}
  </Button>
)

type MenuContentProps<T> = Pick<
  PopoverProps,
  | "placement"
  | "offset"
  | "crossOffset"
  | "arrowBoundaryOffset"
  | "triggerRef"
  | "isOpen"
  | "onOpenChange"
  | "shouldFlip"
> &
  MenuPrimitiveProps<T> & {
    classNames?: {
      popover?: string
    }
    showArrow?: boolean
  }

const MenuContent = <T extends object>({
  classNames,
  showArrow = false,
  ...props
}: MenuContentProps<T>) => (
  <PopoverContent
    isOpen={props.isOpen}
    onOpenChange={props.onOpenChange}
    shouldFlip={props.shouldFlip}
    showArrow={showArrow}
    offset={props.offset}
    placement={props.placement}
    crossOffset={props.crossOffset}
    triggerRef={props.triggerRef}
    arrowBoundaryOffset={props.arrowBoundaryOffset}
    className={cn(
      "z-modal min-w-40 p-0 shadow-xs outline-hidden",
      classNames?.popover
    )}
  >
    <MenuPrimitive
      data-slot="menu-content"
      {...props}
      className={cn(
        // TODO Why are we using --visual-viewport-height here?
        "grid max-h-[calc(var(--visual-viewport-height)-10rem)] grid-cols-[auto_1fr] overflow-auto rounded-md p-1 outline-hidden",
        "sm:max-h-[inherit]",
        // TODO Do we need margin between separators?
        "*:[[role='group']+[role=group]]:mt-4 *:[[role='group']+[role=separator]]:mt-1",
        props.className
      )}
    />
  </PopoverContent>
)

type MenuItemProps = MenuItemPrimitiveProps &
  VariantProps<typeof dropdownItemStyles> & {
    isDanger?: boolean
  }

const MenuItem = ({ isDanger = false, children, ...props }: MenuItemProps) => {
  const textValue =
    props.textValue || (typeof children === "string" ? children : undefined)

  return (
    <MenuItemPrimitive
      data-danger={isDanger ? "true" : undefined}
      {...props}
      textValue={textValue}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropdownItemStyles({
          ...renderProps,
          className: renderProps.hasSubmenu
            ? cn([
                "data-open:data-danger:bg-modifier-danger/10 data-open:data-danger:text-danger",
                "data-open:bg-interactive-hover",
                "data-open:*:data-[slot=icon]:text-accent data-open:*:[.text-muted]:text-accent",
                className
              ])
            : className
        })
      )}
    >
      {(values) => (
        <>
          {values.isSelected && (
            <div
              className="lucide-check mr-2 size-4"
              data-slot="checked-icon"
            />
          )}

          {typeof children === "function" ? children(values) : children}

          {values.hasSubmenu && (
            <div
              data-slot="chevron"
              className="lucide-chevron-right absolute right-2 size-3.5"
            />
          )}
        </>
      )}
    </MenuItemPrimitive>
  )
}

type MenuHeaderProps = React.ComponentProps<typeof Header> & {
  separator?: boolean
}

const MenuHeader = ({ separator = false, ...props }: MenuHeaderProps) => (
  <Header
    {...props}
    className={cn(
      "col-span-full px-2 py-1.5 text-base font-semibold sm:text-sm",
      separator && "-mx-1 mb-1 border-b sm:px-3 sm:pb-[0.625rem]",
      props.className
    )}
  />
)

const { section, header } = dropdownSectionStyles()

type MenuSectionProps<T> = MenuSectionPrimitiveProps<T> & {
  title?: string
}

const MenuSection = <T extends object>({
  title,
  ...props
}: MenuSectionProps<T>) => {
  return (
    <MenuSectionPrimitive
      {...props}
      className={section({ className: props.className })}
    >
      {title && <Header className={header()}>{title}</Header>}
      <Collection items={props.items}>{props.children}</Collection>
    </MenuSectionPrimitive>
  )
}

const MenuSeparator = DropdownSeparator
const MenuItemDetails = DropdownItemDetails
const MenuKeyboard = DropdownKeyboard
const MenuLabel = DropdownLabel

Menu.Keyboard = MenuKeyboard
Menu.Content = MenuContent
Menu.Header = MenuHeader
Menu.Item = MenuItem
Menu.Section = MenuSection
Menu.Separator = MenuSeparator
Menu.ItemDetails = MenuItemDetails
Menu.Label = MenuLabel
Menu.Trigger = MenuTrigger
Menu.Submenu = MenuSubMenu

export { Menu }
export type {
  MenuContentProps,
  MenuHeaderProps,
  MenuItemProps,
  MenuProps,
  MenuSectionProps,
  MenuTriggerProps
}
