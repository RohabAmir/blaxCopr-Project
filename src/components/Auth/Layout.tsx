"use client";
import React, { FC, ReactNode, useMemo } from "react";
import { Col, Row, Flex, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import HERO_IMAGE from "../../../public/images/auth_layout_hero.svg";
import CROSS_ICON from "../../../public/icons/cross_outlined.svg";
import BLAXCORP_LOGO from "../../../public/logos/Blaxcorp_logo.svg";
import FacebookLogo from "../../../public/logos/facebook_logo.svg";
import AppleLogo from "../../../public/logos/apple_logo.svg"
import GoogleLogo from "../../../public/logos/google_logo.svg"
import styles from "./style.module.scss"

interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  const { Text } = Typography
  const path = usePathname()
  const forgotPassword = path.includes("forgot-password");
  const resetPassword = path.includes("reset-password");
  const isResetPassword = useMemo(() => {
    return forgotPassword || resetPassword
  }, [forgotPassword, resetPassword])
  return (
    <Row justify="center" align="top" style={{ height: '100vh' }}>
      <Col span={12} className={styles.leftSubRoot}>
        <Image src={HERO_IMAGE} alt="hero img" className={styles.leftSubRoot__img} />
      </Col>
      <Col span={12} className={styles.rightSubRoot}>
        <Flex justify='space-between' align='center'>
          <Image src={BLAXCORP_LOGO} alt='blaxcorp logo' />
          <Image src={CROSS_ICON} alt='cross' />
        </Flex>
        <Flex vertical align='center' justify='center' className={styles.formContainer}>
          <Flex vertical align={isResetPassword ? "flex-start" : "center"} style={{ width: "100%" }}>
            <Flex vertical style={{ width: "75%" }}>
              {children}
            </Flex>
          </Flex>
          {!isResetPassword && (
            <Flex vertical align='center' justify='center' gap={30} style={{ marginTop: '40px' }}>
              <Text style={{ color: '#454745' }}>
                Or log in with
              </Text >
              <Flex align='center' justify='center' gap="large">
                <span className={styles.logoOutline}><Image src={GoogleLogo} alt="google logo" /></span>
                <span className={styles.logoOutline}><Image src={FacebookLogo} alt="facebook logo" /></span>
                <span className={styles.logoOutline}><Image src={AppleLogo} alt="apple logo" /></span>
              </Flex>
              <Text style={{ textAlign: "center", visibility: path.includes('sign-up') ? "visible" : "hidden", color: '#454745' }}>By registering, you accept our <Link href="/"> <Text underline style={{ textUnderlineOffset: '2px' }} strong>Terms of Use</Text></Link> and <Link href='/'><Text underline style={{ textUnderlineOffset: '2px' }} strong>Privacy Policy</Text></Link></Text>
            </Flex>)}
        </Flex>
      </Col>
    </Row >
  )
}

export default Layout
