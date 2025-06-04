import * as React from "react"
import { useVisuallyHidden } from "react-aria"

type VisuallyHiddenSpanProps = {
  children: React.ReactNode
}

const VisuallyHidden = (props: VisuallyHiddenSpanProps) => {
  const { visuallyHiddenProps } = useVisuallyHidden()

  return <span {...props} {...visuallyHiddenProps} />
}

export { VisuallyHidden }
