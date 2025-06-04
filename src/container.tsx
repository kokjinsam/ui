import * as React from "react"
import { cn } from "./utils"

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  constrained?: boolean
}

const Container = ({ constrained = false, ...props }: ContainerProps) => (
  <div
    {...props}
    className={cn(
      "mx-auto w-full max-w-7xl lg:max-w-(--breakpoint-xl) 2xl:max-w-(--breakpoint-2xl)",
      constrained ? "sm:px-6 lg:px-8" : "px-4 sm:px-6 lg:px-8",
      props.className
    )}
  />
)

export { Container }
export type { ContainerProps }
