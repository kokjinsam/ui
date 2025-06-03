import * as React from "react"
import type {
  ButtonProps,
  DisclosureGroupProps as DisclosureGroupPrimitiveProps,
  DisclosurePanelProps as DisclosurePanelPrimitiveProps,
  DisclosureProps as DisclosurePrimitiveProps
} from "react-aria-components"
import {
  Button,
  DisclosureGroup as DisclosureGroupPrimitive,
  DisclosurePanel as DisclosurePanelPrimitive,
  Disclosure as DisclosurePrimitive,
  Heading
} from "react-aria-components"
import { cn } from "./utils"

type DisclosureGroupProps = DisclosureGroupPrimitiveProps

const DisclosureGroup = (props: DisclosureGroupProps) => (
  <DisclosureGroupPrimitive
    data-slot="disclosure-group"
    {...props}
    className={cn(
      "peer cursor-default disabled:cursor-not-allowed disabled:opacity-75",
      props.className
    )}
  >
    {(values) => (
      <div data-slot="disclosure-content">
        {typeof props.children === "function"
          ? props.children(values)
          : props.children}
      </div>
    )}
  </DisclosureGroupPrimitive>
)

type DisclosureProps = DisclosurePrimitiveProps

const Disclosure = (props: DisclosureProps) => (
  <DisclosurePrimitive
    data-slot="disclosure"
    {...props}
    className={cn(
      "peer group/disclosure border-border w-full min-w-60 border-b disabled:opacity-60",
      "**:data-[slot=disclosure]:last:border-b-0",
      props.className
    )}
  >
    {props.children}
  </DisclosurePrimitive>
)

type DisclosureTriggerProps = ButtonProps

const DisclosureTrigger = (props: DisclosureTriggerProps) => (
  <Heading>
    <Button
      slot="trigger"
      {...props}
      className={cn(
        "group/trigger flex w-full items-center justify-between gap-x-2 py-3 text-left font-medium",
        "sm:text-sm",
        "open:text-foreground",
        "focus:text-foreground",
        "focus:outline-hidden",
        "disabled:cursor-default disabled:opacity-50",
        "**:data-[slot=disclosure-chevron]:size-4",
        "**:data-[slot=icon]:text-muted-foreground **:data-[slot=icon]:-mx-0.5 **:data-[slot=icon]:shrink-0",
        "forced-colors:disabled:text-[GrayText]",
        "**:[span]:flex **:[span]:items-center **:[span]:gap-x-1 **:[span]:*:data-[slot=icon]:mr-1",
        "[&[aria-expanded=true]_[data-slot=disclosure-chevron]]:-rotate-90",
        props.className
      )}
    >
      {(values) => (
        <>
          {typeof props.children === "function"
            ? props.children(values)
            : props.children}
          <span
            data-slot="disclosure-chevron"
            className="internal-chevron ml-auto shrink-0 transition duration-300"
          />
        </>
      )}
    </Button>
  </Heading>
)

type DisclosurePanelProps = DisclosurePanelPrimitiveProps

const DisclosurePanel = (props: DisclosurePanelProps) => (
  <DisclosurePanelPrimitive
    data-slot="disclosure-panel"
    {...props}
    className={cn(
      "text-muted-foreground overflow-hidden text-sm transition-all",
      "**:data-[slot=disclosure-group]:border-border **:data-[slot=disclosure-group]:border-t",
      "**:data-[slot=disclosure-group]:**:[.internal-chevron]:hidden",
      "has-data-[slot=disclosure-group]:**:[button]:px-4",
      props.className
    )}
  >
    <div
      data-slot="disclosure-panel-content"
      className={cn(
        "pt-0",
        "not-has-data-[slot=disclosure-group]:group-data-expanded/disclosure:pb-3",
        "[&:has([data-slot=disclosure-group])_&]:px-11"
      )}
    >
      {props.children}
    </div>
  </DisclosurePanelPrimitive>
)

export { Disclosure, DisclosureGroup, DisclosurePanel, DisclosureTrigger }
export type {
  DisclosureGroupProps,
  DisclosurePanelProps,
  DisclosureProps,
  DisclosureTriggerProps
}
