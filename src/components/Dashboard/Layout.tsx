"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import AppBar from "../Shared/AppBar";
import styles from "./style.module.scss";
interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  const [responsive, setResponsive] = useState(false);
  useEffect(() => {
    function checkSize() {
      if (window.innerWidth <= 780) {
        setResponsive(true);
      }
    }
    checkSize();
  }, []);
  return (
    <div className={styles.main}>
      {!responsive && <AppBar />}
      {children}
    </div>
  );
};

export default Layout;
