import React, { FC, useState } from "react";

import styles from "./style.module.scss"; // Import your CSS module

const Stepper: FC<any> = ({ activeStep }) => {
  const getWidth = (id: Number) => {
    switch (id) {
      case 1:
        return styles.flexStepperColor2;
      case 2:
        return styles.flexStepperColor3;
      case 3:
        return styles.flexStepperColor4;
      default:
        return styles.flexStepper;
    }
  };

  return (
    <>
      <div className={styles.customSteps}>
        <div className={getWidth(activeStep)}></div>
        <div className={styles.flexStepperHeading}>
          <p
            id="0"
            className={
              activeStep === 0 ? `${styles.dotHeading1}` : styles.dotHeading
            }
            // onClick={() => handleStepChange("0")}
          >
            Create
          </p>
          <p
            id="1"
            className={
              activeStep === 1
                ? `${styles.dotHeading2} ${styles.active}`
                : styles.dotHeading2
            }
            // onClick={() => handleStepChange("1")}
          >
            Details
          </p>
          <p
            id="2"
            className={
              activeStep === 2
                ? `${styles.dotHeading3} ${styles.active}`
                : styles.dotHeading3
            }
            // onClick={() => handleStepChange("2")}
          >
            Compliance
          </p>
          <p
            id="3"
            className={
              activeStep === 3
                ? `${styles.dotHeading4} ${styles.active}`
                : styles.dotHeading4
            }
            // onClick={() => handleStepChange("3")}
          >
            Agreement
          </p>
        </div>
      </div>
    </>
  );
};

export default Stepper;
