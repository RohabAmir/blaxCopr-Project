import { Button, Flex } from 'antd'
import React, { FC } from 'react'
import style from "./style.module.scss"
import PasswordInput from '../Shared/Inputs/Password'

const Password: FC = () => {
  return (
    <Flex vertical align='end' gap={30} style={{ width: '100%' }}>
      <Flex gap={10} justify='space-between' style={{ width: '100%' }}>
        <span style={{ width: '50%' }}>
          <PasswordInput name="oldPassword" label="Old Password" />
        </span>
        <span style={{ width: '50%' }}>
          <PasswordInput name="lastPassword" label="New Password" />
        </span>
      </Flex>
      <Button className={style.saveButton}>
        Save
      </Button>
    </Flex>
  )
}

export default Password