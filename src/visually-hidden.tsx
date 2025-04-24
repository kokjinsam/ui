"use client"

import * as React from "react"
import { useVisuallyHidden } from "react-aria"

type VisuallyHiddenProps = React.HTMLAttributes<HTMLSpanElement>

const VisuallyHidden = (props: VisuallyHiddenProps) => {
  const { visuallyHiddenProps } = useVisuallyHidden()

  return <span {...visuallyHiddenProps} {...props} />
}

export { VisuallyHidden }
export type { VisuallyHiddenProps }
