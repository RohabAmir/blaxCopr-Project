"use client";

import { FC, useState } from "react";
import CardContainer from "./Contracts";
import styles from "./style.module.scss";
import Header from "../Shared/VerifyProfileBar";
import Navbar from "../Shared/Navbar";
import { Nav } from "@/types";

const Dashboard: FC = () => {
  const NavList: Array<Nav> = [
    { title: "All", link: "all" },
    { title: "Action Required", link: "action required" },
    { title: "Open", link: "open" },
    { title: "Closed", link: "closed" },
  ];
  const [activeNav, setActiveNav] = useState(NavList[0].link);
  const navClickHandler = (nav: string) => {
    setActiveNav(nav);
  };

  return (
    <div className={styles.main}>
      <Header />
      <h1 className={styles.nav}>My Contracts</h1>
      <Navbar
        navs={NavList}
        activeNav={activeNav}
        navClickHandler={navClickHandler}
      />
      <CardContainer activeNav={activeNav} />
    </div>
  );
};

export default Dashboard;
