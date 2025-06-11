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
  composeRenderProps,
  useTableOptions
} from "react-aria-components"

import { Checkbox } from "./checkbox"
import { cn, composeClassName } from "./utils"

type TableProps = Omit<TablePrimitiveProps, "className"> & {
  allowResize?: boolean
  className?: string
  bleed?: boolean
  ref?: React.Ref<HTMLTableElement>
}

const TableContext = React.createContext<TableProps>({
  allowResize: false
})

const useTableContext = () => React.use(TableContext)

const Root = (props: TableProps) => (
  <TablePrimitive
    className="w-full min-w-full caption-bottom text-sm/6 outline-hidden [--table-selected-background:var(--color-secondary)]/50"
    {...props}
  />
)

const Table = ({ allowResize, bleed, ...props }: TableProps) => (
  <TableContext.Provider value={{ allowResize, bleed }}>
    <div className="flow-root">
      <div
        className={cn(
          "relative -mx-(--gutter) overflow-x-auto whitespace-nowrap [--gutter-y:--spacing(2)] has-data-[slot=table-resizable-container]:overflow-auto",
          props.className
        )}
      >
        <div
          className={cn(
            "inline-block min-w-full align-middle",
            !bleed && "sm:px-(--gutter)"
          )}
        >
          {allowResize ? (
            <ResizableTableContainer data-slot="table-resizable-container">
              <Root {...props} />
            </ResizableTableContainer>
          ) : (
            <Root {...props} />
          )}
        </div>
      </div>
    </div>
  </TableContext.Provider>
)

const ColumnResizer = (props: ColumnResizerProps) => (
  <ColumnResizerPrimitive
    {...props}
    className={composeClassName(
      props.className,
      "&[data-resizable-direction=left]:cursor-e-resize &[data-resizable-direction=right]:cursor-w-resize [&[data-resizing]>div]:bg-primary absolute top-0 right-0 bottom-0 grid w-px touch-none place-content-center px-1 data-[resizable-direction=both]:cursor-ew-resize"
    )}
  >
    <div className="bg-border h-full w-px py-(--gutter-y)" />
  </ColumnResizerPrimitive>
)

const TableBody = <T extends object>(props: TableBodyProps<T>) => (
  <TableBodyPrimitive
    data-slot="table-body"
    {...props}
    className={cn("[&_.tr:last-child]:border-0", props.className)}
  />
)

type TableColumnProps = ColumnProps & {
  className?: string
  isResizable?: boolean
}

const TableColumn = ({ isResizable = false, ...props }: TableColumnProps) => {
  const { bleed } = useTableContext()

  return (
    <Column
      data-slot="table-column"
      {...props}
      className={composeClassName(
        props.className,
        "text-muted-foreground text-left font-medium",
        "allows-sorting:cursor-default relative outline-hidden data-dragging:cursor-grabbing",
        "px-4 py-(--gutter-y) first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2))",
        !bleed && "sm:first:pl-1 sm:last:pr-1",
        isResizable && "truncate overflow-hidden"
      )}
    >
      {(values) => (
        <div className="flex items-center gap-2 **:data-[slot=icon]:shrink-0">
          <>
            {typeof props.children === "function"
              ? props.children(values)
              : props.children}
            {values.allowsSorting && (
              <span
                className={cn(
                  "bg-secondary text-foreground grid size-[1.15rem] flex-none shrink-0 place-content-center rounded *:data-[slot=icon]:size-3.5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:transition-transform *:data-[slot=icon]:duration-200",
                  values.isHovered && "bg-secondary-foreground/10"
                )}
              >
                <span
                  data-slot="icon"
                  className={cn(
                    "lucide-chevron-down",
                    values.sortDirection === "ascending" && "rotate-180"
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

type TableHeaderProps<T extends object> = HeaderProps<T> & {
  ref?: React.Ref<HTMLTableSectionElement>
}

const TableHeader = <T extends object>({
  columns,
  ...props
}: TableHeaderProps<T>) => {
  const { bleed } = useTableContext()
  const { selectionBehavior, selectionMode, allowsDragging } = useTableOptions()

  return (
    <TableHeaderPrimitive
      data-slot="table-header"
      {...props}
      className={composeClassName(props.className, "border-b")}
    >
      {allowsDragging && (
        <Column
          data-slot="table-column"
          className={cn(
            "w-0 max-w-8 px-4 first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2))",
            !bleed && "sm:first:pl-1 sm:last:pr-1"
          )}
        />
      )}
      {selectionBehavior === "toggle" && (
        <Column
          data-slot="table-column"
          className={cn(
            "w-0 max-w-8 px-4 first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2))",
            !bleed && "sm:first:pl-1 sm:last:pr-1"
          )}
        >
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>{props.children}</Collection>
    </TableHeaderPrimitive>
  )
}

type TableRowProps<T extends object> = RowProps<T> & {
  ref?: React.Ref<HTMLTableRowElement>
}

const TableRow = <T extends object>({
  columns,
  ...props
}: TableRowProps<T>) => {
  const { selectionBehavior, allowsDragging } = useTableOptions()

  return (
    <Row
      data-slot="table-row"
      {...props}
      className={composeRenderProps(
        props.className,
        (
          className,
          {
            isSelected,
            selectionMode,
            isFocusVisibleWithin,
            isDragging,
            isDisabled
          }
        ) =>
          cn(
            "group text-muted-foreground ring-primary relative cursor-default border-b outline-transparent last:border-b-0",
            isDragging && "outline outline-blue-500",
            isSelected &&
              "text-foreground bg-(--table-selected-background) hover:bg-(--table-selected-background)/50",
            (props.href || props.onAction || selectionMode === "multiple") &&
              "hover:text-foreground hover:bg-(--table-selected-background)",
            (props.href || props.onAction || selectionMode === "multiple") &&
              isFocusVisibleWithin &&
              "selected:bg-(--table-selected-background)/50 text-foreground bg-(--table-selected-background)/50",
            isDisabled && "opacity-50",
            className
          )
      )}
    >
      {allowsDragging && (
        <TableCell className="dragging:cursor-grabbing ring-primary cursor-grab">
          <Button
            slot="drag"
            className="focus-visible:ring-ring grid place-content-center rounded-xs px-[calc(var(--gutter)/2)] outline-hidden focus-visible:ring"
          >
            <span
              data-slot="icon"
              className="lucide-grip-vertical size-4 align-middle"
            />
          </Button>
        </TableCell>
      )}
      {selectionBehavior === "toggle" && (
        <TableCell>
          <Checkbox slot="selection" />
        </TableCell>
      )}
      <Collection items={columns}>{props.children}</Collection>
    </Row>
  )
}

const TableCell = (props: CellProps) => {
  const { allowResize, bleed } = useTableContext()

  return (
    <Cell
      data-slot="table-cell"
      {...props}
      className={composeClassName(
        props.className,
        "group group-has-data-focus-visible-within:text-foreground px-4 py-(--gutter-y) align-middle outline-hidden first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2))",
        !bleed && "sm:first:pl-1 sm:last:pr-1",
        allowResize && "truncate overflow-hidden"
      )}
    />
  )
}

Table.Body = TableBody
Table.Cell = TableCell
Table.Column = TableColumn
Table.Header = TableHeader
Table.Row = TableRow

export { Table }
export type { TableColumnProps, TableProps, TableRowProps }
