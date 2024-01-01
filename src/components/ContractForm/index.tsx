"use client";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Stepper from "./Stepper";
import { Flex } from "antd";
import Create from "./StepCreate";
import StepDetail from "./StepDetail";
import StepCompliance from "./StepCompliance";

const ContractForm: FC = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Stepper />
      <Flex vertical align="center">
        {/* <Create /> */}
        {/* <StepDetail /> */}
        <StepCompliance />
      </Flex>
    </FormProvider>
  );
};
export default ContractForm;
