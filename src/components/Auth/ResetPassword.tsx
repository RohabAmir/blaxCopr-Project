"use client";
import React, { FC } from "react";
import { Flex, Typography } from "antd";
import CheckIcon from "./../../../public/icons/Check.svg";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Shared/Button";
import PasswordInput from "@/components/Shared/Inputs/Password";
import styles from "./style.module.scss";

const SignIn: FC = () => {
  const methods = useForm();
  const { Title, Text } = Typography;

  return (
    <Flex
      vertical
      align="flex-start"
      justify="space-between"
      style={{ width: "400px" }}
    >
      <Flex vertical align="flex-start">
        <Title style={{ color: "#0E0F0C" }} level={2}>
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
          <PasswordInput name="password" label="Confirm new password" />
          <Flex vertical align="flex-start" justify="center">
            <div>
              <Image src={CheckIcon} alt="check" />
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
          <Button name="Save new password" fullWidth size="large" />
        </FormProvider>
      </form>
    </Flex>
  );
};

export default SignIn;
