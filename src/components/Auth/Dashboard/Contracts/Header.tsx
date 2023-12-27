import { FC } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import TargetIcon from "../../../../../public/icons/Target.svg";
import VectorIcon from "../../../../../public/icons/Vector.svg";

const Header: FC = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.flexRow}>
          <Image src={TargetIcon} alt="target image" />

          <p className={styles.secondHeading}>Verify your profile</p>
        </div>

        <button className={styles.btn}>
          verify
          <Image
            className={styles.iconVector}
            src={VectorIcon}
            alt="vector icon"
          />
        </button>
      </div>
    </>
  );
};
export default Header;
