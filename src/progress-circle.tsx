import * as React from "react"
import type { ProgressBarProps } from "react-aria-components"
import { ProgressBar } from "react-aria-components"
import { cn } from "./utils"

type ProgressCircleProps = Omit<ProgressBarProps, "className"> & {
  className?: string
  ref?: React.RefObject<HTMLDivElement>
}

const ProgressCircle = (props: ProgressCircleProps) => {
  const c = "50%"
  const r = "calc(50% - 2px)"

  return (
    <ProgressBar {...props}>
      {({ percentage, isIndeterminate }) => (
        <svg
          className={cn("size-4 shrink-0", props.className)}
          viewBox="0 0 24 24"
          fill="none"
          data-slot="icon"
        >
          <circle
            cx={c}
            cy={c}
            r={r}
            strokeWidth={3}
            stroke="currentColor"
            strokeOpacity={0.25}
          />
          {!isIndeterminate ? (
            <circle
              cx={c}
              cy={c}
              r={r}
              strokeWidth={3}
              stroke="currentColor"
              pathLength={100}
              strokeDasharray="100 200"
              strokeDashoffset={100 - (percentage ?? 0)}
              strokeLinecap="round"
              transform="rotate(-90)"
              className="origin-center"
            />
          ) : (
            <circle
              cx={c}
              cy={c}
              r={r}
              strokeWidth={3}
              stroke="currentColor"
              pathLength={100}
              strokeDasharray="100 200"
              strokeDashoffset={100 - 30}
              strokeLinecap="round"
              className="origin-center animate-[spin_1s_cubic-bezier(0.4,_0,_0.2,_1)_infinite]"
            />
          )}
        </svg>
      )}
    </ProgressBar>
  )
}

export { ProgressCircle }
export type { ProgressCircleProps }
