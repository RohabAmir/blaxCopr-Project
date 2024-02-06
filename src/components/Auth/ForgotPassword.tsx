"use client";
import React, { FC, useState } from "react";
import { Flex, Typography } from "antd";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import TextInput from "@/components/Shared/Inputs/Text";
import Button from "@/components/Shared/Button";
import styles from "./style.module.scss";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";
import { ButtonType, IconType } from "@/types";
import { AUTH_TABS, useAuthContext } from "@/contexts/Auth";
import { useAppContext } from "@/contexts/App";
import { useForgetPasswordMutation } from "@/Store/services/authApi";

interface ForgetPasswordProps {
      email: string;
}

const ForgotPassword: FC<any> = () => {
      const [forgetPassword, { isLoading, isError, error }] =
            useForgetPasswordMutation();
      const [successMessage, setSuccessMessage] = useState("");
      const { Title, Text } = Typography;
      const { isMobile } = useAppContext();
      const { handleActivePage, goBack } = useAuthContext();

      const methods = useForm<ForgetPasswordProps>({
            mode: "onChange",
            criteriaMode: "all",
            reValidateMode: "onChange",
      });
      const { handleSubmit } = methods;

      const onSubmit: SubmitHandler<ForgetPasswordProps> = async (data) => {
            const result = await forgetPassword(data).unwrap();
            setSuccessMessage(result.message);
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
                  <Button
                        name="Back"
                        leftIcon={IconType.BackArrow}
                        type={ButtonType.Secondary}
                        onClickHandler={goBack}
                  />
                  <Flex vertical align="start" justify="start">
                        <Title level={2}>Forgot Password?</Title>
                        <Text
                              style={{ color: "#0E0F0C", marginBottom: "24px" }}
                        >
                              Enter the email adress you used when you joined
                              and we’ll send you instructions to reset your
                              password.{" "}
                        </Text>
                  </Flex>

                  <form
                        className={styles.formWrapper}
                        onSubmit={handleSubmit(onSubmit)}
                  >
                        <FormProvider {...methods}>
                              <div className={styles.formUpperSection}>
                                    <TextInput
                                          name="email"
                                          label="Enter your email"
                                          type="email"
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
                                          name="Reset password"
                                          fullWidth
                                          size="large"
                                          // onClickHandler={() =>
                                          //       handleActivePage(
                                          //             AUTH_TABS.RESET_PASSWORD
                                          //       )
                                          // }
                                          isSubmit
                                          isLoading={isLoading}
                                    />
                              </div>
                        </FormProvider>
                  </form>
            </Flex>
      );
};

export default ForgotPassword;
