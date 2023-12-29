import { FC, useRef, useEffect } from "react";
import DashIcon from "../../../../../public/icons/Dash.svg";
import CheckIcon from "../../../../../public/icons/Check.svg";
import ClockIcon from "../../../../../public/icons/Clock.svg";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useDetectClickOutside } from "react-detect-click-outside";
interface ModalDetailsProps {
  onClose: () => void;
}

const ModalNotifications: FC<ModalDetailsProps> = ({ onClose }) => {
  const ref = useDetectClickOutside({ onTriggered: onClose });

  return (
    <>
      <div className={styles.container} ref={ref}>
        <div className={styles.mainContainerNotifictions}>
          <h3 className={styles.textHeading}>Notifications</h3>
          <h3 className={styles.textHeading}>Mark all as read</h3>
        </div>
        {/* ------------------------------------------- */}
        <div className={styles.mainContainerNotifictions}>
          <div className={styles.notifications}>
            <Image className={styles.img} src={DashIcon} alt="warning" />
            <div className={styles.flexText}>
              <h3 className={styles.textTitle}>Title</h3>
              <p className={styles.text}>text</p>
            </div>
          </div>
          <div className={styles.markAsRead}>
            <p className={styles.text}>16 dec</p>
          </div>
        </div>
        {/* -------------------------------------------- */}
        <div className={styles.mainContainerNotifictions}>
          <div className={styles.notifications}>
            <Image className={styles.img} src={ClockIcon} alt="clock" />
            <div className={styles.flexText}>
              <h3 className={styles.textTitle}>Title</h3>
              <p className={styles.text}>text</p>
            </div>
          </div>
          <div className={styles.markAsRead}>
            <p className={styles.text}>16 Nov</p>
          </div>
        </div>
        {/* -------------------------------------------- */}
        <div className={styles.mainContainerNotifictions}>
          <div className={styles.notifications}>
            <Image className={styles.img} src={CheckIcon} alt="clock" />
            <div className={styles.flexText}>
              <h3 className={styles.textTitle}>Title</h3>
              <p className={styles.text}>text</p>
            </div>
          </div>
          <div className={styles.markAsRead}>
            <p className={styles.text}>12 Jan</p>
          </div>
        </div>
        {/* -------------------------------------------- */}
        <div className={styles.mainContainerNotifictions}>
          <div className={styles.notifications}>
            <Image className={styles.img} src={DashIcon} alt="clock" />
            <div className={styles.flexText}>
              <h3 className={styles.textTitle}>Title</h3>
              <p className={styles.text}>text</p>
            </div>
          </div>
          <div className={styles.markAsRead}>
            <p className={styles.text}>16 Nov</p>
          </div>
        </div>
        {/* -------------------------------------------- */}
        <div className={styles.mainContainerNotifictions}>
          <div className={styles.notifications}>
            <Image className={styles.img} src={CheckIcon} alt="clock" />
            <div className={styles.flexText}>
              <h3 className={styles.textTitle}>Title</h3>
              <p className={styles.text}>text</p>
            </div>
          </div>
          <div className={styles.markAsRead}>
            <p className={styles.text}>16 Nov</p>
          </div>
        </div>

        {/* -------------------------------------------- */}
      </div>
    </>
  );
};
export default ModalNotifications;
