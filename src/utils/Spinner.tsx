import React from "react";
import styles from "./spinner.module.scss";

interface SpinnerProps {
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ color = "rgb(159, 232, 112)" }) => {
  const spinnerStyle = {
    borderTopColor: color,
    borderTop: `4px solid ${color}`,
  };

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
