"use client";
import React, { FC } from "react";
import styles from "./style.module.scss";
import { Col, Flex, Row } from "antd";
import { TextInput, Dropdown, Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import ShieldIcon from "../../../public/icons/shield.svg";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Create: FC<any> = ({ handleStepChange, step }) => {
  const roleOptions = [
    { value: "buyer", label: "Buyer" },
    { value: "seller", label: "Seller" },
  ];
  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "GBP", label: "GBP" },
    { value: "EUR", label: "EUR" },
    { value: "GEL", label: "GEL" },
  ];

  const inspectionOptions = Array.from({ length: 180 }, (_, index) => ({
    value: (index + 1).toString(),
    label: (index + 1).toString(),
  }));

  return (
    <Flex
      vertical
      gap={64}
      style={{ width: "760", margin: "auto", marginBottom: "24px" }}
    >
      <Flex align="center" gap="164px">
        <Link href="/dashboard">
          <Button
            name="Back"
            leftIcon={IconType.BackArrow}
            type={ButtonType.Secondary}
          />
        </Link>
        <Title level={2} className={styles.headingMain}>
          {" "}
          Create new contract
        </Title>
        <span></span>
      </Flex>
      <Row className={styles.mainContainer}>
        <Col span={9}>
          <Flex vertical className="w-full" gap={20}>
            <TextInput name="contractName" label="Contract Name" />
            <Dropdown name="role" label="My role" options={roleOptions} />
            <Dropdown
              name="Currency"
              label="Currency"
              options={currencyOptions}
            />
            <Dropdown
              name="Inspection Period(day)"
              label="Inspection Period(days)"
              options={inspectionOptions}
            />
          </Flex>
        </Col>
        <Col span={9} offset={3}>
          <Flex vertical>
            <div className={styles.text}>
              <Image
                className={styles.img}
                src={ShieldIcon}
                alt="shield icon"
              />
              <h2 className={styles.heading}>AES-256 encryption</h2>
              <p className={styles.description}>
                Every contract is secured using SHA-256 hashing, AES-256
                encryption, and TLS 1.3 protocol to ensure the highest level of
                data integrity, confidentiality, and security.
              </p>
            </div>
          </Flex>
        </Col>
      </Row>
      <Button name="Next" onClickHandler={() => handleStepChange(1)} />
    </Flex>
  );
};

export default Create;
