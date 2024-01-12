"use client";
import React, { FC } from "react";
import { Flex,Typography, Grid } from "antd";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import CheckIcon from "./../../../public/icons/Check.svg";
import TextInput from "@/components/Shared/Inputs/Text";
import PasswordInput from "@/components/Shared/Inputs/Password";
import Button from "@/components/Shared/Button";
import styles from "./style.module.scss";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";
import { ButtonType } from "@/types";
import { PAGES } from ".";

const SignUp: FC<any> = ({ handleActivePage,isMobile }) => {
  const { Title, Text } = Typography;
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  const methods = useForm();
  return (
    <Flex
      vertical
      align="center"
      justify="space-between"
      gap={50}
      style={{ marginTop: "48px" }}
    >
      <Flex
        vertical
        align="center"
        justify="flex-start"
        style={{ marginTop: "64px" }}
      >
        {!screens['md'] && <Image
          className={styles.blaxcorpLogin}
          src={BLAXCORP_LOGO}
          alt="blaxcorp logo"
        />}
        <Title level={screens['md'] ? 3 : 1}>Create Your Blaxcorp account</Title>
        {screens['md'] ? <Text style={{ color: "#454745" }}>
          Already have an account?{" "}
          <Text underline style={{ textUnderlineOffset: "4px" }} strong onClick={() => handleActivePage(PAGES.SIGN_IN)}>
            Log in
          </Text>
        </Text> : ''}
      </Flex>

      <form className={styles.formWrapper}>
        <FormProvider {...methods}>
          <TextInput name="email" label="Enter your email" />
          <PasswordInput name="password" label="Create Your password" />
          <Flex vertical align="flex-start" justify="center">
            <div className={styles.flexIcon}>
              <Image className={styles.checkIcon} src={CheckIcon} alt="check" />
              <span color="#163300" style={{ marginLeft: "10px" }}>
                6 or more characters{" "}
              </span>
            </div>
            <div>
              <h1
                style={{ color: "red", fontWeight: "900", display: "inline" }}
              >
                .
              </h1>
              <span style={{ color: "red", padding: "0", marginLeft: "10px" }}>
                Upper and lower case{" "}
              </span>
            </div>
            <div>
              <h1
                style={{ color: "red", fontWeight: "900", display: "inline" }}
              >
                .
              </h1>
              <span style={{ color: "red", padding: "0", marginLeft: "10px" }}>
                Special character
              </span>
            </div>
          </Flex>
          <Button name="Create account" fullWidth size="large" />
          {isMobile && <Button name="Login" fullWidth size="large" type={ButtonType.Secondary} onClickHandler={() => handleActivePage(PAGES.SIGN_IN)} />}
        </FormProvider>
      </form>
    </Flex>
  );
};

export default SignUp;
