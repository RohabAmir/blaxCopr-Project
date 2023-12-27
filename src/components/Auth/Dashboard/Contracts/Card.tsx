"use client";
import { FC } from "react";
import Image from "next/image";

import styles from "./style.module.css";
import PlusIcon from "../../../../../public/icons/Plus.svg";
import DashIcon from "../../../../../public/icons/Dash.svg";
import TagIcon from "../../../../../public/icons/Tag.svg";
import LockIcon from "../../../../../public/icons/Lock.svg";
const Card: FC = () => {
  return (
    <>
      {/* <div className={styles.cardContainerCol}>
        <div className={styles.flexContainer}>
          <button className={styles.button}>
            <Image src={PlusIcon} alt="plus icon" />
          </button>
          <h2 className={styles.titleScreen}>Create</h2>
        </div>
      </div> */}
      <div className={styles.cardContainerMain}>
        <div className={styles.flexContainerRow}>
          <div className={styles.flexRow}>
            <Image src={DashIcon} alt="dash icon" />
            <p className={styles.thirdHeading}>Action required</p>
          </div>
          <div className={styles.flexRow}>
            <Image src={TagIcon} alt="dash icon" />
          </div>
        </div>
        <h1 className={styles.heading}>$11,700</h1>
        <div className={styles.flexContainerRow}>
          <div className={styles.flexRow}>
            <p className={styles.secondHeading}>LLC property</p>
          </div>
          <p className={styles.thirdHeading}>created 1 Dec</p>
        </div>
      </div>
    </>
  );
};

export default Card;
