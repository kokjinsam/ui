import * as React from "react"
import type {
  InputProps,
  TextFieldProps as TextFieldPrimitiveProps
} from "react-aria-components"
import {
  Button as ButtonPrimitive,
  TextField as TextFieldPrimitive
} from "react-aria-components"
import type { FieldProps } from "./field"
import { Description, FieldError, FieldGroup, Input, Label } from "./field"
import { Loader } from "./loader"
import { cn } from "./utils"

type InputType = Exclude<InputProps["type"], "password">

interface BaseTextFieldProps extends TextFieldPrimitiveProps, FieldProps {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  isPending?: boolean
  className?: string
}

interface RevealableTextFieldProps extends BaseTextFieldProps {
  isRevealable: true
  type: "password"
}

interface NonRevealableTextFieldProps extends BaseTextFieldProps {
  isRevealable?: never
  type?: InputType
}

type TextFieldProps = RevealableTextFieldProps | NonRevealableTextFieldProps

const TextField = ({
  placeholder,
  label,
  description,
  errorMessage,
  prefix,
  suffix,
  isPending,
  isRevealable,
  ...props
}: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  const inputType = isRevealable
    ? isPasswordVisible
      ? "text"
      : "password"
    : props.type

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  return (
    <TextFieldPrimitive
      {...props}
      type={inputType}
      className={cn("group flex flex-col gap-y-1", props.className)}
    >
      {!props.children ? (
        <>
          {label && <Label>{label}</Label>}
          <FieldGroup
            isDisabled={props.isDisabled}
            isInvalid={!!errorMessage}
            data-loading={isPending ? "true" : undefined}
          >
            {prefix && typeof prefix === "string" ? (
              <span className="text-muted text-ui-base ml-2">{prefix}</span>
            ) : (
              prefix
            )}
            <Input placeholder={placeholder} />
            {isRevealable ? (
              <ButtonPrimitive
                type="button"
                aria-label="Toggle password visibility"
                onPress={handleTogglePasswordVisibility}
                className="*:data-[slot=icon]:text-muted-fg focus-visible:*:data-[slot=icon]:text-primary relative mr-1 grid shrink-0 place-content-center rounded-sm border-transparent outline-hidden"
              >
                {isPasswordVisible ? (
                  <div className="lucide-eye-off size-4" />
                ) : (
                  <div className="lucide-eye size-4" />
                )}
              </ButtonPrimitive>
            ) : isPending ? (
              <Loader variant="spin" />
            ) : suffix ? (
              typeof suffix === "string" ? (
                <span className="text-muted text-ui-base mr-2">{suffix}</span>
              ) : (
                suffix
              )
            ) : null}
          </FieldGroup>
          {description && <Description>{description}</Description>}
          <FieldError>{errorMessage}</FieldError>
        </>
      ) : (
        props.children
      )}
    </TextFieldPrimitive>
  )
}

export { TextField }
export type { TextFieldProps }
