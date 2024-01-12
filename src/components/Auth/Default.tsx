import { Col, Row, Flex, Typography, Grid } from "antd";
import React, { FC } from 'react'
import Link from "next/link";
import Image from "next/image";
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

const Default: FC<any> = ({ activePage, isMobile, children }) => {
  const { Text } = Typography;
  const DESKTOP_TAGLINE: any = {
    DEFAULT: { title1: 'Step into the', title2: 'Digital Escrow Era', desc1: ' Engage in buying and selling with absolute safety,', desc2: 'free from the worries of chargebacks.' },
    SIGN_UP: { title1: 'Step into the', title2: 'Digital Escrow Era', desc1: ' Engage in buying and selling with absolute safety,', desc2: 'free from the worries of chargebacks.' },
    SIGN_IN: { title1: 'Secure Your Deal in', title2: ' 5 Swift Moves', desc1: 'Our streamlined 5-step process ensures effortless', desc2: 'androbust protection for every deal.' },
    FORGOT_PASSWORD: { title1: 'Regain Account', title2: 'Access Smoothly', desc1: ' Reset your password in just a few clicks and', desc2: 'continue your secure journey with us.' },
    RESET_PASSWORD: { title1: 'Reset and ', title2: 'Resume Securely', desc1: 'Quickly set up a new password and continue your', desc2: 'safe,hassle- free experience with Blaxcorp.' }
  }

  const sideData = DESKTOP_TAGLINE[activePage]

  return (
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

      <Col xxl={12} className={styles.loginMain}>
        <Image
          className={styles.blaxcorpLogin}
          src={BLAXCORP_LOGO}
          alt="blaxcorp logo"
        />
        <h1 className={styles.loginHeading}>
          {sideData?.title1} <br /> {sideData?.title2}
        </h1>
        <h1 className={styles.subHeading}>
          {sideData?.desc1}
          <br />  {sideData?.desc2}
        </h1>
      </Col>
      <Col xxl={12} className={styles.rightSubRoot}>
        <Flex
          vertical
          align="center"
          justify="center"
          className={styles.formContainer}
        >
          <Flex
            vertical
            // align={isResetPassword ? "flex-start" : "center"}
            style={{ width: "100%" }}
          >
            {children}
          </Flex>
          <Flex
            vertical
            align="center"
            justify="center"
            gap={30}
            style={{ marginTop: "40px", marginBottom: "64px" }}
          >
            {isMobile && <Text style={{ color: "#454745" }}>Or log in with</Text>}
            <Flex className={styles.regBtns} align="center" justify="center" gap="large">
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
                // visibility: path.includes("sign-up") ? "visible" : "hidden",
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
        </Flex>
      </Col>
    </Row>
  )
}

export default Default