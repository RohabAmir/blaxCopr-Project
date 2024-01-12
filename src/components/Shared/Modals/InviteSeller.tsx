"use client";
import { FC } from "react";
import styles from "./style.module.scss";
import WarningIcon from ".././../../../public/icons/Dash.svg";
import CheckIcon from "../../../../public/icons/Check.svg";
import { Button } from "..";
import { ButtonType } from "@/types";
import Image from "next/image";
const InviteSeller: FC = () => {
  return (
    <>
      <div className={styles.modalMain}>
        <div className={styles.modal}>
          <p className={styles.heading}>Invite seller</p>
          <div className={styles.sellerFlex}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="text" />
            <label className={styles.label}>Message for the seller</label>
            <textarea
              className={styles.input2}
              rows={4}
              placeholder="Hello, I've sent over the Blaxcorp contract for your review. It contains the details we agreed upon. If you're ready to proceed, please sign at!"
            />
          </div>
          <button className={styles.btnOpen}>Send Invite</button>
          <button className={styles.cross}>&times;</button>
        </div>
      </div>
    </>
  );
};
export default InviteSeller;
