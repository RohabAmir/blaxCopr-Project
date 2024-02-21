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
import { useFetchContractDetailsQuery } from "@/Store/services/contractApi";
import { useGetUserDetailsQuery } from "@/Store/services/authApi";
import { storeLocalData, getLocalData } from "@/utils";

import { useAppContext } from "@/contexts/App";

const ContractProcessingForm: FC = () => {
  const { isMobile } = useAppContext();
  const [response, setResponse] = useState(null); // State to store the response data
  const [currentComponent, setCurrentComponent] = useState(1);
  const [previousComponent, setPreviousComponent] = useState<number | null>(
    null
  );

  const contractId = getLocalData("contract_id");
  const { data: contractDetails } = useFetchContractDetailsQuery(contractId, {
    skip: !contractId,
  });
  const { data: userDetails } = useGetUserDetailsQuery();
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();

  const path = usePathname();
  const dashboard = path.includes("dashboard");
  function handleClick() {
    return dashboard;
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roleType = userDetails?.id === contractDetails?.buyerId;
  console.log(roleType);

  const handleCopyText = (event: any) => {
    const textToCopy = event.target.previousSibling.textContent.trim();
    navigator.clipboard

      .writeText(textToCopy)
      .then(() => alert("Copied to clipboard"))
      .catch((error) => console.error("Failed to copy:", error));
  };
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
  const createdAtISO = contractDetails?.createdAt || "";

  const date = new Date(createdAtISO);
  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "short",
  })}, ${date.getFullYear()}`;

  const isBuyer = userDetails?.id === contractDetails?.buyerId;
  const isContractCompleted = contractDetails?.status === "COMPLETED";

  const handlePreviousComponent = () => {
    if (previousComponent !== null) {
      const newCurrentComponent = previousComponent;
      const newPreviousComponent = newCurrentComponent - 1;
      setCurrentComponent(newCurrentComponent);
      setPreviousComponent(
        newPreviousComponent >= 1 ? newPreviousComponent : null
      );
    }
  };

  const handleNextComponent = () => {
    setPreviousComponent(currentComponent);
    setCurrentComponent(currentComponent + 1);
  };
  const handleResponse = (responseData: any) => {
    setResponse(responseData);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 1:
        return <Deposit onNext={handleNextComponent} />;
      case 2:
        return (
          <TransferAmount
            onNext={handleNextComponent}
            onBack={handlePreviousComponent}
          />
        );
      case 3:
        return (
          <BankLocation
            onNext={handleNextComponent}
            onBack={handlePreviousComponent}
            onResponse={handleResponse}
          />
        );
      case 4:
        return (
          <BankDetails
            onNext={handleNextComponent}
            onBack={handlePreviousComponent}
            responseGet={response}
          />
        );
      case 5:
        return contractDetails?.contractPayments?.paymentStatus ===
          "DEPOSITED" ? (
          <SuccessfulDeposit onNext={handleNextComponent} />
        ) : (
          <PendingDeposit />
        );

      default:
        return null;
    }
  };

  // console.log("-----contract details----------", contractDetails?.paymentStatus);
  return (
    <Flex vertical className="w-full">
      <VerifyProfileBar />

      {/* -------------------------Useful Code---------------------------------- */}

      <Flex className="w-full">
        <div className={styles.agreementContainer}>
          <>
            <Flex vertical style={{ width: "100%" }}>
              <Title level={screens["sm"] ? 2 : 3}>
                {contractDetails?.contractName || ""}
              </Title>
              <div className={styles.flexTransaction}>
                {/* <span className={styles.transactionText}> */}
                Transaction #10942007
                {/* </span> */}
                {/* <span> */}
                <Image
                  className={styles.copyIcon}
                  src={CopyIcon}
                  alt="copy icon"
                  onClick={handleCopyText}
                />
                {/* </span> */}
              </div>
            </Flex>

            <Flex style={{ width: "100%" }}>
              <div className={styles.boxesAgreement}>
                <div className={styles.detailBox}>
                  <div>
                    <Image src={UserIcon} alt="user icon" />
                  </div>
                  <div className={styles.center}>
                    {roleType ? "Buyer" : "Seller"}
                  </div>
                </div>
                <div className={styles.detailBox}>
                  <div>
                    <Image src={CalenderIcon} alt="calendar icon" />
                  </div>
                  <div className={styles.center}>Created {formattedDate}</div>
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
            </Flex>
          </>
        </div>
      </Flex>

      <div>
        <div className={styles.transactionDetails}>
          <span style={{ color: "#006ACC" }}>example@gmail.com</span> is buying
          a <span style={{ fontWeight: "600" }}>domain name</span> from
          <span style={{ color: "#006ACC" }}> name@gmail.com.</span>
          <br /> The{" "}
          <span style={{ fontWeight: "600" }}>inspection period</span> for this
          transaction is{" "}
          <span style={{ fontWeight: "600" }}>3 calendar days.</span>
        </div>
      </div>

      {/* stepper added */}
      <Flex vertical align="center">
        <Stepper />
        <Flex
          vertical
          align="center"
          style={{ width: "100%", padding: "0 24px" }}
        >
          {isMobile && (
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
          {isBuyer && isContractCompleted ? (
            <>
              {renderComponent()}
              <StepAgreement contractDetails={contractDetails} />
            </>
          ) : (
            <StepAgreement contractDetails={contractDetails} />
          )}
          {/*    
                                   
                                    <SuccessfulDeposit />
                                    <Inspection />
                                    <DisputOpened />
                                    <Invoice /> 
                              */}
          {/* --------------------------------------- */}
          {/* -----------------SELLER FLOW -------------------------- */}
          {/* <SetupWithDrawl /> */}
          {/* <AddWithDrawl /> */}
          {/* <AddWithDrawlDisbursement /> */}
          {/*  <WithDrawlMethod />
                                          <WithDrawlBuyerWaiting />
                                          <InspectedPeriod />
                                          <DisputOpened />
                                          <Invoice />
                                          <FundsReleased />  */}

          {/* ---Agreement form--- */}
          {/* <ConfirmContractCancellation closeModal={closeModal} /> */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ContractProcessingForm;
