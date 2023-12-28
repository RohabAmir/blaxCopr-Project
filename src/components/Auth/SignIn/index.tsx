"use client";
import React, { FC } from "react";
import { Flex, Typography } from "antd";
import Link from "next/link";
import styles from "../style.module.scss"
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "@/components/Shared/Inputs/Text";
import PasswordInput from "@/components/Shared/Inputs/Password";
import AuthButton from "@/components/Shared/Buttons/Auth";

const SignIn: FC = () => {
  const methods = useForm()
  const { Title, Text } = Typography;

  return (
    <Flex
      vertical
      align="center"
      justify="space-between"
      gap={50}
      style={{ width: "400px", margin: "auto" }}
    >
      <Flex vertical align="center" justify="flex-start">
        <Title level={3}>Log in to Blaxcorp</Title>
        <Text style={{ color: "#454745" }}>
          Don't have an account?
          <Link href="/sign-up">
            <Text underline style={{ textUnderlineOffset: "4px" }} strong>
              Sign up
            </Text>
          </Link>
        </Text>
      </Flex>

      <form className={styles.formWrapper}>
        <FormProvider {...methods}>
          <TextInput name="email" label="Enter your email" />
          <PasswordInput name="password" label="Enter Your password" />
          <AuthButton name="Log in" />
        </FormProvider>
      </form>
    </Flex>
  );
};

export default SignIn;
