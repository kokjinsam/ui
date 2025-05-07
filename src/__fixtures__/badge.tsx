import * as React from "react"
import { useFixtureSelect } from "react-cosmos/client"
import { Badge } from "../badge"
import { Center } from "../center"

export default () => {
  const [shape] = useFixtureSelect("shape", {
    options: ["square", "circle"]
  })

  return (
    <Center className="flex-col gap-2">
      <Badge intent="monochrome" shape={shape}>
        Monochrome
      </Badge>
      <Badge intent="success" shape={shape}>
        Success
      </Badge>
      <Badge intent="info" shape={shape}>
        Info
      </Badge>
      <Badge intent="warning" shape={shape}>
        Warning
      </Badge>
      <Badge intent="danger" shape={shape}>
        Danger
      </Badge>
    </Center>
  )
}
