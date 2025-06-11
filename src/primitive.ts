import { tv } from "./utils"

const focusRing = tv({
  variants: {
    isFocused: {
      true: "ring-ring/20 data-invalid:ring-destructive/20 ring-4 outline-hidden"
    },
    isFocusVisible: { true: "ring-ring/20 ring-4 outline-hidden" },
    isInvalid: { true: "ring-destructive/20 ring-4" }
  }
})

const focusStyles = tv({
  extend: focusRing,
  variants: {
    isFocused: { true: "border-ring/70 forced-colors:border-[Highlight]" },
    isInvalid: { true: "border-destructive/70 forced-colors:border-[Mark]" }
  }
})

export { focusRing, focusStyles }
