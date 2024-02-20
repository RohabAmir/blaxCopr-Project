import { FC, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import TargetIcon from "../../../../public/icons/Target.svg";
import VectorIcon from "../../../../public/icons/Vector.svg";

const Header: FC = () => {
  // const [verify, setVerify] = useState(false);
  // useEffect(() => {
  //   if (window.innerWidth <= 550) {
  //     setVerify(true);
  //   }
  // }, []);
  return (
    <div className={styles.header}>
      <div className={styles.flexRow}>
        <Image className={styles.img} src={TargetIcon} alt="target image" />

        <p className={styles.secondHeading}>Verify your profile</p>
      </div>

      <button className={styles.btn}>
        Verify
        <Image
          className={styles.iconVector}
          src={VectorIcon}
          alt="vector icon"
        />
      </button>
    </div>
  );
};
export default Header;
