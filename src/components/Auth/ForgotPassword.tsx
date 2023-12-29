"use client";
import React, { FC } from "react";
import { Flex, Typography } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "@/components/Shared/Inputs/Text";
import Button from "@/components/Shared/Button";
import styles from "./style.module.scss";
import { ButtonType, IconType } from "@/types";

const ForgotPassword: FC = () => {
  const methods = useForm();
  const { Title, Text } = Typography;

  return (
    <Flex vertical justify="space-between" gap={50} style={{ width: "400px" }}>
      <Button
        name="Back"
        leftIcon={IconType.BackArrow}
        type={ButtonType.Secondary}
      />
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
          <div style={{ marginTop: "40px" }}>
            <Button name="Reset password" fullWidth size="large" />
          </div>
        </FormProvider>
      </form>
    </Flex>
  );
};

export default ForgotPassword;
