"use client";
import React, { FC, useMemo, useState } from "react";
import {  Grid } from "antd";
import Default from "./Default";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";

export enum PAGES {
  DEFAULT = 'DEFAULT',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = "SIGN_IN",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  RESET_PASSWORD = "RESET_PASSORD"
}

const Auth: FC = () => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  const isMobile = useMemo(() => screens["sm"] && !screens['md'] || screens['xs'] && !screens['md'], [screens])
  const [activePage, setActivePage] = useState(isMobile?PAGES.DEFAULT:PAGES.SIGN_IN)

  const getActiveUI = (currentPage: any, handleActivePage: (page: any) => void) => {
    if (currentPage === PAGES.SIGN_IN) {
      return <SignIn handleActivePage={handleActivePage} isMobile={isMobile}/>
    } else if (currentPage === PAGES.SIGN_UP) {
      return <SignUp handleActivePage={handleActivePage} isMobile={isMobile}/>
    } else if (currentPage === PAGES.RESET_PASSWORD) {
      return <ResetPassword handleActivePage={handleActivePage} isMobile={isMobile}/>
    } else if (currentPage === PAGES.FORGOT_PASSWORD) {
      return <ForgotPassword handleActivePage={handleActivePage} isMobile={isMobile}/>
    } else {
      return <Default activePage={activePage} isMobile={isMobile}><div>danish</div></Default>
    }
  }

  const handleActivePage = (page: any) => {
    setActivePage(page)
  }

  return (isMobile ? getActiveUI(activePage, handleActivePage) :
    <Default activePage={activePage} isMobile={isMobile}>
      {getActiveUI(activePage, handleActivePage)}
    </Default>
  );
};

export default Auth;
