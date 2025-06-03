import * as React from "react"
import type {
  ToggleButtonGroupProps,
  ToggleButtonProps
} from "react-aria-components"
import {
  ToggleButton,
  ToggleButtonGroup,
  composeRenderProps
} from "react-aria-components"
import type { VariantProps } from "./utils"
import { tv } from "./utils"

type ToggleGroupContextProps = {
  isDisabled?: boolean
  gap?: 0 | 1 | 2 | 3 | 4
  intent?: "plain" | "outline" | "solid"
  orientation?: "horizontal" | "vertical"
  size?: "xs" | "sm" | "md" | "lg" | "square-sm"
}

const ToggleGroupContext = React.createContext<ToggleGroupContextProps>({
  gap: 1,
  intent: "outline",
  orientation: "horizontal",
  size: "md"
})

type BaseToggleGroupProps = Omit<ToggleGroupContextProps, "gap" | "intent">

type ToggleGroupPropsNonZeroGap = BaseToggleGroupProps & {
  gap?: Exclude<ToggleGroupContextProps["gap"], 0>
  intent?: ToggleGroupContextProps["intent"]
}

type ToggleGroupPropsGapZero = BaseToggleGroupProps & {
  gap?: 0
  intent?: Exclude<ToggleGroupContextProps["intent"], "plain">
}

type ToggleGroupProps = ToggleButtonGroupProps &
  (ToggleGroupPropsGapZero | ToggleGroupPropsNonZeroGap) & {
    ref?: React.RefObject<HTMLDivElement>
  }

const toggleGroupStyles = tv({
  base: "flex",
  variants: {
    orientation: {
      horizontal:
        "flex-row [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      vertical: "flex-col items-start"
    },
    gap: {
      0: "gap-0 rounded-lg *:[button]:rounded-none *:[button]:inset-ring-1",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4"
    }
  },
  defaultVariants: {
    orientation: "horizontal",
    gap: 0
  },
  compoundVariants: [
    {
      gap: 0,
      orientation: "vertical",
      className:
        "*:[button]:-mt-px *:[button]:first:rounded-t-[calc(var(--radius-lg)-1px)] *:[button]:last:rounded-b-[calc(var(--radius-lg)-1px)]"
    },
    {
      gap: 0,
      orientation: "horizontal",
      className:
        "*:[button]:-mr-px *:[button]:first:rounded-s-[calc(var(--radius-lg)-1px)] *:[button]:last:rounded-e-[calc(var(--radius-lg)-1px)]"
    }
  ]
})

const ToggleGroup = ({
  className,
  ref,
  intent = "outline",
  gap = 0,
  size = "md",
  orientation = "horizontal",
  ...props
}: ToggleGroupProps) => {
  return (
    <ToggleGroupContext.Provider
      value={{ intent, gap, orientation, size, isDisabled: props.isDisabled }}
    >
      <ToggleButtonGroup
        ref={ref}
        orientation={orientation}
        className={composeRenderProps(className, (className, renderProps) =>
          toggleGroupStyles({
            ...renderProps,
            gap,
            orientation,
            className
          })
        )}
        {...props}
      />
    </ToggleGroupContext.Provider>
  )
}

const toggleStyles = tv({
  base: [
    "inset-ring-border cursor-default items-center gap-x-2 rounded-lg inset-ring outline-hidden sm:text-sm",
    "forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText]",
    "pressed:*:data-[slot=icon]:text-current *:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-current/60 hover:*:data-[slot=icon]:text-current/90"
  ],
  variants: {
    isDisabled: {
      true: "opacity-50 forced-colors:border-[GrayText]"
    },
    isFocusVisible: {
      true: "inset-ring-ring/70 ring-ring/20 z-20 ring-4"
    },
    intent: {
      plain:
        "selected:bg-secondary selected:text-secondary-foreground inset-ring-0",
      solid: [
        "selected:inset-ring-foreground selected:bg-foreground selected:text-background inset-ring"
      ],
      outline: [
        "pressed:border-secondary-foreground/10 selected:border-secondary-foreground/10 selected:bg-secondary selected:text-secondary-foreground hover:border-secondary-foreground/10 hover:bg-muted hover:text-secondary-foreground"
      ]
    },
    noGap: { true: "" },
    orientation: {
      horizontal: "inline-flex justify-center",
      vertical: "flex"
    },
    size: {
      "xs": "h-8 px-3 text-xs/4 *:data-[slot=icon]:size-3.5",
      "sm": "h-9 px-3.5",
      "md": "h-10 px-4",
      "lg": "h-11 px-5 *:data-[slot=icon]:size-4.5 sm:text-base",
      "square-sm": "size-9 shrink-0"
    },
    shape: {
      square: "rounded-lg",
      circle: "rounded-full"
    }
  },
  defaultVariants: {
    intent: "outline",
    size: "md",
    shape: "square"
  },
  compoundVariants: [
    {
      noGap: true,
      orientation: "vertical",
      className: "w-full"
    }
  ]
})

type ToggleProps = ToggleButtonProps & VariantProps<typeof toggleStyles>

const Toggle = ({ intent, ...props }: ToggleProps) => {
  const {
    intent: groupIntent,
    orientation,
    gap,
    size,
    isDisabled: isGroupDisabled
  } = React.use(ToggleGroupContext)

  return (
    <ToggleButton
      isDisabled={props.isDisabled ?? isGroupDisabled}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        toggleStyles({
          ...renderProps,
          intent: intent ?? groupIntent,
          size: props.size ?? size,
          orientation,
          shape: props.shape,
          noGap: gap === 0,
          className
        })
      )}
    />
  )
}

export { Toggle, ToggleGroup }
export type { ToggleGroupProps, ToggleProps }
