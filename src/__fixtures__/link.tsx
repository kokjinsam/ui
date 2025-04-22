import * as React from "react"
import { Center } from "../center"
import { Link } from "../link"

export default () => {
  return (
    <Center className="flex-col gap-2">
      <Link intent="unstyled" href="#">
        Unstyled
      </Link>
      <Link intent="normal" href="#">
        Normal
      </Link>
      <Link intent="muted" href="#">
        Muted
      </Link>
      <Link intent="info" href="#">
        Info
      </Link>
    </Center>
  )
}
