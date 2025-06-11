import * as React from "react"
import type {
  SearchFieldProps as SearchFieldPrimitiveProps,
  ValidationResult
} from "react-aria-components"
import { SearchField as SearchFieldPrimitive } from "react-aria-components"
import { Button } from "./button"
import { Description, FieldError, FieldGroup, Input, Label } from "./field"
import { Loader } from "./loader"
import { composeClassName } from "./utils"

type SearchFieldProps = SearchFieldPrimitiveProps & {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  isPending?: boolean
}

const SearchField = ({
  placeholder,
  label,
  description,
  errorMessage,
  isPending,
  ...props
}: SearchFieldProps) => (
  <SearchFieldPrimitive
    aria-label={placeholder ?? props["aria-label"] ?? "Search..."}
    {...props}
    className={composeClassName(
      props.className,
      "group/search-field flex flex-col gap-y-1"
    )}
  >
    {!props.children ? (
      <>
        {label && <Label>{label}</Label>}
        <FieldGroup>
          {isPending ? (
            <Loader variant="spin" />
          ) : (
            <span data-slot="icon" className="lucide-search" />
          )}
          <Input placeholder={placeholder ?? "Search..."} />

          <Button
            intent="plain"
            className="pressed:bg-transparent pressed:text-foreground text-muted-foreground hover:text-foreground size-8 group-data-empty/search-field:invisible hover:bg-transparent"
          >
            <span data-slot="icon" className="lucide-x" />
          </Button>
        </FieldGroup>
        {description && <Description>{description}</Description>}
        <FieldError>{errorMessage}</FieldError>
      </>
    ) : (
      props.children
    )}
  </SearchFieldPrimitive>
)

export { SearchField }
export type { SearchFieldProps }
