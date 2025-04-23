import * as React from "react"
import { Button } from "../button"
import { Center } from "../center"
import { Form } from "../form"
import { Modal } from "../modal"
import { TextField } from "../text-field"

const RegularModal = () => {
  return (
    <Center>
      <Modal>
        <Button>Turn on 2FA</Button>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Nice! Let's beef up your account.</Modal.Title>
            <Modal.Description>
              2FA beefs up your account's defense. Pop in your password to keep
              going.
            </Modal.Description>
          </Modal.Header>
          <Form onSubmit={() => {}}>
            <Modal.Body>
              <TextField
                isRequired
                autoFocus
                label="Password"
                type="password"
                placeholder="Enter your password"
                errorMessage="Invalid password"
              />
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close>Cancel</Modal.Close>
              <Button type="submit">Turn on 2FA</Button>
            </Modal.Footer>
          </Form>
        </Modal.Content>
      </Modal>
    </Center>
  )
}

export default { RegularModal }
