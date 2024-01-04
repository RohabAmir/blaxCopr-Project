import { FC } from "react";
import styles from "./styles.module.scss";
import ClockIcon from "../../../../public/icons/Clock.svg";
import CheckIcon from "../../../../public/icons/Check.svg";
import WithDrawlIcon from "../../../../public/icons/WithDrawl.svg";
import ChevronIcon from "../../../../public/icons/Chevron.svg";
import OklIcon from "../../../../public/icons/Ok.svg";

import Image from "next/image";
import { Button } from "../../Shared";
import { ButtonType, IconType } from "@/types";

const InspectedPeriod: FC = () => {
  return (
    <>
      {/* ----------------------- */}
      <div className={styles.methodMain}>
        <div className={styles.btnRight}>
          <div className={styles.flexInspected}>
            <Image className={styles.icon} src={ClockIcon} alt="warning icon" />
            <div className={styles.flexInspectedText}>
              <div className={styles.flexTextDeposit}>
                <p className={styles.headingDeposit}>
                  5 days inspection period
                </p>
                <p className={styles.subHeadingDeposit}>
                  Once the Buyer confirms satisfaction, funds are released.{" "}
                </p>
                <p className={styles.subHeadingDeposit}>
                  If no issues are reported within inspection period, funds are
                  released automatically.
                </p>
                <p className={styles.subHeadingDeposit}>
                  In case of reported issues, a dispute process initiates, or
                  the buyer may choose to return the item to seller.
                </p>
              </div>
            </div>
            <p className={styles.subHeadingInspected}>2 days left</p>
          </div>
        </div>
      </div>
      {/* --------------------------------------- */}

      {/* ------------------------------ */}
      <div className={styles.methodMainLast}>
        <div className={styles.btnRight}>
          <div className={styles.flexDeposit}>
            <Image src={WithDrawlIcon} alt="warning icon" />
            <div className={styles.flexTextDeposit}>
              <p className={styles.headingDeposit}>Withdrawal method</p>
              <p className={styles.subHeadingDeposit}>
                Account ending ****0211
              </p>
            </div>
          </div>

          <Button name="Review" type={ButtonType.Secondary} />
        </div>
      </div>
    </>
  );
};
export default InspectedPeriod;
