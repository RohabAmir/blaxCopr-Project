"use client";
import React, { FC, ReactNode, useState } from "react";
import { Col, Row, Flex, Typography } from "antd";
import Image from "next/image";
import HERO_IMAGE from "../../../../public/images/auth_layout_hero.svg";
import CROSS_ICON from "../../../../public/icons/cross_outlined.svg";
import BLAXCORP_LOGO from "../../../../public/icons/Blaxcorp_logo.svg";
import Link from "next/link";
import FacebookLogo from "../../../../public/logos/facebook_logo.svg";
import AppleLogo from "../../../../public/logos/apple_logo.svg";
import GoogleLogo from "../../../../public/logos/google_logo.svg";
import { logoOutline } from "./styles";
import { usePathname } from "next/navigation";

interface ILayout {
  children: ReactNode;
}

const Layout_C: FC<ILayout> = ({ children }) => {
  const { Text } = Typography;
  const path = usePathname();

  const forgotPassword = path.includes("Forgot-Password");
  const resetPassword = path.includes("Reset-Password");

  return (
    <Row justify="center" align="top" style={{ height: "100vh" }}>
      <Col span={12} style={{ height: "100%" }}>
        <Image
          src={HERO_IMAGE}
          alt="hero img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Col>
      <Col
        span={12}
        style={{
          height: "100%",
          padding: "50px 75px",
          boxSizing: "border-box",
        }}
      >
        <Flex justify="space-between" align="center">
          <Image src={BLAXCORP_LOGO} alt="blaxcorp logo" />
          <Image src={CROSS_ICON} alt="cross" />
        </Flex>
        <Flex
          style={{ height: "80%", width: "100%" }}
          vertical
          justify="center"
        >
          <Flex style={{ width: "100%" }}>{children}</Flex>
          {!forgotPassword ||
            (resetPassword && (
              <Flex vertical align="center" justify="center" gap={30}>
                <Text style={{ color: "#454745" }}>Or log in with</Text>
                <Flex align="center" justify="center" gap="large">
                  <span style={logoOutline}>
                    <Image src={GoogleLogo} alt="google logo" />
                  </span>
                  <span style={logoOutline}>
                    <Image src={FacebookLogo} alt="facebook logo" />
                  </span>
                  <span style={logoOutline}>
                    <Image src={AppleLogo} alt="apple logo" />
                  </span>
                </Flex>
                <Text
                  style={{
                    textAlign: "center",
                    visibility: path.includes("sign-up") ? "visible" : "hidden",
                    color: "#454745",
                  }}
                >
                  By registering, you accept our{" "}
                  <Link href="/">
                    {" "}
                    <Text
                      underline
                      style={{ textUnderlineOffset: "2px" }}
                      strong
                    >
                      Terms of Use
                    </Text>
                  </Link>{" "}
                  and{" "}
                  <Link href="/">
                    <Text
                      underline
                      style={{ textUnderlineOffset: "2px" }}
                      strong
                    >
                      Privacy Policy
                    </Text>
                  </Link>
                </Text>
              </Flex>
            ))}
        </Flex>
      </Col>
    </Row>
  );
};

export default Layout_C;
