import React, { FC, ReactNode } from "react";
import Layout_C from "@/components/Dashboard/Layout";

interface ILayout {
  children: ReactNode;
}
const Layout: FC<ILayout> = ({ children }) => <Layout_C>{children}</Layout_C>;

export default Layout;
