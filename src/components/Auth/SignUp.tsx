"use client";
import React, { FC } from "react";
import { Flex, Typography } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import CheckIcon from "./../../../public/icons/Check.svg";
import TextInput from "@/components/Shared/Inputs/Text";
import PasswordInput from "@/components/Shared/Inputs/Password";
import Button from "@/components/Shared/Button";
import styles from "./style.module.scss";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";
import { ButtonType } from "@/types";
import { AUTH_TABS, useAuthContext } from "@/contexts/Auth";

const SignUp: FC = () => {
  const { Title, Text } = Typography;
  const { isMobile,handleActivePage }=useAuthContext() 

  const methods = useForm();
  return (
    <Flex
      vertical
      align="center"
      className={styles.rootFormWrapper}
    >
      <Flex
        vertical
        align="center"
        justify="flex-start"
        className="w-full"
      >
        {isMobile && <Image
          className={styles.blaxcorpLogin}
          src={BLAXCORP_LOGO}
          alt="blaxcorp logo"
        />}
        <Flex vertical align={isMobile?"flex-start":'center'} className="w-full"><Title level={isMobile? 3 : 1}>Create Your Blaxcorp account</Title></Flex>
        {!isMobile ? <Text style={{ color: "#454745" }}>
          Already have an account?{" "}
          <Text underline style={{ textUnderlineOffset: "4px" }} strong onClick={() => handleActivePage(AUTH_TABS.SIGN_IN)}>
            Log in
          </Text>
        </Text> : ''}
      </Flex>
      <form className={styles.formWrapper}>
        <FormProvider {...methods}>
          <div className={styles.formUpperSection}>
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
          </div>
          <div className={styles.formLowerSection}>
            <Button name="Create account" fullWidth size="large" />
            {isMobile && <Button name="Login" fullWidth size="large" type={ButtonType.Secondary} onClickHandler={() => handleActivePage(AUTH_TABS.SIGN_IN)} />}
          </div>
        </FormProvider>
      </form>
    </Flex>
  );
};

export default SignUp;
