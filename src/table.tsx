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
              "table w-full min-w-full caption-bottom border-spacing-0 text-base outline-hidden",
              "**:data-drop-target:border-interactive **:data-drop-target:border",
              props.className
            )}
          />
        </ResizableTableContainer>
      ) : (
        <TablePrimitive
          {...props}
          className={cn(
            "table w-full min-w-full caption-bottom border-spacing-0 text-base outline-hidden",
            "**:data-drop-target:border-interactive **:data-drop-target:border",
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
      "[&[data-resizing]>div]:bg-interactive",
      "[&:hover>div]:bg-interactive",
      "&[data-resizable-direction=left]:cursor-e-resize",
      "&[data-resizable-direction=right]:cursor-w-resize",
      "data-[resizable-direction=both]:cursor-ew-resize",
      props.className
    )}
  >
    <div className="bg-line h-full w-px py-3" />
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
        "group/cell px-3 py-3 whitespace-nowrap outline-hidden",
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

const TableColumn = ({ isResizable = false, ...props }: TableColumnProps) => (
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
                "bg-control text-normal grid size-[1.15rem] flex-none shrink-0 place-content-center rounded-lg",
                "*:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:transition-transform *:data-[slot=icon]:duration-200",
                isHovered && "bg-control-hover"
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
      className={cn("border-line border-b", props.className)}
    >
      {allowsDragging && <Column maxWidth={30} />}
      {selectionBehavior === "toggle" && (
        <Column maxWidth={40} className="pl-4">
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
        "tr group/tr bg-surface-primary text-muted border-line ring-line relative cursor-default border-b outline-hidden",
        "focus:ring-0",
        "focus-visible:ring-control-focus focus-visible:ring-2",
        "hover:bg-control-hover",
        "data-[selected]:text-normal data-[selected]:bg-interactive/15 data-[selected]:hover:bg-interactive-hover/15",
        props.className
      )}
    >
      {allowsDragging && (
        <Cell className="group/grab cursor-grab pr-0 group-data-[dragging]/tr:cursor-grabbing">
          <Button
            slot="drag"
            className="text-muted relative bg-transparent py-1.5 pl-3.5"
          >
            <span
              data-slot="icon"
              className="lucide-grip-vertical size-4 align-middle"
            />
          </Button>
        </Cell>
      )}
      {selectionBehavior === "toggle" && (
        <Cell className="pl-4">
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
