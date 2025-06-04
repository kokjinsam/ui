import * as React from "react"
import { cn } from "./utils"

type DescriptionListProps = React.ComponentProps<"dl">

const DescriptionList = (props: DescriptionListProps) => (
  <dl
    {...props}
    className={cn(
      "grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,calc(var(--spacing)*80))_auto] sm:text-sm/6",
      props.className
    )}
  />
)

type DescriptionTermProps = React.ComponentProps<"dt">

const DescriptionTerm = (props: DescriptionTermProps) => (
  <dt
    {...props}
    className={cn(
      "text-muted-foreground col-start-1 border-t pt-3 first:border-none sm:py-3",
      props.className
    )}
  />
)

type DescriptionDetailsProps = React.ComponentProps<"dd">

const DescriptionDetails = (props: DescriptionDetailsProps) => (
  <dd
    {...props}
    className={cn(
      "text-foreground pt-1 pb-3 sm:border-t sm:py-3 sm:nth-2:border-none",
      props.className
    )}
  />
)

DescriptionList.Term = DescriptionTerm
DescriptionList.Details = DescriptionDetails

export { DescriptionList }
export type {
  DescriptionDetailsProps,
  DescriptionListProps,
  DescriptionTermProps
}
