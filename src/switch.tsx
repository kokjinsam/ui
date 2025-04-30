"use client"

import * as React from "react"
import type { SwitchProps as SwitchPrimitiveProps } from "react-aria-components"
import { Switch as SwitchPrimitive } from "react-aria-components"
import { cn } from "./utils"

type SwitchProps = SwitchPrimitiveProps

const Switch = (props: SwitchProps) => (
  <SwitchPrimitive
    {...props}
    className={cn(
      "group text-ui-base inline-flex touch-none items-center",
      props.className
    )}
    style={{ WebkitTapHighlightColor: "transparent" }}
  >
    {(values) => (
      <>
        <span
          className={cn(
            "bg-ui-line mr-2 h-5 w-8 cursor-pointer rounded-full border-2 border-transparent transition duration-200",
            "group-data-[hovered]:bg-ui-line-hover",
            "group-data-[focused]:ring-interactive-focus group-data-[focused]:ring-2",
            "group-data-[disabled]:cursor-default group-data-[disabled]:opacity-50",
            "group-data-[selected]:bg-interactive-accent"
          )}
        >
          <span
            className={cn(
              "bg-interactive-normal block size-4 origin-right rounded-full shadow-sm transition-all duration-200",
              "forced-colors:disabled:outline-[GrayText]",

              "group-data-[selected]:ml-3",
              "group-data-[selected]:group-data-[pressed]:ml-2",
              "group-data-[pressed]:w-5"
            )}
          />
        </span>
        {typeof props.children === "function"
          ? props.children(values)
          : props.children}
      </>
    )}
  </SwitchPrimitive>
)

export { Switch }
export type { SwitchProps }
