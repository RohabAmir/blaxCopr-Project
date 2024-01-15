import React, { FC } from "react";
import PasswordInput from "../Shared/Inputs/Password";
import Button from "../Shared/Button";
import styles from "./style.module.scss";
import { useAppContext } from "@/contexts/App";

const Password: FC = () => {
  const { isMobile } = useAppContext();
  return (
    <>
      <div className={styles.personalDetailsMin}>
        <div style={!isMobile ? { width: "50%" } : { width: "100%" }}>
          <span style={{ width: "100%" }}>
            <PasswordInput name="oldPassword" label="Old Password" />
          </span>
        </div>
        <div style={!isMobile ? { width: "50%" } : { width: "100%" }}>
          <span style={{ width: "100%" }}>
            <PasswordInput name="lastPassword" label="New Password" />
          </span>
        </div>
      </div>
      <div className={styles.btnEnd}>
        <Button name="Save" fullWidth={isMobile} />
      </div>
      {/* </div> */}
    </>
  );
};

export default Password;
