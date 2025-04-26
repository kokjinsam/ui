import * as React from "react"
import { useFixtureInput } from "react-cosmos/client"
import { Center } from "../center"
import { Tooltip } from "../tooltip"

export default () => {
  const [showArrow] = useFixtureInput("showArrow", true)

  return (
    <Center>
      <div className="grid gap-2">
        <Tooltip>
          <Tooltip.Trigger aria-label="Follow My Twitch">
            Here's some text about tooltip
          </Tooltip.Trigger>
          <Tooltip.Content showArrow={showArrow}>A tooltip</Tooltip.Content>
        </Tooltip>
      </div>
    </Center>
  )
}
