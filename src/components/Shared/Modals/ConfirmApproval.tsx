"use client";
import { FC } from "react";
import styles from "./style.module.scss";
import WarningIcon from ".././../../../public/icons/Dash.svg";
import CheckIcon from "../../../../public/icons/Check.svg";
import { Button } from "..";
import { ButtonType } from "@/types";
import Image from "next/image";
const ConfirmApproval: FC = () => {
  return (
    <>
      <div className={styles.modal}>
        <p className={styles.heading}>Confirm approval</p>
        <Image className={styles.iconWarning} src={CheckIcon} alt="warning" />
        <p className={styles.description}>
          By confirming, you’re closing the contract, and funds will be released
          to the Seller. Are you sure you want to proceed?
        </p>

        <button className={styles.btnOpen}>Confirm</button>
        <button className={styles.cross}>&times;</button>
      </div>
    </>
  );
};
export default ConfirmApproval;
