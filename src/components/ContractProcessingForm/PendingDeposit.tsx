import { FC } from "react";
import styles from "./style.module.scss";
import ClockIcon from "../../../public/icons/Clock.svg";
import Image from "next/image";

const PendingDeposit: FC = () => {
  return (
    <>
      <div className={styles.depositMain}>
        <div className={styles.flexDeposit}>
          <Image
            className={styles.warningIcon}
            src={ClockIcon}
            alt="warning icon"
          />
          <div className={styles.flexTextDeposit}>
            <p className={styles.headingDeposit}>Pending escrow deposit:</p>
            <p className={styles.subHeadingDeposit}>Amount: $10.030.00</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default PendingDeposit;
