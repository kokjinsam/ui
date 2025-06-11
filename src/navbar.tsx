import { LayoutGroup, motion } from "motion/react"
import * as React from "react"
import type { LinkProps } from "react-aria-components"
import { Link } from "react-aria-components"
import { Button, type ButtonProps } from "./button"
import { useMediaQuery } from "./hooks"
import { Sheet } from "./sheet"
import { cn, composeClassName, tv } from "./utils"

type NavbarOptions = {
  side?: "left" | "right"
  isSticky?: boolean
  intent?: "navbar" | "float" | "inset"
}

type NavbarContextProps = {
  open: boolean
  setOpen: (open: boolean) => void
  isCompact: boolean
  toggleNavbar: () => void
} & NavbarOptions

const NavbarContext = React.createContext<NavbarContextProps | null>(null)

function useNavbar() {
  const context = React.use(NavbarContext)

  if (!context) {
    throw new Error("useNavbar must be used within a Navbar.")
  }

  return context
}

type NavbarProps = React.ComponentProps<"header"> &
  NavbarOptions & {
    defaultOpen?: boolean
    isOpen?: boolean
    onOpenChange?: (open: boolean) => void
  }

const Navbar = ({
  isOpen: openProp,
  onOpenChange: setOpenProp,
  defaultOpen = false,
  side = "left",
  isSticky = false,
  intent = "navbar",
  ...props
}: NavbarProps) => {
  const isCompact = useMediaQuery("(max-width: 768px)")
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      if (setOpenProp) {
        return setOpenProp?.(typeof value === "function" ? value(open) : value)
      }

      _setOpen(value)
    },
    [setOpenProp, open]
  )

  const toggleNavbar = React.useCallback(() => {
    setOpen((open) => !open)
  }, [setOpen])

  const contextValue = React.useMemo<NavbarContextProps>(
    () => ({
      open,
      setOpen,
      isCompact,
      toggleNavbar,
      intent,
      isSticky,
      side
    }),
    [open, setOpen, isCompact, toggleNavbar, intent, isSticky, side]
  )
  return (
    <NavbarContext value={contextValue}>
      <header
        data-navbar-intent={intent}
        {...props}
        className={cn(
          "relative isolate flex w-full flex-col",
          intent === "navbar" && "",
          intent === "float" && "px-2.5 pt-2",
          intent === "inset" && "bg-navbar dark:bg-background min-h-svh",
          props.className
        )}
      />
    </NavbarContext>
  )
}

const navStyles = tv({
  base: [
    "group peer hidden h-(--navbar-height) w-full items-center px-4 [--navbar-height:3.5rem] md:flex",
    "[&>div]:mx-auto [&>div]:w-full [&>div]:max-w-[1680px] [&>div]:items-center md:[&>div]:flex"
  ],
  variants: {
    isSticky: {
      true: "sticky top-0 z-40"
    },
    intent: {
      float:
        "bg-navbar text-navbar-foreground mx-auto w-full max-w-7xl rounded-xl border md:px-4 2xl:max-w-(--breakpoint-2xl)",
      navbar: "bg-navbar text-navbar-foreground border-b md:px-6",
      inset: [
        "mx-auto md:px-6",
        "[&>div]:mx-auto [&>div]:w-full [&>div]:items-center md:[&>div]:flex 2xl:[&>div]:max-w-(--breakpoint-2xl)"
      ]
    }
  }
})

type NavbarNavProps = React.ComponentProps<"div"> & {
  intent?: "navbar" | "float" | "inset"
  isSticky?: boolean
  side?: "left" | "right"
  useDefaultResponsive?: boolean
}

const NavbarNav = ({
  useDefaultResponsive = true,
  ...props
}: NavbarNavProps) => {
  const { isCompact, side, intent, isSticky, open, setOpen } = useNavbar()

  if (isCompact && useDefaultResponsive) {
    return (
      <Sheet isOpen={open} onOpenChange={setOpen} {...props}>
        <Sheet.Content
          side={side}
          aria-label="Compact Navbar"
          data-navbar="compact"
          classNames={{
            content: "text-foreground [&>button]:hidden"
          }}
          isFloat={intent === "float"}
        >
          <Sheet.Body className="px-2 md:px-4">{props.children}</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    )
  }

  return (
    <div
      data-navbar-nav="true"
      {...props}
      className={navStyles({ isSticky, intent, className: props.className })}
    >
      <div>{props.children}</div>
    </div>
  )
}

type NavbarTriggerProps = ButtonProps & {
  ref?: React.RefObject<HTMLButtonElement>
}

const NavbarTrigger = ({ onPress, ...props }: NavbarTriggerProps) => {
  const { toggleNavbar } = useNavbar()

  return (
    <Button
      data-navbar-trigger="true"
      intent="plain"
      aria-label={props["aria-label"] || "Toggle Navbar"}
      size="square-sm"
      onPress={(event) => {
        onPress?.(event)
        toggleNavbar()
      }}
      {...props}
    >
      <span data-slot="icon" className="lucide-menu" />
      <span className="sr-only">Toggle Navbar</span>
    </Button>
  )
}

