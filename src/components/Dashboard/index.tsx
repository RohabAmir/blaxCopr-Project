"use client";

import { FC, useEffect, useState } from "react";
import CardContainer from "./Contracts";
import styles from "./style.module.scss";
import Header from "../Shared/VerifyProfileBar";
import Navbar from "../Shared/Navbar";
import { Nav } from "@/types";
import { useGetUserDetailsQuery } from "@/Store/services/authApi";

const Dashboard: FC = () => {
      const NavList: Array<Nav> = [
            { title: "All", link: "all" },
            { title: "Action required", link: "action required" },
            { title: "Open", link: "open" },
            { title: "Closed", link: "closed" },
      ];
      const [activeNav, setActiveNav] = useState(NavList[0].link);
      const navClickHandler = (nav: string) => {
            setActiveNav(nav);
      };
      const {
            data: userDetails,
            isError,
            isLoading,
            refetch,
      } = useGetUserDetailsQuery();
     

      useEffect(() => {
            refetch(); // Refetch user details on component mount
      }, [refetch]);

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
