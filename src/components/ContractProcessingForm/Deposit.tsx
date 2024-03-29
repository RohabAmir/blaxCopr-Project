import { FC } from "react";
import styles from "./style.module.scss";
import WarningIcon from "../../../public/icons/Dash.svg";
import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { Grid } from "antd";
import { useAppContext } from "@/contexts/App";
import { useFetchContractDetailsQuery } from "@/Store/services/contractApi";
import { getLocalData } from "@/utils";

interface DepositProps {
  onNext: () => void;
}
const Deposit: FC<DepositProps> = ({ onNext }) => {
  const contractId = getLocalData("contract_id");
  const { data: contractDetails } = useFetchContractDetailsQuery(contractId);
  console.log(
    "contract----------------",
    contractDetails?.contractPayments?.totlaAmountToDeposit
  );
  const { isMobile } = useAppContext();
  const handleDeposit = () => {
    console.log("handle deposit---");
  };
  const { useBreakpoint } = Grid;

  const screens: any = useBreakpoint();
  return (
    <>
      <div className={styles.depositContianer}>
        <div className={styles.depositMain}>
          <div className={styles.flexDeposit}>
            <Image
              className={styles.warningIcon}
              src={WarningIcon}
              alt="warning icon"
            />
            <div className={styles.flexTextDeposit}>
              <p className={styles.headingDeposit}>Deposit funds in escrow</p>
              <p className={styles.subHeadingDeposit}>
                {contractDetails.currency === "USD"
                  ? `$${contractDetails.contractPayments.totlaAmountToDeposit}`
                  : `€${contractDetails.contractPayments.totlaAmountToDeposit}`}{" "}
              </p>
            </div>
          </div>
          <Button
            name="Deposit Now"
            onClickHandler={onNext}
            type={ButtonType.Primary}
            fullWidth={!screens["sm"]}
          />
        </div>
      </div>
    </>
  );
};
export default Deposit;
