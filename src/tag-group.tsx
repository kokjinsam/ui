import * as React from "react"
import type {
  TagGroupProps as TagGroupPrimitiveProps,
  TagListProps,
  TagProps as TagPrimitiveProps
} from "react-aria-components"
import {
  Button,
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive,
  Tag as TagPrimitive,
  composeRenderProps
} from "react-aria-components"
import { badgeIntents, badgeShapes, badgeStyles } from "./badge"
import { Description, Label } from "./field"
import { cn, composeClassName, tv } from "./utils"

const intents = {
  primary: {
    base: [
      badgeIntents.primary,
      "**:[[slot=remove]]:hover:bg-primary **:[[slot=remove]]:hover:text-primary-foreground"
    ],
    selected: [
      "bg-primary dark:hover:bg-primary dark:bg-primary hover:bg-primary text-primary-foreground dark:text-primary-foreground hover:text-primary-foreground",
      "**:[[slot=remove]]:hover:bg-primary-foreground/50 **:[[slot=remove]]:hover:text-primary"
    ]
  },
  secondary: {
    base: [
      badgeIntents.secondary,
      "**:[[slot=remove]]:hover:bg-foreground **:[[slot=remove]]:hover:text-background"
    ],
    selected: [
      "bg-foreground text-background dark:bg-foreground/90 dark:text-secondary",
      "**:[[slot=remove]]:hover:bg-secondary/30 **:[[slot=remove]]:hover:text-secondary"
    ]
  },
  success: {
    base: [
      badgeIntents.success,
      "**:[[slot=remove]]:hover:bg-success **:[[slot=remove]]:hover:text-success-foreground"
    ],
    selected: [
      "bg-success dark:bg-success dark:text-success-foreground dark:hover:bg-success hover:bg-success text-success-foreground hover:text-success-foreground",
      "**:[[slot=remove]]:hover:bg-success-foreground/30 **:[[slot=remove]]:hover:text-success-foreground"
    ]
  },
  warning: {
    base: [
      badgeIntents.warning,
      "**:[[slot=remove]]:hover:bg-warning **:[[slot=remove]]:hover:text-warning-foreground"
    ],
    selected: [
      "bg-warning dark:hover:bg-warning dark:bg-warning dark:text-background hover:bg-warning text-warning-foreground hover:text-warning-foreground",
      "**:[[slot=remove]]:hover:bg-warning-foreground/30 **:[[slot=remove]]:hover:text-warning-foreground"
    ]
  },
  danger: {
    base: [
      badgeIntents.danger,
      "**:[[slot=remove]]:hover:bg-danger **:[[slot=remove]]:hover:text-danger-foreground"
    ],
    selected: [
      "bg-danger dark:bg-danger dark:hover:bg-danger/90 hover:bg-danger text-danger-foreground hover:text-danger-foreground",
      "**:[[slot=remove]]:hover:bg-danger-foreground/30 **:[[slot=remove]]:hover:text-danger-foreground"
    ]
  }
}

type RestrictedIntent = "primary" | "secondary"

type Intent = "primary" | "secondary" | "warning" | "danger" | "success"

type Shape = keyof typeof badgeShapes

type TagGroupContextValue = {
  intent: Intent
  shape: Shape
}

const TagGroupContext = React.createContext<TagGroupContextValue>({
  intent: "primary",
  shape: "square"
})

type TagGroupProps = TagGroupPrimitiveProps & {
  intent?: Intent
  shape?: "square" | "circle"
  errorMessage?: string
  label?: string
  description?: string
  ref?: React.RefObject<HTMLDivElement>
}

const TagGroup = (props: TagGroupProps) => (
  <TagGroupPrimitive
    {...props}
    className={cn("flex flex-col flex-wrap", props.className)}
  >
    <TagGroupContext.Provider
      value={{
        intent: props.intent || "primary",
        shape: props.shape || "square"
      }}
    >
      {props.label && <Label className="mb-1">{props.label}</Label>}
      {props.children}
      {props.description && <Description>{props.description}</Description>}
    </TagGroupContext.Provider>
  </TagGroupPrimitive>
)

const TagList = <T extends object>(props: TagListProps<T>) => (
  <TagListPrimitive
    {...props}
    className={composeClassName(props.className, "flex flex-wrap gap-1.5")}
  />
)

const tagStyles = tv({
  base: [badgeStyles.base, "outline-hidden"],
  variants: {
    isLink: { true: "cursor-pointer", false: "cursor-default" },
    isFocusVisible: { true: "inset-ring inset-ring-current/10" },
    isDisabled: { true: "opacity-50" },
    allowsRemoving: { true: "pr-1" }
  }
})

type TagProps = TagPrimitiveProps & {
  intent?: Intent
  shape?: Shape
}

const Tag = ({ intent, shape, ...props }: TagProps) => {
  const textValue =
    typeof props.children === "string" ? props.children : undefined
  const groupContext = React.use(TagGroupContext)

  return (
    <TagPrimitive
      textValue={textValue}
      {...props}
      className={composeRenderProps(
        props.className,
        (className, renderProps) => {
          const finalIntent = intent || groupContext.intent
          const finalShape = shape || groupContext.shape

          return tagStyles({
            ...renderProps,
            isLink: "href" in props,
            className: cn(
              intents[finalIntent]?.base,
              badgeShapes[finalShape],
              renderProps.isSelected
                ? intents[finalIntent].selected
                : undefined,
              className
            )
          })
        }
      )}
    >
      {({ allowsRemoving }) => {
        return (
          <>
            {props.children as React.ReactNode}
            {allowsRemoving && (
              <Button
                slot="remove"
                className="-mr-0.5 grid size-3.5 place-content-center rounded outline-hidden [&>[data-slot=icon]]:size-3 [&>[data-slot=icon]]:shrink-0"
              >
                <span data-slot="icon" className="lucide-x" />
              </Button>
            )}
          </>
        )
      }}
    </TagPrimitive>
  )
}

export { Tag, TagGroup, TagList }
export type { RestrictedIntent, TagGroupProps, TagListProps, TagProps }
