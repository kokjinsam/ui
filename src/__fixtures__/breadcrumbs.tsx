import * as React from "react"
import { useFixtureSelect } from "react-cosmos/client"
import { Breadcrumbs } from "../breadcrumbs"
import { Center } from "../center"

const RegularBreadcrumbs = () => {
  const [separator] = useFixtureSelect("separator", {
    options: ["chevron", "slash"]
  })

  return (
    <Center className="flex-col gap-2">
      <Breadcrumbs separator={separator}>
        <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="#">Design System</Breadcrumbs.Item>
        <Breadcrumbs.Item>Collections</Breadcrumbs.Item>
      </Breadcrumbs>
    </Center>
  )
}

export default { RegularBreadcrumbs }
