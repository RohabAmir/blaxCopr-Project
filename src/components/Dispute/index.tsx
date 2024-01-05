"use client";
import { FC } from "react";
import styles from "./style.module.scss";
import { ButtonType } from "@/types";
import Image from "next/image";
import UploadIcon from "../../../public/icons/Upload.svg";
import PlusIcon from "../../../public/icons/Plus.svg";

import { Button } from "../Shared";
const Dispute: FC = () => {
  return (
    <>
      <div>
        <p className={styles.disputeHeading}>Open dispute</p>
      </div>
      <div className={styles.gridContainer}>
        <div></div>
        <div className={styles.disputeMain}>
          <div className={styles.titleNames}>
            <div className={styles.contentFlex}>
              <span className={styles.circle}>JS</span>
              <span className={styles.flexColText}>
                <p className={styles.nameHeading}>jane smith</p>
                <p className={styles.nameDes}>Buyer</p>
              </span>
            </div>
            <div className={styles.contentFlex}>
              <span className={styles.circle}>OS</span>
              <span className={styles.flexColText}>
                <p className={styles.nameHeading}>Oleksii Strichyk</p>
                <p className={styles.nameDes}>Seller</p>
              </span>
            </div>
          </div>
          {/* --- */}
          <p className={styles.textCenter}>Today</p>
          {/* ----- */}
          <div className={styles.contentFlexStart}>
            <span className={styles.circle}>JS</span>
            <span className={styles.flexColTextStart}>
              <p className={styles.nameHeading}>Jane Smith</p>
              <p className={styles.nameDes}>Message text</p>
            </span>
          </div>
          <div className={styles.contentFlexEnd}>
            <span className={styles.flexColTextEnd}>
              <p className={styles.nameHeading}>Oleksii Strichyk</p>
              <p className={styles.nameDes}>Message text </p>
            </span>
            <span className={styles.circle}>OS</span>
          </div>
          <div className={styles.chat}>
            <div className={styles.flexTextIcon}>
              <Image
                className={styles.icon}
                src={UploadIcon}
                alt="upload icon"
              />
              <input
                className={styles.input}
                type="text"
                placeholder="Send Message"
              />
            </div>

            <button className={styles.plusBtn}>
              {" "}
              <Image src={PlusIcon} alt="plus icon" />
            </button>
          </div>
        </div>
        <div className={styles.rightBar}>
          <p className={styles.rightBarHeading}>14 Days Left</p>
          <p className={styles.nameDes}>
            If the dispute remains unresolved for 14 days, it will be
            automatically escalated for arbitration.
          </p>
          {/* <Button type={ButtonType.Secondary} name="btn" /> */}
          <Button type={ButtonType.Primary} name="Contact Support" />
        </div>
      </div>
    </>
  );
};
export default Dispute;
