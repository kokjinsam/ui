import * as React from "react"
import { Center } from "../center"
import { Select } from "../select"

const software = [
  {
    id: 1,
    name: "Adobe Photoshop",
    icon: <span data-slot="icon" className="lucide-airplay" />
  },
  { id: 2, name: "Sketch" },
  { id: 3, name: "Figma" },
  {
    id: 4,
    name: "Adobe XD",
    icon: <span data-slot="icon" className="lucide-alarm-clock" />
  },
  { id: 5, name: "InVision" },
  { id: 6, name: "Intercom" },
  { id: 7, name: "Slack" },
  { id: 8, name: "Trello" },
  { id: 9, name: "Google Docs" },
  { id: 10, name: "Google Sheets" },
  { id: 11, name: "Google Slides" },
  { id: 12, name: "Google Drive" }
]

const roles = [
  { id: 1, name: "Admin", description: "Has full access to all resources" },
  {
    id: 2,
    name: "Editor",
    description: "Can edit content but has limited access to settings"
  },
  {
    id: 3,
    name: "Viewer",
    description: "Can view content but cannot make changes"
  },
  {
    id: 4,
    name: "Contributor",
    description: "Can contribute content for review"
  },
  {
    id: 5,
    name: "Guest",
    description: "Limited access, mostly for viewing purposes"
  }
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
                <Select.Label>{item.name}</Select.Label>
              </Select.Option>
            )}
          </Select.List>
        </Select>
      </div>
    </Center>
  )
}

const SelectWithDetails = () => {
  return (
    <Center>
      <div>
        <Select label="Roles" placeholder="Select a role">
          <Select.Trigger />
          <Select.List items={roles}>
            {(item) => (
              <Select.Option id={item.id} textValue={item.name}>
                <Select.OptionDetails
                  label={item.name}
                  description={item.description}
                />
              </Select.Option>
            )}
          </Select.List>
        </Select>
      </div>
    </Center>
  )
}

const SelectWithIcons = () => {
  return (
    <Center>
      <div>
        <Select label="Design software" placeholder="Select a software">
          <Select.Trigger />
          <Select.List items={software}>
            {(item) => (
              <Select.Option id={item.id} textValue={item.name}>
                {item.icon}
                <Select.Label>{item.name}</Select.Label>
              </Select.Option>
            )}
          </Select.List>
        </Select>
      </div>
    </Center>
  )
}

export default { RegularSelect, SelectWithDetails, SelectWithIcons }
