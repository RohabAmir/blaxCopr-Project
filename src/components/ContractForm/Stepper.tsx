import React, { FC, useState } from "react";
import type { StepsProps } from "antd";
import { Popover, Steps } from "antd";
import styles from "./style.module.scss"; // Import your CSS module

const customDot: StepsProps["progressDot"] = (dot) => <Popover>{dot}</Popover>;

const YourStepper: FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepChange = (current: number) => {
    setCurrentStep(current);
  };

  return (
    <Steps
      current={currentStep}
      progressDot={customDot}
      className={styles.customSteps} // Use your CSS module className here
      onChange={handleStepChange}
    >
      <Steps.Step title="Create" />
      <Steps.Step title="Details" />
      <Steps.Step title="Compliance" />
      <Steps.Step title="Agreement" />
    </Steps>
  );
};

export default YourStepper;
