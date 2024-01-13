"use client";
import React, { FC } from "react";
import { Flex, Typography, Grid } from "antd";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Shared/Button";
import PasswordInput from "@/components/Shared/Inputs/Password";
import styles from "./style.module.scss";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";
import { useAuthContext } from "@/contexts/Auth";

const ResetPassword: FC<any> = () => {
  const methods = useForm();
  const { Title, Text } = Typography;
  const { isMobile }=useAuthContext() 
  

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
      <Flex vertical align="flex-start">
        <Title style={{ color: "#0E0F0C"}} level={2}>
          Password Reset
        </Title>
        <Text style={{ color: "#0E0F0C" }}>
          Enter a new password for your account. After creating a new password,
          use it to sign in.{" "}
        </Text>
      </Flex>
      <form className={styles.formWrapper}>
        <FormProvider {...methods}>
          <div className={styles.formUpperSection}>
            <PasswordInput name="email" label="Enter new password" />
            <PasswordInput name="password" label="Confirm new password" />
          </div>
          <div className={styles.formLowerSection}>
            <Button name="Save new password" fullWidth size="large" />
          </div>
        </FormProvider>
      </form>
    </Flex>
  );
};

export default ResetPassword;
