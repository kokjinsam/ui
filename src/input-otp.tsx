import { OTPInput, OTPInputContext } from "input-otp"
import * as React from "react"
import { cn } from "./utils"

type InputOTPProps = React.ComponentProps<typeof OTPInput>

const InputOTP = ({ autoFocus = true, ...props }: InputOTPProps) => (
  <OTPInput
    data-1p-ignore
    autoFocus={autoFocus}
    {...props}
    containerClassName={cn(
      "flex items-center gap-2 has-disabled:opacity-50",
      props.containerClassName
    )}
    className={cn(
      "mt-auto h-[2.5rem] bg-red-500 disabled:cursor-not-allowed",
      props.className
    )}
  />
)

type InputOTPGroupProps = React.ComponentProps<"div">

const InputOTPGroup = (props: InputOTPGroupProps) => (
  <div
    {...props}
    className={cn("flex items-center gap-x-1.5", props.className)}
  />
)

type InputOTPSlotProps = React.ComponentProps<"div"> & {
  index: number
}

const InputOTPSlot = ({ index, ...props }: InputOTPSlotProps) => {
  const inputOTPContext = React.use(OTPInputContext)
  const slot = inputOTPContext.slots[index]

  if (!slot) {
    throw new Error("Slot not found")
  }

  const { char, hasFakeCaret, isActive } = slot

  return (
    <div
      {...props}
      className={cn(
        "border-input relative flex size-10 items-center justify-center rounded-md border text-sm tabular-nums transition-all",
        isActive && "border-ring/70 ring-ring/20 z-10 ring-4",
        props.className
      )}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

type InputOTPSeparatorProps = React.ComponentProps<"div">

const InputOTPSeparator = (props: InputOTPSeparatorProps) => (
  <div {...props}>
    <span data-slot="icon" className="lucide-minus size-2" />
  </div>
)

InputOTP.Group = InputOTPGroup
InputOTP.Slot = InputOTPSlot
InputOTP.Separator = InputOTPSeparator

export { InputOTP }
export type {
  InputOTPGroupProps,
  InputOTPProps,
  InputOTPSeparatorProps,
  InputOTPSlotProps
}
