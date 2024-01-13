import React, { FC, useState } from "react";
import { Checkbox, Col, Flex, Grid, Row, Typography } from "antd";
import QRCode from "../../../public/images/qr_code.svg";
import MobileSkeleton from "../../../public/images/Mobile_Skeleton.svg";
import Input from "../Shared/Inputs/Text";
import Button from "../Shared/Button";
import Image from "next/image";
import styles from "./style.module.scss";
import { ButtonType, IconType } from "@/types";
import CopyIcon from "../../../public/icons/Copy.svg";
import Icon from "@ant-design/icons/lib/components/Icon";
const Security: FC = () => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  const { Text, Title } = Typography;
  const [step, setStep] = useState<number>(1);

  const scanButtonHandler = () => {
    setStep(2);
  };
  const backButtonHandler = () => {
    setStep(1);
  };
  const verifyCodeButtonHandler = () => {
    console.log("verified");
  };

  return (
    <>
      {step === 1 ? (
        <div>
          {!screens["sm"] && (
            <>
              <Button
                name="Back"
                type={ButtonType.Secondary}
                leftIcon={IconType.BackArrow}
                onClickHandler={backButtonHandler}
              />
              <h2>Two step verifictaion</h2>
            </>
          )}
          {screens["sm"] && (
            <Row style={{ margin: "16px 2px" }}>
              <Checkbox>Enable multi-factor authentication</Checkbox>
            </Row>
          )}
          <div className={styles.securityMain}>
            <Col>
              <Flex
                vertical
                gap={20}
                justify="center"
                style={{ marginTop: "48px" }}
              >
                <Text>Step {step}</Text>
                <Title level={4} style={{ margin: "0", padding: "0" }}>
                  Scan this with your Authentication App
                </Title>
                <span className={styles.text}>
                  App will guide you to add a new token for Blaxcorp
                </span>
                {screens["sm"] && (
                  <Button
                    name="I scanned the code"
                    onClickHandler={scanButtonHandler}
                    fullWidth={!screens["sm"]}
                  />
                )}
              </Flex>
            </Col>
            <div className={styles.security_left}>
              <Image src={QRCode} alt="QR" />
            </div>
          </div>

          {!screens["sm"] && (
            <Flex vertical gap={20} justify="center">
              <span className={styles.text}>
                Can’t scan the QR code? Enter this code into your authenticator
                app instead:
              </span>
              <span className={styles.flexText}>
                <strong>IG13SHKDP5789</strong>{" "}
                <Image className={styles.copyicon} src={CopyIcon} alt="copy" />{" "}
              </span>
              <Button
                name="Enter confirmation code"
                onClickHandler={scanButtonHandler}
                fullWidth={!screens["sm"]}
              />
            </Flex>
          )}
        </div>
      ) : (
        <>
          {!screens["sm"] && (
            <>
              <Button
                name="Back"
                type={ButtonType.Secondary}
                leftIcon={IconType.BackArrow}
                onClickHandler={backButtonHandler}
              />
              <h2>Two step verifictaion</h2>
            </>
          )}
          <div className={styles.securityVerified}>
            {screens["sm"] && (
              <div className={styles.security_left}>
                <Image src={MobileSkeleton} alt="QR" />
              </div>
            )}
            <Col>
              <Flex vertical gap={20} justify="center">
                <Text>Step {step}</Text>
                <h2 style={{ margin: "0" }}>
                  Enter the 6-digit code from your authenticator app
                </h2>
                <Text>This will connect the app</Text>
                <Input name="code" type="number" placeholder="6-digit code" />
                <Flex align="center" justify="flex-start" gap={10}>
                  {screens["sm"] && (
                    <Button
                      name="Back"
                      type={ButtonType.Secondary}
                      leftIcon={IconType.BackArrow}
                      onClickHandler={backButtonHandler}
                    />
                  )}
                  <Button
                    name="Verify code"
                    onClickHandler={verifyCodeButtonHandler}
                    fullWidth={!screens["sm"]}
                  />
                </Flex>
              </Flex>
            </Col>
          </div>
        </>
      )}
    </>
  );
};

export default Security;
