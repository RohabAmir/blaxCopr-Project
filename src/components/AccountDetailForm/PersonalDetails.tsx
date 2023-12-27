import { Button, Flex, Form, Input } from 'antd'
import React from 'react'
import style from "./style.module.scss"
const PersonalDetails = () => {
  return (
    <div>
      <Flex vertical align='end' style={{ width: '100%' }}>
        <Flex gap={10} style={{ width: "100%" }} justify='space-between'>
          <Flex vertical gap={10} style={{ width: "50%" }}>
            <Form.Item name="firstName" label="First Name">
              <Input type="text" style={{ padding: "10px", height: "48px",width:'100%' }} />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
              <Input type="text" style={{ padding: "10px", height: "48px" }} />
            </Form.Item>
          </Flex>
          <Flex vertical gap={10} style={{ width: "50%"}}>
            <Form.Item name="email" label="Email" style={{ width: '100%' }}>
              <Input type="text" style={{ padding: "10px", height: "48px" }} />
            </Form.Item>
            <Form.Item name="Phone" label="Phone" style={{ width: '100%' }}>
              <Input type="text" style={{ padding: "10px", height: "48px" }} />
            </Form.Item>
          </Flex>
        </Flex>
        <Button className={style.saveButton}>
          Save
        </Button>

      </Flex>



    </div>
  )
}

export default PersonalDetails