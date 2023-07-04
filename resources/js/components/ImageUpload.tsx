import React, { useEffect, useState } from 'react'
import { css } from 'styled-system/css'
import { styled } from 'styled-system/jsx'
import { ImageSvg } from './svg/ImageSvg'

export type ImagUploadProps = {
  defaultValue?: string
  dispatcher?: React.Dispatch<React.SetStateAction<File>>
  name?: string
}

export const ImageUpload: React.FC<ImagUploadProps> = (props) => {
  const [preview, setPreview] = useState<string>()

  useEffect(() => {
    setPreview(props.defaultValue)
  }, [props])

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const file = event.target.files?.[0]
    props?.dispatcher?.(file)

    // Encode the file using the FileReader API
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setPreview(result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <styled.label
      pos="relative"
      display="flex"
      cursor="pointer"
      alignItems="center"
      flexDirection="column"
      gap="0.5rem"
      padding="3.8125rem 2.375rem 3.75rem 2.4375rem"
      rounded="12px"
      bg="purple.light"
      overflow="hidden"
    >
      <ImageSvg className={css({ color: 'purple.default' })} />
      <h2>+ Upload Image</h2>

      <styled.input
        name={props.name}
        onChange={onFileChange}
        type="file"
        accept="image/png, image/jpeg"
        srOnly
      />

      {preview && (
        <styled.img
          pos="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          objectFit="cover"
          src={preview.toString()}
          alt=""
        />
      )}

      {preview && (
        <styled.div
          pos="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          padding="3.8125rem 2.375rem 3.75rem 2.4375rem"
          flexDirection="column"
          color="white"
          bg="rgba(0,0,0,0.5)"
          opacity={{
            base: '0',
            _hover: '1',
          }}
        >
          <ImageSvg className={css({ color: 'white' })} />
          <h2>+ Upload Image</h2>
        </styled.div>
      )}
    </styled.label>
  )
}
