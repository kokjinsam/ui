import * as React from "react"
import { useFixtureInput, useFixtureSelect } from "react-cosmos/client"
import { Center } from "../center"
import { Loader } from "../loader"

export default () => {
  const [size] = useFixtureSelect("size", {
    options: ["md", "sm", "lg"]
  })
  const [variant] = useFixtureSelect("variant", {
    options: ["ring", "spin"]
  })
  const [isIndeterminate] = useFixtureInput("isIndeterminate", false)

  return (
    <Center>
      <Loader size={size} variant={variant} isIndeterminate={isIndeterminate} />
    </Center>
  )
}
