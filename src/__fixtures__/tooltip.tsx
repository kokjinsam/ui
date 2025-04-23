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
            Outline Tooltip
          </Tooltip.Trigger>
          <Tooltip.Content intent="outline" showArrow={showArrow}>
            This is an Outline Tooltip
          </Tooltip.Content>
        </Tooltip>
        <Tooltip>
          <Tooltip.Trigger aria-label="Follow My Twitch">
            Inverse Tooltip
          </Tooltip.Trigger>
          <Tooltip.Content intent="inverse" showArrow={showArrow}>
            This is an Inverse Tooltip
          </Tooltip.Content>
        </Tooltip>
      </div>
    </Center>
  )
}
