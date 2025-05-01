"use client"

import * as React from "react"
import { Toaster as ToasterPrimitive, type ToasterProps } from "sonner"

const Toaster = (props: ToasterProps) => (
  <ToasterPrimitive
    className="toaster group"
    richColors
    toastOptions={{
      classNames: {
        toast: "border-0! bg-surface-primary! inset-ring! inset-ring-line!",
        title: "text-normal! font-medium!",
        description: "text-muted!",
        actionButton:
          "bg-control! text-normal! shadow-control! hover:bg-control-hover! hover:shadow-control-hover!",
        cancelButton:
          "bg-control! text-normal! shadow-control! hover:bg-control-hover! hover:shadow-control-hover!",
        closeButton:
          "bg-control! text-normal! shadow-control! hover:bg-control-hover! hover:shadow-control-hover!"
      }
    }}
    {...props}
  />
)

export { Toaster }
export type { ToasterProps }
