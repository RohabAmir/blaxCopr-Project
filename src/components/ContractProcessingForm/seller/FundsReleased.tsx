import { FC } from "react";
import styles from "./styles.module.scss";
import ClockIcon from "../../../../public/icons/Clock.svg";
import CheckIcon from "../../../../public/icons/Check.svg";
import WithDrawlIcon from "../../../../public/icons/WithDrawl.svg";
import InfoIcon from "../../../../public/icons/Info.svg";
import OklIcon from "../../../../public/icons/Ok.svg";
import { Flex } from "antd";
import { FormSection } from "../../Shared";

import Image from "next/image";
import { Button } from "../../Shared";
import { ButtonType, IconType } from "@/types";

const FundsReleased: FC = () => {
  return (
    <>
      {/* ----------------------- */}
      <div className={styles.methodMain}>
        <div className={styles.btnRight}>
          <div className={styles.flexDeposit}>
            <span className={styles.iconOkGreen}>
              <Image
                className={styles.okIconGrn}
                src={OklIcon}
                alt="warning icon"
              />
            </span>
            <div className={styles.flexTextDeposit}>
              <p className={styles.headingDeposit}>
                Funds released to your primary account:{" "}
              </p>
              <p className={styles.subHeadingDeposit}>Amount: $10.030.00</p>
            </div>
          </div>
          <p>16 dec</p>
        </div>
      </div>
      <Flex vertical className="w-full">
        <FormSection>
          <span className={styles.flexInline}>
            <Image src={InfoIcon} alt="info icon" />
            <span className={styles.lastText}>
              Wire transfers usually arrive within 1 to 5 business days,
              depending on the bank
            </span>
          </span>
        </FormSection>
      </Flex>
      {/* ------------------------------ */}
    </>
  );
};
export default FundsReleased;
