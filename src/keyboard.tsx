"use client"

import * as React from "react"
import { Keyboard as KeyboardPrimitive } from "react-aria-components"
import { cn } from "./utils"

type KeyboardProps = React.HTMLAttributes<HTMLElement> & {
  keys: string | string[]
  classNames?: {
    base?: string
    kbd?: string
  }
}

const Keyboard = ({ keys, classNames, ...props }: KeyboardProps) => (
  <KeyboardPrimitive
    {...props}
    className={cn(
      "hidden font-mono text-current/60",
      "group-hover:text-fg",
      "group-focus:text-fg group-focus:opacity-90",
      "group-disabled:opacity-50",
      "forced-colors:group-focus:text-[HighlightText]",
      "lg:inline-flex",
      classNames?.base
    )}
  >
    {(Array.isArray(keys) ? keys : keys.split("")).map((char, index) => (
      <kbd
        key={index}
        className={cn(
          "tracking-widest",
          index > 0 && char.length > 1 && "pl-1",
          classNames?.kbd
        )}
      >
        {char}
      </kbd>
    ))}
  </KeyboardPrimitive>
)

export { Keyboard }
export type { KeyboardProps }
