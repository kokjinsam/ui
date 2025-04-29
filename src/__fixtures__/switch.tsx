import * as React from "react"
import { Center } from "../center"
import { Switch } from "../switch"

export default () => {
  return (
    <Center>
      <div className="grid gap-2">
        <Switch>Switch Theme</Switch>
        <Switch isDisabled>Switch Theme</Switch>
      </div>
    </Center>
  )
}
