import type { KeyboardEvent, RefObject } from "react"
import * as React from "react"
import type {
  ComboBoxProps,
  GroupProps,
  Key,
  ListBoxProps,
  Selection
} from "react-aria-components"
import { Button, ComboBox, Group } from "react-aria-components"
import { DropdownItem, DropdownLabel, DropdownSection } from "./dropdown"
import type { FieldProps } from "./field"
import { Description, FieldGroup, Input, Label } from "./field"
import { ListBox } from "./list-box"
import { PopoverContent } from "./popover"
import type { RestrictedIntent, TagGroupProps } from "./tag-group"
import { Tag, TagGroup, TagList } from "./tag-group"
import { cn, composeClassName } from "./utils"

type MultipleSelectProps<T> = Omit<
  ListBoxProps<T>,
  "renderEmptyState" | "className"
> &
  Pick<
    ComboBoxProps<T & { selectedKeys: Selection }>,
    "isRequired" | "validate" | "validationBehavior"
  > &
  FieldProps &
  Pick<TagGroupProps, "shape"> &
  Pick<GroupProps, "isDisabled" | "isInvalid" | "className"> & {
    errorMessage?: string
    intent?: RestrictedIntent
    maxItems?: number
    renderEmptyState?: (inputValue: string) => React.ReactNode
  }

const mapToNewObject = <T extends object>(
  array: T[]
): { id: T[keyof T]; textValue: T[keyof T] }[] =>
  array.map((item) => {
    const idProperty = Object.keys(item).find(
      (key) => key === "id" || key === "key"
    )
    const textProperty = Object.keys(item).find(
      (key) => key !== "id" && key !== "key"
    )
    return {
      id: item[idProperty as keyof T],
      textValue: item[textProperty as keyof T]
    }
  })

