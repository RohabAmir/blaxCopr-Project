"use client";
import React, { FC, useState } from "react";
import { Flex, Typography } from "antd";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import TextInput from "@/components/Shared/Inputs/Text";
import PasswordInput from "@/components/Shared/Inputs/Password";
import Button from "@/components/Shared/Button";
import styles from "./style.module.scss";
import { toast } from "react-toastify";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";
import { ButtonType } from "@/types";
import { AUTH_TABS, useAuthContext } from "@/contexts/Auth";
import { useAppContext } from "@/contexts/App";
import { useRegisterUserMutation } from "@/Store/services/authApi";

interface RegisterUserProps {
  email: string;
  password: string;
}

const SignUp: FC = () => {
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();
  // const [form, setForm] = useState<string | number>("");
  const { Title, Text } = Typography;
  const { isMobile } = useAppContext();
  const { handleActivePage } = useAuthContext();

  const methods = useForm<RegisterUserProps>({
    mode: "onChange",
    criteriaMode: "all",
    reValidateMode: "onChange",
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<RegisterUserProps> = async (data) => {
    await registerUser(data).unwrap();
    handleActivePage(AUTH_TABS.SIGN_IN);
  };

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
          className="w-full"
        >
          <Title level={isMobile ? 3 : 1}>Create Your Blaxcorp account</Title>
        </Flex>
        {!isMobile ? (
          <Text className={styles.authSpacing}>
            Already have an account?{" "}
            <Text
              underline
              style={{
                textUnderlineOffset: "4px",
                cursor: "pointer",
              }}
              strong
              onClick={() => handleActivePage(AUTH_TABS.SIGN_IN)}
            >
              Log in
            </Text>
          </Text>
        ) : (
          ""
        )}
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
            <PasswordInput
              name="password"
              label="Create Your password"
              showRules={true}
              required
            />

            {/* Displaying backend error message dynamically */}
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
              name="Create account"
              fullWidth
              size="large"
              isSubmit
              isLoading={isLoading}
            />
            {isMobile && (
              <Button
                name="Login"
                fullWidth
                size="large"
                type={ButtonType.Secondary}
                onClickHandler={() => handleActivePage(AUTH_TABS.SIGN_IN)}
              />
            )}
          </div>
        </FormProvider>
      </form>
    </Flex>
  );
};

export default SignUp;
