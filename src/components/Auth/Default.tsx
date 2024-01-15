import { Flex, Typography } from "antd";
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
import { useAuthContext } from "@/contexts/Auth";
import { useAppContext } from "@/contexts/App";

const Default: FC<any> = ({ children }) => {
  const { Text } = Typography;
  const {isMobile}=useAppContext()
  const { activePage } = useAuthContext()

  const DESKTOP_TAGLINE: any = {
    DEFAULT: { title1: 'Step into the', title2: 'Digital Escrow Era', desc1: ' Engage in buying and selling with absolute safety,', desc2: 'free from the worries of chargebacks.' },
    SIGN_UP: { title1: 'Step into the', title2: 'Digital Escrow Era', desc1: ' Engage in buying and selling with absolute safety,', desc2: 'free from the worries of chargebacks.' },
    SIGN_IN: { title1: 'Secure Your Deal in', title2: ' 5 Swift Moves', desc1: 'Our streamlined 5-step process ensures effortless', desc2: 'androbust protection for every deal.' },
    FORGOT_PASSWORD: { title1: 'Regain Account', title2: 'Access Smoothly', desc1: ' Reset your password in just a few clicks and', desc2: 'continue your secure journey with us.' },
    RESET_PASSWORD: { title1: 'Reset and ', title2: 'Resume Securely', desc1: 'Quickly set up a new password and continue your', desc2: 'safe,hassle- free experience with Blaxcorp.' }
  }
  const sideData = DESKTOP_TAGLINE[activePage]
  return (
    <Flex
      justify="space-around"
      align="center"
      className={styles.root}
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

      <Flex vertical align="center" justify="center" className={styles.leftSubRoot}>
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
          <br />
          {sideData?.desc2}
        </h1>
      </Flex>
      <Flex className={styles.rightSubRoot}>
        <Flex
          vertical
          align="center"
          justify="center"
          gap={20}
          className={styles.formContainer}
        >
          {children}
          <Flex
            vertical
            align="center"
            justify="center"
            gap={20}
            className="w-full"
          >
            {!isMobile && <Text style={{ color: "#454745" }}>Or log in with</Text>}
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
                color: "#454745",
                // marginBottom: isMobile?"0":'64px'
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
      </Flex>
    </Flex>
  )
}

export default Default