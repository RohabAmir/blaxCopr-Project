import { FC } from "react";
import styles from "./styles.module.scss";
import ClockIcon from "../../../../public/icons/Clock.svg";
import CheckIcon from "../../../../public/icons/Check.svg";
import WithDrawlIcon from "../../../../public/icons/WithDrawl.svg";

import Image from "next/image";
import { Button } from "../../Shared";
import { ButtonType } from "@/types";
import { useAppContext } from "@/contexts/App";

const SetupWithDrawl: FC = () => {
  const {isMobile}=useAppContext()
  return (
    <div className={styles.sellerMain} style={{ marginTop: "12px" }}>
      <div className={styles.depositMain}>
        <div className={styles.deposit}>
          <div className={styles.flexDeposit}>
            <Image className={styles.icon} src={ClockIcon} alt="warning icon" />
            <div className={styles.flexTextDeposit}>
              <p className={styles.headingDeposit}>
                Waiting for the Buyer to deposit funds in escrow
              </p>
              <p className={styles.subHeadingDeposit}>Amount: $10.030.00</p>
            </div>
          </div>
        </div>
        <span className={styles.flexInlineText}>
          <Image className={styles.iconCheck} src={CheckIcon} alt="checkicon" />
          <span className={styles.inlineSubText}>
            No action needed from seller
          </span>
        </span>
      </div>

      {/* ----------------------- */}
      <div className={styles.depositMain}>
        <div className={styles.withDrawlFlex}>
          <div className={styles.flexDeposit}>
            <Image
              className={styles.warningIcon}
              src={WithDrawlIcon}
              alt="warning icon"
            />

            <div className={styles.flexTextDeposit}>
              <p className={styles.headingDeposit}>Setup withdrawal method</p>
              <p className={styles.subHeadingDepositLight}>
                Setup account for withdrawal upon contract completion
              </p>
            </div>
          </div>
          <div className={styles.btnSetup}>
            <Button
              name="Setup"
              type={ButtonType.Primary}
              fullWidth={!isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SetupWithDrawl;
