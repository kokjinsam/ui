"use client"

import * as React from "react"
import type {
  InputProps,
  TextFieldProps as TextFieldPrimitiveProps
} from "react-aria-components"
import { TextField as TextFieldPrimitive } from "react-aria-components"
import { Button } from "./button"
import type { FieldProps } from "./field"
import { Description, FieldError, FieldGroup, Input, Label } from "./field"
import { Loader } from "./loader"
import { cn } from "./utils"

type InputType = Exclude<InputProps["type"], "password">

type BaseTextFieldProps = TextFieldPrimitiveProps &
  FieldProps & {
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    isPending?: boolean
    isRevealable?: boolean
  }

type RevealableTextFieldProps = BaseTextFieldProps & {
  type: "password"
}

type NonRevealableTextFieldProps = BaseTextFieldProps & {
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
              <span className="text-muted text-ui-base/5 ml-2">{prefix}</span>
            ) : (
              prefix
            )}
            <Input placeholder={placeholder} />
            {isRevealable ? (
              <Button
                type="button"
                size="square-md"
                intent="plain"
                aria-label="Toggle password visibility"
                onPress={handleTogglePasswordVisibility}
                className="hover:bg-transparent"
              >
                {isPasswordVisible ? (
                  <div data-slot="icon" className="lucide-eye-off" />
                ) : (
                  <div data-slot="icon" className="lucide-eye" />
                )}
              </Button>
            ) : isPending ? (
              <Loader variant="spin" />
            ) : suffix ? (
              typeof suffix === "string" ? (
                <span className="text-muted text-ui-base/5 mr-2">{suffix}</span>
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
