"use client";
import React, { FC } from "react";
import { Flex, Button, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "@/components/Shared/Inputs/Text";
import AuthButton from "@/components/Shared/Buttons/Auth";
import styles from "../style.module.scss"

const ForgotPassword: FC = () => {
  const methods = useForm()
  const { Title, Text } = Typography;

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

      <form className={styles.formWrapper}>
        <FormProvider {...methods}>
          <TextInput name="email" label="Enter your email" />
          <div style={{ marginTop: '40px' }}>
            <AuthButton name="Reset password" />
          </div>
        </FormProvider>
      </form>
    </Flex>
  );
};

export default ForgotPassword;
