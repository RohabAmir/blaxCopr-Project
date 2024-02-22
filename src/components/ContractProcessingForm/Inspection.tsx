import { FC } from "react";
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
import Dispute from "@/app/(dashboard)/dispute/page";
import { useRouter } from "next/navigation";

interface InspectionProps {
  onNext: () => void;
}

const Inspection: FC<InspectionProps> = ({ onNext }) => {
  const { isMobile } = useAppContext();
  const contractId = getLocalData("contract_id");
  const router = useRouter();

  const [transitionContract, { isLoading, isError, error }] =
    useTransitionContractMutation();

  //
  const reportIssue = async () => {
    const payload = {
      contract: {
        status: "RECEIVED",
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
            <button className={styles.btnSent}>
              <Image className={styles.iconOk} src={OkIcon} alt="ok icon" />
              <span className={styles.inlineSubText}>Approve</span>
            </button>
            {/* <Button name="Report an Issue" type={ButtonType.Primary} />
          <Button name="Approve" type={ButtonType.Primary} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Inspection;
