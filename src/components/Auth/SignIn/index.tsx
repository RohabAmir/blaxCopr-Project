"use client"
import React, { FC } from 'react'
import { Flex, Input, Button, Form, message, Typography } from 'antd'
import Link from 'next/link';

const SignIn: FC = () => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography
  const onFinish = () => {
    message.success('Submit success!');
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  return (
    <Flex vertical align='center' justify='space-between' gap={50} style={{ width: "100%" }}>
      <Flex vertical align='center' justify='flex-start'>
        <Title level={3}>
          Log in to Blaxcorp
        </Title>
        <Text style={{ color: '#454745' }}>
          Don't have an account? <Link href="/sign-up"><Text underline style={{ textUnderlineOffset: '4px' }} strong>Sign up</Text></Link>
        </Text>
      </Flex>

      <Form
        style={{ width: '100%', display: 'flex', flexDirection: "column", gap: "10px" }}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="Enter your email"
        >
          <Input type='email' style={{ padding: "10px", height: "48px" }} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Enter Your password"
        >
          <Input type='password' style={{ padding: "10px", height: "48px" }} />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" style={{ width: "100%", background: "#9FE870", borderRadius: '20px', color: "black", padding: '10px', height: "48px", fontWeight: "600", fontSize: '16px' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default SignIn