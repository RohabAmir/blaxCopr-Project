import { FC } from "react";
import styles from "./style.module.scss";
import ClockIcon from "../../../public/icons/Clock.svg";
import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";

const Inspection: FC = () => {
  return (
    <>
      {/* ---------------- */}

      <div className={styles.inspectionMain}>
        <div className={styles.depositMainInspect}>
          <div className={styles.flexDeposit}>
            <Image
              className={styles.warningIcon}
              src={ClockIcon}
              alt="warning icon"
            />
            <div className={styles.flexTextDeposit}>
              <p className={styles.headingDeposit}>5 days inspection period</p>
              <p className={styles.subHeadingDeposit}>
                If everything meets your expectations, please confirm
                satisfaction. If there are issues, please report them.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.flexButtons}>
          <Button name="Report an Issue" type={ButtonType.Primary} />
          <Button name="Approve" type={ButtonType.Primary} />
        </div>
      </div>
    </>
  );
};
export default Inspection;
