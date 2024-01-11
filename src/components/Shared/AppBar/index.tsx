// // "use client";
// import { FC } from "react";
// import MaskIcon from "../../../../public/icons/Mask.svg";
// import BellIcon from "../../../../public/icons/Bell.svg";
// import BlaxCorpIcon from "../../../../public/icons/Blaxcorp.svg";
// import DownIcon from "../../../../public/icons/Down.svg";
// import UpIcon from "../../../../public/icons/Up.svg";
// import Blaxcorp from "../../../../public/logos/Blaxcorp_logo.svg";
// import Image from "next/image";
// import { ROUTES } from "@/constants";
// import styles from "./style.module.scss";
// import ModalDetails from "./Modals/ModalDetails";
// import Link from "next/link";
// import MenuIcon from "../../../../public/icons/Menu.svg";

// import { useState, useEffect } from "react";
// import ModalNotifications from "./Modals/ModalNotifications";
// const AppBar: FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [iconOpen, setIconOpen] = useState(false);
//   const handleDetail = () => {
//     if (!isModalOpen) {
//       setIsModalOpen(true);
//       setIsNotifModalOpen(false);
//     } else {
//       setIsModalOpen(false);
//     }
//   };

//   const handleNotifModal = () => {
//     if (!isNotifModalOpen) {
//       setIsNotifModalOpen(true);
//       setIsModalOpen(false);
//     } else {
//       setIsNotifModalOpen(false);
//     }
//   };
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 650) {
//         setMenuOpen(false); // Close the menu when the screen is resized to less than or equal to 650 pixels
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);
//   function handleMenuToggle() {
//     setMenuOpen(!menuOpen);
//   }

//   return (
//     <>
//       <div className={styles.mainContainer}>
//         <div className={styles.iconsContainer}>
//           <Link href="/">
//             <Image
//               className={styles.iconHeading}
//               src={Blaxcorp}
//               alt="mask icon"
//             />
//           </Link>
//         </div>
//         <div className={styles.mobileMenuIcon} onClick={handleMenuToggle}>
//           <Image src={MenuIcon} alt="menu icon" />
//         </div>
//         {menuOpen && iconOpen ? (
//           <ul className={styles.mobileMenu}>
//             <li>
//               <button className={`${styles.button}`}>About</button>
//             </li>
//             <li>
//               <button className={styles.button}>Help</button>
//             </li>
//             <li>
//               <button className={styles.button}>Refer a friend</button>
//             </li>
//           </ul>
//         ) : (
//           ""
//         )}
//         <div className={styles.routesContainer}>
//           {!menuOpen && (
//             <>
//               <button className={`${styles.button}`}>About</button>
//               <button className={styles.button}>Help</button>
//               <button className={styles.button}>Refer a friend</button>
//               <button className={styles.icons} onClick={handleNotifModal}>
//                 <Image className={styles.icon} src={BellIcon} alt="bell icon" />
//               </button>
//               {isNotifModalOpen && (
//                 <ModalNotifications onClose={handleNotifModal} />
//               )}
//               <button
//                 onClick={handleDetail}
//                 className={
//                   isModalOpen ? styles.flexContentActive : styles.flexContent
//                 }
//               >
//                 <div className={styles.text}>OS</div>
//                 <button className={styles.button}>Oleksii S.</button>
//                 {!isModalOpen ? (
//                   <Image src={DownIcon} alt="downicon" />
//                 ) : (
//                   <Image src={UpIcon} alt="up icon" />
//                 )}
//               </button>
//               {isModalOpen && <ModalDetails onClose={handleDetail} />}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default AppBar;
// "use client";
import { FC, useEffect, useState } from "react";
import MaskIcon from "../../../../public/icons/Mask.svg";
import BellIcon from "../../../../public/icons/Bell.svg";
import BlaxCorpIcon from "../../../../public/icons/Blaxcorp.svg";
import DownIcon from "../../../../public/icons/Down.svg";
import UpIcon from "../../../../public/icons/Up.svg";
import Blaxcorp from "../../../../public/logos/Blaxcorp_logo.svg";
import Image from "next/image";
import { ROUTES } from "@/constants";
import styles from "./style.module.scss";
import ModalDetails from "./Modals/ModalDetails";
import Link from "next/link";
import MenuIcon from "../../../../public/icons/Menu.svg";
import { Grid } from "antd";

import ModalNotifications from "./Modals/ModalNotifications";

const AppBar: FC = () => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconMenu, setIconMenu] = useState(false);

  const handleDetail = () => {
    setIsModalOpen(!isModalOpen);
    setIsNotifModalOpen(false);
  };

  const handleNotifModal = () => {
    setIsNotifModalOpen(!isNotifModalOpen);
    setIsModalOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 650) {
  //       setMenuOpen(true);
  //     }
  //   };
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.iconsContainer}>
          <Link href="/">
            <Image
              className={styles.iconHeading}
              src={Blaxcorp}
              alt="mask icon"
            />
          </Link>
        </div>
        <div onClick={handleMenuToggle}>
          {!screens["md"] ? (
            <div className={styles.mobileMenuIcon}>
              <Image src={MenuIcon} alt="menu icon" />
            </div>
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
                {isModalOpen && <ModalDetails onClose={handleDetail} />}
              </>
            </div>
          )}
        </div>

        {/* {(menuOpen || window.innerWidth <= 650) && (
          // <div className={styles.mobileMenu}>
          //   <button className={`${styles.button}`}>About</button>
          //   <button className={styles.button}>Help</button>
          //   <button className={styles.button}>Refer a friend</button>
          // </div>

        )} */}
      </div>
    </>
  );
};

export default AppBar;
