"use client";
import { FC } from "react";
import styles from "./style.module.scss";
import WarningIcon from ".././../../../public/icons/Dash.svg";
import CheckIcon from "../../../../public/icons/Check.svg";
import { Button } from "..";
import { ButtonType } from "@/types";
import Image from "next/image";
import { getLocalData } from "@/utils";
import { useRouter } from "next/navigation";
import { useTransitionMutation } from "@/Store/services/contractApi";
interface ModalProps {
  onClose: () => void;
}
const ConfirmDisputeOpening: FC<ModalProps> = ({ onClose }) => {
  const contractId = getLocalData("contract_id");
  const router = useRouter();

  const [transitionContract, { isLoading, isError, error }] =
  useTransitionMutation();

  //
  const OpenDispute = async () => {
    const payload = {
      contract: {
        status: "DISPUTE",
      },
    };

    try {
      console.log("report issue");

      await transitionContract({ id: contractId, ...payload });
      router.push("/dispute");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div className={styles.modalMain}>
        <div className={styles.modal}>
          <p className={styles.heading}>Confirm dispute opening</p>
          <Image
            className={styles.iconWarning}
            src={WarningIcon}
            alt="warning"
          />
          <p className={styles.description}>
            Do you wish to proceed with opening a dispute for this contract? By
            confirming, you'll start the process to address your issues with the
            seller.
          </p>

          <button className={styles.btnOpen} onClick={OpenDispute}>
            Open Dispute
          </button>
          <button className={styles.cross} onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    </>
  );
};
export default ConfirmDisputeOpening;
