import * as React from "react"
import type {
  AutocompleteProps,
  CollectionRenderer,
  MenuProps,
  MenuTriggerProps,
  SearchFieldProps
} from "react-aria-components"
import {
  Autocomplete,
  Button,
  Collection,
  CollectionRendererContext,
  DefaultCollectionRenderer,
  Dialog,
  Header,
  Input,
  Menu as MenuPrimitive,
  MenuSection,
  Modal,
  ModalContext,
  ModalOverlay,
  OverlayTriggerStateContext,
  SearchField,
  useFilter
} from "react-aria-components"
import { DropdownKeyboard } from "./dropdown"
import { Loader } from "./loader"
import { Menu, type MenuSectionProps } from "./menu"
import { cn, composeClassName } from "./utils"

type CommandMenuProviderProps = {
  isPending?: boolean
  escapeButton?: boolean
}

const CommandMenuContext = React.createContext<
  CommandMenuProviderProps | undefined
>(undefined)

const useCommandMenu = () => {
  const context = React.use(CommandMenuContext)

  if (!context) {
    throw new Error(
      "useCommandMenu must be used within a <CommandMenuProvider />"
    )
  }

  return context
}

type CommandMenuProps = AutocompleteProps &
  MenuTriggerProps &
  CommandMenuProviderProps & {
    "isDismissable"?: boolean
    "aria-label"?: string
    "shortcut"?: string
    "isBlurred"?: boolean
    "classNames"?: {
      overlay?: string
      content?: string
    }
  }

const CommandMenu = ({
  onOpenChange,
  classNames,
  isDismissable = true,
  escapeButton = true,
  isPending,
  isBlurred,
  shortcut,
  ...props
}: CommandMenuProps) => {
  const { contains } = useFilter({ sensitivity: "base" })
  const filter = (textValue: string, inputValue: string) =>
    contains(textValue, inputValue)

  React.useEffect(() => {
    if (!shortcut) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === shortcut && (e.metaKey || e.ctrlKey)) {
        onOpenChange?.(true)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [shortcut, onOpenChange])

  return (
    <CommandMenuContext
      value={{ isPending: isPending, escapeButton: escapeButton }}
    >
      <ModalContext
        value={{ isOpen: props.isOpen, onOpenChange: onOpenChange }}
      >
        <ModalOverlay
          isDismissable={isDismissable}
          className={cn(
            "fixed inset-0 z-50 max-h-(--visual-viewport-height) bg-black/15 dark:bg-black/40",
            "data-entering:fade-in data-exiting:fade-out data-entering:animate-in data-exiting:animate-in",
            isBlurred && props.isOpen ? "backdrop-blur" : "",
            classNames?.overlay ?? ""
          )}
        >
          <Modal
            {...props}
            className={cn(
              "bg-overlay text-overlay-foreground ring-foreground/10 dark:ring-border fixed top-auto bottom-0 left-[50%] z-50 grid h-[calc(100vh-30%)] w-full max-w-full translate-x-[-50%] gap-4 overflow-hidden rounded-t-2xl shadow-lg ring-1 sm:top-[6rem] sm:bottom-auto sm:h-auto sm:w-full sm:max-w-2xl sm:rounded-xl forced-colors:border",
              "data-entering:fade-in-0 data-entering:slide-in-from-bottom sm:data-entering:slide-in-from-bottom-0 sm:data-entering:zoom-in-95 data-entering:animate-in data-entering:duration-300 sm:data-entering:duration-300",
              "data-exiting:fade-out sm:data-exiting:zoom-out-95 data-exiting:slide-out-to-bottom-56 sm:data-exiting:slide-out-to-bottom-0 data-exiting:animate-out data-exiting:duration-200",
              classNames?.content ?? ""
            )}
          >
            <Dialog
              aria-label={props["aria-label"] ?? "Command Menu"}
              className="overflow-hidden outline-hidden"
            >
              <Autocomplete filter={filter} {...props} />
            </Dialog>
          </Modal>
        </ModalOverlay>
      </ModalContext>
    </CommandMenuContext>
  )
}

type CommandMenuSearchProps = SearchFieldProps & {
  placeholder?: string
  className?: string
}

const CommandMenuSearch = ({
  placeholder,
  ...props
}: CommandMenuSearchProps) => {
  const state = React.use(OverlayTriggerStateContext)!
  const { isPending, escapeButton } = useCommandMenu()

  return (
    <SearchField
      aria-label="Quick search"
      autoFocus
      {...props}
      className={composeClassName(
        props.className,
        "flex w-full items-center border-b px-2.5 py-1"
      )}
    >
      {isPending ? (
        <Loader className="size-4.5" variant="spin" />
      ) : (
        <span
          data-slot="command-menu-search-icon"
          className="lucide-search text-muted-foreground size-5 shrink-0"
        />
      )}
      <Input
        placeholder={placeholder ?? "Search..."}
        className="text-foreground placeholder-muted-foreground w-full min-w-0 bg-transparent px-2.5 py-2 text-base outline-hidden focus:outline-hidden sm:text-sm [&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden"
      />
      {escapeButton && (
        <Button
          onPress={() => state?.close()}
          className="hover:bg-muted hidden cursor-default rounded border text-current/90 lg:inline lg:px-1.5 lg:py-0.5 lg:text-xs"
        >
          Esc
        </Button>
      )}
    </SearchField>
  )
}

const CommandMenuList = <T extends object>(props: MenuProps<T>) => (
  <CollectionRendererContext.Provider value={renderer}>
    <MenuPrimitive
      {...props}
      className={composeClassName(
        props.className,
        "grid max-h-full grid-cols-[auto_1fr] overflow-y-auto p-2 sm:max-h-110 *:[[role=group]]:mb-6 *:[[role=group]]:last:mb-0"
      )}
    />
  </CollectionRendererContext.Provider>
)

type CommandMenuSectionProps<T extends object> = MenuSectionProps<T>

const CommandMenuSection = <T extends object>({
  title,
  items,
  ...props
}: CommandMenuSectionProps<T>) => (
  <MenuSection
    {...props}
    className={cn(
      "col-span-full grid grid-cols-[auto_1fr] gap-y-[calc(var(--spacing)*0.25)]",
      props.className
    )}
  >
    {title && (
      <Header className="text-muted-foreground col-span-full mb-1 block min-w-(--trigger-width) truncate px-2.5 text-xs">
        {title}
      </Header>
    )}
    <Collection items={items}>{props.children}</Collection>
  </MenuSection>
)

type CommandMenuItemProps = React.ComponentProps<typeof Menu.Item>

const CommandMenuItem = (props: CommandMenuItemProps) => {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)

  return (
    <Menu.Item
      {...props}
      textValue={textValue}
      className={composeClassName(props.className, "gap-y-0.5 px-2.5 py-2")}
    />
  )
}

