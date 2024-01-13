"use client";
import React, { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Stepper from "./Stepper";
import { Flex, Grid } from "antd";
import Create from "./StepCreate";
import StepDetail from "./StepDetail";
import StepCompliance from "./StepCompliance";
import StepperResponsive from "./StepperResponsive";

const ContractForm: FC = () => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  const methods = useForm();
  const [activeStep, setActiveStep] = useState<number>(0);
  const handleStepChange = (current: number) => {
    setActiveStep(current);
  };

  return (
    <FormProvider {...methods}>
      {screens["sm"] && <Stepper activeStep={activeStep} />}

      <Flex vertical align="center">
        {activeStep === 0 && (
          <Create handleStepChange={handleStepChange} step={activeStep} />
        )}
        {activeStep === 1 && (
          <StepDetail handleStepChange={handleStepChange} step={activeStep} />
        )}
        {activeStep === 2 && (
          <StepCompliance
            handleStepChange={handleStepChange}
            step={activeStep}
          />
        )}
      </Flex>
    </FormProvider>
  );
};
export default ContractForm;
