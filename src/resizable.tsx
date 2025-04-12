import * as React from "react"
import * as ResizablePrimitive from "react-resizable-panels"
import { cn } from "./utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle>) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2",
      "data-[panel-group-direction=vertical]:h-px",
      "data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:translate-x-0",
      "data-[panel-group-direction=vertical]:after:-translate-y-1/2",
      "data-[panel-group-direction=vertical]:after:left-0",
      "data-[panel-group-direction=vertical]:after:w-full",
      "data-[panel-group-direction=vertical]:after:h-1",
      "data-[resize-handle-state=hover]:after:bg-interactive-accent",
      "data-[resize-handle-active]:after:bg-interactive-accent",
      "[&[data-panel-group-direction=vertical]>div]:rotate-90",
      "focus-visible:outline-none",
      className
    )}
    {...props}
  />
)

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
