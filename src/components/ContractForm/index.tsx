"use client";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Stepper from "./Stepper";
import { Flex } from "antd";
import Create from "./StepCreate";
import StepDetail from "./StepDetail";
import StepCompliance from "./StepCompliance";

const ContractForm: FC = () => {
  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  return (
    <FormProvider {...methods}>
      <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <Flex vertical align="center">
        {currentStep === 0 && <Create />}
        {currentStep === 1 && <StepDetail />}
        {currentStep === 2 && <StepCompliance />}
      </Flex>
    </FormProvider>
  );
};
export default ContractForm;
