"use client";
import { FC, useState } from "react";
import Image from "next/image";
import styles from "../style.module.scss";
import PlusIcon from "../../../../public/icons/Plus.svg";
import DashIcon from "../../../../public/icons/Dash.svg";
import TagIcon from "../../../../public/icons/Tag.svg";
import LockIcon from "../../../../public/icons/Lock.svg";
import CheckIcon from "../../../../public/icons/Check.svg";
import SecondaryButton from "../../../../public/icons/Secondary Button.svg";

interface CardDetails {
  status: string;
  type?: string;
  price: string;
  company: string;
  date: string;
}

interface ICard {
  data: CardDetails;
}
const Card: FC<ICard> = ({ data }) => {
  const [activeType, setActiveType] = useState(false);
  function handleActiveType() {
    setActiveType((active) => !active);
  }
  const { status, type, price, company, date } = data;
  const closedstyles =
    status == "Closed"
      ? {
          color: "#747a67",
        }
      : {};

  return (
    <>
      <div
        className={
          status === "Closed" ? styles.closed : styles.cardContainerMain
        }
      >
        <div className={styles.flexContainerRow}>
          <div className={styles.flexRow}>
            {status === "Action required" && (
              <Image src={DashIcon} alt="dash icon" />
            )}
            {status === "Closed" && (
              <Image
                className={styles.icon}
                src={CheckIcon}
                alt="check icon"
                style={closedstyles}
              />
            )}
            {status === "Open" && <Image src={LockIcon} alt="lock icon" />}
            <p className={styles.thirdHeading} style={closedstyles}>
              {status}
            </p>
          </div>
          <div className={styles.flexRow}>
            <Image
              onClick={handleActiveType}
              className={styles.btnIcon}
              style={closedstyles}
              src={activeType ? SecondaryButton : TagIcon}
              alt="dash icon"
            />
          </div>
        </div>
        <h1 className={styles.heading} style={closedstyles}>
          ${price}
        </h1>
        <div className={styles.flexContainerRow}>
          <div className={styles.flexRow}>
            <p className={styles.secondHeading} style={closedstyles}>
              {company}
            </p>
          </div>
          <p className={styles.thirdHeading} style={closedstyles}>
            {date}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
