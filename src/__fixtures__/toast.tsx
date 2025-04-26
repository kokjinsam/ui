import * as React from "react"
import { toast } from "sonner"
import { Button } from "../button"
import { Center } from "../center"
import { Toaster } from "../toast"

export default () => {
  const promise = () =>
    new Promise<{ name: string }>((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 2000)
    )

  return (
    <Center>
      <Toaster />
      <div className="grid grid-cols-2 gap-2">
        <Button
          intent="outline"
          onPress={() =>
            toast("Event has been created.", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              duration: Infinity,
              action: {
                label: "Undo",
                onClick: () => console.log("Undo")
              }
            })
          }
        >
          Default
        </Button>
        <Button
          intent="outline"
          onPress={() =>
            toast("Event has been created.", {
              description: "Sunday, December 03, 2023 at 9:00 AM"
            })
          }
        >
          Description
        </Button>
        <Button
          intent="outline"
          onPress={() => toast.success("Event has been created")}
        >
          Success
        </Button>
        <Button
          intent="outline"
          onPress={() =>
            toast.info("Be at the area 10 minutes before the event time")
          }
        >
          Info
        </Button>
        <Button
          intent="outline"
          onPress={() =>
            toast.warning("Event start time cannot be earlier than 8am")
          }
        >
          Warning
        </Button>
        <Button
          intent="outline"
          onPress={() => toast.error("Event has not been created")}
        >
          Error
        </Button>
        <Button
          intent="outline"
          onPress={() =>
            toast("Event has been created", {
              action: {
                label: "Undo",
                onClick: () => console.log("Undo")
              }
            })
          }
        >
          Action
        </Button>
        <Button
          intent="outline"
          onPress={() =>
            toast.promise(promise, {
              loading: "Loading...",
              success: (data) => {
                return `${data.name} toast has been added`
              },
              error: "Error"
            })
          }
        >
          Promise
        </Button>
      </div>
    </Center>
  )
}
