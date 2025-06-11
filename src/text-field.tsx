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
import { composeClassName } from "./utils"

type InputType = Exclude<InputProps["type"], "password">

type BaseTextFieldProps = TextFieldPrimitiveProps &
  FieldProps & {
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    isPending?: boolean
  }

type RevealableTextFieldProps = BaseTextFieldProps & {
  isRevealable: true
  type: "password"
}

type NonRevealableTextFieldProps = BaseTextFieldProps & {
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
  type,
  ...props
}: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const inputType = isRevealable
    ? isPasswordVisible
      ? "text"
      : "password"
    : type
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }
  return (
    <TextFieldPrimitive
      type={inputType}
      {...props}
      className={composeClassName(
        props.className,
        "group flex flex-col gap-y-1"
      )}
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
              <span className="text-muted-foreground ml-2">{prefix}</span>
            ) : (
              prefix
            )}
            <Input placeholder={placeholder} />
            {isRevealable ? (
              <ButtonPrimitive
                type="button"
                aria-label="Toggle password visibility"
                onPress={handleTogglePasswordVisibility}
                className="*:data-[slot=icon]:text-muted-foreground focus-visible:*:data-[slot=icon]:text-primary relative mr-1 grid shrink-0 place-content-center rounded-sm border-transparent outline-hidden"
              >
                {isPasswordVisible ? (
                  <span data-slot="icon" className="lucide-eye-off" />
                ) : (
                  <span data-slot="icon" className="lucide-eye" />
                )}
              </ButtonPrimitive>
            ) : isPending ? (
              <Loader variant="spin" />
            ) : suffix ? (
              typeof suffix === "string" ? (
                <span className="text-muted-foreground mr-2">{suffix}</span>
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
