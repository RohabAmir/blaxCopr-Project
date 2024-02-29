import { FC } from "react";
import styles from "./style.module.scss";
import ClockIcon from "../../../public/icons/Clock.svg";
import Image from "next/image";
import { useFetchContractDetailsQuery } from "@/Store/services/contractApi";
import { getLocalData } from "@/utils";

const PendingDeposit: FC = () => {
  const contractId = getLocalData("contract_id");
  const { data: contractDetails } = useFetchContractDetailsQuery(contractId);
  console.log(
    "contract----------------",
    contractDetails?.contractPayments?.totlaAmountToDeposit
  );
  return (
    <>
      <div className={styles.agreementMain} style={{ marginTop: "24px" }}>
        <div className={styles.depositMainPend}>
          <div className={styles.flexDeposit}>
            <Image
              className={styles.warningIcon}
              src={ClockIcon}
              alt="warning icon"
            />
            <div className={styles.flexTextDeposit}>
              <p className={styles.headingDeposit}>Pending escrow deposit:</p>
              <p className={styles.subHeadingDeposit}>
                {" "}
                {contractDetails.currency === "USD"
                  ? `$${contractDetails.contractPayments.totlaAmountToDeposit}`
                  : `€${contractDetails.contractPayments.totlaAmountToDeposit}`}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PendingDeposit;
