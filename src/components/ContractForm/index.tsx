"use client";
import React, { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Stepper from "./Stepper";
import { Flex } from "antd";
import Create from "./StepCreate";
import StepDetail from "./StepDetail";
import StepCompliance from "./StepCompliance";

const ContractForm: FC = () => {
  const methods = useForm();
  const [activeStep, setActiveStep] = useState<string>("0");
  const handleStepChange = (current: string) => {
    setActiveStep(current);
  };

  React.useEffect(() => {
    console.log('contract formstate', methods.formState, "form state defult", methods.formState.defaultValues, "dirty fields", methods.formState.dirtyFields)
  }, [methods.formState])
  
  return (
    <FormProvider {...methods}>
      <Stepper activeStep={activeStep} />
      <Flex vertical align="center">
        {activeStep === "0" && <Create handleStepChange={handleStepChange}/>}
        {activeStep === "1" && <StepDetail handleStepChange={handleStepChange}/>}
        {activeStep === "2" && <StepCompliance />}
      </Flex>
    </FormProvider>
  );
};
export default ContractForm;
