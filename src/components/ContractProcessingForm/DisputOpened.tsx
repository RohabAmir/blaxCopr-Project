import { FC } from "react";
import styles from "./style.module.scss";
import ClockIcon from "../../../public/icons/Clock.svg";
import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { Grid } from "antd";
import { useAppContext } from "@/contexts/App";
import { useRouter } from "next/navigation";


const DisputOpened: FC = () => {
  const router = useRouter();
  const { isMobile } = useAppContext();
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();

  const openDispute = () =>{
    router.push('/dispute');
  }
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
              <p className={styles.headingDeposit} >Disput opened</p>
              {/* <p className={styles.subHeadingDeposit}>Amount: $10.030.00</p> */}
            </div>
          </div>
          <Button
            name="Go to messages"
            fullWidth={!screens["sm"]}
            type={ButtonType.Primary}
            onClickHandler={openDispute}
          />
        </div>
      </div>
    </>
  );
};
export default DisputOpened;
