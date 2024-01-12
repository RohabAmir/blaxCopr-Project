"use client";
import React, { FC } from "react";
import { Flex, Typography,Grid } from "antd";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Shared/Button";
import PasswordInput from "@/components/Shared/Inputs/Password";
import styles from "./style.module.scss";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";

const ResetPassword: FC<any> = ({handleActivePage}) => {
  const methods = useForm();
  const { Title, Text } = Typography;
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();

  return (
    <Flex
      vertical
      align="flex-start"
      justify="space-between"
      style={{ paddingLeft: "48px" }}
    >
      {!screens['md'] && <Image
        className={styles.blaxcorpLogin}
        src={BLAXCORP_LOGO}
        alt="blaxcorp logo"
      />}
      <Flex vertical align="flex-start">
        <Title style={{ color: "#0E0F0C", marginTop: "0" }} level={2}>
          Password Reset
        </Title>
        <Text style={{ color: "#0E0F0C", marginBottom: "50px" }}>
          Enter a new password for your account. After creating a new password,
          use it to sign in.{" "}
        </Text>
      </Flex>
      <form className={styles.formWrapper}>
        <FormProvider {...methods}>
          <PasswordInput name="email" label="Enter new password" />
          <div className={styles.passReset}>
            <PasswordInput name="password" label="Confirm new password" />
          </div>
          {/* <Flex vertical align="flex-start" justify="center"> */}
          {/* <div className={styles.flex}>
              <Image className={styles.icon} src={OkIcon} alt="check" />
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
          </Flex> */}
            <Button name="Save new password" fullWidth size="large" />
        </FormProvider>
      </form>
    </Flex>
  );
};

export default ResetPassword;
