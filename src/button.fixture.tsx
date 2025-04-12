import * as React from "react"
import { useFixtureInput, useFixtureSelect } from "react-cosmos/client"
import { Button } from "./button"

export default () => {
  const [intent] = useFixtureSelect("intent", {
    options: ["primary", "outline", "plain", "danger"]
  })
  const [size] = useFixtureSelect("size", {
    options: ["md", "sm", "lg"]
  })
  const [shape] = useFixtureSelect("shape", {
    options: ["square", "circle"]
  })
  const [isDisabled] = useFixtureInput("isDisabled", false)
  const [isPending] = useFixtureInput("isPending", false)

  return (
    <div className="flex h-full items-center justify-center">
      <div>
        <Button
          intent={intent}
          size={size}
          shape={shape}
          isDisabled={isDisabled}
          isPending={isPending}
        >
          Click me!
        </Button>
      </div>
    </div>
  )
}
