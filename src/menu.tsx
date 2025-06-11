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
import {
  DropdownDescription,
  DropdownKeyboard,
  DropdownLabel,
  DropdownSeparator,
  dropdownItemStyles,
  dropdownSectionStyles
} from "./dropdown"
import { PopoverContent, PopoverContentProps } from "./popover"
import { cn, composeClassName, type VariantProps } from "./utils"

type MenuProps = MenuTriggerPrimitiveProps

const Menu = (props: MenuProps) => <MenuTriggerPrimitive {...props} />

type MenuSubMenuProps = SubmenuTriggerPrimitiveProps

const MenuSubMenu = ({ delay = 0, ...props }: MenuSubMenuProps) => (
  <SubmenuTriggerPrimitive {...props} delay={delay}>
    {props.children}
  </SubmenuTriggerPrimitive>
)

type MenuTriggerProps = ButtonProps

const MenuTrigger = ({ className, ...props }: MenuTriggerProps) => (
  <Button
    data-slot="menu-trigger"
    {...props}
    className={composeClassName(
      className,
      "focus-visible:ring-primary relative inline text-left outline-hidden focus-visible:ring-1"
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
      popover?: PopoverContentProps["className"]
    }
    showArrow?: boolean
    respectScreen?: boolean
  }

const MenuContent = <T extends object>({
  classNames,
  showArrow = false,
  respectScreen = true,
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
    className={composeClassName(
      classNames?.popover,
      "z-50 p-0 shadow-xs outline-hidden sm:min-w-40"
    )}
  >
    <MenuPrimitive
      data-slot="menu-content"
      {...props}
      className={composeClassName(
        props.className,
        "grid max-h-[calc(var(--visual-viewport-height)-10rem)] grid-cols-[auto_1fr] overflow-auto rounded-xl p-1 outline-hidden [clip-path:inset(0_0_0_0_round_calc(var(--radius-lg)-2px))] sm:max-h-[inherit] *:[[role='group']+[role=group]]:mt-4 *:[[role='group']+[role=separator]]:mt-1"
      )}
    />
  </PopoverContent>
)

type MenuItemProps = MenuItemPrimitiveProps &
  VariantProps<typeof dropdownItemStyles> & {
    isDanger?: boolean
  }

const MenuItem = ({ isDanger = false, ...props }: MenuItemProps) => {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)

  return (
    <MenuItemPrimitive
      textValue={textValue}
      data-danger={isDanger ? "true" : undefined}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropdownItemStyles({
          ...renderProps,
          className: renderProps.hasSubmenu
            ? cn(
                "data-open:data-danger:bg-danger/10 data-open:data-danger:text-danger",
                "data-open:bg-accent data-open:text-accent-foreground data-open:*:data-[slot=icon]:text-accent-foreground data-open:*:[.text-muted-foreground]:text-accent-foreground",
                className
              )
            : className
        })
      )}
    >
      {(values) => (
        <>
          {values.isSelected && (
            <span
              className="lucide-check mr-2 size-4"
              data-slot="checked-icon"
            />
          )}

          {typeof props.children === "function"
            ? props.children(values)
            : props.children}

          {values.hasSubmenu && (
            <span
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
      "col-span-full px-2.5 py-2 text-base font-semibold sm:text-sm",
      separator && "-mx-1 mb-1 border-b sm:px-3 sm:pb-[0.625rem]",
      props.className
    )}
  />
)

const { section, header } = dropdownSectionStyles()

interface MenuSectionProps<T> extends MenuSectionPrimitiveProps<T> {
  ref?: React.Ref<HTMLDivElement>
  title?: string
}

const MenuSection = <T extends object>({
  className,
  ref,
  ...props
}: MenuSectionProps<T>) => {
  return (
    <MenuSectionPrimitive
      ref={ref}
      className={section({ className })}
      {...props}
    >
      {"title" in props && <Header className={header()}>{props.title}</Header>}
      <Collection items={props.items}>{props.children}</Collection>
    </MenuSectionPrimitive>
  )
}

const MenuSeparator = DropdownSeparator
const MenuKeyboard = DropdownKeyboard
const MenuLabel = DropdownLabel
const MenuDescription = DropdownDescription

Menu.Keyboard = MenuKeyboard
Menu.Content = MenuContent
Menu.Header = MenuHeader
Menu.Item = MenuItem
Menu.Section = MenuSection
Menu.Separator = MenuSeparator
Menu.Description = MenuDescription
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
