"use client";
import { FC, useEffect, useState } from "react";
import CardContainer from "./Contracts";
import styles from "./style.module.scss";
import Header from "../Shared/VerifyProfileBar";
import Navbar from "../Shared/Navbar";
import { Nav } from "@/types";
import { useGetUserDetailsQuery } from "@/Store/services/authApi";
import { useGetAllContractDetailsQuery } from "@/Store/services/contractApi";
import { useOnfidoDataQuery } from "@/Store/services/onfidoApi";
import Spinner from "@/utils/spinner";
import { useSession } from "next-auth/react";

const Dashboard: FC = () => {
      const NavList: Array<Nav> = [
            { title: "All", link: ["all"] },
            { title: "Action required", link: ["INCOMPLETE", "PENDING"] },
            { title: "Compeleted", link: ["COMPLETED"] },
            { title: "Delivered", link: ["DELIVERED"] },
            { title: "Received", link: ["RECEIVED"] },
            { title: "Dispute", link: ["DISPUTE"] },
            { title: "Approve", link: ["APPROVE"] },
            { title: "Closed", link: ["closed"] },
      ];
      const [activeNav, setActiveNav] = useState<string[]>(NavList[0].link);
      const navClickHandler = (nav: string[]) => {
            setActiveNav(nav);
      };
      // Fetch user details
      const { data: userDetails, refetch: refetchUserDetails } =
            useGetUserDetailsQuery();
      // Fetch all contract details
      const {
            data: allContractDetails,
            refetch: refetchAllContractDetails,
            isLoading: contractsLoading,
      } = useGetAllContractDetailsQuery();
       // Fetch onfido data
       const { data:onfidoData, refetch: refetchOnfidoData } =
       useOnfidoDataQuery();
       console.log("onfidoData>>", onfidoData);

      useEffect(() => {
            refetchUserDetails(); // Refetch user details on component mount
            refetchAllContractDetails(); // Refetch all contract details on component mount
            refetchOnfidoData(); //Refecth all onfido data
      }, [refetchUserDetails, refetchAllContractDetails, refetchOnfidoData]);

      return (
            <div className={styles.main}>
                    { onfidoData?.data?.is_verified && <Header /> }
                  <h1 className={styles.nav}>My Contracts</h1>
                  <Navbar
                        navs={NavList}
                        activeNav={activeNav}
                        navClickHandler={navClickHandler}
                  />
                  {contractsLoading ? (
                        <Spinner />
                  ) : (
                        <CardContainer
                              allContractDetails={allContractDetails}
                              activeNav={activeNav}
                              userDetails={userDetails}
                              refetchAllContractDetails={
                                    refetchAllContractDetails
                              }
                        />
                  )}
            </div>
      );
};
export default Dashboard;
