import * as React from "react"
import { ProgressBar } from "react-aria-components"
import type { VariantProps } from "./utils"
import { cn, tv } from "./utils"

const Ring = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    data-slot="icon"
    aria-hidden="true"
    {...props}
    className={cn("size-4", props.className)}
  >
    <path
      stroke="currentColor"
      strokeOpacity={0.25}
      strokeWidth={3.636}
      d="M11.909 21a9.09 9.09 0 1 0 0-18.182 9.09 9.09 0 0 0 0 18.182Z"
    />
    <path
      fill="currentColor"
      d="M4.636 11.91a7.273 7.273 0 0 1 7.273-7.274V1C5.885 1 1 5.885 1 11.91zm1.819 4.81a7.24 7.24 0 0 1-1.819-4.81H1c0 2.764 1.032 5.294 2.727 7.215z"
    />
  </svg>
)

const Spin = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2400 2400"
    data-slot="icon"
    aria-hidden="true"
    {...props}
    className={cn("size-4", className)}
  >
    <g strokeWidth="200" strokeLinecap="round" fill="none">
      <line x1="1200" y1="600" x2="1200" y2="100" />
      <line opacity="0.5" x1="1200" y1="2300" x2="1200" y2="1800" />
      <line opacity="0.917" x1="900" y1="680.4" x2="650" y2="247.4" />
      <line opacity="0.417" x1="1750" y1="2152.6" x2="1500" y2="1719.6" />
      <line opacity="0.833" x1="680.4" y1="900" x2="247.4" y2="650" />
      <line opacity="0.333" x1="2152.6" y1="1750" x2="1719.6" y2="1500" />
      <line opacity="0.75" x1="600" y1="1200" x2="100" y2="1200" />
      <line opacity="0.25" x1="2300" y1="1200" x2="1800" y2="1200" />
      <line opacity="0.667" x1="680.4" y1="1500" x2="247.4" y2="1750" />
      <line opacity="0.167" x1="2152.6" y1="650" x2="1719.6" y2="900" />
      <line opacity="0.583" x1="900" y1="1719.6" x2="650" y2="2152.6" />
      <line opacity="0.083" x1="1750" y1="247.4" x2="1500" y2="680.4" />
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        keyTimes="0;0.08333;0.16667;0.25;0.33333;0.41667;0.5;0.58333;0.66667;0.75;0.83333;0.91667"
        values="0 1199 1199;30 1199 1199;60 1199 1199;90 1199 1199;120 1199 1199;150 1199 1199;180 1199 1199;210 1199 1199;240 1199 1199;270 1199 1199;300 1199 1199;330 1199 1199"
        dur="0.83333s"
        begin="0.08333s"
        repeatCount="indefinite"
        calcMode="discrete"
      />
    </g>
  </svg>
)

const loaderStyles = tv({
  base: "relative",
  variants: {
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
      xl: "size-10"
    }
  },
  defaultVariants: {
    size: "sm"
  }
})

const LOADERS = {
  ring: Ring,
  spin: Spin
}

const DEFAULT_SPINNER = "spin"

type LoaderVariantProps = VariantProps<typeof loaderStyles>

type LoaderProps = Omit<
  React.ComponentPropsWithoutRef<"svg">,
  "display" | "opacity" | "intent"
> &
  LoaderVariantProps & {
    variant?: keyof typeof LOADERS
    percentage?: number
    isIndeterminate?: boolean
    formatOptions?: Intl.NumberFormatOptions
    ref?: React.RefObject<SVGSVGElement>
  }

const Loader = ({
  isIndeterminate = true,
  variant = DEFAULT_SPINNER,
  size,
  ...props
}: LoaderProps) => {
  const LoaderPrimitive =
    LOADERS[variant in LOADERS ? variant : DEFAULT_SPINNER]

  return (
    <ProgressBar
      aria-label={props["aria-label"] ?? "Loading..."}
      formatOptions={props.formatOptions}
      isIndeterminate={isIndeterminate}
    >
      <LoaderPrimitive
        role="presentation"
        {...props}
        className={cn([
          loaderStyles({ size }),
          "text-current",
          ["ring"].includes(variant) && "animate-spin",
          variant === "spin" && "stroke-current",
          props.className
        ])}
      />
    </ProgressBar>
  )
}

export { Loader }
