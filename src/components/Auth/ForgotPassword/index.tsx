"use client";
import React, { FC } from "react";
import { Flex, Input, Button, Form, message, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";

const ForgotPassword: FC = () => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const onFinish = () => {
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  return (
    <Flex vertical justify="space-between" gap={50} style={{ width: "400px" }}>
      <Button
        type="primary"
        icon={<LeftOutlined />}
        style={{
          width: "86px",
          height: "46px",
          padding: "12px 20px 12px 12px" /* top right bottom left */,
          borderRadius: "100px",
          background: "#16330014",
          color: " #163300",
        }}
      >
        Back
      </Button>
      <Flex vertical align="start" justify="start">
        <Title level={2}>Forgot Password?</Title>
        <Text style={{ color: "#0E0F0C" }}>
          Enter the email adress you used when you joined and we’ll send you
          instructions to reset your password.{" "}
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
        <Form.Item name="email" label="Enter your email">
          <Input type="email" style={{ padding: "10px", height: "48px" }} />
        </Form.Item>

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
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default ForgotPassword;
