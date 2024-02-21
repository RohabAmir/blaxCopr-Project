"use client";
import { FC } from "react";
import styles from "./style.module.scss";
// import WarningIcon from ".././../../../public/icons/Dash.svg";
// import CheckIcon from "../../../../public/icons/Check.svg";
// import ChevronIcon from "../../../../public/icons/TagChevron.svg";
import WarningIcon from "../../../public/icons/Dash.svg";
import ChevronIcon from "../../../public/icons/TagChevron.svg";
import { useDeleteContractMutation } from "@/Store/services/contractApi";
import { toast } from "react-toastify";
import { getLocalData } from "@/utils";
import { Button } from "../Shared";
import { ButtonType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface ModalProps {
  closeModal: () => void;
}
const ConfirmContractCancellation: FC<ModalProps> = ({ closeModal }) => {
  const router = useRouter();
  const contractId = getLocalData("contract_id");
  const [deleteContract] = useDeleteContractMutation();
  const handleDeleteContract = async (id: number) => {
    try {
      await deleteContract(contractId).unwrap();
      closeModal();
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting contract:", error);
    }
  };
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modalNew}>
          <p className={styles.heading}>
            Confirm contract <br /> cancellation
          </p>
          <Image
            className={styles.iconWarning}
            src={WarningIcon}
            alt="warning"
          />
          <p className={styles.description}>
            Are you sure you want to cancel the contract? <br /> By proceeding,
            you agree to incur the following <br /> cancellation fees:
          </p>
          <div className={styles.boxContent}>
            <div className={styles.iconTextFlex}>
              <Image src={ChevronIcon} alt="icon" />
              <p className={styles.subHeading}>Cancellation fees</p>
            </div>
            <p className={styles.descriptionNew}>
              1. Cancellation Fee: 1% of the escrowed amount
            </p>
            <p className={styles.descriptionNew}>2. Wire Transfer Fee: $25</p>
            <p className={styles.descriptionNew}>3. Administrative Fee: $20</p>
          </div>
          <button className={styles.btnOpen} onClick={handleDeleteContract}>
            Cancel Contract
          </button>
          <button className={styles.crossNew} onClick={closeModal}>
            &times;
          </button>
        </div>
      </div>
    </>
  );
};
export default ConfirmContractCancellation;
