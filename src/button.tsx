import * as React from "react"
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps
} from "react-aria-components"
import { tv } from "./utils"

const buttonStyles = tv({
  base: [
    "relative isolate inline-flex cursor-default items-center justify-center gap-x-2 font-medium"
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
        "text-error border border-[rgb(255,0,0)]/[0.14] bg-[rgb(255,0,0)]/[0.14]",
        "hover:bg-[rgb(255,0,0)]/[0.08]"
      ]
    },
    // TODO: **:data-[slot=avatar]:size-3.5 **:data-[slot=avatar]:*:size-3.5
    // **:data-[slot=icon]:size-3
    //  *:data-[slot=icon]:mx-[-1.5px] sm:*:data-[slot=icon]:size-5
    size: {
      sm: "text-ui-sm h-interactive-sm px-2",
      md: "text-ui-sm h-interactive-md px-3.5",
      lg: "text-ui-base h-interactive-lg px-3.5"
    },
    shape: {
      square: "rounded-sm",
      circle: "rounded-full"
    },
    isDisabled: {
      false: "forced-colors:disabled:text-[GrayText]",
      true: "border-0 opacity-50 ring-0 inset-shadow-none dark:inset-ring-0 forced-colors:disabled:text-[GrayText]"
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

type ButtonProps = ButtonPrimitiveProps & {
  intent?: "primary" | "outline" | "plain" | "danger"
  size?: "sm" | "md" | "lg"
  shape?: "square" | "circle"
}

const Button = ({ intent, size, shape, ...props }: ButtonProps) => (
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

export { Button, buttonStyles }
export type { ButtonProps }
