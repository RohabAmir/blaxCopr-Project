import React, { FC } from "react";
import { Flex, Select, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
type optionType =
  | { value: string; label: string; disabled?: undefined }
  | { value: string; label: string; disabled: boolean };
interface ITextInput {
  key?: string;
  name: string;
  label?: string;
  options: any;
  onChange: (e: any) => void;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  value?: any;
}

const TextInput: FC<ITextInput> = ({
  key,
  name,
  label,
  options,
  onChange,
  required = false,
  defaultValue,
  disabled = false,
  value,
}) => {
  const { Text } = Typography;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Flex vertical align="flex-start" className="w-full">
      {label && (
        <div
          style={{
            margin: "16px 0 6px 0",
            color: "#454745",
            fontSize: "14px",
          }}
        >
          {label}
        </div>
      )}
      <Controller
        rules={{
          required: required && "This field is required",
        }}
        render={({ field, fieldState }) => (
          <>
            <Select
              key={key}
              {...field}
              options={options}
              value={value}
              onChange={(value) => {
                onChange(value);
              }}
              defaultValue=""
              style={{
                height: "48px",
                width: "100%",
                borderRadius: "12px",
              }}
              disabled={disabled}
            />
            {fieldState.error && (
              <Text type="danger" style={{ marginTop: "5px" }}>
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
        control={control}
        name={name}
      />
    </Flex>
  );
};

export default TextInput;
