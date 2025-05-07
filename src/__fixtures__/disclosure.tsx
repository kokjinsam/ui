import * as React from "react"
import { Center } from "../center"
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger
} from "../disclosure"

const RegularDisclosure = () => {
  return (
    <Center>
      <div className="w-[320px]">
        <DisclosureGroup>
          <Disclosure id={1}>
            <DisclosureTrigger>What is a VPS?</DisclosureTrigger>
            <DisclosurePanel>
              A VPS is a Virtual Private Server, which provides dedicated
              resources on a server shared with other users, offering more
              control and customization than shared hosting.
            </DisclosurePanel>
          </Disclosure>

          <Disclosure id={2}>
            <DisclosureTrigger>What is cloud hosting?</DisclosureTrigger>
            <DisclosurePanel>
              Cloud hosting utilizes multiple servers to balance load and
              maximize uptime. Instead of being hosted on a single server, your
              data and resources are spread across multiple servers.
            </DisclosurePanel>
          </Disclosure>

          <Disclosure id={3}>
            <DisclosureTrigger>What is shared hosting?</DisclosureTrigger>
            <DisclosurePanel>
              Shared hosting is a type of web hosting where multiple websites
              share the same server and its resources. It's an affordable
              option, but may have limitations on performance and customization.
            </DisclosurePanel>
          </Disclosure>

          <Disclosure id={4}>
            <DisclosureTrigger>What is dedicated hosting?</DisclosureTrigger>
            <DisclosurePanel>
              Dedicated hosting means your website is hosted on a single server
              exclusively reserved for your site. This provides maximum
              performance and customization, but at a higher cost.
            </DisclosurePanel>
          </Disclosure>
        </DisclosureGroup>
      </div>
    </Center>
  )
}

const items = [
  {
    id: 1,
    title: "Clothing Categories",
    description: "Explore our wide range of clothing options for every season.",
    children: [
      {
        id: 101,
        title: "Men's Wear",
        description: "Stylish and comfortable outfits for men."
      },
      {
        id: 102,
        title: "Women's Wear",
        description: "Elegant and trendy fashion for women."
      },
      {
        id: 103,
        title: "Kids' Wear",
        description: "Colorful and playful clothing for kids."
      }
    ]
  },
  {
    id: 2,
    title: "Electronics",
    description: "Discover the latest in technology and gadgets.",
    children: [
      {
        id: 201,
        title: "Smartphones",
        description: "Top brands and the latest models."
      },
      {
        id: 202,
        title: "Laptops",
        description: "High-performance laptops for work and play."
      },
      {
        id: 203,
        title: "Accessories",
        description: "Chargers, cases, and other must-have gadgets."
      }
    ]
  },
  {
    id: 3,
    title: "Home & Living",
    description: "Everything you need to make your house a home.",
    children: [
      {
        id: 301,
        title: "Furniture",
        description: "Comfortable and stylish furniture for every room."
      },
      {
        id: 302,
        title: "Decor",
        description: "Beautiful decor items to personalize your space."
      },
      {
        id: 303,
        title: "Kitchen Essentials",
        description: "Practical and modern kitchen tools."
      }
    ]
  }
]

const NestedDisclosure = () => {
  return (
    <Center>
      <div className="w-[320px]">
        <DisclosureGroup defaultExpandedKeys={[1]}>
          {items.map((item, index) => (
            <Disclosure key={index} id={index}>
              <DisclosureTrigger className="px-4">
                {item.title}
              </DisclosureTrigger>
              <DisclosurePanel className="bg-surface-secondary">
                <DisclosureGroup allowsMultipleExpanded>
                  {item.children.map((child, childIndex) => (
                    <Disclosure key={childIndex} id={childIndex}>
                      <DisclosureTrigger className="group">
                        <span>
                          <span
                            data-slot="disclosure-chevron"
                            className="lucide-chevron-right group-aria-expanded:rotate-90"
                          />
                          <span data-slot="icon" className="lucide-activity" />
                          {child.title}
                        </span>
                      </DisclosureTrigger>
                      <DisclosurePanel>{child.description}</DisclosurePanel>
                    </Disclosure>
                  ))}
                </DisclosureGroup>
              </DisclosurePanel>
            </Disclosure>
          ))}
        </DisclosureGroup>
      </div>
    </Center>
  )
}

export default { RegularDisclosure, NestedDisclosure }
