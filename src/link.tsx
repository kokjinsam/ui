import * as React from "react"
import type { LinkProps as LinkPrimitiveProps } from "react-aria-components"
import { Link as LinkPrimitive } from "react-aria-components"
import { cn } from "./utils"

type LinkProps = LinkPrimitiveProps & {
  intent?: "primary" | "secondary" | "unstyled"
}

const Link = ({ intent = "unstyled", ...props }: LinkProps) => (
  <LinkPrimitive
    {...props}
    className={cn(
      "outline-0 outline-offset-2 transition-[color,_opacity]",
      "disabled:cursor-default disabled:opacity-60",
      "focus-visible:outline-ring focus-visible:outline-2",
      "forced-colors:outline-[Highlight] forced-colors:disabled:text-[GrayText]",
      intent === "unstyled" && "text-current",
      intent === "primary" && "text-primary hover:underline",
      intent === "secondary" && "text-secondary-foreground hover:underline",
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
  </LinkPrimitive>
)

export { Link }
export type { LinkProps }
