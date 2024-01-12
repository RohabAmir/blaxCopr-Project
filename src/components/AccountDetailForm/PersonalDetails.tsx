import { Flex, Grid } from "antd";
import React from "react";
import TextInput from "../Shared/Inputs/Text";
import Button from "../Shared/Button";
import styles from "./style.module.scss";
const PersonalDetails = () => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  return (
    <>
      <div className={styles.personalDetails}>
        <div className={styles.personalDetailsMin}>
          <div style={screens["sm"] ? { width: "50%" } : { width: "100%" }}>
            <TextInput name="firstName" label="First Name" />
            <TextInput name="lastName" label="Last Name" />
          </div>
          <div style={screens["sm"] ? { width: "50%" } : { width: "100%" }}>
            <TextInput name="email" label="Email" />
            <TextInput name="Phone" label="Phone" />
          </div>
        </div>

        <Button name="Save" fullWidth={!screens["sm"]} />
      </div>
    </>
  );
};

export default PersonalDetails;
