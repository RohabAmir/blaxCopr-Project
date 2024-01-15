// import React, { useState } from "react";
// import { Steps, Popover } from "antd";
// import type { StepsProps } from "antd";
// import styles from "./style.module.scss";

// const customDot: StepsProps["progressDot"] = (dot, { status, index }) => (
//   <Popover
//     content={
//       <span>
//         step {index} status: {status}
//       </span>
//     }
//   >
//     {dot}
//   </Popover>
// );

// const Stepper: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(0);

//   const steps = [
//     {
//       title: "Create",
//     },
//     {
//       title: "Agreement",
//     },
//     {
//       title: "Payment",
//     },
//     {
//       title: "Transfer",
//     },
//     {
//       title: "Inspection",
//     },
//     {
//       title: "Closed",
//     },
//   ];

//   const handleStepClick = (step: number) => {
//     setCurrentStep(step);
//   };

//   return (
//     <Steps current={currentStep} progressDot={customDot}>
//       {steps.map((step, index) => (
//         <Steps.Step
//           key={index}
//           title={step.title}
//           className={styles.stepper}
//           onClick={() => handleStepClick(index)}
//         />
//       ))}
//     </Steps>
//   );
// };

// export default Stepper;
// Stepper.jsx

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

const Stepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      title: "Create",
    },
    {
      title: "Agreement",
    },
    {
      title: "Payment",
    },
    {
      title: "Transfer",
    },
    {
      title: "Inspection",
    },
    {
      title: "Closed",
    },
  ];

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <Steps
      current={currentStep}
      progressDot={(_, status) => customDot({ currentStep, status })}
      className={"customSteps"}
    >
      {steps.map((step, index) => (
        <Steps.Step
          // icon={<LoadingOutlined />}
          key={index}
          title={step.title}
          className={styles.stepper}
          onClick={() => handleStepClick(index)}
        />
      ))}
    </Steps>
  );
};

export default Stepper;
