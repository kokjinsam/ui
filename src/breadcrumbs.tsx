import * as React from "react"
import { createContext, use } from "react"
import type {
  BreadcrumbProps,
  BreadcrumbsProps,
  LinkProps
} from "react-aria-components"
import {
  Breadcrumb,
  Breadcrumbs as BreadcrumbsPrimitive
} from "react-aria-components"
import { Link } from "./link"
import { cn } from "./utils"

type BreadcrumbsContextProps = { separator?: "chevron" | "slash" | boolean }

const BreadcrumbsProvider = createContext<BreadcrumbsContextProps>({
  separator: "chevron"
})

const Breadcrumbs = <T extends object>(
  props: BreadcrumbsProps<T> & BreadcrumbsContextProps
) => (
  <BreadcrumbsProvider value={{ separator: props.separator }}>
    <BreadcrumbsPrimitive
      {...props}
      className={cn("flex items-center gap-2", props.className)}
    />
  </BreadcrumbsProvider>
)

type BreadcrumbsItemProps = LinkProps &
  BreadcrumbProps &
  BreadcrumbsContextProps

const BreadcrumbsItem = ({
  href,
  separator = true,
  ...props
}: BreadcrumbsItemProps) => {
  const { separator: contextSeparator } = use(BreadcrumbsProvider)
  separator = contextSeparator ?? separator
  const separatorValue = separator === true ? "chevron" : separator

  return (
    <Breadcrumb
      {...props}
      className={cn("text-ui-base/5 flex items-center gap-2", props.className)}
    >
      {({ isCurrent }) => (
        <>
          <Link href={href} {...props} />
          {!isCurrent && separator !== false && (
            <Separator separator={separatorValue} />
          )}
        </>
      )}
    </Breadcrumb>
  )
}

const Separator = ({
  separator = "chevron"
}: {
  separator?: BreadcrumbsItemProps["separator"]
}) => {
  return (
    <span className="*:text-muted *:shrink-0 *:data-[slot=icon]:size-3.5">
      {separator === "chevron" && (
        <span data-slot="icon" className="lucide-chevron-right align-middle" />
      )}
      {separator === "slash" && <span>/</span>}
    </span>
  )
}

Breadcrumbs.Item = BreadcrumbsItem

export { Breadcrumbs, BreadcrumbsItem }
export type { BreadcrumbsItemProps, BreadcrumbsProps }
