import React, { FC } from "react";
import styles from "./style.module.scss";
import { FormSection } from "../Shared";
import { Flex, Row, Col } from "antd";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import Image from "next/image";
import DownloadIcon from "../../../public/icons/Download.svg";

const StepAgreement: FC = ({}) => {
  return (
    <>
      <Flex vertical className="w-full">
        <FormSection title="Agreement">
          <div className={styles.main}>
            <div className={styles.flexText}>
              <p className={styles.textHeading}>Buyer signs here</p>

              <Button name="Review & Sign" type={ButtonType.Primary} />
            </div>
          </div>
        </FormSection>
      </Flex>
      <Flex vertical className="w-full" style={{ marginBottom: "24px" }}>
        <FormSection>
          <div className={styles.main}>
            <div className={styles.flexText}>
              <p className={styles.textHeading}>Seller signs here</p>

              <Button name="Invite Seller" type={ButtonType.Secondary} />
            </div>
          </div>
        </FormSection>
      </Flex>

      {/* Review contract details */}

      <Flex vertical className="w-full">
        <FormSection title="Review the contract details">
          <div className={styles.main}>
            <div className={styles.flexText}>
              <p className={styles.textHeading}>Document uploaded</p>

              <Button name="Edit" type={ButtonType.Primary} />
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Document name.pdf</p>
              <Image
                className={styles.icon}
                src={DownloadIcon}
                alt="download icon"
              />
            </div>
          </div>
        </FormSection>
      </Flex>

      {/* agreement Details  */}

      <Flex vertical className="w-full">
        <FormSection>
          <div className={styles.main}>
            <div className={styles.flexText}>
              <p className={styles.textHeading}>Agreement details</p>

              <Button name="Edit" type={ButtonType.Primary} />
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Contract name</p>
              <p className={styles.textHeadingDetails}>Name</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Role</p>
              <p className={styles.textHeadingDetails}>Seller</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Currency</p>
              <p className={styles.textHeadingDetails}>USD$</p>
            </div>
          </div>{" "}
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Inspection period</p>
              <p className={styles.textHeadingDetails}>5 days</p>
            </div>
          </div>
        </FormSection>
      </Flex>

      {/* Transaction Details */}

      <Flex vertical className="w-full">
        <FormSection>
          <div className={styles.main}>
            <div className={styles.flexText}>
              <p className={styles.textHeading}>Transaction details</p>

              <Button name="Edit" type={ButtonType.Primary} />
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Item name</p>
              <p className={styles.textHeadingDetails}>Name</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Price (USD)</p>
              <p className={styles.textHeadingDetails}>$10.000</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Item category</p>
              <p className={styles.textHeadingDetails}>Motor Vehicles$</p>
            </div>
          </div>{" "}
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Make</p>
              <p className={styles.textHeadingDetails}>Tesla</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Model</p>
              <p className={styles.textHeadingDetails}>Tesla Cybertruck</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Year</p>
              <p className={styles.textHeadingDetails}>2021</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Odometer</p>
              <p className={styles.textHeadingDetails}>10,000</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>VIN</p>
              <p className={styles.textHeadingDetails}>1HGCM82633A123456</p>
            </div>
          </div>
        </FormSection>
      </Flex>

      {/* shipping */}

      <Flex vertical className="w-full">
        <FormSection>
          <div className={styles.main}>
            <div className={styles.flexText}>
              <p className={styles.textHeading}>Shipping</p>

              <Button name="Edit" type={ButtonType.Primary} />
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Shipping cost (USD)</p>
              <p className={styles.textHeadingDetails}>$500.00</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Shipping method</p>
              <p className={styles.textHeadingDetails}>Standart shipping</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Shipping fee paid by</p>
              <p className={styles.textHeadingDetails}>Seller</p>
            </div>
          </div>{" "}
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Inspection period</p>
              <p className={styles.textHeadingDetails}>1 day</p>
            </div>
          </div>
        </FormSection>
      </Flex>

      {/* Transaction Summary */}

      <Flex vertical className="w-full" style={{ marginBottom: "64px" }}>
        <FormSection>
          <div className={styles.main}>
            <div className={styles.flexText}>
              <p className={styles.textHeading}>Transaction Summary</p>

              <Button name="Edit" type={ButtonType.Primary} />
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Subtotal</p>
              <p className={styles.textHeadingDetails}>$10.000.00</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Shipping fee</p>
              <p className={styles.textHeadingDetails}>$123.00</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}> Escrow fee paid by</p>
              <p className={styles.textHeadingDetails}>Buyer</p>
            </div>
          </div>{" "}
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Escrow fee</p>
              <p className={styles.textHeadingDetails}>$30</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Buyer price</p>
              <p className={styles.textHeadingDetails}>$10.153.00</p>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.flexTextColor}>
              <p className={styles.subHeading}>Cancellation fees paid by</p>
              <p className={styles.textHeadingDetails}>Buyer</p>
            </div>
          </div>
        </FormSection>
      </Flex>
    </>
  );
};

export default StepAgreement;
