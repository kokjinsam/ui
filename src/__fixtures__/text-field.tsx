import * as React from "react"
import { useFixtureInput } from "react-cosmos/client"
import { Center } from "../center"
import { TextField } from "../text-field"

export default () => {
  const [isDisabled] = useFixtureInput("isDisabled", false)

  return (
    <Center>
      <div className="grid gap-y-2">
        <TextField isDisabled={isDisabled} label="Full Name" />
        <TextField
          isDisabled={isDisabled}
          isRevealable
          label="Password"
          type="password"
        />
        <TextField isPending label="Username" />
        <TextField
          label="Twitch"
          placeholder="kokjinsam"
          isDisabled={isDisabled}
          prefix={<span data-slot="icon" className="lucide-at-sign" />}
          suffix={<span data-slot="icon" className="lucide-twitch" />}
        />
        <TextField
          label="Website"
          isDisabled={isDisabled}
          prefix="https://"
          suffix=".com"
        />
      </div>
    </Center>
  )
}
