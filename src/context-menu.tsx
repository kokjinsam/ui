import * as React from "react"
import type { MenuContentProps } from "./menu"
import { Menu } from "./menu"
import { cn } from "./utils"

type ContextMenuTriggerContextType = {
  buttonRef: React.RefObject<HTMLButtonElement | null>
  contextMenuOffset: { offset: number; crossOffset: number } | null
  setContextMenuOffset: React.Dispatch<
    React.SetStateAction<{ offset: number; crossOffset: number } | null>
  >
}

const ContextMenuTriggerContext = React.createContext<
  ContextMenuTriggerContextType | undefined
>(undefined)

const useContextMenuTrigger = () => {
  const context = React.use(ContextMenuTriggerContext)

  if (!context) {
    throw new Error(
      "useContextMenuTrigger must be used within a ContextMenuTrigger"
    )
  }

  return context
}

type ContextMenuProps = {
  children: React.ReactNode
}

const ContextMenu = ({ children }: ContextMenuProps) => {
  const [contextMenuOffset, setContextMenuOffset] = React.useState<{
    offset: number
    crossOffset: number
  } | null>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  return (
    <ContextMenuTriggerContext.Provider
      value={{ buttonRef, contextMenuOffset, setContextMenuOffset }}
    >
      {children}
    </ContextMenuTriggerContext.Provider>
  )
}

type ContextMenuTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const ContextMenuTrigger = (props: ContextMenuTriggerProps) => {
  const { buttonRef, setContextMenuOffset } = useContextMenuTrigger()

  const onContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setContextMenuOffset({
      offset: e.clientY - rect.bottom,
      crossOffset: e.clientX - rect.left
    })
  }

  return (
    <button
      ref={buttonRef}
      aria-haspopup="menu"
      onContextMenu={onContextMenu}
      {...props}
      className={cn(
        "cursor-default focus:outline-hidden disabled:opacity-60 disabled:forced-colors:disabled:text-[GrayText]",
        props.className
      )}
    />
  )
}

type ContextMenuContentProps<T> = Omit<
  MenuContentProps<T>,
  | "showArrow"
  | "isOpen"
  | "onOpenChange"
  | "triggerRef"
  | "placement"
  | "shouldFlip"
>

const ContextMenuContent = <T extends object>(
  props: ContextMenuContentProps<T>
) => {
  const { contextMenuOffset, setContextMenuOffset, buttonRef } =
    useContextMenuTrigger()

  return contextMenuOffset ? (
    <Menu.Content
      isOpen={!!contextMenuOffset}
      onOpenChange={() => setContextMenuOffset(null)}
      triggerRef={buttonRef}
      shouldFlip={false}
      placement="bottom left"
      offset={contextMenuOffset?.offset}
      crossOffset={contextMenuOffset?.crossOffset}
      onClose={() => setContextMenuOffset(null)}
      {...props}
    />
  ) : null
}

const ContextMenuItem = Menu.Item
const ContextMenuSeparator = Menu.Separator
const ContextMenuDescription = Menu.Description
const ContextMenuSection = Menu.Section
const ContextMenuHeader = Menu.Header
const ContextMenuKeyboard = Menu.Keyboard
const ContextMenuLabel = Menu.Label

ContextMenu.Trigger = ContextMenuTrigger
ContextMenu.Content = ContextMenuContent
ContextMenu.Item = ContextMenuItem
ContextMenu.Label = ContextMenuLabel
ContextMenu.Separator = ContextMenuSeparator
ContextMenu.Description = ContextMenuDescription
ContextMenu.Section = ContextMenuSection
ContextMenu.Header = ContextMenuHeader
ContextMenu.Keyboard = ContextMenuKeyboard

export { ContextMenu }
export type { ContextMenuProps }
