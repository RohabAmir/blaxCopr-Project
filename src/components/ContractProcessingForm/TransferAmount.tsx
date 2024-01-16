import { FC } from "react";
import styles from "./style.module.scss";
import BankIcon from "../../../public/icons/Bank.svg";
import CreditCardIcon from "../../../public/icons/CreditCard.svg";

import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { Grid } from "antd";
import { useAppContext } from "@/contexts/App";

const TransferAmount: FC = () => {
  const { isMobile } = useAppContext();

  return (
    <>
      <div className={styles.transferMain}>
        <div className={styles.transfer}>
          {!isMobile && (
            <Button
              name="Back"
              leftIcon={IconType.BackArrow}
              type={ButtonType.Secondary}
            />
          )}
          <p className={styles.transferHeading}>Choose how you want to pay</p>
        </div>

        <div className={styles.transferBox}>
          <div className={styles.flexDeposit}>
            <div className={styles.transferColor}>
              <Image
                className={styles.bankIcon}
                src={BankIcon}
                alt="warning icon"
              />
            </div>
            <div className={styles.flexTextTransfer}>
              <p className={styles.headingTransfer}>Send a manual transfer</p>
              <p className={styles.subHeadingTransfer}>
                Send a wire transfer from your bank
              </p>
            </div>
          </div>
        </div>
        <div className={styles.transferBoxLight}>
          <div className={styles.flexDeposit}>
            <div className={styles.transferColor}>
              <Image
                className={styles.bankIcon}
                src={CreditCardIcon}
                alt="warning icon"
              />
            </div>
            <div className={styles.flexTextTransfer}>
              <p className={styles.headingTransfer}>Send a manual transfer</p>
              <p className={styles.subHeadingTransfer}>
                Send a wire transfer from your bank
              </p>
            </div>
          </div>
        </div>
        <div className={styles.transferFlexBtn}>
          {isMobile && (
            <Button
              name="Back"
              leftIcon={IconType.BackArrow}
              type={ButtonType.Secondary}
              size={!isMobile ? "large" : "middle"}
            />
          )}
          <div className={styles.transferBtn}>
            <Button
              name="Continue"
              type={ButtonType.Primary}
              size={!isMobile ? "large" : "middle"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default TransferAmount;
