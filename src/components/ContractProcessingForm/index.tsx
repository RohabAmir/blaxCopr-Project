"use client";
import { Flex, Grid } from "antd";
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
import FundsReleased from "./seller/FundsReleased";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/router";
import ConfirmContractCancellation from "./ConfirmContractCancellation";
import { useState } from "react";

// interface IContractProcessingForm {
//     children: ReactNode
// }
const ContractProcessingForm: FC = () => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  const path = usePathname();
  const dashboard = path.includes("dashboard");
  function handleClick() {
    return dashboard;
  }
  //
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
    document.body.style.zIndex = "-1";
    document.body.style.background = "rgba(0, 0, 0, 0.30";
    document.body.style.pointerEvents = "none";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.background = "#fff";
    document.body.style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
  };

  return (
    <Flex vertical className="w-full">
      {/* <VerifyProfileBar /> */}
      <Button
        name="Back"
        leftIcon={IconType.BackArrow}
        type={ButtonType.Secondary}
        size={!screens["sm"] ? "middle" : "large"}
      />

      {/* <Flex className="w-full">
        <div className={styles.agreementContainer}>
          <>
            <Flex vertical style={{ width: "100%" }}>
              <Title level={screens["sm"] ? 2 : 3}>Contract Name</Title>
              <div className={styles.flexTransaction}>
                <span className={styles.transactionText}>
                  Transaction #10942007
                </span>
                <span>
                  <Image
                    className={styles.copyIcon}
                    src={CopyIcon}
                    alt="copy icon"
                  />
                </span>
              </div>
            </Flex> */}

      {/* <Flex style={{ width: "100%" }}>
              <div className={styles.boxesAgreement}>
                <div className={styles.detailBox}>
                  <div>
                    <Image src={UserIcon} alt="user icon" />
                  </div>
                  <div className={styles.center}>Buyer</div>
                </div>
                <div className={styles.detailBox}>
                  <div>
                    <Image src={CalenderIcon} alt="calendar icon" />
                  </div>
                  <div className={styles.center}>Created 17 Dec, 2023</div>
                </div>
               
                <div className={styles.detailBox} onClick={openModal}>
                  <div className={styles.crossBox}>
                    <Image className={styles.xIcon} src={XIcon} alt="X icon" />
                  </div>
                  <div className={styles.center}>Cancel contract </div>
                </div>
                {isModalOpen && (
                  <ConfirmContractCancellation closeModal={closeModal} />
                )}
              </div>
            </Flex> */}
      {/* </>
        </div>
      </Flex> */}

      {/* <div>
        <div className={styles.transactionDetails}>
          <span style={{ color: "#006ACC" }}>example@gmail.com</span> is buying
          a <span style={{ fontWeight: "600" }}>domain name</span> from
          <span style={{ color: "#006ACC" }}> name@gmail.com.</span>
          <br /> The{" "}
          <span style={{ fontWeight: "600" }}>inspection period</span> for this
          transaction is{" "}
          <span style={{ fontWeight: "600" }}>3 calendar days.</span>
        </div>
      </div> */}

      {/* stepper added */}
      <Flex vertical align="center">
        {/* <Stepper /> */}
        <Flex
          vertical
          align="center"
          style={{ width: "100%", padding: "0 24px" }}
        >
          {!screens["sm"] && (
            <>
              {/* <div className={styles.flexBtnResp}>
                <Button
                  name="Action"
                  type={ButtonType.Tertioary}
                  fullWidth={!screens["md"]}
                />
                <Button
                  name="Overview"
                  type={ButtonType.Tertioary}
                  fullWidth={!screens["md"]}
                />
              </div> */}
            </>
          )}
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
          {/* <InspectedPeriod /> */}

          {/* <FundsReleased />*/}
          {/* <Invoice /> */}
          {/* ---Agreement form--- */}
          {/* <ConfirmContractCancellation closeModal={closeModal} /> */}
          <StepAgreement />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ContractProcessingForm;
