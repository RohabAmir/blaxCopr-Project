import React, { FC, useEffect, useState } from "react";
import { Flex, Input, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";
import CheckIcon from "./../../../../public/icons/Check.svg";
import styles from "./style.module.scss";
import Eye from "../../../../public/icons/eye.svg";
import EyeOff from "../../../../public/icons/eye-off.svg";

interface IPasswordInput {
      name: string;
      placeholder?: string;
      label?: string;
      required?: boolean;
      showRules?: boolean; // New prop for controlling the display of rules
}

const iconStyles = {
      width: 22,
      height: 22,
};

const PasswordInput: FC<IPasswordInput> = ({
      name,
      placeholder,
      label,
      required = false,
      showRules = false, // Default is false, so it will not show rules unless specified
}) => {
      const { Text } = Typography;
      const {
            control,
            watch,
            formState: { errors },
      } = useFormContext();

      const [passwordRules, setPasswordRules] = useState({
            minLength: false,
            upperLower: false,
            specialChar: false,
      });

      const password = watch(name);

      useEffect(() => {
            if (password) {
                  setPasswordRules({
                        minLength: password.length >= 6,
                        upperLower:
                              /[a-z]/.test(password) && /[A-Z]/.test(password),
                        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
                  });
            }
      }, [password]);

      return (
            <div>
                  <Flex justify="space-between" align="center">
                        {label && (
                              <div
                                    style={{
                                          margin: "5px 0",
                                          color: "#454745",
                                          fontSize: "14px",
                                    }}
                              >
                                    {label}
                              </div>
                        )}
                  </Flex>
                  <Controller
                        name={name}
                        control={control}
                        rules={{
                              required: required && "This field is required",
                        }}
                        render={({ field, fieldState }) => (
                              <>
                                    <Input.Password
                                          iconRender={(visible) => (
                                                <Image
                                                      src={
                                                            visible
                                                                  ? Eye
                                                                  : EyeOff
                                                      }
                                                      alt="eye"
                                                />
                                          )}
                                          {...field}
                                          placeholder={placeholder}
                                          style={{
                                                paddingTop: "0.5px",
                                                paddingBottom: "0.5px",
                                                height: "48px",
                                                width: "100%",
                                          }}
                                    />
                                    {fieldState.error && (
                                          <Text
                                                type="danger"
                                                style={{ marginTop: "5px" }}
                                          >
                                                {fieldState.error.message}
                                          </Text>
                                    )}
                              </>
                        )}
                  />

                  {showRules && (
                        <div
                              style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    gap: "8px",
                                    marginTop: "15px",
                              }}
                        >
                              <div
                                    className={styles.flexIcon}
                                    style={{
                                          display: "flex",
                                          alignItems: "center",
                                    }}
                              >
                                    {passwordRules.minLength ? (
                                          <>
                                                <Image
                                                      style={iconStyles}
                                                      className={
                                                            styles.checkIcon
                                                      }
                                                      src={CheckIcon}
                                                      alt="check"
                                                />
                                                <span
                                                      color="#163300"
                                                      style={{
                                                            marginLeft: "10px",
                                                      }}
                                                >
                                                      6 or more characters{" "}
                                                </span>
                                          </>
                                    ) : (
                                          ""
                                    )}
                              </div>
                              <div
                                    style={{
                                          display: "flex",
                                          alignItems: "center",
                                    }}
                              >
                                    {passwordRules.upperLower ? (
                                          <>
                                                <Image
                                                      style={iconStyles}
                                                      className={
                                                            styles.checkIcon
                                                      }
                                                      src={CheckIcon}
                                                      alt="check"
                                                />
                                                <span
                                                      style={{
                                                            color:"#163300",
                                                            padding: "0",
                                                            marginLeft: "10px",
                                                      }}
                                                >
                                                      Upper and lower case{" "}
                                                </span>
                                          </>
                                    ) : (
                                          ""
                                    )}
                              </div>
                              <div
                                    style={{
                                          display: "flex",
                                          alignItems: "center",
                                    }}
                              >
                                    {passwordRules.specialChar ? (
                                          <>
                                                <Image
                                                      style={iconStyles}
                                                      className={
                                                            styles.checkIcon
                                                      }
                                                      src={CheckIcon}
                                                      alt="check"
                                                />
                                                <span
                                                      style={{
                                                            color: "#163300",
                                                            padding: "0",
                                                            marginLeft: "10px",
                                                      }}
                                                >
                                                      Special character
                                                </span>
                                          </>
                                    ) : (
                                          ""
                                    )}
                              </div>
                        </div>
                  )}
            </div>
      );
};

export default PasswordInput;
