import * as React from "react"
import type { ButtonProps as ButtonPrimitiveProps } from "react-aria-components"
import {
  Button as ButtonPrimitive,
  composeRenderProps
} from "react-aria-components"
import { tv, VariantProps } from "./utils"

const buttonStyles = tv({
  base: [
    "relative isolate inline-flex items-center justify-center gap-x-2 font-medium",
    "outline-0 outline-offset-2 hover:no-underline focus-visible:outline-2",
    "inset-ring-foreground/20 pressed:bg-(--btn-overlay) dark:inset-ring-foreground/15 bg-(--btn-background) text-(--btn-foreground) shadow-[shadow:inset_0_2px_--theme(--color-white/15%)] inset-ring hover:bg-(--btn-overlay) dark:shadow-none",
    "forced-colors:outline-[Highlight] forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText]",
    "pressed:*:data-[slot=icon]:text-current *:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-current/60 *:data-[slot=icon]:transition hover:*:data-[slot=icon]:text-current/90",
    "*:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:my-1 *:data-[slot=avatar]:*:size-4 *:data-[slot=avatar]:size-4 *:data-[slot=avatar]:shrink-0"
  ],
  variants: {
    intent: {
      primary: [
        "outline-primary [--btn-background:var(--color-primary)]/95 [--btn-foreground:var(--color-primary-foreground)] [--btn-overlay:var(--color-primary)]"
      ],
      secondary: [
        "outline-primary [--btn-background:var(--color-secondary)]/90 [--btn-foreground:var(--color-secondary-foreground)] [--btn-overlay:var(--color-secondary)]"
      ],
      warning: [
        "outline-warning [--btn-background:var(--color-warning)]/95 [--btn-foreground:var(--color-warning-foreground)] [--btn-overlay:var(--color-warning)]"
      ],
      danger: [
        "outline-danger [--btn-background:var(--color-danger)]/95 [--btn-foreground:var(--color-danger-foreground)] [--btn-overlay:var(--color-danger)]"
      ],
      outline: [
        "outline-primary shadow-none [--btn-foreground:var(--color-foreground)] [--btn-overlay:var(--color-secondary)]/90"
      ],
      plain: [
        "outline-primary shadow-none inset-ring-transparent [--btn-foreground:var(--color-foreground)] [--btn-overlay:var(--color-secondary)]/90 dark:inset-ring-transparent"
      ]
    },
    size: {
      "xs": "h-8 px-[calc(var(--spacing)*2.7)] text-xs/4 **:data-[slot=avatar]:size-3.5 **:data-[slot=avatar]:*:size-3.5 **:data-[slot=icon]:size-3 lg:text-[0.800rem]/4",
      "sm": "h-9 px-3.5 text-sm/5 sm:text-sm/5",
      "md": "h-10 px-4 text-base sm:text-sm/6",
      "lg": "h-11 px-4.5 text-base *:data-[slot=icon]:mx-[-1.5px] sm:*:data-[slot=icon]:size-5 lg:text-base/7",
      "square-sm": "size-9 shrink-0"
    },
    shape: {
      square: "rounded-lg",
      circle: "rounded-full"
    },
    isDisabled: {
      true: "opacity-50 inset-ring-0 forced-colors:text-[GrayText]"
    },
    isPending: {
      true: "opacity-50"
    }
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
    shape: "square"
  }
})

type ButtonProps = ButtonPrimitiveProps & VariantProps<typeof buttonStyles>

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
