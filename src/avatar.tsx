import * as React from "react"
import { cn } from "./utils"

type AvatarProps = React.ComponentPropsWithoutRef<"span"> & {
  src?: string | null
  initials?: string
  alt?: string
  className?: string
  shape?: "square" | "circle"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const Avatar = ({
  src = null,
  initials,
  alt = "",
  shape = "circle",
  size = "md",
  ...props
}: AvatarProps) => {
  return (
    <span
      data-slot="avatar"
      {...props}
      className={cn(
        "[--avatar-radius:20%] [--ring-opacity:20%]",
        "outline-fg/(--ring-opacity) inline-grid shrink-0 align-middle outline-1 -outline-offset-1 *:col-start-1 *:row-start-1",
        size === "xs" && "size-5 *:size-5",
        size === "sm" && "size-6 *:size-6",
        size === "md" && "size-8 *:size-8",
        size === "lg" && "size-10 *:size-10",
        size === "xl" && "size-12 *:size-12",
        shape === "square" &&
          "rounded-(--avatar-radius) *:rounded-(--avatar-radius)",
        shape === "circle" && "rounded-full *:rounded-full",
        props.className
      )}
    >
      {initials && (
        <svg
          className="size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none"
          viewBox="0 0 100 100"
          aria-hidden={alt ? undefined : "true"}
        >
          {alt && <title>{alt}</title>}
          <text
            x="50%"
            y="50%"
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            dy=".125em"
          >
            {initials}
          </text>
        </svg>
      )}
      {src && <img className="size-full" src={src} alt={alt} />}
    </span>
  )
}

export { Avatar }
export type { AvatarProps }
