import React, { FC, useState } from "react";
import { Steps, Popover } from "antd";
import type { StepsProps } from "antd";
import InactiveStepIcon from "../../../public/icons/CheckInActive.svg";
import ActiveStepIcon from "../../../public/icons/CheckOK.svg";
import CurrentStepIcon from "../../../public/icons/CheckCurrent.svg";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

import styles from "./style.module.scss";
import Image from "next/image";

interface CustomDotProps {
  currentStep: any;
  status: any;
}

const customDot: React.FC<CustomDotProps> = ({ currentStep, status }) => {
  return (
    <Popover>
      {
        <Image
          src={
            currentStep > status.index
              ? ActiveStepIcon
              : currentStep === status.index
              ? CurrentStepIcon
              : InactiveStepIcon
          }
          alt="stepper icon"
        />
      }
    </Popover>
  );
};
interface StepperProps {
  currentStep: number;
}

const Stepper: FC<StepperProps> = ({ currentStep }) => {
  const steps = [
    { title: "Create" },
    { title: "Agreement" },
    { title: "Payment" },
    { title: "Transfer" },
    { title: "Inspection" },
    { title: "Closed" },
  ];

  return (
    <Steps
      current={currentStep}
      progressDot={(_, status) => customDot({ currentStep, status })}
      className={"customSteps"}
    >
      {steps.map((step, index) => (
        <Steps.Step key={index} title={step.title} className={styles.stepper} />
      ))}
    </Steps>
  );
};

export default Stepper;
