"use client";
import React, { FC } from "react";
import { Flex, Typography, Grid } from "antd";
import Link from "next/link";
import styles from "./style.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "@/components/Shared/Inputs/Text";
import PasswordInput from "@/components/Shared/Inputs/Password";
import Button from "@/components/Shared/Button";
import { ButtonType } from "@/types";
import Image from "next/image";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";


const SignIn: FC = () => {
  const methods = useForm();
  const { Title, Text } = Typography;
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();

  return (
    <Flex
      vertical
      align="center"
      justify="space-between"
      gap={50}
      style={{ marginTop: "140px" }}
    >
      {!screens['md'] && <Image
        className={styles.blaxcorpLogin}
        src={BLAXCORP_LOGO}
        alt="blaxcorp logo"
      />}
      <Flex vertical align="center" justify="flex-start">
        <Title level={screens['md'] ? 3 : 1}>Log in to Blaxcorp</Title>
        {screens['md'] ? <Text style={{ color: "#454745" }}>
          Don't have an account?
          <Link href="/sign-up">
            <Text underline style={{ textUnderlineOffset: "4px" }} strong>
              Sign up
            </Text>
          </Link>
        </Text> : ''}
      </Flex>

      <form className={styles.formWrapperSignIn}>
        <FormProvider {...methods}>
          <div className={styles.mailLogin}>
            <TextInput name="email" label="Enter your email" />
          </div>
          <PasswordInput
            name="password"
            label="Enter Your password"
            forgotPassword
          />
          {/* <div className={styles.btnLogin}>
            
          </div> */}
          <Button name="Log in" fullWidth size="large" />
          {!screens['md'] && <Button name="Create Account" fullWidth size="large" type={ButtonType.Secondary} />}
        </FormProvider>
      </form>
    </Flex>
  );
};

export default SignIn;
