"use client"

import * as React from "react"
import type {
  CellProps,
  ColumnProps,
  ColumnResizerProps,
  TableHeaderProps as HeaderProps,
  RowProps,
  TableBodyProps,
  TableProps as TablePrimitiveProps
} from "react-aria-components"
import {
  Button,
  Cell,
  Collection,
  Column,
  ColumnResizer as ColumnResizerPrimitive,
  ResizableTableContainer,
  Row,
  TableBody as TableBodyPrimitive,
  TableHeader as TableHeaderPrimitive,
  Table as TablePrimitive,
  useTableOptions
} from "react-aria-components"
import { Checkbox } from "./checkbox"
import { cn } from "./utils"

type TableProps = TablePrimitiveProps & {
  allowResize?: boolean
}

const TableContext = React.createContext<TableProps>({
  allowResize: false
})

const useTableContext = () => React.useContext(TableContext)

const Table = ({ allowResize, ...props }: TableProps) => (
  <TableContext.Provider value={{ allowResize }}>
    <div
      className={cn(
        "relative w-full overflow-auto",
        "**:data-[slot=table-resizable-container]:overflow-auto"
      )}
    >
      {allowResize ? (
        <ResizableTableContainer>
          <TablePrimitive
            {...props}
            className={cn(
              "[--table-selected-bg:hsla(var(--accent-hsl),0.13)]",
              "text-ui-base table w-full min-w-full caption-bottom border-spacing-0 outline-hidden",
              "**:data-drop-target:border-ui-line **:data-drop-target:border",
              props.className
            )}
          />
        </ResizableTableContainer>
      ) : (
        <TablePrimitive
          {...props}
          className={cn(
            "[--table-selected-bg:hsla(var(--accent-hsl),0.13)]",
            "text-ui-base table w-full min-w-full caption-bottom border-spacing-0 outline-hidden",
            "**:data-drop-target:border-ui-line **:data-drop-target:border",
            props.className
          )}
        />
      )}
    </div>
  </TableContext.Provider>
)

const ColumnResizer = (props: ColumnResizerProps) => (
  <ColumnResizerPrimitive
    {...props}
    className={cn(
      "absolute top-0 right-0 bottom-0 grid w-px touch-none place-content-center px-1",
      "[&[data-resizing]>div]:bg-interactive-accent",
      "[&:hover>div]:bg-interactive-accent",
      "&[data-resizable-direction=left]:cursor-e-resize",
      "&[data-resizable-direction=right]:cursor-w-resize",
      "data-[resizable-direction=both]:cursor-ew-resize",
      props.className
    )}
  >
    <div className="bg-ui-line h-full w-px py-3" />
  </ColumnResizerPrimitive>
)

const TableBody = <T extends object>(props: TableBodyProps<T>) => (
  <TableBodyPrimitive
    data-slot="table-body"
    {...props}
    className={cn("[&_.tr:last-child]:border-0", props.className)}
  />
)

type TableCellProps = CellProps & {
  className?: string
}

const TableCell = (props: TableCellProps) => {
  const { allowResize } = useTableContext()

  return (
    <Cell
      data-slot="table-cell"
      {...props}
      className={cn(
        "group px-3 py-3 whitespace-nowrap outline-hidden",
        allowResize && "truncate overflow-hidden",
        props.className
      )}
    />
  )
}

type TableColumnProps = ColumnProps & {
  className?: string
  isResizable?: boolean
}

const TableColumn = ({ isResizable = false, ...props }: TableColumnProps) => {
  return (
    <Column
      data-slot="table-column"
      {...props}
      className={cn(
        "allows-sorting:cursor-pointer relative px-3 py-3 text-left font-medium whitespace-nowrap outline-hidden",
        "data-dragging:cursor-grabbing",
        "[&:has([slot=selection])]:pr-0",
        isResizable && "truncate overflow-hidden",
        props.className
      )}
    >
      {({ allowsSorting, sortDirection, isHovered }) => (
        <div
          className={cn(
            "flex items-center gap-2",
            "**:data-[slot=icon]:shrink-0"
          )}
        >
          <>
            {props.children as React.ReactNode}
            {allowsSorting && (
              <span
                className={cn(
                  "bg-ui-secondary text-fg grid size-[1.15rem] flex-none shrink-0 place-content-center rounded",
                  "*:data-[slot=icon]:size-3.5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:transition-transform *:data-[slot=icon]:duration-200",
                  isHovered ? "bg-ui-secondary-fg/10" : ""
                )}
              >
                <span
                  data-slot="icon"
                  className={cn(
                    "lucide-chevron-down",
                    sortDirection === "ascending" && "rotate-180"
                  )}
                />
              </span>
            )}
            {isResizable && <ColumnResizer />}
          </>
        </div>
      )}
    </Column>
  )
}

type TableHeaderProps<T extends object> = HeaderProps<T>

const TableHeader = <T extends object>({
  columns,
  ...props
}: TableHeaderProps<T>) => {
  const { selectionBehavior, selectionMode, allowsDragging } = useTableOptions()

  return (
    <TableHeaderPrimitive
      data-slot="table-header"
      {...props}
      className={cn("border-ui-line border-b", props.className)}
    >
      {allowsDragging && <Column className="w-0" />}
      {selectionBehavior === "toggle" && (
        <Column className="w-0 pl-4">
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>{props.children}</Collection>
    </TableHeaderPrimitive>
  )
}

type TableRowProps<T extends object> = RowProps<T>

const TableRow = <T extends object>({
  columns,
  ...props
}: TableRowProps<T>) => {
  const { selectionBehavior, allowsDragging } = useTableOptions()

  return (
    <Row
      data-slot="table-row"
      {...props}
      className={cn(
        "tr group bg-bg text-muted ring-ui-line border-ui-line relative cursor-default border-b outline-hidden",
        "focus:ring-0",
        "focus-visible:ring-1",
        "hover:bg-interactive-hover",
        "data-[selected]:text-normal data-[selected]:bg-(--table-selected-bg) data-[selected]:hover:bg-(--table-selected-bg)",
        props.className
      )}
    >
      {allowsDragging && (
        <Cell className="group ring-primary cursor-grab pr-0 data-dragging:cursor-grabbing">
          <Button
            className="pressed:text-fg text-muted-fg relative bg-transparent py-1.5 pl-3.5"
            slot="drag"
          >
            <span data-slot="icon" className="lucide-grip-vertical" />
          </Button>
        </Cell>
      )}
      {selectionBehavior === "toggle" && (
        <Cell className="pl-4">
          <span
            aria-hidden
            className="bg-ui-primary group-selected:block absolute inset-y-0 left-0 hidden h-full w-0.5"
          />
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{props.children}</Collection>
    </Row>
  )
}

Table.Body = TableBody
Table.Cell = TableCell
Table.Column = TableColumn
Table.Header = TableHeader
Table.Row = TableRow

export { Table }
export type {
  TableBodyProps,
  TableCellProps,
  TableColumnProps,
  TableProps,
  TableRowProps
}
