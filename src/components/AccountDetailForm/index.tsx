"use client";
import React, { FC, useState } from "react";
import { Flex, Typography } from "antd";
import Navbar from "@/components/Shared/Navbar";
import Avatar from "@/components/Shared/Avatar";
import PersonalDetails from "./PersonalDetails";
import Security from "./Security";
import Password from "./Password";
import Header from "../Shared/VerifyProfileBar";
import { FormProvider, useForm } from "react-hook-form";
import { useGetUserDetailsQuery } from "@/Store/services/authApi";

const CreateAccountDetails: FC = () => {
      const { data: userDetails } = useGetUserDetailsQuery();
      type Nav = {
            title: string;
            link: string;
      };
      const methods = useForm();
      const { Title } = Typography;
      const NavList: Array<Nav> = [
            { title: "Personal Details", link: "personal-details" },
            // { title: "Payment", link: "payment" },
            { title: "Password", link: "password" },
            { title: "Security", link: "security" },
      ];
      const [activeNav, setActiveNav] = useState(NavList[0].link);

      const navClickHandler = (nav: string) => {
            setActiveNav(nav);
      };

      const getActiveSectionUI = (activeNav: string) => {
            if (activeNav === "security") {
                  return <Security />;
            } else if (activeNav === "personal-details") {
                  return <PersonalDetails userDetails={userDetails} />;
            } else if (activeNav === "password") {
                  return <Password />;
            } else {
                  <PersonalDetails userDetails={userDetails} />;
            }
      };

      return (
            <Flex
                  vertical
                  gap={20}
                  style={{ maxWidth: "700px", margin: "auto" }}
            >
                  <Header />
                  <Title level={3}>Account Details</Title>
                  <Flex align="center" justify="flex-start" gap={10}>
                        <Avatar name={userDetails?.email} />
                  </Flex>
                  <Navbar
                        navs={NavList}
                        activeNav={activeNav}
                        navClickHandler={navClickHandler}
                  />
                  <FormProvider {...methods}>
                        {getActiveSectionUI(activeNav)}
                  </FormProvider>
            </Flex>
      );
};

export default CreateAccountDetails;
