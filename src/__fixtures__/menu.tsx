import * as React from "react"
import type { Selection } from "react-aria-components"
import { Collection } from "react-aria-components"
import { Center } from "../center"
import { Menu } from "../menu"

const BasicMenu = () => {
  return (
    <Center>
      <Menu>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Content placement="bottom">
          <Menu.Item>
            <span data-slot="icon" className="lucide-eye" />
            <Menu.ItemDetails
              label="View"
              description="View the current document"
            />
          </Menu.Item>
          <Menu.Item>
            <span data-slot="icon" className="lucide-pen" />
            <Menu.Label>Edit</Menu.Label>
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item isDanger>
            <span data-slot="icon" className="lucide-trash" />
            <Menu.Label>Delete</Menu.Label>
          </Menu.Item>
        </Menu.Content>
      </Menu>
    </Center>
  )
}

const SubMenu = () => {
  return (
    <Center>
      {" "}
      <Menu>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>
            <Menu.Label>Dashboard</Menu.Label>
          </Menu.Item>
          <Menu.Item>
            <Menu.Label>Reports</Menu.Label>
          </Menu.Item>
          <Menu.Separator />
          <Menu.Submenu>
            <Menu.Item isDanger>
              <Menu.Label>Settings</Menu.Label>
            </Menu.Item>
            <Menu.Content>
              <Menu.Item>
                <Menu.Label>General</Menu.Label>
              </Menu.Item>
              <Menu.Item>
                <Menu.Label>Security</Menu.Label>
              </Menu.Item>
              <Menu.Separator />
              <Menu.Submenu>
                <Menu.Item>
                  <Menu.Label>Privacy</Menu.Label>
                </Menu.Item>
                <Menu.Content>
                  <Menu.Item>
                    <Menu.Label>Data Sharing</Menu.Label>
                  </Menu.Item>
                  <Menu.Item>
                    <Menu.Label>Cookies</Menu.Label>
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Submenu>
                    <Menu.Item>
                      <Menu.Label>Advanced</Menu.Label>
                    </Menu.Item>
                    <Menu.Content>
                      <Menu.Item>
                        <Menu.Label>Encryption</Menu.Label>
                      </Menu.Item>
                      <Menu.Item>
                        <Menu.Label>Access Logs</Menu.Label>
                      </Menu.Item>
                      <Menu.Item>
                        <Menu.Label>API Keys</Menu.Label>
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Submenu>
                </Menu.Content>
              </Menu.Submenu>
            </Menu.Content>
          </Menu.Submenu>
          <Menu.Item>
            <Menu.Label>Help</Menu.Label>
          </Menu.Item>
        </Menu.Content>
      </Menu>
    </Center>
  )
}

const cities = [
  {
    id: 1,
    name: "New York City",
    landmarks: [
      {
        id: 101,
        name: "Statue of Liberty"
      },
      {
        id: 102,
        name: "Central Park"
      },
      {
        id: 103,
        name: "Empire State Building"
      },
      {
        id: 104,
        name: "Times Square"
      }
    ]
  },
  {
    id: 2,
    name: "Paris",
    landmarks: [
      {
        id: 201,
        name: "Eiffel Tower"
      },
      {
        id: 202,
        name: "Louvre Museum"
      },
      {
        id: 203,
        name: "Notre-Dame Cathedral"
      },
      {
        id: 204,
        name: "Champs-Élysées"
      }
    ]
  },
  {
    id: 3,
    name: "Tokyo",
    landmarks: [
      {
        id: 301,
        name: "Tokyo Tower"
      },
      {
        id: 302,
        name: "Shibuya Crossing"
      },
      {
        id: 303,
        name: "Senso-ji Temple"
      },
      {
        id: 304,
        name: "Meiji Shrine"
      },
      {
        id: 305,
        name: "Tokyo Skytree"
      }
    ]
  },
  {
    id: 4,
    name: "London",
    landmarks: [
      {
        id: 401,
        name: "Big Ben"
      },
      {
        id: 402,
        name: "Tower of London"
      },
      {
        id: 403,
        name: "Buckingham Palace"
      },
      {
        id: 404,
        name: "London Eye"
      },
      {
        id: 405,
        name: "Westminster Abbey"
      }
    ]
  },
  {
    id: 5,
    name: "Rome",
    landmarks: [
      {
        id: 501,
        name: "Colosseum"
      },
      {
        id: 502,
        name: "Vatican City"
      },
      {
        id: 503,
        name: "Trevi Fountain"
      },
      {
        id: 504,
        name: "Pantheon"
      }
    ]
  },
  {
    id: 6,
    name: "Sydney",
    landmarks: [
      {
        id: 601,
        name: "Sydney Opera House"
      },
      {
        id: 602,
        name: "Sydney Harbour Bridge"
      },
      {
        id: 603,
        name: "Bondi Beach"
      },
      {
        id: 604,
        name: "Royal Botanic Garden"
      }
    ]
  },
  {
    id: 7,
    name: "Dubai",
    landmarks: [
      {
        id: 701,
        name: "Burj Khalifa"
      },
      {
        id: 702,
        name: "Palm Jumeirah"
      },
      {
        id: 703,
        name: "Dubai Mall"
      },
      {
        id: 704,
        name: "Burj Al Arab"
      }
    ]
  },
  {
    id: 8,
    name: "Moscow",
    landmarks: [
      {
        id: 801,
        name: "Red Square"
      },
      {
        id: 802,
        name: "Kremlin"
      },
      {
        id: 803,
        name: "St. Basil's Cathedral"
      },
      {
        id: 804,
        name: "Bolshoi Theatre"
      }
    ]
  },
  {
    id: 9,
    name: "Cairo",
    landmarks: [
      {
        id: 901,
        name: "Pyramids of Giza"
      },
      {
        id: 902,
        name: "Great Sphinx of Giza"
      },
      {
        id: 903,
        name: "Egyptian Museum"
      }
    ]
  },
  {
    id: 10,
    name: "Rio de Janeiro",
    landmarks: [
      {
        id: 1001,
        name: "Christ the Redeemer"
      },
      {
        id: 1002,
        name: "Sugarloaf Mountain"
      },
      {
        id: 1003,
        name: "Copacabana Beach"
      },
      {
        id: 1004,
        name: "Maracanã Stadium"
      }
    ]
  }
]

