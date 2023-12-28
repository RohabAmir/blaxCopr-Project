import { FC } from "react";
import MaskIcon from "../../../../public/icons/Mask.svg";
import BellIcon from "../../../../public/icons/Bell.svg";
import BlaxCorpIcon from "../../../../public/icons/Blaxcorp.svg";
import DownIcon from "../../../../public/icons/Down.svg";
import UpIcon from "../../../../public/icons/Up.svg";
import Image from "next/image";
import { ROUTES } from "@/constants";
import styles from "./style.module.scss";
import ModalDetails from "./Modals/ModalDetails";

import { useState } from "react";
import ModalNotifications from "./Modals/ModalNotifications";
const AppBar: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen((modal) => !modal);
  }

  function notificationModalOpen() {
    setIsNotifModalOpen((modal) => !modal);
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.iconsContainer}>
          <Image className={styles.iconMask} src={MaskIcon} alt="mask icon" />
          <Image
            className={styles.iconBlaxCorp}
            src={BlaxCorpIcon}
            alt="BlaxCorp icon"
          />
        </div>
        <div className={styles.routesContainer}>
          <button className={styles.button}>About</button>
          <button className={styles.button}>Help</button>
          <button className={styles.button}>Refer a friend</button>
          <button className={styles.icons} onClick={notificationModalOpen}>
            <Image className={styles.icon} src={BellIcon} alt="bell icon" />
          </button>
          {isNotifModalOpen && <ModalNotifications />}
          <button
            onClick={openModal}
            className={
              isModalOpen ? styles.flexContentActive : styles.flexContent
            }
          >
            <div className={styles.text}>OS</div>
            <button className={styles.button}>Oleksii S.</button>
            {!isModalOpen ? (
              <Image src={DownIcon} alt="downicon" />
            ) : (
              <Image src={UpIcon} alt="up icon" />
            )}
          </button>
          {isModalOpen && <ModalDetails />}
        </div>
      </div>
    </>
  );
};
export default AppBar;
