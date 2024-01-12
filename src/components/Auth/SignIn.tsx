"use client";
import React, { FC } from "react";
import { Flex, Typography } from "antd";
import styles from "./style.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "@/components/Shared/Inputs/Text";
import PasswordInput from "@/components/Shared/Inputs/Password";
import Button from "@/components/Shared/Button";
import { ButtonType } from "@/types";
import Image from "next/image";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";
import { PAGES } from ".";

const SignIn: FC<any> = ({isMobile,handleActivePage}) => {
  const methods = useForm();
  const { Title, Text } = Typography;


  return (
    <Flex
      vertical
      align="center"
      justify="space-between"
      gap={50}
      style={{ marginTop: isMobile?"0px":"140px",padding:isMobile?'20px':'4px',height:isMobile?'100vh':"auto" }}
    >
      {isMobile && (
        <Image
          className={styles.blaxcorpLogin}
          src={BLAXCORP_LOGO}
          alt="blaxcorp logo"
        />
      )}
      <Flex vertical align="center" justify="flex-start">
        <Title level={isMobile ? 3 : 1}>Log in to Blaxcorp</Title>
        {isMobile ? (
          <Text style={{ color: "#454745" }}>
            Don't have an account?
           
              <Text underline style={{ textUnderlineOffset: "4px" }} strong onClick={()=>handleActivePage(PAGES.SIGN_UP)}>
                Sign up
              </Text>
            
          </Text>
        ) : (
          ""
        )}
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
          <Button name="Log in" fullWidth size="large" />
          {isMobile && (
            <Button
              name="Create Account"
              fullWidth
              size="large"
              type={ButtonType.Secondary}
              onClickHandler={()=>handleActivePage(PAGES.SIGN_UP)}
            />
          )}
        </FormProvider>
      </form>
    </Flex>
  );
};

export default SignIn;
