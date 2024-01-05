import React, { FC } from "react";
import { Flex, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
type inputType = "number" | "text";
interface ITextInput {
  name: string;
  placeholder?: string;
  label?: string;
  type?: inputType;
}

const TextInput: FC<ITextInput> = ({
  name,
  placeholder,
  label,
  type = "text",
}) => {
  const { control } = useFormContext();
  return (
    <Flex
      vertical
      align="flex-start"
      className="w-full"
    >
      {label && (
        <div style={{ margin: "5px 0", color: "#454745", fontSize: "14px" }}>
          {label}
        </div>
      )}
      <Controller
        render={({ field }) => (
          <Input
            type={type}
            {...field}
            placeholder={placeholder}
            style={{
              padding: "10px",
              height: "48px",
              width: "100%"
            }}
          />
        )}
        control={control}
        name={name}
      />
    </Flex>
  );
};

export default TextInput;