const MenuWithSections = () => {
  return (
    <Center>
      <Menu>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Content items={cities}>
          {(city) => (
            <Menu.Section title={city.name} items={city.landmarks}>
              {(landmark) => (
                <Menu.Item textValue={landmark.name}>
                  <Menu.Label>{landmark.name}</Menu.Label>
                </Menu.Item>
              )}
            </Menu.Section>
          )}
        </Menu.Content>
      </Menu>
    </Center>
  )
}

const MenuWithMultipleSelections = () => {
  let [selected, setSelected] = React.useState<Selection>(new Set([1, 3]))
  let openWindows = [
    {
      name: "Left Panel",
      id: "left",
      children: [{ id: 1, name: "Final Copy (1)" }]
    },
    {
      name: "Right Panel",
      id: "right",
      children: [
        { id: 2, name: "index.ts" },
        { id: 3, name: "package.json" },
        { id: 4, name: "license.txt" }
      ]
    }
  ]

  return (
    <Center>
      <Menu>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Content
          items={openWindows}
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          {(section) => (
            <Menu.Section>
              <Menu.Header>{section.name}</Menu.Header>
              <Collection items={section.children}>
                {(item) => <Menu.Item>{item.name}</Menu.Item>}
              </Collection>
            </Menu.Section>
          )}
        </Menu.Content>
      </Menu>
    </Center>
  )
}

const MenuWithSectionSelections = () => {
  const [style, setStyle] = React.useState<Selection>(new Set(["bold"]))
  const [align, setAlign] = React.useState<Selection>(new Set(["left"]))

  return (
    <Center>
      <Menu>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Content>
          <Menu.Section title="Actions">
            <Menu.Item textValue="Cut">
              <span data-slot="icon" className="lucide-scissors" />
              <Menu.Label>Cut</Menu.Label>
            </Menu.Item>
            <Menu.Item textValue="Copy">
              <span data-slot="icon" className="lucide-copy" />
              <Menu.Label>Copy</Menu.Label>
            </Menu.Item>
            <Menu.Item textValue="Paste">
              <span data-slot="icon" className="lucide-clipboard" />
              <Menu.Label>Paste</Menu.Label>
            </Menu.Item>
          </Menu.Section>
          <Menu.Section
            selectionMode="multiple"
            selectedKeys={style}
            onSelectionChange={setStyle}
            title="Text style"
          >
            <Menu.Item id="bold" textValue="Bold">
              <span data-slot="icon" className="lucide-bold" />
              <Menu.Label>Bold</Menu.Label>
            </Menu.Item>
            <Menu.Item id="italic" textValue="Italic">
              <span data-slot="icon" className="lucide-italic" />
              <Menu.Label>Italic</Menu.Label>
            </Menu.Item>
            <Menu.Item id="underline" textValue="Underline">
              <span data-slot="icon" className="lucide-underline" />
              <Menu.Label>Underline</Menu.Label>
            </Menu.Item>
          </Menu.Section>
          <Menu.Section
            selectionMode="single"
            selectedKeys={align}
            onSelectionChange={setAlign}
            title="Text alignment"
          >
            <Menu.Item id="left" textValue="Left">
              <span data-slot="icon" className="lucide-align-left" />
              <Menu.Label>Left</Menu.Label>
            </Menu.Item>
            <Menu.Item id="center" textValue="Cente">
              <span data-slot="icon" className="lucide-align-center" />
              <Menu.Label>Center</Menu.Label>
            </Menu.Item>
            <Menu.Item id="right" textValue="Right">
              <span data-slot="icon" className="lucide-align-right" />
              <Menu.Label>Right</Menu.Label>
            </Menu.Item>
          </Menu.Section>
        </Menu.Content>
      </Menu>
    </Center>
  )
}

export default {
  BasicMenu,
  SubMenu,
  MenuWithMultipleSelections,
  MenuWithSections,
  MenuWithSectionSelections
}
