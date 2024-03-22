import { FC } from "react";
// import styles from "./styles.module.scss";
import ClockIcon from "../../../public/icons/Clock.svg";
import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType } from "@/types";
import { Grid } from "antd";
import { useAppContext } from "@/contexts/App";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss";

const DisputOpenedSeller: FC = () => {
  const { isMobile } = useAppContext();
  const router = useRouter();
  const handleDisputeOpened = () => {
    console.log("click");
    router.push("/dispute");
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
            fullWidth={isMobile}
            type={ButtonType.Primary}
            onClickHandler={handleDisputeOpened}
          />
        </div>
      </div>
    </>
  );
};
export default DisputOpenedSeller;
