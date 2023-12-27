import { Button, Flex, Form, Input } from 'antd'
import React, { FC } from 'react'
import style from "./style.module.scss"

const Password: FC = () => {
  return (
    <Flex vertical align='end' style={{ width: '100%' }}>
      <Flex gap={10} justify='space-between' style={{ width: '100%' }}>
        <Form.Item name="oldPassword" label="Old Password" style={{ width: '50%' }}>
          <Input type="text" style={{ padding: "10px", height: "48px" }} />
        </Form.Item>
        <Form.Item name="lastPassword" label="New Password" style={{ width: '50%' }}>
          <Input type="text" style={{ padding: "10px", height: "48px" }} />
        </Form.Item>
      </Flex>
      <Button className={style.saveButton}>
        Save
      </Button>
    </Flex>
  )
}

export default Password