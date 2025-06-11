import { LayoutGroup, motion } from "motion/react"
import * as React from "react"
import type {
  TabListProps as TabListPrimitiveProps,
  TabPanelProps as TabPanelPrimitiveProps,
  TabProps as TabPrimitiveProps,
  TabsProps as TabsPrimitiveProps
} from "react-aria-components"
import {
  TabList as TabListPrimitive,
  TabPanel as TabPanelPrimitive,
  Tab as TabPrimitive,
  Tabs as TabsPrimitive,
  composeRenderProps
} from "react-aria-components"
import { cn, composeClassName, tv } from "./utils"

const tabsStyles = tv({
  base: "group/tabs flex gap-4 forced-color-adjust-none",
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "w-[800px] flex-row"
    }
  }
})

type TabsProps = TabsPrimitiveProps & {
  ref?: React.RefObject<HTMLDivElement>
}

const Tabs = (props: TabsProps) => (
  <TabsPrimitive
    {...props}
    className={composeRenderProps(props.className, (className, renderProps) =>
      tabsStyles({
        ...renderProps,
        className
      })
    )}
  />
)

const tabListStyles = tv({
  base: "flex forced-color-adjust-none",
  variants: {
    orientation: {
      horizontal: "border-border flex-row gap-x-5 border-b",
      vertical: "flex-col items-start gap-y-4 border-l"
    }
  }
})

type TabListProps<T extends object> = TabListPrimitiveProps<T> & {
  ref?: React.RefObject<HTMLDivElement>
}

const TabList = <T extends object>(props: TabListProps<T>) => {
  const id = React.useId()

  return (
    <LayoutGroup id={id}>
      <TabListPrimitive
        {...props}
        className={composeRenderProps(
          props.className,
          (className, renderProps) =>
            tabListStyles({ ...renderProps, className })
        )}
      />
    </LayoutGroup>
  )
}

const tabStyles = tv({
  base: [
    "hover:text-foreground relative flex cursor-default items-center rounded-full text-sm font-medium whitespace-nowrap outline-hidden transition *:data-[slot=icon]:mr-2 *:data-[slot=icon]:size-4",
    "group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:py-0 group-data-[orientation=vertical]/tabs:pr-2 group-data-[orientation=vertical]/tabs:pl-4",
    "group-data-[orientation=horizontal]/tabs:pb-3"
  ],
  variants: {
    isSelected: {
      false: "text-muted-foreground",
      true: "text-foreground"
    },
    isFocused: { false: "ring-0", true: "text-foreground" },
    isDisabled: {
      true: "text-muted-foreground/50"
    }
  }
})

type TabProps = TabPrimitiveProps & {
  ref?: React.RefObject<HTMLButtonElement>
}

const Tab = (props: TabProps) => (
  <TabPrimitive
    {...props}
    className={composeRenderProps(props.className, (className, renderProps) =>
      tabStyles({
        ...renderProps,
        className: cn("href" in props && "cursor-pointer", className)
      })
    )}
  >
    {({ isSelected }) => (
      <>
        {props.children as React.ReactNode}
        {isSelected && (
          <motion.span
            data-slot="selected-indicator"
            className={cn(
              "bg-foreground absolute rounded",
              // horizontal
              "group-data-[orientation=horizontal]/tabs:inset-x-0 group-data-[orientation=horizontal]/tabs:-bottom-px group-data-[orientation=horizontal]/tabs:h-0.5 group-data-[orientation=horizontal]/tabs:w-full",
              // vertical
              "group-data-[orientation=vertical]/tabs:left-0 group-data-[orientation=vertical]/tabs:h-[calc(100%-10%)] group-data-[orientation=vertical]/tabs:w-0.5 group-data-[orientation=vertical]/tabs:transform"
            )}
            layoutId="current-selected"
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
          />
        )}
      </>
    )}
  </TabPrimitive>
)

type TabPanelProps = TabPanelPrimitiveProps & {
  ref?: React.RefObject<HTMLDivElement>
}

const TabPanel = (props: TabPanelProps) => (
  <TabPanelPrimitive
    {...props}
    className={composeClassName(
      props.className,
      "text-foreground flex-1 text-sm focus-visible:outline-hidden"
    )}
  />
)

Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel

export { Tabs }
export type { TabListProps, TabPanelProps, TabProps, TabsProps }
