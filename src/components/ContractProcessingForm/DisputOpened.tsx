import { FC, useState } from "react";
import styles from "./style.module.scss";
import ClockIcon from "../../../public/icons/Clock.svg";
import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { Grid } from "antd";
import { useAppContext } from "@/contexts/App";
import { useRouter } from "next/navigation";
import { getLocalData } from "@/utils";
import { useTransitionMutation } from "@/Store/services/contractApi";
import ConfirmApproval from "../Shared/Modals/ConfirmApproval";

const DisputOpened: FC = () => {
  const contractId = getLocalData("contract_id");
  const [transitionContract, { isLoading, isError, error }] =
    useTransitionMutation();
  const { isMobile } = useAppContext();
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  const router = useRouter();
  const handleDisputeOpened = () => {
    router.push("/dispute");
  };
  const [showApproveModal, setApproveModal] = useState(false);

  const handleApprove = () => {
    setApproveModal(true);
  };
  const closeApprove = () => {
    setApproveModal(false);
  };

  //
  // const handleApprove = async () => {
  //   const payload = {
  //     contract: {
  //       status: "APPROVE",
  //     },
  //   };

  //   try {
  //     console.log("mark as approve");

  //     await transitionContract({ id: contractId, ...payload });
  //     router.push("/");
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  return (
    <>
      <div className={styles.agreementMain}>
        <div className={styles.depositMainOpened}>
          <div className={styles.flexDeposit}>
            <Image
              className={styles.warningIcon}
              src={ClockIcon}
              alt="warning icon"
            />
            <div className={styles.flexTextDeposit}>
              <p className={styles.headingDeposit}>Disput opened</p>
            </div>
          </div>
          <Button
            name="Go to messages"
            fullWidth={!screens["sm"]}
            type={ButtonType.Primary}
            onClickHandler={handleDisputeOpened}
          />
          <Button
            name="Approve"
            fullWidth={!screens["sm"]}
            type={ButtonType.Secondary}
            onClickHandler={handleApprove}
          />
        </div>
      </div>
      {showApproveModal && (
        <div className={styles.modalBackdrop}>
          <ConfirmApproval onClose={closeApprove} />
        </div>
      )}
    </>
  );
};
export default DisputOpened;