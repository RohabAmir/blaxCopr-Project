import { Button, Flex } from 'antd'
import React from 'react'
import style from "./style.module.scss"
import TextInput from '../Shared/Inputs/Text'
const PersonalDetails = () => {
  return (
    <Flex vertical align='end' style={{ width: '100%' }}>
      <Flex gap={30} style={{ width: "100%" }} justify='space-between'>
        <Flex vertical gap={10} style={{ width: "50%" }}>
          <TextInput name="firstName" label='First Name' />
          <TextInput name="lastName" label="Last Name" />
        </Flex>
        <Flex vertical gap={10} style={{ width: "50%" }}>
          <TextInput name="email" label="Email" />
          <TextInput name="Phone" label="Phone" />
        </Flex>
      </Flex>
      <Button className={style.saveButton}>
        Save
      </Button>
    </Flex>
  )
}

export default PersonalDetails