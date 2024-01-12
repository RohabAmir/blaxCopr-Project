import { Flex, Grid } from "antd";
import React, { FC } from "react";
import style from "./style.module.scss";
import PasswordInput from "../Shared/Inputs/Password";
import Button from "../Shared/Button";
import styles from "./style.module.scss";

const Password: FC = () => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  return (
    <>
      {/* <div className={styles.personalDetails}> */}
      <div className={styles.personalDetailsMin}>
        <div style={screens["sm"] ? { width: "50%" } : { width: "100%" }}>
          <span style={{ width: "100%" }}>
            <PasswordInput name="oldPassword" label="Old Password" />
          </span>
          <span style={{ width: "100%" }}>
            <PasswordInput name="lastPassword" label="New Password" />
          </span>
        </div>
      </div>
      <Button name="Save" fullWidth={!screens["sm"]} />
      {/* </div> */}
    </>
  );
};

export default Password;
