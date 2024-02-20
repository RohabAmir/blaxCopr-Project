// import React, { FC } from "react";
// import { Flex, Input } from "antd";
// import { Controller, useFormContext } from "react-hook-form";
// type inputType = "number" | "text";
// interface ITextInput {
//   name: string;
//   placeholder?: string;
//   label?: string;
//   type?: inputType;
//   onChange?: () => void;
// }

// const TextInput: FC<ITextInput> = ({
//   name,
//   placeholder,
//   label,
//   onChange,
//   type = "text",
// }) => {
//   const { control } = useFormContext();
//   return (
//     <Flex vertical align="flex-start" className="w-full">
//       {label && (
//         <div style={{ margin: "5px 0", color: "#454745", fontSize: "14px" }}>
//           {label}
//         </div>
//       )}
//       <Controller
//         render={({ field }) => (
//           <Input
//             type={type}
//             {...field}
//             placeholder={placeholder}
//             style={{
//               padding: "10px",
//               height: "48px",
//               width: "100%",
//             }}
//           />
//         )}
//         control={control}
//         name={name}
//       />
//     </Flex>
//   );
// };

// export default TextInput;
import React, { FC } from "react";
import { Flex, Input, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type inputType = "number" | "text" | "email";

interface ITextInput {
  key?: string;
  name: string;
  placeholder?: string;
  label?: string;
  type?: inputType;
  onChange?: (value: string | number) => void;
  required?: boolean;
  defaultValue?: string;
}

const TextInput: FC<ITextInput> = ({
  key,
  name,
  placeholder,
  label,
  onChange,
  type,
  required = false,
  defaultValue,
}) => {
  const { Text } = Typography;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleChange: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

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
            <Input
              key={key}
              {...field}
              type={type}
              placeholder={placeholder}
              style={{
                padding: "10px",
                height: "48px",
                width: "100%",
              }}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
              defaultValue={defaultValue}
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
