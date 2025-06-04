import clsx from "clsx"
import { composeRenderProps } from "react-aria-components"
import { createTV } from "tailwind-variants"

const cn = (...inputs: clsx.ClassValue[]) => clsx(inputs)

const tv = createTV({
  twMerge: false
})

/**
 * A small wrapper on top of `composeRenderProps` to wrap additional className
 * combinations with `cn`.
 */
const composeClassName = <T>(
  input: clsx.ClassValue | ((v: T) => string),
  ...inputs: clsx.ClassValue[]
): string | ((v: T) => string) =>
  composeRenderProps(input, (className) => cn(inputs, className))

export type { VariantProps } from "tailwind-variants"
export { cn, composeClassName, tv }
