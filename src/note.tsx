import * as React from "react"
import { tv } from "tailwind-variants"
import { cn, type VariantProps } from "./utils"

const noteStyles = tv({
  base: [
    "w-full overflow-hidden rounded-lg p-4 inset-ring-1 inset-ring-current/10 sm:text-sm/6",
    "[&_a]:underline hover:[&_a]:underline **:[strong]:font-semibold"
  ],
  variants: {
    intent: {
      default: [
        "border-border bg-secondary/50 text-secondary-foreground **:data-[slot=icon]:text-secondary-foreground [&_a]:text-secondary-foreground",
        "dark:**:data-[slot=icon]:text-secondary-foreground dark:[&_a]:text-secondary-foreground"
      ],
      info: [
        "bg-sky-500/5 text-sky-700 group-hover:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-hover:bg-sky-500/20"
      ],
      warning:
        "bg-amber-400/20 text-amber-700 group-hover:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-hover:bg-amber-400/15",
      danger:
        "bg-red-500/15 text-red-700 group-hover:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-hover:bg-red-500/20",
      success: [
        "border-success/20 bg-success/50 **:data-[slot=icon]:text-success leading-4 text-emerald-900 [&_a]:text-emerald-600",
        "dark:bg-success/10 dark:text-emerald-200 dark:**:data-[slot=icon]:text-emerald-400 dark:[&_a]:text-emerald-50"
      ]
    }
  },
  defaultVariants: {
    intent: "default"
  }
})

const iconMap = {
  info: "lucide-info",
  warning: "lucide-triangle-alert",
  danger: "lucide-circle-alert",
  success: "lucide-circle-check",
  default: ""
}

type NoteProps = React.HtmlHTMLAttributes<HTMLDivElement> &
  VariantProps<typeof noteStyles> & {
    indicator?: boolean
  }

const Note = ({
  indicator = true,
  intent = "default",
  ...props
}: NoteProps) => {
  const icon = iconMap[intent] || null

  return (
    <div
      {...props}
      className={noteStyles({ intent, className: props.className })}
    >
      <div className="flex grow items-start">
        {icon && indicator && (
          <div className="shrink-0">
            <span
              data-slot="icon"
              className={cn(
                icon,
                "mr-3 size-5 rounded-full leading-loose ring-4 ring-current/30"
              )}
            />
          </div>
        )}
        <div className="text-pretty">{props.children}</div>
      </div>
    </div>
  )
}

export { Note }
export type { NoteProps }