const MultipleSelect = <T extends object>({
  maxItems = Number.POSITIVE_INFINITY,
  renderEmptyState,
  ...props
}: MultipleSelectProps<T>) => {
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const triggerButtonRef = React.useRef<HTMLButtonElement>(null)
  const [inputValue, setInputValue] = React.useState("")
  const [selectedKeys, onSelectionChange] = React.useState<Selection>(
    new Set(props.selectedKeys)
  )

  const isMax = [...selectedKeys].length >= maxItems

  React.useEffect(() => {
    setInputValue("")
    return () => {
      inputRef.current?.focus()
    }
  }, [props?.selectedKeys, selectedKeys])

  const addItem = (e: Key | null) => {
    if (!e || isMax) return
    onSelectionChange?.((s) => new Set([...s, e!]))
    // @ts-expect-error incompatible type Key and Selection
    props.onSelectionChange?.((s) => new Set([...s, e!]))
  }

  const removeItem = (e: Set<Key>) => {
    onSelectionChange?.(
      (s) => new Set([...s].filter((i) => i !== e.values().next().value))
    )
    props.onSelectionChange?.(
      // @ts-expect-error incompatible type Key and Selection
      (s) => new Set([...s].filter((i) => i !== e.values().next().value))
    )
  }

  const onKeyDownCapture = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "") {
      onSelectionChange?.((s) => new Set([...s].slice(0, -1)))
      // @ts-expect-error incompatible type Key and Selection
      props.onSelectionChange?.((s) => new Set([...s].slice(0, -1)))
    }
  }

  const parsedItems = props.items
    ? mapToNewObject(props.items as T[])
    : mapToNewObject(
        React.Children.map(
          props.children as React.ReactNode,
          (child) => React.isValidElement(child) && child.props
        ) as T[]
      )

  const availableItemsToSelect = props.items
    ? parsedItems.filter((item) => ![...selectedKeys].includes(item.id as Key))
    : parsedItems

  const filteredChildren = props.items
    ? parsedItems.filter((item) => ![...selectedKeys].includes(item.id as Key))
    : React.Children.map(
        props.children as React.ReactNode,
        (child) => React.isValidElement(child) && child.props
      )?.filter((item: T & any) => ![...selectedKeys].includes(item.id))

  return (
    <Group
      isDisabled={props.isDisabled}
      isInvalid={props.isInvalid}
      className={composeClassName(
        props.className,
        "group flex h-fit flex-col gap-y-1"
      )}
    >
      {({ isInvalid, isDisabled }) => (
        <>
          {props.label && (
            <Label onClick={() => inputRef.current?.focus()}>
              {props.label}
            </Label>
          )}
          <FieldGroup
            ref={triggerRef as RefObject<HTMLDivElement>}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            className="flex h-fit min-h-10 flex-wrap items-center"
          >
            <TagGroup
              onRemove={removeItem}
              aria-hidden
              shape={props.shape}
              intent={props.intent}
              aria-label="Selected items"
            >
              <TagList
                className={cn(
                  [...selectedKeys].length !== 0 &&
                    "flex flex-1 flex-wrap py-1.5 pl-2",
                  "gap-1.5 outline-hidden [&_.jdt3lr2x]:last:-mr-1",
                  props.shape === "square" &&
                    "[&_.jdt3lr2x]:rounded-[calc(var(--radius-lg)-4px)]"
                )}
                items={[...selectedKeys].map((key) => ({
                  id: key,
                  textValue: parsedItems.find((item) => item.id === key)
                    ?.textValue as string
                }))}
              >
                {(item: { id: Key; textValue: Key }) => (
                  <Tag
                    isDisabled={isDisabled}
                    textValue={item.textValue as string}
                  >
                    {item.textValue as string}
                  </Tag>
                )}
              </TagList>
            </TagGroup>
            <ComboBox
              isRequired={props.isRequired}
              validate={props.validate}
              validationBehavior={props.validationBehavior}
              isReadOnly={isMax}
              isDisabled={isDisabled}
              className="flex flex-1"
              aria-label="Search"
              onSelectionChange={addItem}
              inputValue={inputValue}
              onInputChange={isMax ? () => {} : setInputValue}
            >
              <div className="flex w-full flex-row items-center justify-between px-2">
                <Input
                  onFocus={() => triggerButtonRef.current?.click()}
                  ref={inputRef as RefObject<HTMLInputElement>}
                  className="flex-1 px-0.5 py-1.5 shadow-none ring-0"
                  onBlur={() => {
                    setInputValue("")
                  }}
                  onKeyDownCapture={onKeyDownCapture}
                  placeholder={isMax ? "Maximum reached" : props.placeholder}
                />
                <Button
                  ref={triggerButtonRef}
                  aria-label="Chevron"
                  className="text-muted-foreground ml-auto inline-flex items-center justify-center rounded-lg outline-hidden"
                >
                  <span
                    data-slot="icon"
                    className="lucide-chevron-down size-4 transition group-has-open:-rotate-180"
                  />
                </Button>
              </div>
              <PopoverContent
                showArrow={false}
                respectScreen={false}
                triggerRef={triggerRef}
                className="min-w-(--trigger-width) overflow-hidden"
                style={{
                  minWidth: triggerRef.current?.offsetWidth,
                  width: triggerRef.current?.offsetWidth
                }}
              >
                <ListBox
                  renderEmptyState={() =>
                    renderEmptyState ? (
                      renderEmptyState(inputValue)
                    ) : (
                      <Description className="block p-3">
                        {inputValue ? (
                          <>
                            No results found for:{" "}
                            <strong className="text-foreground font-medium">
                              {inputValue}
                            </strong>
                          </>
                        ) : (
                          "No options"
                        )}
                      </Description>
                    )
                  }
                  items={(availableItemsToSelect as T[]) ?? props.items}
                  {...props}
                  className="shadow-0 max-h-[inherit] min-w-[inherit] border-0"
                >
                  {filteredChildren?.map((item: any) => (
                    <MultipleSelect.Item
                      key={item.id as Key}
                      id={item.id as Key}
                      textValue={item.textValue as string}
                    >
                      {item.textValue as string}
                    </MultipleSelect.Item>
                  )) ?? props.children}
                </ListBox>
              </PopoverContent>
            </ComboBox>
          </FieldGroup>
          {props.description && <Description>{props.description}</Description>}
          {props.errorMessage && isInvalid && (
            <Description className="text-danger text-sm/5">
              {props.errorMessage}
            </Description>
          )}
        </>
      )}
    </Group>
  )
}

MultipleSelect.Item = DropdownItem
MultipleSelect.Label = DropdownLabel
MultipleSelect.Section = DropdownSection

export { MultipleSelect }
export type { MultipleSelectProps }
