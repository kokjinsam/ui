import * as React from "react"
import { useFixtureInput } from "react-cosmos/client"
import { Checkbox, CheckboxGroup } from "./checkbox"

const SingleCheckbox = () => {
  const [isIndeterminate] = useFixtureInput("isIndeterminate", false)
  const [isDisabled] = useFixtureInput("isDisabled", false)

  return (
    <div className="flex h-full items-center justify-center">
      <div>
        <Checkbox
          label="Enable notifications"
          description="Receive email notifications for new messages"
          isIndeterminate={isIndeterminate}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  )
}

const MultipleCheckboxes = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div>
        <CheckboxGroup label="Settings">
          <Checkbox value="notifications">Enable notifications</Checkbox>
          <Checkbox value="auto_update">Auto-update applications</Checkbox>
          <Checkbox value="dark_mode">Enable dark mode</Checkbox>
          <Checkbox value="location_access">Allow location access</Checkbox>
          <Checkbox value="two_factor_auth">
            Enable two-factor authentication
          </Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  )
}

export default { SingleCheckbox, MultipleCheckboxes }
