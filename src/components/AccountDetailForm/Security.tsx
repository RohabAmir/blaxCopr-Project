import React, { FC, useState } from 'react'
import { Checkbox, Col, Flex, Row, Typography } from 'antd'
import QRCode from "../../../public/images/qr_code.svg"
import MobileSkeleton from "../../../public/images/Mobile_Skeleton.svg"
import Input from "../Shared/Inputs/Text"
import Button from '../Shared/Button'
import Image from 'next/image'
import styles from "./style.module.scss"
import { ButtonType, IconType } from '@/types'
import Icon from '@ant-design/icons/lib/components/Icon'
const Security: FC = () => {
  const { Text, Title } = Typography
  const [step, setStep] = useState<number>(1)

  const scanButtonHandler = () => {
    setStep(2)
  }
  const backButtonHandler = () => {
    setStep(1)
  }
  const verifyCodeButtonHandler = () => {
    console.log("verified")
  }

  return (
    <>
      {step === 1 ? <Row>
        <Row style={{margin:"16px 2px"}}>
          <Checkbox>Enable multi-factor authentication</Checkbox>
        </Row>
        <Row className={styles.security_step_root} justify="space-between" align='middle'>
          <Col span={7} className={styles.security_left}><Image src={QRCode} alt="QR" /></Col>
          <Col offset={1} span={16}>
            <Flex vertical gap={20} justify='center'>
              <Text>Step {step}</Text>
              <Title level={4} style={{ margin: "0", padding: '0' }}>Scan this with your Authentication App</Title>
              <Text>App will guide you to add a new token for Blaxcorp</Text>
              <Button name="I scanned the code" onClickHandler={scanButtonHandler} />
            </Flex>
          </Col>
        </Row>
      </Row> : <Row className={styles.security_step_root} justify="space-between" align='middle'>
        <Col span={7} className={styles.security_left}><Image src={MobileSkeleton} alt="QR" /></Col>
        <Col offset={1} span={16}>
          <Flex vertical gap={20} justify='center'>
            <Text>Step {step}</Text>
            <Title level={4} style={{ margin: "0", padding: '0' }}>Enter the 6-digit code from your authenticator app</Title>
            <Text>This will connect the app</Text>
            <Input name='code' type='number' placeholder='6-digit code' />
            <Flex align='center' justify='flex-start' gap={10}>
              <Button name="Back" type={ButtonType.Secondary} leftIcon={IconType.BackArrow} onClickHandler={backButtonHandler} />
              <Button name="Verify code" onClickHandler={verifyCodeButtonHandler} />
            </Flex>
          </Flex>
        </Col>
      </Row>}
    </>
  )
}

export default Security