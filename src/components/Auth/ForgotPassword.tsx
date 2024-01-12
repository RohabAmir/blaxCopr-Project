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
import { PAGES } from ".";

const ForgotPassword: FC<any> = ({handleActivePage,isMobile}) => {
  const methods = useForm();
  const { Title, Text } = Typography;


  return (
    <Flex
      vertical
      justify="space-between"
      gap={50}
      style={{ paddingLeft: "48px" }}
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
          <TextInput name="email" label="Enter your email" />
          <div style={{ marginTop: "40px" }}>
            <Button name="Reset password" fullWidth size="large" onClickHandler={()=>handleActivePage(PAGES.RESET_PASSWORD)}/>
          </div>
        </FormProvider>
      </form>
    </Flex>
  );
};

export default ForgotPassword;
