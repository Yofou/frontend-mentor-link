import React, { useState } from 'react'
import { styled } from 'styled-system/jsx'
import { Button } from '../components/Button'
import { Dropdown, DropdownItem } from '../components/Dropdown'
import { Input } from '../components/Input'
import { BaseLayout } from '../layout/Base'
import { css } from 'styled-system/css'
import { Tab } from '../components/Tab'
import { ImageUpload } from '../components/ImageUpload'

const Page = () => {
  const [text, setText] = useState('')
  const [preview, setPreview] = useState<null | string>(null)
  const [item, setItem] = useState<null | { valueId: string; value: string }>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return (
    <BaseLayout>
      <styled.h1 textStyle="heading.m">Hello world</styled.h1>
      <Button maxWidth="500px" width="100%" type="secondary">
        Button
      </Button>

      <Input onChange={onChange} />
      <p>{text}</p>

      <Dropdown
        headCss={css({ maxW: '500px', placeSelf: 'center' })}
        defaultSelected={{ valueId: 'option-21', value: 'option-2' }}
        dispatcher={setItem}
      >
        <DropdownItem valueId="option-12" value="option-1">
          Option 1
        </DropdownItem>

        <DropdownItem valueId="option-21" value="option-2">
          Option 2
        </DropdownItem>
      </Dropdown>
      {item?.value && <p>{item?.value}</p>}

      <Tab>Hello world</Tab>

      <ImageUpload dispatcher={setPreview} />
      {preview && <img src={preview} alt="" />}
    </BaseLayout>
  )
}

export default Page
