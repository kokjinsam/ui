import * as React from "react"
import { useFixtureSelect } from "react-cosmos/client"
import { Avatar } from "../avatar"
import { Center } from "../center"

const AvatarWithInitials = () => {
  const [size] = useFixtureSelect("size", {
    options: ["md", "xs", "sm", "lg", "xl"]
  })
  const [shape] = useFixtureSelect("shape", {
    options: ["square", "circle"]
  })

  return (
    <Center>
      <Avatar
        size={size}
        shape={shape}
        initials="AB"
        alt="Avatar for AB user"
      />
    </Center>
  )
}

const AvatarWithImage = () => {
  const [size] = useFixtureSelect("size", {
    options: ["md", "xs", "sm", "lg", "xl"]
  })
  const [shape] = useFixtureSelect("shape", {
    options: ["square", "circle"]
  })

  return (
    <Center>
      <Avatar size={size} shape={shape} src="https://i.pravatar.cc/300" />
    </Center>
  )
}

export default { AvatarWithInitials, AvatarWithImage }
