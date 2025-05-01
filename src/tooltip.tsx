"use client"

import * as React from "react"
import type { TooltipProps as TooltipPrimitiveProps } from "react-aria-components"
import {
  Button,
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
  composeRenderProps
} from "react-aria-components"
import type { VariantProps } from "./utils"
import { cn, tv } from "./utils"

const tooltipStyles = tv({
  base: [
    "group z-tooltip bg-surface-primary text-normal border-line-hover rounded-lg border px-1.5 py-1 text-base will-change-transform [&_strong]:font-medium",
    "[&_.arx]:fill-surface-primary [&_.arx]:stroke-line-hover"
  ],
  variants: {
    isEntering: {
      true: [
        "fade-in animate-in",
        "data-[placement=left]:slide-in-from-right-1",
        "data-[placement=right]:slide-in-from-left-1",
        "data-[placement=top]:slide-in-from-bottom-1",
        "data-[placement=bottom]:slide-in-from-top-1"
      ]
    },
    isExiting: {
      true: [
        "fade-in direction-reverse animate-in",
        "data-[placement=left]:slide-out-to-right-1",
        "data-[placement=right]:slide-out-to-left-1",
        "data-[placement=top]:slide-out-to-bottom-1",
        "data-[placement=bottom]:slide-out-to-top-1"
      ]
    }
  }
})

type TooltipProps = React.ComponentProps<typeof TooltipTriggerPrimitive>
const Tooltip = (props: TooltipProps) => <TooltipTriggerPrimitive {...props} />

type TooltipContentProps = Omit<TooltipPrimitiveProps, "children"> &
  VariantProps<typeof tooltipStyles> & {
    showArrow?: boolean
    children: React.ReactNode
  }

const TooltipContent = ({
  offset = 10,
  showArrow = true,
  children,
  ...props
}: TooltipContentProps) => {
  return (
    <TooltipPrimitive
      {...props}
      offset={offset}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tooltipStyles({ ...renderProps, className })
      )}
    >
      {showArrow && (
        <OverlayArrow>
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className={cn(
              "arx",
              "group-data-[placement=bottom]:rotate-180",
              "group-data-[placement=left]:-rotate-90",
              "group-data-[placement=right]:rotate-90",
              "forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
            )}
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </TooltipPrimitive>
  )
}

const TooltipTrigger = Button

Tooltip.Trigger = TooltipTrigger
Tooltip.Content = TooltipContent

export { Tooltip }
export type { TooltipContentProps, TooltipProps }
