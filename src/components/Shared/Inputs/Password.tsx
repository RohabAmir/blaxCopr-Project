import React, { FC } from "react";
import { Flex, Input, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import Link from "next/link";
import Eye from "../../../../public/icons/eye.svg";
import EyeOff from "../../../../public/icons/eye-off.svg";
import Image from "next/image";
import { ROUTES } from "@/constants";

interface IPasswordInput {
  name: string;
  placeholder?: string;
  label?: string;
  forgotPassword?: boolean;
}

const PasswordInput: FC<IPasswordInput> = ({
  name,
  placeholder,
  label,
  forgotPassword = false,
}) => {
  const { Text } = Typography;
  const { control } = useFormContext();
  return (
    <div>
      <Flex justify="space-between" align="center">
        {label && (
          <div style={{ margin: "5px 0", color: "#454745", fontSize: "14px" }}>
            {label}
          </div>
        )}
        {forgotPassword && (
          <div style={{ margin: "5px 0", color: "#454745", fontSize: "14px" }}>
            <Link href={ROUTES.FORGOT_PASSWORD}>
              <Text underline strong>
                Forgot your password
              </Text>
            </Link>
          </div>
        )}
      </Flex>
      <Controller
        render={({ field }) => (
          <Input.Password
            iconRender={(visible) => (
              <Image src={visible ? Eye : EyeOff} alt="eye" />
            )}
            {...field}
            placeholder={placeholder}
            type="password"
            style={{
              paddingTop: "0.5px",
              paddingBottom: "0.5px",
              height: "48px",
              width: "100%",
            }}
          />
        )}
        control={control}
        name={name}
      />
    </div>
  );
};

export default PasswordInput;
