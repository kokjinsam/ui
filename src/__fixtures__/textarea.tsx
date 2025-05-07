import * as React from "react"
import { useFixtureInput } from "react-cosmos/client"
import { Center } from "../center"
import { Textarea, TextareaAutosize } from "../textarea"

const RegularTextarea = () => {
  return (
    <Center>
      <div className="w-[320px]">
        <Textarea label="Address" />
      </div>
    </Center>
  )
}

const AutosizeTextarea = () => {
  const [isDisabled] = useFixtureInput("isDisabled", false)
  const [isReadOnly] = useFixtureInput("isReadOnly", false)
  const [isInvalid] = useFixtureInput("isInvalid", false)

  return (
    <Center>
      <div className="w-[320px]">
        <TextareaAutosize
          label="Address"
          description="This is a description"
          errorMessage="This is an error"
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
        />
      </div>
    </Center>
  )
}

export default { RegularTextarea, AutosizeTextarea }
