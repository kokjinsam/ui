import * as React from "react"
import { Center } from "../center"
import { Radio, RadioGroup } from "../radio"

export default () => {
  return (
    <Center>
      <RadioGroup label="Features">
        <Radio value="fs">Font size: Small, Medium, Large</Radio>
        <Radio value="dr">Display resolution: 1080p, 1440p, 4K</Radio>
        <Radio value="ss">Sound settings: Mute, Low, Medium, High</Radio>
        <Radio value="bi">Background image: Default, Custom</Radio>
        <Radio value="ks" isDisabled>
          Keyboard shortcuts: Enabled, Disabled
        </Radio>
      </RadioGroup>
    </Center>
  )
}
