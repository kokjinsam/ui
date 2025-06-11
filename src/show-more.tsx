import * as React from "react"
import { Text, ToggleButton, composeRenderProps } from "react-aria-components"
import { buttonStyles } from "./button"
import { tv } from "./utils"

const showMoreStyles = tv({
  base: "before:border-muted after:border-muted text-sm leading-6",
  variants: {
    orientation: {
      vertical: "mx-1 h-auto self-stretch",
      horizontal: "my-0.5 h-px w-full self-stretch"
    }
  },
  compoundVariants: [
    {
      orientation: "vertical",
      className:
        "mx-2 flex flex-col items-center before:mb-2 before:flex-1 before:border-l after:mt-2 after:flex-1 after:border-r"
    },
    {
      orientation: "horizontal",
      className:
        "my-2 flex items-center self-stretch before:mr-2 before:flex-1 before:border-t after:ml-2 after:flex-1 after:border-t"
    }
  ],
  defaultVariants: {
    orientation: "horizontal"
  }
})

type ShowMoreProps = React.ComponentProps<typeof ToggleButton> & {
  className?: string
  orientation?: "horizontal" | "vertical"
  as?: "text" | "button"
  text?: string
}

const ShowMore = ({
  as = "button",
  orientation = "horizontal",
  ...props
}: ShowMoreProps) => (
  <div className={showMoreStyles({ orientation, className: props.className })}>
    {as === "button" ? (
      <ToggleButton
        {...props}
        className={buttonStyles({
          shape: "circle",
          intent: "outline",
          size: "sm"
        })}
      >
        {composeRenderProps(props.children, (children) => (
          <>{children}</>
        ))}
      </ToggleButton>
    ) : (
      <Text slot="description">{props.text}</Text>
    )}
  </div>
)

export { ShowMore }
export type { ShowMoreProps }
