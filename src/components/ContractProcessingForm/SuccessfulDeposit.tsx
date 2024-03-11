import { FC, useCallback, useState } from "react";
import styles from "./style.module.scss";
import ClockIcon from "../../../public/icons/Clock.svg";
import OkIcon from ".././../../public/icons/Ok.svg";
import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { Grid } from "antd";
import { getLocalData } from "@/utils";
import {
  useFetchContractDetailsQuery,
  useTransitionMutation,
} from "@/Store/services/contractApi";
import { useRouter } from "next/navigation";

interface depositSuccessProps {
  onNext: () => void;
}
const SuccessfulDeposit: FC<depositSuccessProps> = ({ onNext }) => {
  const router = useRouter();
  const contractId = getLocalData("contract_id");
  const { data: contractDetails, refetch: refetchContractDetails } =
    useFetchContractDetailsQuery(contractId);
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  console.log("contractDetails-----=-=-==-", contractDetails);
  const [transitionContract, { isLoading, isError, error }] =
    useTransitionMutation();
  const isMarkAsReceivedDisabled =
    !(
      contractDetails?.status === "DELIVERED" &&
      contractDetails?.contractPayments?.paymentStatus === "DEPOSITED"
    ) || isButtonLoading;
  //
  const markAsReceived = async () => {
    setIsButtonLoading(true);
    const payload = {
      contract: {
        status: "RECEIVED",
      },
    };

    try {
      const response = await transitionContract({ id: contractId, ...payload });
      console.log("Transition Contract response:", response);
      await refetchContractDetails();
      onNext();
      router.push("/");
    } catch (error) {
      console.log("Error in Transition Contract:", error);
      setIsButtonLoading(false);
    } finally {
      setIsButtonLoading(false);
    }
  };
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
              <p className={styles.subHeadingDeposit}>
                {contractDetails?.currency === "USD"
                  ? `$${contractDetails?.contractPayments?.totlaAmountToDeposit}`
                  : `€${contractDetails?.contractPayments?.totlaAmountToDeposit}`}{" "}
              </p>
            </div>
          </div>
        </div>

        {/* ---------------------------------- */}
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
                Funds succesfully deposited in escrow from seller
              </p>
              <p className={styles.subHeadingDeposit}>
                {contractDetails?.currency === "USD"
                  ? `$${contractDetails?.contractPayments?.totlaAmountToDeposit}`
                  : `€${contractDetails?.contractPayments?.totlaAmountToDeposit}`}
              </p>
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
            onClickHandler={markAsReceived}
            customDisabled={isMarkAsReceivedDisabled}
            isLoading={isLoading}
          />
        </div>
        {/* ----------- */}
        <div className={styles.successfulDepositMain}>
          <div className={styles.flexDeposit}>
            <div className={styles.iconBack}>
              <Image
                className={styles.warningIcon}
                src={ClockIcon}
                alt="warning icon"
              />
            </div>
            <div className={styles.flexTextDepositSuccess}>
              <p className={styles.headingDeposit}>
                Escrow fee deposit pending from seller
              </p>
              <p>
                {contractDetails?.currency === "USD"
                  ? `$${contractDetails?.contractPayments?.totlaAmountToDeposit}`
                  : `€${contractDetails?.contractPayments?.totlaAmountToDeposit}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SuccessfulDeposit;
