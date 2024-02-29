import React, { FC } from "react";
import { Flex, Select, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface OptionType {
      value: string;
      label: string;
      disabled?: boolean;
}
interface ITextInput {
      key?: string;
      name: string;
      label?: string;
      options: OptionType[];
      onChange?: (e: any) => void;
      required?: boolean;
      defaultValue?: string;
      disabled?: boolean;
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
                                    margin: "5px 0",
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
                                          onChange={(value) => {
                                                field.onChange(value);
                                                if (onChange) onChange(value);
                                          }}
                                          defaultValue={defaultValue}
                                          style={{
                                                height: "48px",
                                                width: "100%",
                                                borderRadius: "12px",
                                          }}
                                          disabled={disabled}
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
                        control={control}
                        name={name}
                  />
            </Flex>
      );
};

export default TextInput;
