import React, { FC } from "react";
import { Flex, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
type optionType = { value: string; label: string; disabled?: undefined; } | { value: string; label: string; disabled: boolean; }
interface ITextInput {
    name: string;
    label?: string;
    options:any
}

const TextInput: FC<ITextInput> = ({
    name,
    label,
    options
}) => {
    const { control } = useFormContext();
    return (
        <Flex vertical align="flex-start" style={{  width: "100%" }}>
            {label && (
                <div style={{ margin: "5px 0", color: "#454745", fontSize: "14px" }}>
                    {label}
                </div>
            )}
            <Controller
                render={({ field }) => (
                    <Select
                        {...field}
                        defaultValue=''
                        options={options}
                        style={{  height: "48px", width: "100%" }}
                    />
                )}
                control={control}
                name={name}
            />
        </Flex>
    );
};

export default TextInput;