type NavbarSectionProps = React.ComponentProps<"div">

const NavbarSection = (props: NavbarSectionProps) => {
  const { isCompact } = useNavbar()
  const id = React.useId()

  return (
    <LayoutGroup id={id}>
      <div
        data-navbar-section="true"
        {...props}
        className={cn(
          "flex",
          isCompact ? "flex-col gap-y-4" : "flex-row items-center gap-x-3",
          props.className
        )}
      />
    </LayoutGroup>
  )
}

type NavbarItemProps = LinkProps & {
  isCurrent?: boolean
}

const NavbarItem = ({ isCurrent, ...props }: NavbarItemProps) => {
  const { intent, isCompact } = useNavbar()

  return (
    <Link
      data-navbar-item="true"
      aria-current={isCurrent ? "page" : undefined}
      {...props}
      className={composeClassName(
        props.className,
        "text-muted-foreground relative flex cursor-pointer items-center gap-x-2 px-2 no-underline outline-hidden transition-colors *:data-[slot=icon]:-mx-0.5 md:text-sm forced-colors:transform-none forced-colors:outline-0 forced-colors:disabled:text-[GrayText]",
        "pressed:text-foreground hover:text-foreground focus:text-foreground focus-visible:outline-primary focus-visible:outline-1",
        "**:data-[slot=chevron]:size-4 **:data-[slot=chevron]:transition-transform",
        "pressed:**:data-[slot=chevron]:rotate-180 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0",
        "disabled:cursor-default disabled:opacity-50 disabled:forced-colors:text-[GrayText]",
        isCurrent && "text-navbar-foreground"
      )}
    >
      {(values) => (
        <>
          {typeof props.children === "function"
            ? props.children(values)
            : props.children}

          {(isCurrent || values.isCurrent) &&
            !isCompact &&
            intent !== "float" && (
              <motion.span
                layoutId="current-indicator"
                data-slot="current-indicator"
                className="bg-foreground absolute inset-x-2 bottom-[calc(var(--navbar-height)*-0.33)] h-0.5 rounded-full"
              />
            )}
        </>
      )}
    </Link>
  )
}

type NavbarLogoProps = LinkProps

const NavbarLogo = (props: NavbarLogoProps) => (
  <Link
    {...props}
    className={composeClassName(
      props.className,
      "text-foreground focus-visible:outline-primary relative flex items-center gap-x-2 px-2 py-4 focus:outline-hidden focus-visible:outline-1 md:mr-4 md:px-0 md:py-0"
    )}
  />
)

type NavbarFlexProps = React.ComponentProps<"div">

const NavbarFlex = (props: NavbarFlexProps) => (
  <div
    {...props}
    className={cn("flex items-center gap-2 md:gap-3", props.className)}
  />
)

type NavbarCompactProps = React.ComponentProps<"div"> &
  Pick<NavbarOptions, "intent"> & {
    ref?: React.RefObject<HTMLDivElement>
  }

const NavbarCompact = (props: NavbarCompactProps) => {
  const { intent } = useNavbar()

  return (
    <div
      {...props}
      className={cn(
        "bg-navbar text-navbar-foreground flex justify-between peer-has-[[data-navbar-intent=float]]:border md:hidden",
        intent === "float" && "h-12 rounded-lg border px-3.5",
        intent === "inset" && "h-14 border-b px-4",
        intent === "navbar" && "h-14 border-b px-4",
        props.className
      )}
    />
  )
}

const insetStyles = tv({
  base: "grow",
  variants: {
    intent: {
      float: "",
      inset:
        "bg-background md:ring-foreground/15 dark:bg-navbar md:dark:ring-border md:rounded-lg md:shadow-xs md:ring-1",
      navbar: ""
    }
  }
})

type NavbarInsetProps = React.ComponentProps<"div">

const NavbarInset = (props: NavbarInsetProps) => {
  const { intent } = useNavbar()

  return (
    <main
      data-navbar-intent={intent}
      className={cn(
        "flex flex-1 flex-col",
        intent === "inset" && "bg-navbar dark:bg-background pb-2 md:px-2",
        props.className
      )}
    >
      <div className={insetStyles({ intent, className: props.className })}>
        {props.children}
      </div>
    </main>
  )
}

Navbar.Nav = NavbarNav
Navbar.Inset = NavbarInset
Navbar.Compact = NavbarCompact
Navbar.Flex = NavbarFlex
Navbar.Trigger = NavbarTrigger
Navbar.Logo = NavbarLogo
Navbar.Item = NavbarItem
Navbar.Section = NavbarSection

export { Navbar }
export type {
  NavbarCompactProps,
  NavbarItemProps,
  NavbarNavProps,
  NavbarProps,
  NavbarTriggerProps
}
