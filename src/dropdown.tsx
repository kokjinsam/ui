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
    "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] not-has-data-[slot=dropdown-item-details]:items-center has-data-[slot=dropdown-item-details]:**:data-[slot=checked-icon]:mt-[1.5px] supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
    "group forced-color:text-[Highlight] text-fg relative cursor-default rounded-[calc(var(--radius-lg)-1px)] px-[calc(var(--spacing)*2.3)] py-[calc(var(--spacing)*1.3)] text-base outline-0 forced-color-adjust-none select-none sm:text-sm/6 forced-colors:text-[LinkText]",
    "**:data-[slot=avatar]:mr-2 **:data-[slot=avatar]:size-6 **:data-[slot=avatar]:*:mr-2 **:data-[slot=avatar]:*:size-6 sm:**:data-[slot=avatar]:size-5 sm:**:data-[slot=avatar]:*:size-5",
    "data-danger:**:data-[slot=icon]:text-danger/60 **:data-[slot=icon]:text-muted-fg focus:data-danger:**:data-[slot=icon]:text-danger **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0",
    "*:data-[slot=icon]:mr-2 data-[slot=menu-radio]:*:data-[slot=icon]:size-3",
    "forced-colors:**:data-[slot=icon]:text-[CanvasText] forced-colors:group-focus:**:data-[slot=icon]:text-[Canvas]",
    "[&>[slot=label]+[data-slot=icon]]:absolute [&>[slot=label]+[data-slot=icon]]:right-0"
  ],
  variants: {
    isDisabled: {
      true: "text-muted-fg forced-colors:text-[GrayText]"
    },
    isSelected: {
      true: "**:data-[slot=avatar]:hidden **:data-[slot=avatar]:*:hidden **:data-[slot=icon]:hidden"
    },
    isFocused: {
      false: "data-danger:text-danger",
      true: [
        "**:data-[slot=icon]:text-accent-fg **:[kbd]:text-accent-fg",
        "bg-accent text-accent-fg forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "data-danger:bg-danger/10 data-danger:text-danger",
        "data-[slot=description]:text-accent-fg data-[slot=label]:text-accent-fg [&_.text-muted-fg]:text-accent-fg/80"
      ]
    }
  }
})

const dropdownSectionStyles = tv({
  slots: {
    section: "col-span-full grid grid-cols-[auto_1fr]",
    header:
      "text-muted-fg col-span-full px-2.5 py-1 text-sm font-medium sm:text-xs"
  }
})

const { section, header } = dropdownSectionStyles()

type DropdownSectionProps<T> = SectionProps<T> & {
  title?: string
}

const DropdownSection = <T extends object>({
  className,
  ...props
}: DropdownSectionProps<T>) => {
  return (
    <ListBoxSection className={section({ className })}>
      {"title" in props && <Header className={header()}>{props.title}</Header>}
      <Collection items={props.items}>{props.children}</Collection>
    </ListBoxSection>
  )
}

type DropdownItemProps = ListBoxItemProps

const DropdownItem = (props: DropdownItemProps) => {
  return (
    <ListBoxItemPrimitive
      {...props}
      textValue={
        typeof props.children === "string" ? props.children : props.textValue
      }
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropdownItemStyles({ ...renderProps, className })
      )}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          {isSelected && (
            <div
              className="lucide-check -mx-0.5 mr-2"
              data-slot="checked-icon"
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
      className="col-start-2 flex flex-col gap-y-1"
      {...restProps}
    >
      {label && (
        <Text
          slot={slot ?? "label"}
          className={cn("font-medium sm:text-sm", classNames?.label)}
          {...restProps}
        >
          {label}
        </Text>
      )}
      {description && (
        <Text
          slot={slot ?? "description"}
          className={cn("text-muted-fg text-xs", classNames?.description)}
          {...restProps}
        >
          {description}
        </Text>
      )}
      {!title && children}
    </div>
  )
}

type DropdownLabelProps = TextProps & {
  ref?: React.Ref<HTMLDivElement>
}

const DropdownLabel = ({ className, ref, ...props }: DropdownLabelProps) => (
  <Text
    slot="label"
    ref={ref}
    className={cn("col-start-2", className)}
    {...props}
  />
)

const DropdownSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator
    orientation="horizontal"
    className={cn("bg-border col-span-full -mx-1 my-1 h-px", className)}
    {...props}
  />
)

const DropdownKeyboard = ({
  className,
  ...props
}: React.ComponentProps<typeof Keyboard>) => {
  return (
    <Keyboard className={cn("absolute right-2 pl-2", className)} {...props} />
  )
}

/**
 * Note: This is not exposed component, but it's used in other components to render dropdowns.
 * @internal
 */
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
  DropdownLabelProps,
  DropdownSectionProps
}
