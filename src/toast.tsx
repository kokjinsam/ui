"use client"

import * as React from "react"
import { Toaster as ToasterPrimitive, type ToasterProps } from "sonner"

const Toaster = (props: ToasterProps) => (
  <ToasterPrimitive
    className="toaster group"
    richColors
    toastOptions={{
      classNames: {
        toast: "border-0! bg-ui-primary! inset-ring! inset-ring-ui-line!",
        title: "text-normal! font-medium!",
        description: "text-muted!",
        actionButton:
          "bg-interactive-normal! text-normal! shadow-interactive! hover:bg-interactive-hover! hover:shadow-interactive-hover!",
        cancelButton:
          "bg-interactive-normal! text-normal! shadow-interactive! hover:bg-interactive-hover! hover:shadow-interactive-hover!",
        closeButton:
          "bg-interactive-normal! text-normal! shadow-interactive! hover:bg-interactive-hover! hover:shadow-interactive-hover!"
      }
    }}
    {...props}
  />
)

export { Toaster }
export type { ToasterProps }
