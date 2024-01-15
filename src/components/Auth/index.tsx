"use client";
import React, { FC } from "react";
import Default from "./Default";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";
import { ButtonType } from "@/types";
import Button from "@/components/Shared/Button";
import { AUTH_TABS, useAuthContext } from "@/contexts/Auth";
import { useAppContext } from "@/contexts/App";

const Auth: FC = () => {
  const {isMobile}=useAppContext()
  const {  activePage, handleActivePage } = useAuthContext()

  const getActiveUI = (currentPage: any) => {
    if (currentPage === AUTH_TABS.SIGN_IN) {
      return <SignIn />
    } else if (currentPage === AUTH_TABS.SIGN_UP) {
      return <SignUp />
    } else if (currentPage === AUTH_TABS.RESET_PASSWORD) {
      return <ResetPassword />
    } else if (currentPage === AUTH_TABS.FORGOT_PASSWORD) {
      return <ForgotPassword />
    } else {
      return <Default >
        <Button name="Create account" fullWidth size="large" onClickHandler={() => handleActivePage(AUTH_TABS.SIGN_UP)} style={{ height: "50px" }} />
        <Button name="Login" fullWidth size="large" type={ButtonType.Secondary} onClickHandler={() => handleActivePage(AUTH_TABS.SIGN_IN)} style={{ height: "50px" }} />
      </Default>
    }
  }
  return (isMobile ? getActiveUI(activePage) :
    <Default >
      {getActiveUI(activePage)}
    </Default>
  );
};

export default Auth;
