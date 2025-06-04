import * as React from "react"
import type { FormProps as FormPrimitiveProps } from "react-aria-components"
import { Form as FormPrimitive } from "react-aria-components"

type FormProps = FormPrimitiveProps

const Form = (props: FormProps) => <FormPrimitive {...props} />

export { Form }
export type { FormProps }
