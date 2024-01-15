import React, { FC } from "react";
import { Flex, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
type optionType =
  | { value: string; label: string; disabled?: undefined }
  | { value: string; label: string; disabled: boolean };
interface ITextInput {
  name: string;
  label?: string;
  options: any;
  onChange: (e: any) => void;
}

const TextInput: FC<ITextInput> = ({ name, label, options, onChange }) => {
  const { control } = useFormContext();
  return (
    <Flex vertical align="flex-start" className="w-full">
      {label && (
        <div style={{ margin: "5px 0", color: "#454745", fontSize: "14px" }}>
          {label}
        </div>
      )}
      <Controller
        render={({ field }) => (
          <Select
            {...field}
            defaultValue=""
            options={options}
            onChange={(e) => onChange(e)}
            style={{
              height: "48px",
              width: "100%",
              borderRadius: "12px",
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
