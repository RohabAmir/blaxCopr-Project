import { FC } from "react";
import styles from "./style.module.scss";
import ClockIcon from "../../../public/icons/Clock.svg";
import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";

const DisputOpened: FC = () => {
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
            <p className={styles.headingDeposit}>Disput opened</p>
            {/* <p className={styles.subHeadingDeposit}>Amount: $10.030.00</p> */}
          </div>
        </div>
        <Button name="Go to messages" type={ButtonType.Primary} />
      </div>
    </>
  );
};
export default DisputOpened;
