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
import { Grid } from "antd";

const WithDrawlMethod: FC = () => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  return (
    <>
      {/* ----------------------- */}
      <div className={styles.sellerMain}>
        <div className={styles.methodMain}>
          <div className={styles.btnRight}>
            <div className={styles.flexDeposit}>
              <Image
                className={styles.icon}
                src={ChevronIcon}
                alt="warning icon"
              />
              <div className={styles.flexTextDeposit}>
                <p className={styles.headingDeposit}>
                  You can now send the item
                </p>
                <p className={styles.subHeadingDeposit}>
                  Please mark as ‘Sent’ after dispatch
                </p>
              </div>
            </div>

            <button className={styles.btnSent}>
              <Image className={styles.iconOk} src={OklIcon} alt="ok icon" />
              <span className={styles.inlineSubText}>Mark as Sent</span>
            </button>
          </div>
        </div>
        {/* --------------------------------------- */}
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
                  Funds succesfully deposited in escrow
                </p>
                <p className={styles.subHeadingDeposit}>Amount: $10.030.00</p>
              </div>
            </div>
          </div>
        </div>
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

            <Button
              name="Review"
              type={ButtonType.Secondary}
              fullWidth={!screens["sm"]}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default WithDrawlMethod;
