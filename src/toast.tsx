import * as React from "react"
import { Toaster as ToasterPrimitive, type ToasterProps } from "sonner"

const Toast = ({ ...props }: ToasterProps) => (
  <ToasterPrimitive
    className="toaster group"
    style={
      {
        "--normal-background": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      } as React.CSSProperties
    }
    {...props}
  />
)

export { Toast }
export type { ToasterProps }
