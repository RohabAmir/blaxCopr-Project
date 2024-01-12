import { FC } from "react";
import styles from "./style.module.scss";
import ClockIcon from "../../../public/icons/Clock.svg";
import OkIcon from ".././../../public/icons/Ok.svg";
import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { Grid } from "antd";

const SuccessfulDeposit: FC = () => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  return (
    <>
      <div className={styles.agreementMain}>
        <div className={styles.successfulDepositMain}>
          <div className={styles.flexDeposit}>
            <div className={styles.iconBack}>
              <Image
                className={styles.okClass}
                src={OkIcon}
                alt="warning icon"
              />
            </div>
            <div className={styles.flexTextDepositSuccess}>
              <p className={styles.headingDeposit}>
                Funds succesfully deposited in escrow
              </p>
              <p className={styles.subHeadingDeposit}>Amount: $10.030.00</p>
            </div>
          </div>
        </div>

        {/* ---------------- */}

        <div className={styles.depositMainSucess}>
          <div className={styles.flexDeposit}>
            <Image
              className={styles.warningIcon}
              src={ClockIcon}
              alt="warning icon"
            />
            <div className={styles.flexTextDeposit}>
              <p className={styles.headingDeposit}>Waiting for the seller</p>
              <p className={styles.subHeadingDeposit}>
                Please mark as ‘Received’ when you get the item
              </p>
            </div>
          </div>
          <Button
            name="Mark as Received"
            type={ButtonType.Primary}
            fullWidth={!screens["sm"]}
          />
        </div>
      </div>
    </>
  );
};
export default SuccessfulDeposit;
