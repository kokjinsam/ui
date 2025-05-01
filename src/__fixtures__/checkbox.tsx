import * as React from "react"
import { useFixtureInput } from "react-cosmos/client"
import { Center } from "../center"
import { Checkbox, CheckboxGroup } from "../checkbox"

const SingleCheckbox = () => {
  return (
    <Center>
      <div className="grid gap-2">
        <Checkbox
          label="Enable email notifications"
          description="Receive email notifications for new messages"
        />
        <Checkbox
          label="Enable SMS notifications"
          description="Receive SMS notifications for new messages"
          isIndeterminate
        />
        <Checkbox
          label="Enable push notifications"
          description="Receive push notifications for new messages"
          isDisabled
        />
        <Checkbox
          label="Enable SMS notifications"
          description="Receive SMS notifications for new messages"
          isSelected
          isDisabled
        />
        <Checkbox
          label="Enable SMS notifications"
          description="Receive SMS notifications for new messages"
          isIndeterminate
          isDisabled
        />
      </div>
    </Center>
  )
}

const MultipleCheckboxes = () => {
  const [isInvalid] = useFixtureInput("isInvalid", false)
  const [isDisabled] = useFixtureInput("isDisabled", false)
  const [isReadOnly] = useFixtureInput("isReadOnly", false)

  return (
    <div className="flex h-full items-center justify-center">
      <div>
        <CheckboxGroup
          label="Settings"
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          errorMessage="This is an error message"
        >
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
