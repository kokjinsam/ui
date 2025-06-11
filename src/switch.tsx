import * as React from "react"
import type { SwitchProps as SwitchPrimitiveProps } from "react-aria-components"
import { Switch as SwitchPrimitive } from "react-aria-components"
import { composeClassName } from "./utils"

type SwitchProps = SwitchPrimitiveProps & {
  ref?: React.RefObject<HTMLLabelElement>
}

const Switch = (props: SwitchProps) => (
  <SwitchPrimitive
    {...props}
    className={composeClassName(
      props.className,
      "group inline-flex touch-none items-center sm:text-sm"
    )}
    style={{ WebkitTapHighlightColor: "transparent" }}
  >
    {(values) => (
      <>
        <span className="group-invalid:ring-danger/20 group-focus:ring-ring/20 group-selected:bg-primary mr-2 h-5 w-8 cursor-default rounded-full border-2 border-transparent bg-(--switch) transition duration-200 [--switch:color-mix(in_oklab,var(--color-muted)_90%,black_10%)] group-focus:ring-4 group-disabled:cursor-default group-disabled:opacity-50 dark:[--switch:color-mix(in_oklab,var(--color-muted)_85%,white_15%)]">
          <span className="bg-primary-foreground group-selected:ml-3 group-pressed:w-5 group-selected:group-data-[pressed]:ml-2 block size-4 origin-right rounded-full shadow-sm transition-all duration-200 forced-colors:disabled:outline-[GrayText]" />
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
