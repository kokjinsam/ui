import * as React from "react"

const useMediaQuery = (query: string) => {
  const subscribe = React.useCallback(
    (callback: (event: MediaQueryListEvent) => void) => {
      const matchMedia = window.matchMedia(query)

      matchMedia.addEventListener("change", callback)
      return () => {
        matchMedia.removeEventListener("change", callback)
      }
    },
    [query]
  )

  const getSnapshot = () => {
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = () => {
    throw Error("useMediaQuery is a client-only hook")
  }

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export { useMediaQuery }
