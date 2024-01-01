import React, { FC } from 'react'
import styles from "./style.module.scss"
import { Col, Flex, Row } from 'antd'
import { TextInput, Dropdown, Button } from '../Shared'
import { ButtonType, IconType } from '@/types'
import Title from 'antd/es/typography/Title'

const Create: FC = ({ }) => {
  const roleOptions = [
    { value: 'buyer', label: 'Buyer' },
    { value: 'seller', label: 'Seller' },
  ]
  return (
    <Flex vertical gap={20} style={{ width: '760', margin: "auto" }}>
      <Flex align='center' justify='space-between'>
        <Button name='Back' leftIcon={IconType.BackArrow} type={ButtonType.Secondary} />
        <Title level={2}> Create new contract</Title>
        <span></span>
      </Flex>
      <Row justify={"space-between"} className={styles.mainContainer}>
        <Col span={9}>
          <TextInput name="contractName" label="Contract Name" />
          <Dropdown name="role" label="Contract Name" options={roleOptions} />
          <Dropdown name="currency" label="Currency" options={roleOptions} />
          <Dropdown name="Inspection Period(day)" label="Contract Name" options={roleOptions} />
        </Col>
        <Col span={9}>
          <Flex>
            <div className={styles.text}>
              <h2 className={styles.heading}>ASE</h2>
              <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                assumenda optio debitis non porro dolore temporibus voluptatem
                eaque unde. Eveniet aspernatur minima eligendi veritatis earum
                pariatur quia deleniti mollitia neque?
              </p>
            </div>
          </Flex>
        </Col>
      </Row>
      <Button name='Next' />
    </Flex>

  )
}

export default Create