"use client";
import React, { FC } from "react";
import { Flex, message, Typography } from "antd";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import CheckIcon from "./../../../../public/icons/Check.svg"
import TextInput from "@/components/Shared/Inputs/Text";
import PasswordInput from "@/components/Shared/Inputs/Password";
import AuthButton from "@/components/Shared/Buttons/Auth";
import styles from "../style.module.scss"

const SignUp: FC = () => {
  const { Title, Text } = Typography;
  const methods = useForm()
  return (
    <Flex
      vertical
      align="center"
      justify="space-between"
      gap={50}
      style={{ width: "400px", margin: "auto" }}
    >
      <Flex vertical align="center" justify="flex-start">
        <Title level={3}>Create Your Blaxcorp account</Title>
        <Text style={{ color: "#454745" }}>
          Already have an account?{" "}
          <Link href="/sign-in">
            <Text underline style={{ textUnderlineOffset: "4px" }} strong>
              Log in
            </Text>
          </Link>
        </Text>
      </Flex>

      <form className={styles.formWrapper}>
        <FormProvider {...methods}>
          <TextInput name="email" label="Enter your email" />
          <PasswordInput name="password" label="Create Your password" />
          <Flex vertical align="flex-start" justify="center">
            <div >
              <Image src={CheckIcon} alt="check" />
              <span color="#163300" style={{ marginLeft: '10px' }}>6 or more characters </span>
            </div>
            <div >
              <h1 style={{ color: 'red', fontWeight: "900", display: 'inline' }}>.</h1 >
              <span style={{ color: 'red', padding: '0', marginLeft: '10px' }}>Upper and lower case </span>
            </div>
            <div >
              <h1 style={{ color: 'red', fontWeight: "900", display: 'inline' }}>.</h1 >
              <span style={{ color: 'red', padding: '0', marginLeft: '10px' }}>Special character</span>
            </div>
          </Flex>
          <AuthButton name="Create account" />
        </FormProvider>

      </form>
    </Flex>
  );
};

export default SignUp;
