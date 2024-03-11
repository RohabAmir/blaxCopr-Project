import { FC, useState } from "react";
import styles from "./style.module.scss";
import ClockIcon from "../../../public/icons/Clock.svg";
import OkIcon from "../../../public/icons/Ok.svg";

import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { Grid } from "antd";
import { useAppContext } from "@/contexts/App";
import {
  useFetchContractDetailsQuery,
  useTransitionContractMutation,
} from "@/Store/services/contractApi";
import { getLocalData } from "@/utils";
import Dispute from "@/app/dispute/page";
import { useRouter } from "next/navigation";
import ConfirmDisputeOpening from "../Shared/Modals/ConfirmDisputeOpening";
import ConfirmApproval from "../Shared/Modals/ConfirmApproval";

interface InspectionProps {
  onNext: () => void;
}

const Inspection: FC<InspectionProps> = ({ onNext }) => {
  const { isMobile } = useAppContext();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showApproveModal, setApproveModal] = useState(false);

  const reportIssue = () => {
    setShowConfirmModal(true);
  };

  const closeModal = () => {
    setShowConfirmModal(false);
  };
  const handleApprove = () => {
    setApproveModal(true);
  };
  const closeApprove = () => {
    setApproveModal(false);
  };

  return (
    <>
      {/* ---------------- */}
      <div className={styles.agreementMain}>
        <div className={styles.inspectionMain}>
          <div className={styles.depositMainInspect}>
            <div className={styles.flexDeposit}>
              <Image
                className={styles.warningIcon}
                src={ClockIcon}
                alt="warning icon"
              />
              <div className={styles.flexTextDeposit}>
                <p className={styles.headingDeposit}>
                  5 days inspection period
                </p>
                <p className={styles.subHeadingDeposit}>
                  If everything meets your expectations, please confirm
                  satisfaction. If there are issues, please report them.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.flexButtons}>
            <button className={styles.btnReport} onClick={reportIssue}>
              <span className={styles.btnReportText}>Report an issue</span>
            </button>
            <button className={styles.btnSent} onClick={handleApprove}>
              <Image className={styles.iconOk} src={OkIcon} alt="ok icon" />
              <span className={styles.inlineSubText}>Approve</span>
            </button>
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <div className={styles.modalBackdrop}>
          <ConfirmDisputeOpening onClose={closeModal} />
        </div>
      )}{" "}
      {showApproveModal && (
        <div className={styles.modalBackdrop}>
          <ConfirmApproval onClose={closeApprove} />
        </div>
      )}
    </>
  );
};
export default Inspection;
