import * as React from "react"
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps
} from "react-aria-components"
import { tv } from "./utils"

const buttonStyles = tv({
  base: [
    "relative isolate inline-flex items-center justify-center gap-x-2 font-medium",
    "outline-0 outline-offset-2 hover:no-underline focus-visible:outline-2",
    "inset-ring-fg/20 pressed:bg-(--btn-overlay) dark:inset-ring-fg/15 bg-(--btn-bg) text-(--btn-fg) shadow-[shadow:inset_0_2px_--theme(--color-white/15%)] inset-ring hover:bg-(--btn-overlay) dark:shadow-none",
    "forced-colors:outline-[Highlight] forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText]",
    "pressed:*:data-[slot=icon]:text-current *:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-current/60 *:data-[slot=icon]:transition hover:*:data-[slot=icon]:text-current/90",
    "*:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:my-1 *:data-[slot=avatar]:*:size-4 *:data-[slot=avatar]:size-4 *:data-[slot=avatar]:shrink-0"
  ],
  variants: {
    intent: {
      primary: [
        "outline-primary [--btn-bg:theme(--color-primary/95%)] [--btn-fg:var(--color-primary-fg)] [--btn-overlay:var(--color-primary)]"
      ],
      secondary: [
        "outline-primary [--btn-bg:theme(--color-secondary/90%)] [--btn-fg:var(--color-secondary-fg)] [--btn-overlay:var(--color-secondary)]"
      ],
      warning: [
        "outline-warning [--btn-bg:theme(--color-warning/95%)] [--btn-fg:var(--color-warning-fg)] [--btn-overlay:var(--color-warning)]"
      ],
      danger: [
        "outline-danger [--btn-bg:theme(--color-danger/95%)] [--btn-fg:var(--color-danger-fg)] [--btn-overlay:var(--color-danger)]"
      ],
      outline: [
        "outline-primary [--btn-overlay:theme(--color-secondary/90%)] shadow-none [--btn-fg:var(--color-fg)]"
      ],
      plain: [
        "outline-primary [--btn-overlay:theme(--color-secondary/90%)] shadow-none inset-ring-transparent [--btn-fg:var(--color-fg)] dark:inset-ring-transparent"
      ]
    },
    size: {
      "extra-small":
        "h-8 px-[calc(var(--spacing)*2.7)] text-xs/4 **:data-[slot=avatar]:size-3.5 **:data-[slot=avatar]:*:size-3.5 **:data-[slot=icon]:size-3 lg:text-[0.800rem]/4",
      "small": "h-9 px-3.5 text-sm/5 sm:text-sm/5",
      "medium": "h-10 px-4 text-base sm:text-sm/6",
      "large":
        "h-11 px-4.5 text-base *:data-[slot=icon]:mx-[-1.5px] sm:*:data-[slot=icon]:size-5 lg:text-base/7",
      "square-petite": "size-9 shrink-0"
    },
    shape: {
      square: "rounded-lg",
      circle: "rounded-full"
    },
    isDisabled: {
      false: "cursor-pointer forced-colors:disabled:text-[GrayText]",
      true: "cursor-default border-0 opacity-50 ring-0 inset-shadow-none dark:inset-ring-0 forced-colors:disabled:text-[GrayText]"
    },
    isPending: {
      true: "cursor-default opacity-50"
    }
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
    shape: "square"
  }
})

type ButtonProps = ButtonPrimitiveProps & {
  intent?: "primary" | "secondary" | "danger" | "warning" | "outline" | "plain"
  size?: "medium" | "large" | "square-petite" | "extra-small" | "small"
  shape?: "square" | "circle"
  ref?: React.Ref<HTMLButtonElement>
}

const Button = ({
  className,
  intent,
  size,
  shape,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <ButtonPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
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
