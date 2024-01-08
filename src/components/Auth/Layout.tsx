"use client";
import React, { FC, ReactNode, useMemo, useState } from "react";
import { Col, Row, Flex, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import HERO_IMAGE from "../../../public/images/auth_layout_hero.svg";
import CROSS_ICON from "../../../public/icons/cross_outlined.svg";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";
import FacebookLogo from "../../../public/logos/facebook_logo.svg";
import AppleLogo from "../../../public/logos/apple_logo.svg";
import GoogleLogo from "../../../public/logos/google_logo.svg";
import styles from "./style.module.scss";
import Pic1 from "../../../public/images/Pic1.svg";
import Pic2 from "../../../public/images/Pic2.svg";
import Pic3 from "../../../public/images/Pic3.svg";
import CardReview from "./CardReview";

interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  const { Text } = Typography;
  const path = usePathname();
  const forgotPassword = path.includes("forgot-password");
  const resetPassword = path.includes("reset-password");
  const signup = path.includes("sign-up");
  const signin = path.includes("sign-in");

  const isResetPassword = useMemo(() => {
    return forgotPassword || resetPassword;
  }, [forgotPassword, resetPassword]);

  return (
    <>
      <Row
        justify="center"
        align="top"
        style={{ height: "100vh" }}
        className={styles.main}
      >
        {/*------------------------ For future ------------------ */}
        {/* {signup && (
          <Col span={12} className={styles.leftSubRoot}>
            <Image
              className={styles.blaxcorp}
              src={BLAXCORP_LOGO}
              alt="blaxcorp logo"
            />
            <div className={styles.imgFlex}>
              <Image className={styles.img} src={Pic2} alt="pic3" />
              <Image className={styles.img} src={Pic1} alt="pic1" />
              <Image className={styles.img} src={Pic3} alt="pic2" />
            </div>
            <div className={styles.textFlex}>
              <p className={styles.heading}>
                Step into the <br /> Digital Escrow Era
              </p>
              <p className={styles.subHeading}>
                Engage in buying and selling with absolute safety,
                <br /> free from the worries of chargebacks
              </p>
            </div>
            <CardReview />
          </Col>
        )} */}

        {/* -------------------------------------------------- */}
        {signup && (
          <Col span={12} className={styles.loginMain}>
            <Image
              className={styles.blaxcorpLogin}
              src={BLAXCORP_LOGO}
              alt="blaxcorp logo"
            />
            <h1 className={styles.loginHeading}>
              Step into the <br /> Digital Escrow Era
            </h1>
            <h1 className={styles.subHeading}>
              Engage in buying and selling with absolute safety,
              <br /> free from the worries of chargebacks.
            </h1>
          </Col>
        )}

        {signin && (
          <Col span={12} className={styles.loginMain}>
            <Image
              className={styles.blaxcorpLogin}
              src={BLAXCORP_LOGO}
              alt="blaxcorp logo"
            />
            <h1 className={styles.loginHeading}>
              Secure Your Deal in <br /> 5 Swift Moves
            </h1>
            <h1 className={styles.subHeading}>
              Our streamlined 5-step process ensures effortless <br /> and
              robust protection for every deal.
            </h1>
          </Col>
        )}
        {forgotPassword && (
          <Col span={12} className={styles.loginMain}>
            <Image
              className={styles.blaxcorpLogin}
              src={BLAXCORP_LOGO}
              alt="blaxcorp logo"
            />
            <h1 className={styles.loginHeading}>
              Regain Account <br /> Access Smoothly
            </h1>
            <h1 className={styles.subHeading}>
              Reset your password in just a few clicks and <br /> continue your
              secure journey with us.
            </h1>
          </Col>
        )}
        {resetPassword && (
          <Col span={12} className={styles.loginMain}>
            <Image
              className={styles.blaxcorpLogin}
              src={BLAXCORP_LOGO}
              alt="blaxcorp logo"
            />
            <h1 className={styles.loginHeading}>
              Reset and <br />
              Resume Securely
            </h1>
            <h1 className={styles.subHeading}>
              Quickly set up a new password and continue your <br /> safe,
              hassle-free experience with Blaxcorp.
            </h1>
          </Col>
        )}
        {/* --------------------------------- */}
        <Col span={11} className={styles.rightSubRoot}>
          {/* <Flex justify="space-between" align="center">
          <Image src={CROSS_ICON} alt="cross" />
        </Flex> */}
          <Flex
            vertical
            align="center"
            justify="center"
            className={styles.formContainer}
          >
            <Flex
              vertical
              align={isResetPassword ? "flex-start" : "center"}
              style={{ width: "100%" }}
            >
              <Flex vertical style={{ width: "75%" }}>
                {children}
              </Flex>
            </Flex>
            {!isResetPassword && (
              <Flex
                vertical
                align="center"
                justify="center"
                gap={30}
                style={{ marginTop: "40px", marginBottom: "64px" }}
              >
                <Text style={{ color: "#454745" }}>Or log in with</Text>
                <Flex align="center" justify="center" gap="large">
                  <span className={styles.logoOutline}>
                    <Image src={GoogleLogo} alt="google logo" />
                  </span>
                  <span className={styles.logoOutline}>
                    <Image src={FacebookLogo} alt="facebook logo" />
                  </span>
                  <span className={styles.logoOutline}>
                    <Image src={AppleLogo} alt="apple logo" />
                  </span>
                </Flex>
                <Text
                  style={{
                    textAlign: "center",
                    visibility: path.includes("sign-up") ? "visible" : "hidden",
                    color: "#454745",
                    marginBottom: "64px",
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
            )}
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default Layout;
