import * as React from "react"
import { cn } from "./utils"

type CenterProps = React.ComponentPropsWithoutRef<"div">

const Center = (props: CenterProps) => (
  <div
    {...props}
    className={cn("flex h-screen items-center justify-center", props.className)}
  />
)

export { Center }
export type { CenterProps }
