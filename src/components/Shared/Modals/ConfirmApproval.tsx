"use client";
import { FC } from "react";
import styles from "./style.module.scss";
import WarningIcon from ".././../../../public/icons/Dash.svg";
import CheckIcon from "../../../../public/icons/Check.svg";
import { Button } from "..";
import { ButtonType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getLocalData } from "@/utils";
import { useTransitionMutation } from "@/Store/services/contractApi";
interface ModalProps {
  onClose: () => void;
}
const ConfirmApproval: FC<ModalProps> = ({ onClose }) => {
  const router = useRouter();
  const contractId = getLocalData("contract_id");

  const [transitionContract, { isLoading, isError, error }] =
    useTransitionMutation();

  //
  const handleDashboard = async () => {
    const payload = {
      contract: {
        status: "APPROVE",
      },
    };

    try {
      console.log("mark as approve");

      await transitionContract({ id: contractId, ...payload });
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className={styles.modalMain}>
        <div className={styles.modal}>
          <p className={styles.heading}>Confirm approval</p>
          <Image className={styles.iconWarning} src={CheckIcon} alt="warning" />
          <p className={styles.description}>
            By confirming, you’re closing the contract, and funds will be
            released to the Seller. Are you sure you want to proceed?
          </p>

          <button className={styles.btnOpen} onClick={handleDashboard}>
            Confirm
          </button>
          <button className={styles.cross} onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    </>
  );
};
export default ConfirmApproval;
