"use client";
import React, { FC, useState } from "react";
import { Flex, Typography } from "antd";
import Image from "next/image";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/Shared/Button";
import PasswordInput from "@/components/Shared/Inputs/Password";
import styles from "./style.module.scss";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";
import { useAppContext } from "@/contexts/App";
import { useResetPasswordMutation } from "@/Store/services/authApi";
import { AUTH_TABS, useAuthContext } from "@/contexts/Auth";

interface resetPasswordProps {
      confirmPassword: any;
      newPassword: any;
      password: string;
      token: string;
}

const ResetPassword: FC<any> = () => {
      const [resetPassword, { isLoading, isError, error }] =
            useResetPasswordMutation();
      const [successMessage, setSuccessMessage] = useState("");
      const { Title, Text } = Typography;
      const { isMobile } = useAppContext();
      const { handleActivePage } = useAuthContext();

      const methods = useForm<resetPasswordProps>({
            mode: "onChange",
            criteriaMode: "all",
            reValidateMode: "onChange",
      });
      const { handleSubmit } = methods;

      const onSubmit: SubmitHandler<resetPasswordProps> = async (data) => {
            const queryParams = new URLSearchParams(window.location.search);
            const token = queryParams.get("token");
            if (data.newPassword !== data.confirmPassword) {
                  methods.setError("confirmPassword", {
                        type: "manual",
                        message: "Password does not match",
                  });
                  return;
            }
            if (token) {
                  const result = await resetPassword({
                        password: data.newPassword,
                        token: token,
                  }).unwrap();
                  setSuccessMessage(result.message);
                  handleActivePage(AUTH_TABS.SIGN_IN);
            }
      };

      function isErrorWithMessage(error: any): error is { message: string } {
            return error && typeof error.message === "string";
      }

      return (
            <Flex
                  vertical
                  align="flex-start"
                  className={styles.rootFormWrapper}
            >
                  {isMobile && (
                        <Image
                              className={styles.blaxcorpLogin}
                              src={BLAXCORP_LOGO}
                              alt="blaxcorp logo"
                        />
                  )}
                  <Flex vertical align="flex-start">
                        <Title style={{ color: "#0E0F0C" }} level={2}>
                              Password Reset
                        </Title>
                        <Text
                              style={{ color: "#0E0F0C", marginBottom: "24px" }}
                        >
                              Enter a new password for your account. After
                              creating a new password, use it to sign in.{" "}
                        </Text>
                  </Flex>
                  <form
                        className={styles.formWrapper}
                        onSubmit={handleSubmit(onSubmit)}
                  >
                        <FormProvider {...methods}>
                              <div className={styles.formUpperSection}>
                                    <PasswordInput
                                          name="newPassword"
                                          label="Enter new password"
                                          required
                                    />
                                    <PasswordInput
                                          name="confirmPassword"
                                          label="Confirm new password"
                                          required
                                    />
                                    {/* Dynamically handling success and error messages from api  */}
                                    {successMessage ? (
                                          <div style={{ color: "green" }}>
                                                {successMessage}
                                          </div>
                                    ) : (
                                          isError &&
                                          error && (
                                                <div style={{ color: "red" }}>
                                                      {"status" in error &&
                                                      isErrorWithMessage(
                                                            error.data
                                                      )
                                                            ? error.data.message
                                                            : "An error occurred. Please try again later."}
                                                </div>
                                          )
                                    )}
                              </div>
                              <div className={styles.formLowerSection}>
                                    <Button
                                          name="Save new password"
                                          fullWidth
                                          size="large"
                                          isSubmit
                                          isLoading={isLoading}
                                    />
                              </div>
                        </FormProvider>
                  </form>
            </Flex>
      );
};

export default ResetPassword;
function handleActivePage(RESET_PASSWORD: any) {
      throw new Error("Function not implemented.");
}
