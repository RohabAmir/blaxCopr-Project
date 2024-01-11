import { FC } from "react";
import styles from "./style.module.scss";
import WarningIcon from "../../../public/icons/Dash.svg";
import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { Grid } from "antd";

const Deposit: FC = () => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  return (
    <>
      <div className={styles.depositContianer}>
        <div className={styles.depositMain}>
          <div className={styles.flexDeposit}>
            <Image
              className={styles.warningIcon}
              src={WarningIcon}
              alt="warning icon"
            />
            <div className={styles.flexTextDeposit}>
              <p className={styles.headingDeposit}>Deposit funds in escrow</p>
              <p className={styles.subHeadingDeposit}>Amount: $10.030.00</p>
            </div>
          </div>
          <Button
            name="Deposit Now"
            type={ButtonType.Primary}
            fullWidth={!screens["sm"]}
          />
        </div>
      </div>
    </>
  );
};
export default Deposit;
