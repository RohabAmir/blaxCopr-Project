"use client";
import React, { FC } from "react";
import { Flex, Typography } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import TextInput from "@/components/Shared/Inputs/Text";
import Button from "@/components/Shared/Button";
import styles from "./style.module.scss";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";
import { ButtonType, IconType } from "@/types";
import { AUTH_TABS, useAuthContext } from "@/contexts/Auth";

const ForgotPassword: FC<any> = () => {
  const methods = useForm();
  const { Title, Text } = Typography;
  const { isMobile,handleActivePage }=useAuthContext() 


  return (
    <Flex
      vertical
      align="flex-start"
      className={styles.rootFormWrapper}
    >
      {isMobile && <Image
        className={styles.blaxcorpLogin}
        src={BLAXCORP_LOGO}
        alt="blaxcorp logo"
      />}
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
          <div className={styles.formUpperSection}>
            <TextInput name="email" label="Enter your email" />
          </div>
          <div className={styles.formLowerSection}>
            <Button name="Reset password" fullWidth size="large" onClickHandler={() => handleActivePage(AUTH_TABS.RESET_PASSWORD)} />
          </div>
        </FormProvider>
      </form>
    </Flex>
  );
};

export default ForgotPassword;
