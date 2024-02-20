import React, { FC, useState } from "react";
import PasswordInput from "../Shared/Inputs/Password";
import Button from "../Shared/Button";
import styles from "./style.module.scss";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAppContext } from "@/contexts/App";
import { useUpdatePasswordMutation } from "@/Store/services/authApi";

interface UpdatePasswordProps {
      oldPassword: string;
      newPassword: string;
}

const Password: FC = () => {
      const [updatePassword, { isLoading, isError, error }] =
            useUpdatePasswordMutation();
      const [successMessage, setSuccessMessage] = useState("");
      const { isMobile } = useAppContext();
      const methods = useForm<UpdatePasswordProps>({
            mode: "onChange",
            criteriaMode: "all",
            reValidateMode: "onChange",
      });
      const { handleSubmit } = methods;

      const onSubmit: SubmitHandler<UpdatePasswordProps> = async (data) => {
                const result = await updatePassword({
                  oldPassword: data.oldPassword,
                  newPassword: data.newPassword,
                }).unwrap();
                  setSuccessMessage(result.message);
      };

      function isErrorWithMessage(error: any): error is { message: string } {
            return error && typeof error.message === "string";
      }

      return (
            <>
                  <form onSubmit={handleSubmit(onSubmit)}>
                        <FormProvider {...methods}>
                              <div className={styles.personalDetailsMin}>
                                    <div
                                          style={
                                                !isMobile
                                                      ? { width: "50%" }
                                                      : { width: "100%" }
                                          }
                                    >
                                          <span style={{ width: "100%" }}>
                                                <PasswordInput
                                                      name="oldPassword"
                                                      label="Old Password"
                                                      required
                                                />
                                          </span>
                                    </div>
                                    <div
                                          style={
                                                !isMobile
                                                      ? { width: "50%" }
                                                      : { width: "100%" }
                                          }
                                    >
                                          <span style={{ width: "100%" }}>
                                                <PasswordInput
                                                      name="newPassword"
                                                      label="New Password"
                                                      required
                                                      showRules={true}
                                                />
                                          </span>
                                    </div>
                              </div>
                              <div className={styles.btnEnd}>
                                    <Button
                                          name="Save"
                                          fullWidth={isMobile}
                                          isSubmit
                                          isLoading={isLoading}
                                    />
                              </div>
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
                        </FormProvider>
                  </form>
            </>
      );
};

export default Password;
