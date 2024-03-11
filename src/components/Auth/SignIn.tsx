"use client";
import React, { FC } from "react";
import { Flex, Typography } from "antd";
import styles from "./style.module.scss";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextInput from "@/components/Shared/Inputs/Text";
import PasswordInput from "@/components/Shared/Inputs/Password";
import Button from "@/components/Shared/Button";
import { toast } from "react-toastify";
import { ButtonType } from "@/types";
import Image from "next/image";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";
import { AUTH_TABS, useAuthContext } from "@/contexts/Auth";
import { useAppContext } from "@/contexts/App";
import { useLoginUserMutation } from "@/Store/services/authApi";
import { useRouter } from "next/navigation";
import { setJWTToken } from "@/utils/jwtTokens";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";

interface LoginProps {
  email: string;
  password: string;
}

const ForgotPasswordLink = ({ handleActivePage, children }: any) => {
  const { Text } = Typography;
  return (
    <div
      style={{
        margin: "5px 0",
        color: "#454745",
        fontSize: "14px",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <span
        className={styles.forgotLink}
        onClick={() => handleActivePage(AUTH_TABS.FORGOT_PASSWORD)}
      >
        <Text underline strong>
          Forgot your password
        </Text>
      </span>

      {children}
    </div>
  );
};

const SignIn: FC = () => {
  const router = useRouter();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const { Title, Text } = Typography;
  const { isMobile } = useAppContext();
  const { handleActivePage } = useAuthContext();

  const methods = useForm<LoginProps>({
    mode: "onChange",
    criteriaMode: "all",
    reValidateMode: "onChange",
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    const result = await loginUser(data).unwrap();

    console.log(result);

    if (result?.access_token) {
      setJWTToken(result.access_token); // Store the token in cookies
    }
    router.push("/");
  };
  // const setJWTToken = (token: any) => {
  //   Cookies.set("token", token, {
  //     expires: 7,
  //     path: "/",
  //     secure: true,
  //     sameSite: "Lax",
  //   });
  // };

  function isErrorWithMessage(error: any): error is { message: string } {
    return error && typeof error.message === "string";
  }

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
          style={{ width: "100%" }}
        >
          <Title level={isMobile ? 3 : 1}>Log in to Blaxcorp</Title>
          {!isMobile && (
            <Text className={styles.authSpacing}>
              Don't have an account?
              <Text
                underline
                style={{
                  textUnderlineOffset: "4px",
                  cursor: "pointer",
                }}
                strong
                onClick={() => handleActivePage(AUTH_TABS.SIGN_UP)}
              >
                <span
                  style={{
                    marginLeft: "3px",
                  }}
                >
                  Sign up
                </span>
              </Text>
            </Text>
          )}
        </Flex>
      </Flex>

      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <div className={styles.formUpperSection}>
            <TextInput
              name="email"
              label="Enter your email"
              type="email"
              required
            />
            {isMobile ? (
              <Flex vertical className="w-full">
                <PasswordInput
                  name="password"
                  label="Enter Your password"
                  required
                />
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
                <PasswordInput
                  name="password"
                  label="Enter Your password"
                  required
                />
              </ForgotPasswordLink>
            )}
            {isError && error && (
              <div style={{ color: "red" }}>
                {"status" in error && isErrorWithMessage(error.data)
                  ? error.data.message
                  : "An error occurred. Please try again later."}
              </div>
            )}
          </div>
          <div className={styles.formLowerSection}>
            <Button
              name="Log in"
              fullWidth
              size="large"
              isSubmit
              isLoading={isLoading}
            />
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
