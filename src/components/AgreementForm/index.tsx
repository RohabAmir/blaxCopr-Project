"use client";
import { Flex } from "antd";
import React, { FC, ReactNode } from "react";
import styles from "./style.module.scss";
import { ButtonType, IconType } from "@/types";
import { Button, VerifyProfileBar } from "../Shared";
import Title from "antd/es/typography/Title";
import StepAgreement from "./StepAgreement";
import Image from "next/image";
import CopyIcon from "../../../public/icons/Copy.svg";
import UserIcon from "../../../public/icons/User.svg";
import CalenderIcon from "../../../public/icons/Calendar.svg";
import XIcon from "../../../public/icons/X.svg";
import Stepper from "./Stepper";
import Deposit from "./Deposit";
import TransferAmount from "./TransferAmount";
import BankLocation from "./BankLocation";
import BankDetails from "./BankDetails";
import PendingDeposit from "./PendingDeposit";
import SuccessfulDeposit from "./SuccessfulDeposit";
import Inspection from "./Inspection";
import DisputOpened from "./DisputOpened";
import Invoice from "./Invoice";
import InvoiceMerchandise from "./InvoiceMerchandise";
import SetupWithDrawl from "./seller/SetupWithdrawl";
import AddWithDrawl from "./seller/AddWithDrawl";
import AddWithDrawlDisbursement from "./seller/AddWithDrawlDisbursement";
import WithDrawlMethod from "./seller/WithDrawlMethod";
import WithDrawlBuyerWaiting from "./seller/WithDrawlBuyerWaiting";
import InspectedPeriod from "./seller/InspectedPeriod";

// interface IAgreementForm {
//     children: ReactNode
// }
const AgreementForm: FC = () => {
  return (
    <Flex vertical className="w-full">
      <VerifyProfileBar />
      <Button
        name="Back"
        leftIcon={IconType.BackArrow}
        type={ButtonType.Secondary}
      />
      <Flex justify="space-between" align="center" className="w-full">
        <Flex vertical>
          <Title level={2}>Contract Name</Title>
          {/* <Text>Transaction</Text> */}
          <div className={styles.flexTransaction}>
            <span className={styles.transactionText}>
              Transaction #10942007{" "}
            </span>
            <span>
              <Image
                className={styles.copyIcon}
                src={CopyIcon}
                alt="copy icon"
              />
            </span>
          </div>
          <div className={styles.transactionDetails}>
            <span style={{ color: "#006ACC" }}>example@gmail.com</span> is
            buying a <span style={{ fontWeight: "600" }}>domain name</span> from
            <span style={{ color: "#006ACC" }}> name@gmail.com.</span>
            <br /> The{" "}
            <span style={{ fontWeight: "600" }}>inspection period</span> for
            this transaction is{" "}
            <span style={{ fontWeight: "600" }}>3 calendar days.</span>
          </div>
        </Flex>
        <Flex gap={20} align="center" justify="center">
          <div className={styles.detailBox}>
            <div>
              <Image src={UserIcon} alt="user icon" />
            </div>
            <div>Buyer</div>
          </div>
          <div className={styles.detailBox}>
            <div>
              <Image src={CalenderIcon} alt="calendar icon" />
            </div>
            <div>Created 17 Dec, 2023</div>
          </div>
          <div className={styles.detailBox}>
            <div className={styles.crossBox}>
              <Image className={styles.xIcon} src={XIcon} alt="X icon" />
            </div>
            <div>Buyer</div>
          </div>
        </Flex>
      </Flex>
      {/* stepper added */}
      <Flex vertical align="center">
        <Stepper />

        <Flex vertical align="center" style={{ width: "600px" }}>
          {/* agrrement buyer components */}

          {/* ------------------------------------ */}

          <Deposit />
          <TransferAmount />
          <BankLocation />
          <BankDetails />
          <PendingDeposit />
          <SuccessfulDeposit />
          <Inspection />
          <DisputOpened />
          <Invoice />
          {/* --------------------------------------- */}

          {/* -----------------SELLER FLOW -------------------------- */}
          {/* <SetupWithDrawl /> */}
          {/* <AddWithDrawl /> */}
          {/* <AddWithDrawlDisbursement /> */}
          {/* <WithDrawlMethod /> */}
          {/* <WithDrawlBuyerWaiting /> */}
          <InspectedPeriod />

          {/* ---Agreement form--- */}
          <StepAgreement />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AgreementForm;
