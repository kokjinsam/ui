import clsx from "clsx"
import { createTV } from "tailwind-variants"

const cn = (...inputs: clsx.ClassValue[]) => clsx(inputs)

const tv = createTV({
  twMerge: false
})

export type { VariantProps } from "tailwind-variants"
export { cn, tv }
