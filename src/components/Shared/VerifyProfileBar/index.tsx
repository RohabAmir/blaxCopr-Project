import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import TargetIcon from "../../../../public/icons/Target.svg";
import VectorIcon from "../../../../public/icons/Vector.svg";
import ConfirmVerificationModal from "../Modals/ConfirmVerificationModal";


const Header: FC = () => {

  const [VerificationModal, setVerificationModal] = useState(false);

  const handleClick = () =>{
    setVerificationModal(true)
  }
  const closeModal = () => {
    setVerificationModal(false);
  };


  return (
    <>
        <div className={styles.header}>
          <div className={styles.flexRow}>
            <Image className={styles.img} src={TargetIcon} alt="target image" />

            <p className={styles.secondHeading}>Verify your profile</p>
          </div>

          <button className={styles.btn} onClick={handleClick} >
            Verify
            <Image
              className={styles.iconVector}
              src={VectorIcon}
              alt="vector icon"
            />
          </button>
        {/* <div id="onfido-mount"></div> */}
        </div>
        {VerificationModal && (
        <div className={styles.modalBackdrop}>
          <ConfirmVerificationModal closeModal={closeModal} />
        </div>
      )}
    </>

    
  );
};
export default Header;
