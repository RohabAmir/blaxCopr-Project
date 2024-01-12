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

const CreateAccountDetails: FC = () => {
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

  React.useEffect(() => {
    console.log(
      "account detail formstate",
      methods.formState,
      "form state defult",
      methods.formState.defaultValues,
      "dirty fields",
      methods.formState.dirtyFields
    );
  }, [methods.formState]);

  const getActiveSectionUI = (activeNav: string) => {
    if (activeNav === "security") {
      return <Security />;
    } else if (activeNav === "personal-details") {
      return <PersonalDetails />;
    } else if (activeNav === "password") {
      return <Password />;
    } else {
      <PersonalDetails />;
    }
  };

  return (
    <Flex vertical gap={20} style={{ maxWidth: "700px", margin: "auto" }}>
      <Header />
      <Title level={3}>Account Details</Title>
      <Flex align="center" justify="flex-start" gap={10}>
        <Avatar name="adeel tahir" />
      </Flex>
      <Navbar
        navs={NavList}
        activeNav={activeNav}
        navClickHandler={navClickHandler}
      />
      <FormProvider {...methods}>{getActiveSectionUI(activeNav)}</FormProvider>
    </Flex>
  );
};

export default CreateAccountDetails;