type CommandMenuDescriptionProps = React.ComponentProps<"span"> & {
  intent?: "danger" | "warning" | "primary" | "secondary" | "success"
}

const CommandMenuDescription = ({
  intent,
  ...props
}: CommandMenuDescriptionProps) => (
  <span
    slot="command-menu-description"
    {...props}
    className={cn(
      "ml-auto hidden text-sm sm:inline",
      intent === "danger" && "text-danger/90 group-selected:text-foreground/70",
      intent === "warning" &&
        "text-warning/90 group-selected:text-foreground/70",
      intent === "primary" && "text-foreground/90 group-selected:text-white/70",
      intent === "secondary" &&
        "text-muted-foreground group-selected:text-foreground/70",
      intent === "success" &&
        "text-success/90 group-selected:text-foreground/70",
      props.className
    )}
  />
)

const renderer: CollectionRenderer = {
  CollectionRoot(props) {
    if (props.collection.size === 0) {
      return (
        <div
          role="menuitem"
          className="text-muted-foreground col-span-full p-4 text-center text-sm"
        >
          No results found.
        </div>
      )
    }

    return <DefaultCollectionRenderer.CollectionRoot {...props} />
  },
  CollectionBranch: DefaultCollectionRenderer.CollectionBranch
}

type CommandMenuSeparatorProps = React.ComponentProps<typeof Menu.Separator>

const CommandMenuSeparator = (props: CommandMenuSeparatorProps) => (
  <Menu.Separator {...props} className={cn("-mx-2", props.className)} />
)

type CommandMenuFooterProps = React.ComponentProps<"div">

const CommandMenuFooter = (props: CommandMenuFooterProps) => (
  <div
    {...props}
    className={cn(
      "text-muted-foreground col-span-full border-t px-2.5 py-2 text-sm",
      "*:[kbd]:inset-ring-foreground/10 *:[kbd]:bg-secondary *:[kbd]:mx-1 *:[kbd]:inline-grid *:[kbd]:h-4 *:[kbd]:min-w-4 *:[kbd]:place-content-center *:[kbd]:rounded-xs *:[kbd]:inset-ring",
      props.className
    )}
  />
)

const CommandMenuLabel = Menu.Label
const CommandMenuKeyboard = DropdownKeyboard

CommandMenu.Search = CommandMenuSearch
CommandMenu.List = CommandMenuList
CommandMenu.Item = CommandMenuItem
CommandMenu.Label = CommandMenuLabel
CommandMenu.Section = CommandMenuSection
CommandMenu.Description = CommandMenuDescription
CommandMenu.Keyboard = CommandMenuKeyboard
CommandMenu.Separator = CommandMenuSeparator
CommandMenu.Footer = CommandMenuFooter

export { CommandMenu }
export type {
  CommandMenuDescriptionProps,
  CommandMenuProps,
  CommandMenuSearchProps
}
