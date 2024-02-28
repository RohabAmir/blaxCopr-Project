import { FC, useState } from "react";
import styles from "./styles.module.scss";
import ClockIcon from "../../../../public/icons/Clock.svg";
import WithDrawlIcon from "../../../../public/icons/WithDrawl.svg";
import OklIcon from "../../../../public/icons/Ok.svg";

import Image from "next/image";
import { Button } from "../../Shared";
import { ButtonType } from "@/types";
import { Grid } from "antd";
import { useAppContext } from "@/contexts/App";
import ConfirmDisputeOpening from "@/components/Shared/Modals/ConfirmDisputeOpening";


interface addWithDrawlMethodProps {
  onNext: () => void;
  contractDetails : any;
}

const InspectedPeriod: FC<addWithDrawlMethodProps> = ({onNext,contractDetails}) => {
  const { isMobile } = useAppContext();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const reportIssue = () => {
    setShowConfirmModal(true);
  };
  const closeModal = () => {
    setShowConfirmModal(false);
  };
  

  
  

  return (
    <>
      {/* ----------------------- */}
      {/* <div className={styles.agreementMain}> */}
      <div className={styles.sellerMain}>
        <div className={styles.methodMainAbs}>
          <div className={styles.btnRight}>
            <div className={styles.flexInspected}>
              <Image
                className={styles.icon}
                src={ClockIcon}
                alt="warning icon"
              />
              <div className={styles.flexInspectedText}>
                <div className={styles.flexTextDeposit}>
                  <p className={styles.headingDeposit}>
                    5 days inspection period
                  </p>
                  <p className={styles.subHeadingDeposit}>
                    Once the Buyer confirms satisfaction, funds are released.{" "}
                  </p>
                  <p className={styles.subHeadingDeposit}>
                    If no issues are reported within inspection period, funds
                    are released automatically.
                  </p>
                  <p className={styles.subHeadingDeposit}>
                    In case of reported issues, a dispute process initiates, or
                    the buyer may choose to return the item to seller.
                  </p>
                </div>
              </div>
              <p className={styles.subHeadingInspectedAbsolute}>2 days left</p>
            </div>
          </div>
          <div className={styles.btnReportBg}>
            <button className={styles.btnReport} onClick={reportIssue}>
              <span className={styles.btnReportText}>Report an issue</span>
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
                <p className={styles.subHeadingDeposit}>Amount: {`$${contractDetails?.contractPayments?.escrowFee}`}</p>
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
              fullWidth={isMobile}
            />
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <div className={styles.modalBackdrop}>
          <ConfirmDisputeOpening onClose={closeModal} />
        </div>
      )}{" "}
      
    </>
  );
};
export default InspectedPeriod;
