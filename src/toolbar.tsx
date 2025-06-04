import * as React from "react"
import type {
  GroupProps,
  SeparatorProps,
  ToolbarProps
} from "react-aria-components"
import {
  Group,
  Toolbar as ToolbarPrimitive,
  composeRenderProps
} from "react-aria-components"
import { Separator } from "./separator"
import { Toggle, type ToggleProps } from "./toggle"
import { cn, composeClassName } from "./utils"

const ToolbarContext = React.createContext<{
  orientation?: ToolbarProps["orientation"]
}>({
  orientation: "horizontal"
})

const Toolbar = ({ orientation = "horizontal", ...props }: ToolbarProps) => (
  <ToolbarContext.Provider value={{ orientation }}>
    <ToolbarPrimitive
      orientation={orientation}
      {...props}
      className={composeRenderProps(
        props.className,
        (className, { orientation }) =>
          cn(
            "group flex flex-row gap-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            orientation === "horizontal"
              ? "flex-row [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : "flex-col items-start",
            className
          )
      )}
    />
  </ToolbarContext.Provider>
)

const ToolbarGroupContext = React.createContext<{ isDisabled?: boolean }>({})

type ToolbarGroupProps = GroupProps

const ToolbarGroup = ({ isDisabled, ...props }: ToolbarGroupProps) => (
  <ToolbarGroupContext.Provider value={{ isDisabled }}>
    <Group
      {...props}
      className={composeClassName(
        props.className,
        "flex gap-2 group-data-[orientation=vertical]:flex-col group-data-[orientation=vertical]:items-start"
      )}
    >
      {props.children}
    </Group>
  </ToolbarGroupContext.Provider>
)

type ToggleItemProps = ToggleProps

const ToolbarItem = ({ isDisabled, ...props }: ToggleItemProps) => {
  const context = React.useContext(ToolbarGroupContext)
  const effectiveIsDisabled = isDisabled || context.isDisabled

  return <Toggle isDisabled={effectiveIsDisabled} {...props} />
}

type ToolbarSeparatorProps = SeparatorProps

const ToolbarSeparator = (props: ToolbarSeparatorProps) => {
  const { orientation } = React.useContext(ToolbarContext)
  const effectiveOrientation =
    orientation === "vertical" ? "horizontal" : "vertical"

  return (
    <Separator
      orientation={effectiveOrientation}
      {...props}
      className={cn(
        effectiveOrientation === "vertical" ? "mx-1.5" : "my-1.5 w-9",
        props.className
      )}
    />
  )
}

Toolbar.Group = ToolbarGroup
Toolbar.Separator = ToolbarSeparator
Toolbar.Item = ToolbarItem

export { Toolbar }
export type {
  ToggleItemProps,
  ToolbarGroupProps,
  ToolbarProps,
  ToolbarSeparatorProps
}
