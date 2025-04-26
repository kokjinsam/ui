"use client"

import * as React from "react"
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps
} from "react-aria-components"
import type { VariantProps } from "./utils"
import { tv } from "./utils"

// primary outline plain danger

const buttonStyles = tv({
  base: [
    "relative isolate inline-flex cursor-default items-center justify-center gap-x-1 font-medium outline-0",
    "forced-colors:outline-[Highlight] forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText]",
    "*:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:align-middle *:data-[slot=icon]:text-current",
    "*:data-[slot=avatar]:*:size-4 *:data-[slot=avatar]:size-4 *:data-[slot=avatar]:shrink-0"
  ],
  variants: {
    intent: {
      primary: [
        "bg-interactive-accent text-on-accent shadow-interactive border-none",
        "hover:bg-interactive-accent-hover hover:shadow-interactive-hover"
      ],
      outline: [
        "bg-interactive-normal text-normal shadow-interactive border-none",
        "hover:bg-interactive-hover hover:shadow-interactive-hover"
      ],
      plain: [
        "text-normal border-none bg-transparent shadow-none",
        "hover:bg-interactive-hover"
      ],
      danger: [
        "text-on-accent border-modifier-danger bg-modifier-danger border",
        "hover:bg-modifier-danger-hover"
      ]
    },
    size: {
      "sm": "h-interactive-sm text-ui-sm/5 px-2",
      "md": "h-interactive-md text-ui-base/5 px-3.5",
      "lg": "h-interactive-lg text-ui-lg/5 px-3.5",
      "square-sm": "size-6 shrink-0",
      "square-md": "size-7 shrink-0",
      "square-lg": "size-8 shrink-0"
    },
    shape: {
      square: "rounded-lg",
      circle: "rounded-full"
    },
    isDisabled: {
      true: "cursor-default opacity-50 inset-ring-0 forced-colors:text-[GrayText]"
    },
    isPending: {
      true: "cursor-default opacity-50"
    }
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
    shape: "square"
  }
})

type ButtonProps = ButtonPrimitiveProps & VariantProps<typeof buttonStyles>

const Button = ({ intent, size, shape, ...props }: ButtonProps) => {
  return (
    <ButtonPrimitive
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        buttonStyles({
          ...renderProps,
          intent,
          size,
          shape,
          className
        })
      )}
    >
      {(values) => (
        <>
          {typeof props.children === "function"
            ? props.children(values)
            : props.children}
        </>
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonStyles }
export type { ButtonProps }
