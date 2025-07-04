import * as React from "react"
import type { Key } from "react-aria-components"
import { Group, TextField } from "react-aria-components"
import type { ListData } from "react-stately"
import type { FieldProps } from "./field"
import { Description, Input, Label } from "./field"
import type { RestrictedIntent, TagGroupProps } from "./tag-group"
import { Tag, TagGroup, TagList } from "./tag-group"
import { cn, tv } from "./utils"

const tagFieldsStyles = tv({
  base: "relative flex min-h-10 flex-row flex-wrap items-center transition",
  variants: {
    appearance: {
      outline: [
        "rounded-lg border px-1 shadow-xs",
        "has-[input[data-invalid=true][focus=true]]:border-danger has-[input[data-invalid=true]]:border-danger has-[input[data-invalid=true]]:ring-danger/20",
        "has-[input[focus=true]]:border-ring/70 has-[input[focus=true]]:ring-ring/20 has-[input[focus=true]]:ring-4"
      ],
      plain: "has-[input[focus=true]]:border-transparent"
    }
  }
})

type TagItemProps = {
  id: number
  name: string
}

type TagFieldProps = Pick<TagGroupProps, "shape"> &
  FieldProps & {
    intent?: RestrictedIntent
    isDisabled?: boolean
    max?: number
    className?: string
    children?: React.ReactNode
    name?: string
    list: ListData<TagItemProps>
    onItemInserted?: (tag: TagItemProps) => void
    onItemCleared?: (tag: TagItemProps | undefined) => void
    appearance?: "outline" | "plain"
  }

const TagField = ({
  appearance = "outline",
  name,
  list,
  onItemCleared,
  onItemInserted,
  ...props
}: TagFieldProps) => {
  const [isInvalid, setIsInvalid] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const existingTagCount = list.items.length
  const maxTags = props.max !== undefined ? props.max : Number.POSITIVE_INFINITY
  const maxTagsToAdd = maxTags - existingTagCount

  const insertTag = () => {
    const tagNames = inputValue.split(/,/)
    if (maxTagsToAdd <= 0) {
      setIsInvalid(true)
      setInputValue("")
      const timeoutId = setTimeout(() => {
        setIsInvalid(false)
      }, 2000)

      return () => clearTimeout(timeoutId)
    }

    for (const tagName of tagNames.slice(0, maxTagsToAdd)) {
      const formattedName = tagName
        .trim()
        .replace(/\s+/g, " ")
        .replace(/[\t\r\n]/g, "")

      if (
        formattedName &&
        !list.items.some(
          ({ name }) => name.toLowerCase() === formattedName.toLowerCase()
        )
      ) {
        const tag = {
          id: (list.items.at(-1)?.id ?? 0) + 1,
          name: formattedName
        }

        list.append(tag)
        onItemInserted?.(tag)
      }
    }

    setInputValue("")
  }

  const clearInvalidFeedback = () => {
    if (maxTags - list.items.length <= maxTagsToAdd) {
      setIsInvalid(false)
    }
  }

  const onRemove = (keys: Set<Key>) => {
    list.remove(...keys)

    const firstKey = [...keys][0]
    if (firstKey !== undefined) {
      onItemCleared?.(list.getItem(firstKey))
    }

    clearInvalidFeedback()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      insertTag()
    }

    if (e.key === "Backspace" && inputValue === "") {
      popLast()
      clearInvalidFeedback()
    }
  }

  const popLast = React.useCallback(() => {
    if (list.items.length === 0) {
      return
    }

    const endKey = list.items[list.items.length - 1]!

    if (endKey !== null) {
      list.remove(endKey.id)
      onItemCleared?.(list.getItem(endKey.id))
    }
  }, [list, onItemCleared])

  return (
    <div className={cn("flex w-full flex-col gap-y-1.5", props.className)}>
      {props.label && <Label>{props.label}</Label>}
      <Group className={cn("flex flex-col", props.isDisabled && "opacity-50")}>
        <TagGroup
          intent={props.intent}
          shape={props.shape}
          aria-label="List item inserted"
          onRemove={onRemove}
        >
          <div className={tagFieldsStyles({ appearance })}>
            <div className="flex flex-1 flex-wrap items-center">
              <TagList
                items={list.items}
                className={cn(
                  list.items.length !== 0
                    ? appearance === "outline" && "gap-1.5 px-1 py-1.5"
                    : "gap-0",
                  props.shape === "square" &&
                    "[&_.jdt3lr2x]:rounded-[calc(var(--radius-lg)-4px)]",
                  "outline-hidden [&_.jdt3lr2x]:cursor-default [&_.jdt3lr2x]:last:-mr-1"
                )}
              >
                {(item) => <Tag>{item.name}</Tag>}
              </TagList>
              <TextField
                aria-label={
                  props?.label ?? (props["aria-label"] || props.placeholder)
                }
                isInvalid={isInvalid}
                onKeyDown={onKeyDown}
                onChange={setInputValue}
                value={inputValue}
                className="flex-1"
                {...props}
              >
                <Input
                  className="inline"
                  placeholder={
                    maxTagsToAdd <= 0
                      ? "Remove one to add more"
                      : props.placeholder
                  }
                />
              </TextField>
            </div>
          </div>
        </TagGroup>
        {name && (
          <input
            hidden
            name={name}
            value={list.items.map((i) => i.name).join(",")}
            readOnly
          />
        )}
      </Group>
      {props.description && <Description>{props.description}</Description>}
    </div>
  )
}

export { TagField }
export type { TagFieldProps, TagItemProps }
