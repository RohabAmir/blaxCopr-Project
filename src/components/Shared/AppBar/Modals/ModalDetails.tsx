import { FC, useState } from "react";
import QuestionIcon from "../../../../../public/icons/Question.svg";
import SignOutIcon from "../../../../../public/icons/SignOut.svg";
import SettingIcon from "../../../../../public/icons/Setting.svg";
import Image from "next/image";
import styles from "./styles.module.scss";
import { ROUTES } from "@/constants";
import Link from "next/link";

const ModalDetails: FC = () => {
  return (
    <>
      <div className={styles.flexDetails}>
        <div className={styles.flexContent}>
          <Image className={styles.icon} src={SettingIcon} alt="setting icon" />
          <Link href={ROUTES.ACCOUNT_DETAILS_FORM}>
            <p>Account Details</p>
          </Link>
        </div>
        <div className={styles.flexContent}>
          <Image
            className={styles.icon}
            src={QuestionIcon}
            alt="question icon"
          />
          <p> Help Center</p>
        </div>
        <div className={styles.flexContent}>
          <Image
            className={styles.icon}
            src={SignOutIcon}
            alt="sign out icon"
          />
          <p>Log Out </p>
        </div>
      </div>
    </>
  );
};
export default ModalDetails;
