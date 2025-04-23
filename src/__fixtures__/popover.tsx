import * as React from "react"
import { Button } from "../button"
import { Center } from "../center"
import { Popover } from "../popover"

export default () => {
  return (
    <Center>
      <Popover>
        <Button>Forgot Password</Button>
        <Popover.Content className="sm:max-w-72">
          <Popover.Header>
            <Popover.Title>Email</Popover.Title>
            <Popover.Description>
              We'll send you an email to log in.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover>
    </Center>
  )
}
