"use client";
import React, { FC } from "react";
import { Flex, Input, Button, Form, message, Typography } from "antd";
import CheckIcon from "./../../../../public/icons/Check.svg"
import Image from "next/image";

const SignIn: FC = () => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const onFinish = () => {
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  return (
    <Flex
      vertical
      align="flex-start"
      justify="space-between"
      style={{ width: "400px" }}
    >
      <Flex vertical align="flex-start">
        <Title style={{ color: "#0E0F0C" }} level={2}>
          Password Reset
        </Title>
        <Text style={{ color: "#0E0F0C", marginBottom: "50px" }}>
          Enter a new password for your account. After creating a new password,
          use it to sign in.{" "}
        </Text>
      </Flex>

      <Form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="email" label="Enter new password">
          <Input type="password" style={{ padding: "10px", height: "48px" }} />
        </Form.Item>
        <Form.Item name="password" label="Confirm new password">
          <Input type="password" style={{ padding: "10px", height: "48px" }} />
        </Form.Item>
        <Flex vertical align="flex-start" justify="center">
          <div >
            <Image src={CheckIcon} alt="check" />
            <span color="#163300" style={{marginLeft:'10px'}}>6 or more characters </span>
          </div>
          <div >
            <h1  style={{ color: 'red',fontWeight:"900",display:'inline'}}>.</h1 >
            <span style={{ color: 'red',padding:'0',marginLeft:'10px' }}>Upper and lower case </span>
          </div>
          <div >
            <h1  style={{ color: 'red',fontWeight:"900",display:'inline' }}>.</h1 >
            <span style={{ color: 'red',padding:'0',marginLeft:'10px' }}>Special character</span>
          </div>
        </Flex>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              background: "#9FE870",
              borderRadius: "20px",
              color: "black",
              padding: "10px",
              height: "48px",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            Save new password
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default SignIn;
