// SharedTextInput.js
import React, { FC } from "react";
import { Flex } from "antd";
import TextInput from "../Shared/Inputs/Text";

interface SharedTextInputProps {
  name: string;
  label: string;
}

const SharedTextInput: FC<SharedTextInputProps> = ({ name, label }) => {
  return (
    <Flex gap={30} justify="space-between" style={{ width: "100%" }}>
      <span style={{ width: "50%" }}>
        <TextInput name={name} label={label} />
      </span>
      {/* You can add more customization or additional input components here */}
    </Flex>
  );
};

export default SharedTextInput;
