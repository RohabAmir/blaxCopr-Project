import React, { FC } from "react";
import { Flex, Input, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface ITextarea {
  name: string;
  placeholder?: string;
  label?: string;
}

const Textarea: FC<ITextarea> = ({
  name,
  placeholder,
  label,
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
      </Flex>
      <Controller
        render={({ field }) => (
          <Input.TextArea
           
            {...field}
            placeholder={placeholder}
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

export default Textarea;
