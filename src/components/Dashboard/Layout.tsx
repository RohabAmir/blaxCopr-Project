"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import AppBar from "../Shared/AppBar";
import styles from "./style.module.scss";
interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className={styles.main}>
      <AppBar />
      {children}
    </div>
  );
};

export default Layout;
