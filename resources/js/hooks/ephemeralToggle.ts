import { useEffect, useState } from 'react'

export const useEphemeralToggle = () => {
  const [value, setValue] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (value) {
      timer = setTimeout(() => {
        setValue(false)
      }, 3000)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [value])

  return [value, setValue] as const
}
