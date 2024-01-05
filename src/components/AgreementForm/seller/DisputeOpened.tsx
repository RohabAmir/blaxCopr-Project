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

const DisputeOpened: FC = () => {
  return (
    <>
      {/* ----------------------- */}
      <div className={styles.methodMain}>
        <div className={styles.btnRight}>
          <div className={styles.flexDeposit}>
            <Image className={styles.icon} src={ClockIcon} alt="warning icon" />
            <div className={styles.flexTextDeposit}>
              <p className={styles.headingDeposit}>Dispute opened</p>
              <p className={styles.subHeadingDeposit}>
                Please mark as ‘Sent’ after dispatch
              </p>
            </div>
          </div>
          <Button name="Go to messages" type={ButtonType.Secondary} />
        </div>
      </div>

      {/* ------------------------------ */}
    </>
  );
};
export default DisputeOpened;
