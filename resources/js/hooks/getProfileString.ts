import { useEffect, useState } from 'react'

export const useGetProfileString = (preview: string | File) => {
  const [value, setValue] = useState<string>()

  useEffect(() => {
    if (typeof preview === 'string') {
      setValue(preview)
    } else {
      // Encode the file using the FileReader API
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setValue(result)
      }
      reader.readAsDataURL(preview)
    }
  }, [preview])

  return [value, setValue] as const
}
