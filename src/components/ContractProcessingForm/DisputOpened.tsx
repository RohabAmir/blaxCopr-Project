import { FC } from "react";
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

const DisputOpened: FC = () => {
  const { isMobile } = useAppContext();
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  const router = useRouter();
  const handleDisputeOpened = () => {
    router.push("/dispute");
  };
  const contractId = getLocalData("contract_id");

  const [transitionContract, { isLoading, isError, error }] =
    useTransitionMutation();

  //
  const handleApprove = async () => {
    const payload = {
      contract: {
        status: "APPROVE",
      },
    };

    try {
      console.log("mark as approve");

      await transitionContract({ id: contractId, ...payload });
      router.push("/dashboard");
    } catch (error) {
      console.log("error", error);
    }
  };
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
              {/* <p className={styles.subHeadingDeposit}>Amount: $10.030.00</p> */}
            </div>
          </div>

          <Button
            name="Go to messages"
            fullWidth={!screens["sm"]}
            type={ButtonType.Primary}
            onClickHandler={handleDisputeOpened}
          />
        </div>
      </div>
    </>
  );
};
export default DisputOpened;
