import * as React from "react"
import * as ResizablePrimitive from "react-resizable-panels"
import { cn } from "./utils"

type PanelGroupProps = React.ComponentProps<
  typeof ResizablePrimitive.PanelGroup
>

const PanelGroup = (props: PanelGroupProps) => (
  <ResizablePrimitive.PanelGroup
    {...props}
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      props.className
    )}
  />
)

type PanelProps = React.ComponentProps<typeof ResizablePrimitive.Panel>

const Panel = ResizablePrimitive.Panel

type PanelResizableHandleProps = React.ComponentProps<
  typeof ResizablePrimitive.PanelResizeHandle
>

const PanelResizableHandle = (props: PanelResizableHandleProps) => (
  <ResizablePrimitive.PanelResizeHandle
    {...props}
    className={cn(
      "relative flex w-px items-center justify-center",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
      "data-[panel-group-direction=vertical]:h-px",
      "data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:translate-x-0",
      "data-[panel-group-direction=vertical]:after:-translate-y-1/2",
      "data-[panel-group-direction=vertical]:after:left-0",
      "data-[panel-group-direction=vertical]:after:w-full",
      "data-[panel-group-direction=vertical]:after:h-1",
      "data-[resize-handle-state=hover]:after:bg-interactive",
      "data-[resize-handle-active]:after:bg-interactive",
      "[&[data-panel-group-direction=vertical]>div]:rotate-90",
      "focus-visible:outline-none",
      props.className
    )}
  />
)

export { Panel, PanelGroup, PanelResizableHandle }
export type { PanelGroupProps, PanelProps, PanelResizableHandleProps }
