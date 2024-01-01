"use client";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Stepper from "./Stepper";
import Create from "./StepCreate";
import { Flex } from "antd";
import StepDetail from "./StepDetail";

const ContractForm: FC = () => {
  const methods = useForm();
  return (
    <>
      <Stepper />
      <FormProvider {...methods} >
        <Flex vertical align="center">
          {/* <Create /> */}
          <StepDetail/>
        </Flex>
      </FormProvider>
    </>
  );
};
export default ContractForm;

