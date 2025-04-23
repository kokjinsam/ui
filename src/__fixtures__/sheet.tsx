import * as React from "react"
import { Button } from "../button"
import { Center } from "../center"
import { Sheet } from "../sheet"
import { TextField } from "../text-field"

export default () => {
  return (
    <Center>
      <Sheet>
        <Button intent="outline">Edit Settings</Button>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Update User Settings</Sheet.Title>
            <Sheet.Description>
              Adjust your preferences and configurations here.
            </Sheet.Description>
          </Sheet.Header>
          <Sheet.Body className="space-y-4">
            <TextField
              label="Username"
              type="text"
              placeholder="Enter your username"
            />
            <TextField
              label="Email"
              type="email"
              placeholder="Enter your email address"
            />
          </Sheet.Body>
          <Sheet.Footer>
            <Sheet.Close>Cancel</Sheet.Close>
            <Button intent="primary" type="submit">
              Save Changes
            </Button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    </Center>
  )
}
