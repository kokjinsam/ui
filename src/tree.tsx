import * as React from "react"
import type {
  TreeItemProps as TreeItemPrimitiveProps,
  TreeProps as TreePrimitiveProps
} from "react-aria-components"
import {
  Button,
  TreeItemContent as TreeContentPrimitive,
  TreeItem as TreeItemPrimitive,
  Tree as TreePrimitive,
  composeRenderProps
} from "react-aria-components"
import { Checkbox } from "./checkbox"
import { cn, composeClassName, tv } from "./utils"

type TreeProps<T> = TreePrimitiveProps<T>

const Tree = <T extends object>(props: TreeProps<T>) => (
  <TreePrimitive
    {...props}
    className={composeClassName(
      props.className,
      "flex max-h-96 min-w-72 cursor-default flex-col overflow-auto rounded-lg border py-2 outline-hidden forced-color-adjust-none [scrollbar-width:thin] sm:text-sm [&::-webkit-scrollbar]:size-0.5",
      "focus-visible:outline-ring/70 focus-visible:outline-2 focus-visible:outline-offset-[-1px]"
    )}
  />
)

const treeItemStyles = tv({
  base: [
    "p-[0.286rem_0.286rem_0.286rem_0.571rem] pl-[calc((var(--tree-item-level)-1)*20px+0.571rem+var(--padding))] outline-hidden [--padding:20px] [&_[data-expanded]_[slot=chevron]_[data-slot=icon]]:rotate-90",
    "[&_[slot=chevron]_[data-slot=icon]]:text-muted-foreground [&_[slot=chevron]]:outline-hidden",
    "data-has-child-rows:[--padding:0px]"
  ],
  variants: {
    isExpanded: {
      true: "[&_[slot=chevron]_[data-slot=icon]]:text-foreground [&_[slot=chevron]_[data-slot=icon]]:rotate-90 [&_[slot=chevron]_[data-slot=icon]]:transition [&_[slot=chevron]_[data-slot=icon]]:duration-200"
    },
    isFocusVisible: {
      true: "focus-visible:ring-primary [&_[slot=chevron]_[data-slot=icon]]:text-foreground focus:outline-hidden focus-visible:ring-1"
    },
    isDisabled: {
      true: "opacity-50 forced-colors:text-[GrayText]"
    }
  }
})

type TreeItemProps<T> = TreeItemPrimitiveProps<T>

const TreeItem = <T extends object>(props: TreeItemProps<T>) => (
  <TreeItemPrimitive
    {...props}
    className={composeRenderProps(props.className, (className, renderProps) =>
      treeItemStyles({
        ...renderProps,
        className
      })
    )}
  >
    {props.children}
  </TreeItemPrimitive>
)

type TreeContentProps = React.ComponentProps<typeof TreeContentPrimitive> & {
  className?: string
}

const TreeContent = (props: TreeContentProps) => (
  <TreeContentPrimitive {...props}>
    <div className={cn("flex items-center", props.className)}>
      {props.children as React.ReactNode}
    </div>
  </TreeContentPrimitive>
)

const TreeIndicator = () => (
  <Button className="relative shrink-0" slot="chevron">
    <span data-slot="icon" className="lucide-chevron-right size-5" />
  </Button>
)

const TreeCheckbox = () => <Checkbox slot="selection" />

const TreeLabel = (props: React.ComponentProps<"span">) => <span {...props} />

Tree.Checkbox = TreeCheckbox
Tree.Content = TreeContent
Tree.Indicator = TreeIndicator
Tree.Item = TreeItem
Tree.Label = TreeLabel

export { Tree }
export type { TreeItemProps, TreeProps }
