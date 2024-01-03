import React, { FC, useState } from "react";

import styles from "./style.module.scss"; // Import your CSS module

const Stepper: FC<any> = ({ currentStep, setCurrentStep }) => {
  const handleStepChange = (current: number) => {
    setCurrentStep(current);
  };

  const [activeId, setActiveId] = useState("0");
  const getWidth = (id: string) => {
    // setActiveId(id);
    switch (id) {
      case "1":
        return styles.flexStepperColor2;
      case "2":
        return styles.flexStepperColor3;
      case "3":
        return styles.flexStepperColor4;
      default:
        return styles.flexStepper;
    }
  };
  return (
    <>
      <div className={styles.customSteps}>
        <div className={getWidth(activeId)}></div>
        <div className={styles.flexStepperHeading}>
          <p
            id="0"
            className={
              activeId === "0" ? `${styles.dotHeading1}` : styles.dotHeading
            }
            onClick={() => setActiveId("0")}
          >
            Create
          </p>
          <p
            id="1"
            className={
              activeId === "1"
                ? `${styles.dotHeading2} ${styles.active}`
                : styles.dotHeading2
            }
            onClick={() => setActiveId("1")}
          >
            Details
          </p>
          <p
            id="2"
            className={
              activeId === "2"
                ? `${styles.dotHeading3} ${styles.active}`
                : styles.dotHeading3
            }
            onClick={() => setActiveId("2")}
          >
            Compliance
          </p>
          <p
            id="3"
            className={
              activeId === "3"
                ? `${styles.dotHeading4} ${styles.active}`
                : styles.dotHeading4
            }
            onClick={() => setActiveId("3")}
          >
            Agreement
          </p>
        </div>
      </div>
    </>
  );
};

export default Stepper;
