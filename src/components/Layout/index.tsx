"use client";
import React, { FC, ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import AppBar from "../Shared/AppBar";
import styles from "./style.module.scss";
import store from "@/Store";
import { usePathname } from 'next/navigation';
interface ILayout {
      children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
      const pathname=usePathname()
      const isAuthPage = pathname.includes('auth');
      return (
            <ReduxProvider store={store}>
                  {!isAuthPage && (
                        <div className={styles.appBarWrapper}>
                              <AppBar />
                        </div>
                  )}
                  {children}
            </ReduxProvider>
      );
};

export default Layout;
