import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import StyledComponentsRegistry from "@/lib/Antd/AntdRegistery";
import { theme } from "@/lib/Antd/Config";
import Layout_C from "@/components/Layout";
import AppContextContainer from "@/contexts/App";
import AuthContextContainer from "@/contexts/Auth";
import "./globals.scss";

export const metadata: Metadata = {
      title: "Blaxcorp",
      description: "Generated by create next app",
};

export default function RootLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      return (
            <html lang="en">
                  <body>
                        <StyledComponentsRegistry>
                              <ConfigProvider theme={theme}>
                                    <AuthContextContainer>
                                          <AppContextContainer>
                                                <Layout_C>{children}</Layout_C>
                                          </AppContextContainer>
                                    </AuthContextContainer>
                              </ConfigProvider>
                        </StyledComponentsRegistry>
                  </body>
            </html>
      );
}
