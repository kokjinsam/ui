import * as React from "react"
import { useFixtureSelect } from "react-cosmos/client"
import { Button } from "../button"
import { Center } from "../center"

const TextButton = () => {
  const [shape] = useFixtureSelect("shape", {
    options: ["square", "circle"]
  })

  return (
    <Center>
      <div className="grid grid-cols-3 gap-2">
        {/* Primary */}
        <div>
          <Button intent="primary" size="sm" shape={shape}>
            Primary
          </Button>
        </div>
        <div>
          <Button intent="primary" size="md" shape={shape}>
            Primary
          </Button>
        </div>
        <div>
          <Button intent="primary" size="lg" shape={shape}>
            Primary
          </Button>
        </div>
        {/* Outline */}
        <div>
          <Button intent="outline" size="sm" shape={shape}>
            Outline
          </Button>
        </div>
        <div>
          <Button intent="outline" size="md" shape={shape}>
            Outline
          </Button>
        </div>
        <div>
          <Button intent="outline" size="lg" shape={shape}>
            Outline
          </Button>
        </div>

        {/* Plain */}
        <div>
          <Button intent="plain" size="sm" shape={shape}>
            Plain
          </Button>
        </div>
        <div>
          <Button intent="plain" size="md" shape={shape}>
            Plain
          </Button>
        </div>
        <div>
          <Button intent="plain" size="lg" shape={shape}>
            Plain
          </Button>
        </div>

        {/* Danger */}
        <div>
          <Button intent="danger" size="sm" shape={shape}>
            Danger
          </Button>
        </div>
        <div>
          <Button intent="danger" size="md" shape={shape}>
            Danger
          </Button>
        </div>
        <div>
          <Button intent="danger" size="lg" shape={shape}>
            Danger
          </Button>
        </div>
      </div>
    </Center>
  )
}

const IconButton = () => {
  const [shape] = useFixtureSelect("shape", {
    options: ["square", "circle"]
  })

  return (
    <Center>
      <div className="grid grid-cols-3 gap-2">
        {/* Primary */}
        <div>
          <Button intent="primary" size="square-sm" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
          </Button>
        </div>
        <div>
          <Button intent="primary" size="square-md" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
          </Button>
        </div>
        <div>
          <Button intent="primary" size="square-lg" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
          </Button>
        </div>

        {/* Outline */}
        <div>
          <Button intent="outline" size="square-sm" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
          </Button>
        </div>
        <div>
          <Button intent="outline" size="square-md" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
          </Button>
        </div>
        <div>
          <Button intent="outline" size="square-lg" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
          </Button>
        </div>

        {/* Plain */}
        <div>
          <Button intent="plain" size="square-sm" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
          </Button>
        </div>
        <div>
          <Button intent="plain" size="square-md" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
          </Button>
        </div>
        <div>
          <Button intent="plain" size="square-lg" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
          </Button>
        </div>

        {/* Danger */}
        <div>
          <Button intent="danger" size="square-sm" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
          </Button>
        </div>
        <div>
          <Button intent="danger" size="square-md" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
          </Button>
        </div>
        <div>
          <Button intent="danger" size="square-lg" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
          </Button>
        </div>
      </div>
    </Center>
  )
}

const TextIconButton = () => {
  const [shape] = useFixtureSelect("shape", {
    options: ["square", "circle"]
  })

  return (
    <Center>
      <div className="grid grid-cols-3 gap-2">
        {/* Primary */}
        <div>
          <Button intent="primary" size="sm" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
            Primary
          </Button>
        </div>
        <div>
          <Button intent="primary" size="md" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
            Primary
          </Button>
        </div>
        <div>
          <Button intent="primary" size="lg" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
            Primary
          </Button>
        </div>

        {/* Outline */}
        <div>
          <Button intent="outline" size="sm" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
            Outline
          </Button>
        </div>
        <div>
          <Button intent="outline" size="md" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
            Outline
          </Button>
        </div>
        <div>
          <Button intent="outline" size="lg" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
            Outline
          </Button>
        </div>

        {/* Plain */}
        <div>
          <Button intent="plain" size="sm" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
            Plain
          </Button>
        </div>
        <div>
          <Button intent="plain" size="md" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
            Plain
          </Button>
        </div>
        <div>
          <Button intent="plain" size="lg" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
            Plain
          </Button>
        </div>

        {/* Danger */}
        <div>
          <Button intent="danger" size="sm" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
            Danger
          </Button>
        </div>
        <div>
          <Button intent="danger" size="md" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
            Danger
          </Button>
        </div>
        <div>
          <Button intent="danger" size="lg" shape={shape}>
            <div data-slot="icon" className="lucide-settings" />
            Danger
          </Button>
        </div>
      </div>
    </Center>
  )
}

export default { TextButton, IconButton, TextIconButton }
