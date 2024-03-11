import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Flex, Typography } from "antd";
import Link from "next/link";
import CrossIcon from "../../../../public/icons/cross_outlined.svg";
import BellIcon from "../../../../public/icons/Bell.svg";
import DownIcon from "../../../../public/icons/Down.svg";
import UpIcon from "../../../../public/icons/Up.svg";
import Blaxcorp from "../../../../public/logos/Blaxcorp_logo.svg";
import styles from "./style.module.scss";
import ModalDetails from "./Modals/ModalDetails";
import MenuIcon from "../../../../public/icons/Menu.svg";
import ModalNotifications from "./Modals/ModalNotifications";
import Avatar from "../Avatar";
import { useAppContext } from "@/contexts/App";
import { useGetUserDetailsQuery } from "@/Store/services/authApi";

const AppBar: FC = () => {
  const { isMobile } = useAppContext();
  const { Title } = Typography;
  const [openToggle, setOpenToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const { data: userDetails } = useGetUserDetailsQuery();

  const handleDetail = () => {
    setIsModalOpen(!isModalOpen);
    setIsNotifModalOpen(false);
  };

  const handleNotifModal = () => {
    setIsNotifModalOpen(!isNotifModalOpen);
    setIsModalOpen(false);
  };

  const handleMobileMenuToggle = () => {
    return setOpenToggle((prev) => !prev);
  };

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("user_id", userDetails.id);
    }
  }, [userDetails]);

  return (
    <>
      <div
        className={
          !openToggle ? styles.mainContainer : styles.mainContainerResponsive
        }
      >
        <div className={styles.subContainer}>
          <div className={styles.iconsContainer}>
            <Link href="/">
              <Image
                className={styles.iconHeading}
                src={Blaxcorp}
                alt="mask icon"
              />
            </Link>
          </div>
          <div>
            {isMobile ? (
              <button
                className={styles.mobileMenuIcon}
                onClick={() => handleMobileMenuToggle()}
              >
                <Image
                  src={openToggle ? CrossIcon : MenuIcon}
                  alt="menu icon"
                />
              </button>
            ) : (
              <div className={styles.routesContainer}>
                <>
                  <button className={`${styles.button}`}>About</button>
                  <button className={styles.button}>Help</button>
                  <button className={styles.button}>Refer a friend</button>
                  <button className={styles.icons} onClick={handleNotifModal}>
                    <Image
                      className={styles.icon}
                      src={BellIcon}
                      alt="bell icon"
                    />
                  </button>
                  {isNotifModalOpen && (
                    <ModalNotifications onClose={handleNotifModal} />
                  )}
                  <button
                    onClick={handleDetail}
                    className={
                      isModalOpen
                        ? styles.flexContentActive
                        : styles.flexContent
                    }
                  >
                    <div className={styles.text}>
                      {userDetails
                        ? userDetails.email
                            .split("@")[0]
                            .slice(0, 1)
                            .toUpperCase()
                        : ""}
                    </div>
                    <div className={styles.button}>
                      {userDetails ? userDetails.email.split("@")[0] : ""}
                    </div>

                    {!isModalOpen ? (
                      <Image src={DownIcon} alt="downicon" />
                    ) : (
                      <Image src={UpIcon} alt="up icon" />
                    )}
                  </button>
                  {isModalOpen && <ModalDetails onClose={handleDetail} />}
                </>
              </div>
            )}
          </div>
        </div>
        {openToggle ? (
          <>
            <Flex vertical align="center" gap={20} className="w-full">
              <Avatar name="Oleksii S" />
              <Title level={3}>{"Oleksii S"}</Title>
            </Flex>
            <ModalDetails onClose={() => setOpenToggle(false)} />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AppBar;
