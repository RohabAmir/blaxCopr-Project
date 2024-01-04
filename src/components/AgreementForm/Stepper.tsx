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

import React, { useState } from "react";
import { Steps, Popover } from "antd";
import type { StepsProps } from "antd";
import styles from "./style.module.scss";

const customDot: StepsProps["progressDot"] = (dot, { status, index }) => (
  <Popover>{dot}</Popover>
);

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
      progressDot={customDot}
      className={styles.customSteps}
    >
      {steps.map((step, index) => (
        <Steps.Step
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
