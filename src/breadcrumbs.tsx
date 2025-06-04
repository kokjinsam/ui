import * as React from "react"
import type {
  BreadcrumbProps,
  BreadcrumbsProps as BreadcrumbsPrimitiveProps,
  LinkProps
} from "react-aria-components"
import {
  Breadcrumb,
  Breadcrumbs as BreadcrumbsPrimitive,
  Link
} from "react-aria-components"
import { cn, composeClassName } from "./utils"

type BreadcrumbsContextProps = { separator?: "chevron" | "slash" | boolean }

const BreadcrumbsProvider = React.createContext<BreadcrumbsContextProps>({
  separator: "chevron"
})

type BreadcrumbsProps<T> = BreadcrumbsPrimitiveProps<T> &
  BreadcrumbsContextProps

const Breadcrumbs = <T extends object>(props: BreadcrumbsProps<T>) => (
  <BreadcrumbsProvider value={{ separator: props.separator }}>
    <BreadcrumbsPrimitive
      {...props}
      className={cn("flex items-center gap-2", props.className)}
    />
  </BreadcrumbsProvider>
)

type BreadcrumbItemProps = BreadcrumbProps & BreadcrumbsContextProps

const BreadcrumbItem = ({
  separator = true,
  ...props
}: BreadcrumbItemProps) => {
  const { separator: contextSeparator } = React.use(BreadcrumbsProvider)
  separator = contextSeparator ?? separator
  const separatorValue = separator === true ? "chevron" : separator

  return (
    <Breadcrumb
      {...props}
      className={composeClassName(
        props.className,
        "flex items-center gap-2 text-sm"
      )}
    >
      {({ isCurrent, ...otherRenderProps }) => (
        <>
          {typeof props.children === "function"
            ? props.children({ isCurrent, ...otherRenderProps })
            : props.children}
          {!isCurrent && separator !== false && (
            <BreadcrumbSeparator separator={separatorValue} />
          )}
        </>
      )}
    </Breadcrumb>
  )
}

type BreadcrumbLinkProps = LinkProps & BreadcrumbProps & BreadcrumbsContextProps

const BreadcrumbLink = ({
  href,
  separator = true,
  ...props
}: BreadcrumbLinkProps) => {
  const { separator: contextSeparator } = React.use(BreadcrumbsProvider)
  separator = contextSeparator ?? separator
  const separatorValue = separator === true ? "chevron" : separator

  return (
    <Breadcrumb
      {...props}
      className={cn("flex items-center gap-2 text-sm", props.className)}
    >
      {({ isCurrent }) => (
        <>
          <Link href={href} {...props} />
          {!isCurrent && separator !== false && (
            <BreadcrumbSeparator separator={separatorValue} />
          )}
        </>
      )}
    </Breadcrumb>
  )
}

type BreadcrumbSeparatorProps = {
  separator?: BreadcrumbLinkProps["separator"]
}

const BreadcrumbSeparator = ({
  separator = "chevron"
}: BreadcrumbSeparatorProps) => (
  <span className="*:text-muted-foreground *:shrink-0 *:data-[slot=icon]:size-3.5">
    {separator === "chevron" && (
      <span data-slot="icon" className="lucide-chevron-right align-middle" />
    )}
    {separator === "slash" && <span>/</span>}
  </span>
)

Breadcrumbs.Item = BreadcrumbItem
Breadcrumbs.Link = BreadcrumbLink

export { Breadcrumbs }
export type { BreadcrumbItemProps, BreadcrumbLinkProps, BreadcrumbsProps }
