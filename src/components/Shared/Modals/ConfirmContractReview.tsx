"use client";
import { FC } from "react";
import styles from "./style.module.scss";
import WarningIcon from ".././../../../public/icons/Dash.svg";
import CheckIcon from "../../../../public/icons/Check.svg";
import { Button } from "..";
import { ButtonType } from "@/types";
import Image from "next/image";
const ConfirmContractReview: FC = () => {
  return (
    <>
      <div className={styles.modalMain}>
        <div className={styles.modal}>
          <p className={styles.heading}>Confirm contract review</p>
          <Image
            className={styles.iconWarning}
            src={WarningIcon}
            alt="warning"
          />
          <p className={styles.description}>
            Clicking 'Review and Sign' indicates that you have thoroughly read
            and understood the terms of the contract. Your signature will
            represent your agreement and commitment to these terms.
          </p>

          <button className={styles.btnOpen}>Review and Sign</button>
          <button className={styles.cross}>&times;</button>
        </div>
      </div>
    </>
  );
};
export default ConfirmContractReview;
