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
  DropdownItemDetails,
  DropdownKeyboard,
  DropdownLabel,
  DropdownSeparator,
  dropdownItemStyles,
  dropdownSectionStyles
} from "./dropdown"
import { PopoverContent } from "./popover"
import type { VariantProps } from "./utils"
import { cn } from "./utils"

type MenuContextProps = {
  respectScreen: boolean
}

const MenuContext = React.createContext<MenuContextProps>({
  respectScreen: true
})

type MenuProps = MenuTriggerPrimitiveProps & {
  respectScreen?: boolean
}

const Menu = ({ respectScreen = true, ...props }: MenuProps) => (
  <MenuContext value={{ respectScreen }}>
    <MenuTriggerPrimitive {...props}>{props.children}</MenuTriggerPrimitive>
  </MenuContext>
)

type MenuSubMenuProps = SubmenuTriggerPrimitiveProps & {
  delay?: number
}

const MenuSubMenu = ({ delay = 0, ...props }: MenuSubMenuProps) => (
  <SubmenuTriggerPrimitive {...props} delay={delay}>
    {props.children}
  </SubmenuTriggerPrimitive>
)

type MenuTriggerProps = ButtonProps

const MenuTrigger = (props: MenuTriggerProps) => (
  <Button
    data-slot="menu-trigger"
    {...props}
    className={composeRenderProps(props.className, (className) =>
      cn(
        "focus-visible:ring-primary relative inline text-left outline-hidden focus-visible:ring-1",
        className
      )
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
    className?: string
    popoverClassName?: string
    showArrow?: boolean
    respectScreen?: boolean
  }

const MenuContent = <T extends object>({
  showArrow = false,
  ...props
}: MenuContentProps<T>) => {
  const { respectScreen } = React.use(MenuContext)

  return (
    <PopoverContent
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      shouldFlip={props.shouldFlip}
      respectScreen={respectScreen}
      showArrow={showArrow}
      offset={props.offset}
      placement={props.placement}
      crossOffset={props.crossOffset}
      triggerRef={props.triggerRef}
      arrowBoundaryOffset={props.arrowBoundaryOffset}
      className={composeRenderProps(props.popoverClassName, (className) =>
        cn("z-50 p-0 shadow-xs outline-hidden sm:min-w-40", className)
      )}
    >
      <MenuPrimitive
        data-slot="menu-content"
        {...props}
        className={composeRenderProps(props.className, (className) =>
          cn(
            "grid max-h-[calc(var(--visual-viewport-height)-10rem)] grid-cols-[auto_1fr] overflow-auto rounded-xl p-1 outline-hidden [clip-path:inset(0_0_0_0_round_calc(var(--radius-lg)-2px))] sm:max-h-[inherit] *:[[role='group']+[role=group]]:mt-4 *:[[role='group']+[role=separator]]:mt-1",
            className
          )
        )}
      />
    </PopoverContent>
  )
}

type MenuItemProps = MenuItemPrimitiveProps &
  VariantProps<typeof dropdownItemStyles> & {
    isDanger?: boolean
  }

const MenuItem = ({ isDanger = false, children, ...props }: MenuItemProps) => {
  const textValue =
    props.textValue || (typeof children === "string" ? children : undefined)

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
                "data-open:bg-accent data-open:text-accent-fg data-open:*:data-[slot=icon]:text-accent-fg data-open:*:[.text-muted-fg]:text-accent-fg",
                className
              )
            : className
        })
      )}
    >
      {(values) => (
        <>
          {values.isSelected && (
            <div
              className="lucide-check -mx-0.5 mr-2 size-4"
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

const MenuHeader = ({
  className,
  separator = false,
  ...props
}: MenuHeaderProps) => (
  <Header
    className={cn(
      "col-span-full px-2.5 py-2 text-base font-semibold sm:text-sm",
      separator && "-mx-1 mb-1 border-b sm:px-3 sm:pb-[0.625rem]",
      className
    )}
    {...props}
  />
)

const { section, header } = dropdownSectionStyles()

type MenuSectionProps<T> = MenuSectionPrimitiveProps<T> & {
  ref?: React.Ref<HTMLDivElement>
  title?: string
}

const MenuSection = <T extends object>({
  className,
  ref,
  ...props
}: MenuSectionProps<T>) => (
  <MenuSectionPrimitive ref={ref} className={section({ className })} {...props}>
    {"title" in props && <Header className={header()}>{props.title}</Header>}
    <Collection items={props.items}>{props.children}</Collection>
  </MenuSectionPrimitive>
)

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
