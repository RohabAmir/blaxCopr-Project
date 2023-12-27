"use client";
import { FC } from "react";
import Image from "next/image";
import styles from "../style.module.scss";
import PlusIcon from "../../../../public/icons/Plus.svg";
import DashIcon from "../../../../public/icons/Dash.svg";
import TagIcon from "../../../../public/icons/Tag.svg";
import LockIcon from "../../../../public/icons/Lock.svg";

interface CardDetails {
  status: string;
  type: string;
  price: string;
  company: string;
  date: string;
}

interface ICard {
  data: CardDetails
}
const Card: FC<ICard> = ({ data }) => {
  const { status, type, price, company, date } = data
  return (
    <>
      <div className={styles.cardContainerMain}>
        <div className={styles.flexContainerRow}>
          <div className={styles.flexRow}>
            <Image src={DashIcon} alt="dash icon" />
            <p className={styles.thirdHeading}>{status}</p>
          </div>
          <div className={styles.flexRow}>
            <Image src={TagIcon} alt="dash icon" />
          </div>
        </div>
        <h1 className={styles.heading}>${price}</h1>
        <div className={styles.flexContainerRow}>
          <div className={styles.flexRow}>
            <p className={styles.secondHeading}>{company}</p>
          </div>
          <p className={styles.thirdHeading}>{date}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
