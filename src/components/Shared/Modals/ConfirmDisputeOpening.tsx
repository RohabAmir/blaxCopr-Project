"use client";
import { FC } from "react";
import styles from "./style.module.scss";
import WarningIcon from ".././../../../public/icons/Dash.svg";
import CheckIcon from "../../../../public/icons/Check.svg";
import { Button } from "..";
import { ButtonType } from "@/types";
import Image from "next/image";
const ConfirmDisputeOpening: FC = () => {
  return (
    <>
      <div className={styles.modal}>
        <p className={styles.heading}>Confirm dispute opening</p>
        <Image className={styles.iconWarning} src={WarningIcon} alt="warning" />
        <p className={styles.description}>
          Do you wish to proceed with opening a dispute for this contract? By
          confirming, you'll start the process to address your issues with the
          seller.
        </p>

        <button className={styles.btnOpen}>Open Dispute</button>
        <button className={styles.cross}>&times;</button>
      </div>
    </>
  );
};
export default ConfirmDisputeOpening;
