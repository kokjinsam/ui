import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import * as React from "react"
import { cn } from "./utils"

type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  classNames?: {
    viewport?: React.ComponentProps<
      typeof ScrollAreaPrimitive.Viewport
    >["className"]
  }
}

const ScrollArea = ({ children, classNames, ...props }: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root
    {...props}
    className={cn("relative overflow-hidden", props.className)}
  >
    <ScrollAreaPrimitive.Viewport
      className={cn("h-full w-full rounded-[inherit]", classNames?.viewport)}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
)

type ScrollBarProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>

const ScrollBar = ({ orientation = "vertical", ...props }: ScrollBarProps) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    orientation={orientation}
    {...props}
    className={cn(
      "flex touch-none transition-colors select-none",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      props.className
    )}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-[var(--ui3)]" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
)

export { ScrollArea, ScrollBar }
