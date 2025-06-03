import * as React from "react"
import type {
  GridListItemProps,
  GridListProps,
  TextProps
} from "react-aria-components"
import {
  GridList,
  GridListItem,
  Text,
  composeRenderProps
} from "react-aria-components"
import { Checkbox } from "./checkbox"
import { focusStyles } from "./primitive"
import type { VariantProps } from "./utils"
import { cn, tv } from "./utils"

const choiceboxStyles = tv({
  base: "grid",
  variants: {
    columns: {
      1: "col-span-full grid-cols-[auto_1fr]",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
      5: "sm:grid-cols-5",
      6: "sm:grid-cols-6"
    },
    gap: {
      0: "gap-0",
      2: "gap-2",
      4: "gap-4",
      6: "gap-6"
    }
  },
  defaultVariants: {
    columns: 2,
    gap: 4
  },
  compoundVariants: [
    {
      gap: 0,
      columns: 1,
      className:
        "rounded-lg *:data-[slot=choicebox-item]:-mt-px *:data-[slot=choicebox-item]:rounded-none *:data-[slot=choicebox-item]:inset-ring-1 *:data-[slot=choicebox-item]:first:rounded-t-[calc(var(--radius-lg)-1px)] *:data-[slot=choicebox-item]:last:rounded-b-[calc(var(--radius-lg)-1px)]"
    }
  ]
})

const ChoiceboxContext = React.createContext<{
  columns?: number
  gap?: number
}>({})

const useChoiceboxContext = () => React.use(ChoiceboxContext)

type ChoiceboxProps<T extends object> = GridListProps<T> &
  VariantProps<typeof choiceboxStyles> & {
    className?: string
  }

const Choicebox = <T extends object>({
  columns,
  gap,
  selectionMode = "multiple",
  ...props
}: ChoiceboxProps<T>) => (
  <ChoiceboxContext.Provider value={{ columns, gap }}>
    <GridList
      layout={columns === 1 ? "stack" : "grid"}
      selectionMode={selectionMode}
      {...props}
      className={choiceboxStyles({
        columns,
        gap,
        className: props.className
      })}
    />
  </ChoiceboxContext.Provider>
)

const choiceboxItemStyles = tv({
  extend: focusStyles,
  base: [
    "group/choicebox-item bg-background relative text-sm [--choicebox-foreground:var(--color-primary)] [--choicebox:color-mix(in_oklab,var(--color-primary)_4%,white_96%)]",
    "[--choicebox-selected-hovered:color-mix(in_oklab,var(--color-primary)_15%,white_85%)]",
    "dark:[--choicebox-selected-hovered:color-mix(in_oklab,var(--color-primary)_25%,black_75%)]",
    "dark:[--choicebox-foreground:color-mix(in_oklab,var(--color-primary)_45%,white_55%)] dark:[--choicebox:color-mix(in_oklab,var(--color-primary)_20%,black_70%)]",
    "inset-ring-border cursor-default rounded-lg p-4 inset-ring **:data-[slot=label]:font-medium",
    "**:data-[slot=avatar]:size-5 **:data-[slot=avatar]:shrink-0 **:data-[slot=avatar]:*:mr-2 **:data-[slot=avatar]:*:size-5",
    "**:data-[slot=icon]:mr-2 **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0",
    "grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] supports-[grid-template-columns:subgrid]:grid-cols-subgrid"
  ],
  variants: {
    isOneColumn: {
      true: "col-span-full"
    },
    init: {
      true: [
        "bg-(--choicebox) text-(--choicebox-foreground)",
        "inset-ring-ring/70 z-20 hover:bg-(--choicebox-selected-hovered)",
        "**:data-[slot=label]:text-(--choicebox-foreground)",
        "**:[[slot=description]]:text-(--choicebox-foreground)"
      ]
    },
    isDisabled: {
      true: "**:data-[slot=label]:text-muted-foreground **:[[slot=description]]:text-muted-foreground/70 z-10 opacity-50 forced-colors:text-[GrayText]"
    }
  }
})

type ChoiceboxItemProps = GridListItemProps &
  VariantProps<typeof choiceboxItemStyles> & {
    label?: string
    description?: string
  }

const ChoiceboxItem = (props: ChoiceboxItemProps) => {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)
  const { columns } = useChoiceboxContext()

  return (
    <GridListItem
      textValue={textValue}
      data-slot="choicebox-item"
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        choiceboxItemStyles({
          ...renderProps,
          isOneColumn: columns === 1,
          init:
            renderProps.isSelected ||
            renderProps.isHovered ||
            renderProps.isFocusVisible,
          className
        })
      )}
    >
      {(values) => (
        <div
          className={cn(
            "col-span-full grid",
            columns === 1 ? "grid-cols-subgrid" : "grid-cols-[auto_1fr]"
          )}
        >
          {props.label && <ChoiceboxLabel>{props.label}</ChoiceboxLabel>}
          {props.description && (
            <ChoiceboxDescription>{props.description}</ChoiceboxDescription>
          )}
          {typeof props.children === "function"
            ? props.children(values)
            : props.children}
          {values.selectionMode === "multiple" &&
            values.selectionBehavior === "toggle" && (
              <div className="absolute top-0 right-0 px-2 pt-4">
                <Checkbox slot="selection" />
              </div>
            )}
        </div>
      )}
    </GridListItem>
  )
}

type ChoiceboxLabelProps = TextProps

const ChoiceboxLabel = (props: ChoiceboxLabelProps) => (
  <Text
    data-slot="label"
    {...props}
    className={cn(
      "col-start-2 group-has-data-[slot=icon]/choicebox-item:text-sm/3",
      props.className
    )}
  />
)

type ChoiceboxDescriptionProps = ChoiceboxLabelProps

const ChoiceboxDescription = (props: ChoiceboxDescriptionProps) => (
  <Text
    slot="description"
    {...props}
    className={cn("text-muted-foreground col-start-2", props.className)}
  />
)

Choicebox.Item = ChoiceboxItem
Choicebox.Label = ChoiceboxLabel
Choicebox.Description = ChoiceboxDescription

export { Choicebox }
export type { ChoiceboxItemProps, ChoiceboxProps }
