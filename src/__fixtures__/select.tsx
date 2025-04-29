import * as React from "react"
import { Center } from "../center"
import { Select } from "../select"

const software = [
  { id: 1, name: "Adobe Photoshop" },
  { id: 2, name: "Sketch" },
  { id: 3, name: "Figma" },
  { id: 4, name: "Adobe XD" },
  { id: 5, name: "InVision" },
  { id: 6, name: "Intercom" },
  { id: 7, name: "Slack" },
  { id: 8, name: "Trello" },
  { id: 9, name: "Google Docs" },
  { id: 10, name: "Google Sheets" },
  { id: 11, name: "Google Slides" },
  { id: 12, name: "Google Drive" }
]

const RegularSelect = () => {
  return (
    <Center>
      <div>
        <Select label="Design software" placeholder="Select a software">
          <Select.Trigger />
          <Select.List items={software}>
            {(item) => (
              <Select.Option id={item.id} textValue={item.name}>
                {item.name}
              </Select.Option>
            )}
          </Select.List>
        </Select>
      </div>
    </Center>
  )
}

export default { RegularSelect }
