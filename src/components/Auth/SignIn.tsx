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
import { AUTH_TABS, useAuthContext } from "@/contexts/Auth";
import { useAppContext } from "@/contexts/App";
const ForgotPasswordLink = ({ handleActivePage, children }: any) => {
  const { Text } = Typography;
  return (
    <div
      style={{
        margin: "5px 0",
        color: "#454745",
        fontSize: "14px",
        position: "relative",
      }}
      onClick={() => handleActivePage(AUTH_TABS.FORGOT_PASSWORD)}
    >
      <span className={styles.forgotLink}>
        <Text underline strong>
          Forgot your password
        </Text>
      </span>
      {children}
    </div>
  );
};
const SignIn: FC = () => {
  const methods = useForm();
  const { Title, Text } = Typography;
  const { isMobile } = useAppContext();
  const { handleActivePage } = useAuthContext();

  return (
    <Flex vertical align="center" className={styles.rootFormWrapper}>
      <Flex vertical align="center" justify="flex-start" className="w-full">
        {isMobile && (
          <Image
            className={styles.blaxcorpLogin}
            src={BLAXCORP_LOGO}
            alt="blaxcorp logo"
          />
        )}
        <Flex
          vertical
          align={isMobile ? "flex-start" : "center"}
          style={{ width: "100%", minWidth: "350px" }}
        >
          <Title level={isMobile ? 3 : 1}>Log in to Blaxcorp</Title>
          {!isMobile && (
            <Text style={{ color: "#454745" }}>
              Don't have an account? &nbsp;
              <Text
                underline
                style={{ textUnderlineOffset: "4px" }}
                strong
                onClick={() => handleActivePage(AUTH_TABS.SIGN_UP)}
              >
                Sign up
              </Text>
            </Text>
          )}
        </Flex>
      </Flex>

      <form className={styles.formWrapper}>
        <FormProvider {...methods}>
          <div className={styles.formUpperSection}>
            <TextInput name="email" label="Enter your email" />
            {isMobile ? (
              <Flex vertical className="w-full">
                <PasswordInput name="password" label="Enter Your password" />
                <div
                  style={{
                    margin: "5px 0",
                    color: "#454745",
                    fontSize: "14px",
                    position: "relative",
                  }}
                  onClick={() => handleActivePage(AUTH_TABS.FORGOT_PASSWORD)}
                >
                  <Text underline strong>
                    Forgot your password
                  </Text>
                </div>
              </Flex>
            ) : (
              <ForgotPasswordLink handleActivePage={handleActivePage}>
                <PasswordInput name="password" label="Enter Your password" />
              </ForgotPasswordLink>
            )}
          </div>
          <div className={styles.formLowerSection}>
            <Button name="Log in" fullWidth size="large" />
            {isMobile && (
              <Button
                name="Create Account"
                fullWidth
                size="large"
                type={ButtonType.Secondary}
                onClickHandler={() => handleActivePage(AUTH_TABS.SIGN_UP)}
              />
            )}
          </div>
        </FormProvider>
      </form>
    </Flex>
  );
};

export default SignIn;
