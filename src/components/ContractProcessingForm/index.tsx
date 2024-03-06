"use client";
import { Flex, Grid } from "antd";
import React, { FC, ReactNode, useEffect } from "react";
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
import ConfirmContractCancellation from "./ConfirmContractCancellation";
import { useState } from "react";
import { useFetchContractDetailsQuery } from "@/Store/services/contractApi";
import { useGetUserDetailsQuery } from "@/Store/services/authApi";
import { storeLocalData, getLocalData } from "@/utils";

import { useRouter } from "next/navigation";

import { useAppContext } from "@/contexts/App";
import Dispute from "../../app/(dashboard)/dispute/page";

const ContractProcessingForm: FC = () => {
  const router = useRouter();
  const { isMobile } = useAppContext();
  const contractId = getLocalData("contract_id");
  const { data: userDetails } = useGetUserDetailsQuery();
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();

  const path = usePathname();
  const dashboard = path.includes("dashboard");
  function handleClick() {
    return dashboard;
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(1);
  const [previousComponent, setPreviousComponent] = useState<number | null>(
    null
  );
  const [response, setResponse] = useState(null);
  const [withDrawlMethod, setWithDrawlMethod] = useState(false);
  const [inspectionPeriod, setinspectionPeriod] = useState(false);
  const [dispute, setDispute] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [isDepositSuccessful, setIsDepositSuccessful] = useState(false);
  const [goInvoice, setGoInvoice] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [inspection, setInspection] = useState(false);

  const {
    data: contractDetails,
    refetch: refetchContractDetails,
    isFetching: isFetchingContractDetails,
  } = useFetchContractDetailsQuery(contractId, {
    skip: !contractId, // Skip querying if no ID
  });

  const roleType = userDetails?.id === contractDetails?.buyerId;

  useEffect(() => {
    // Refetch contract details when contractId changes
    if (contractId) {
      refetchContractDetails();
    }
  }, [contractId, refetchContractDetails]);

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

  // Parsing the ISO date string into a Date object
  const createdAtISO = contractDetails?.createdAt || "";
  const date = new Date(createdAtISO);
  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "short",
  })}, ${date.getFullYear()}`;
  const handleCopyText = (event: any) => {
    const textToCopy = event.target.previousSibling.textContent.trim();
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => alert("Copied to clipboard"))
      .catch((error) => console.error("Failed to copy:", error));
  };
  const handlePreviousComponent = () => {
    if (previousComponent !== null) {
      setCurrentComponent(previousComponent);
      setPreviousComponent(null);
    }
  };
  const handleNextComponent = () => {
    setPreviousComponent(currentComponent);
    setCurrentComponent(currentComponent + 1);
  };

  const handleResponse = (responseData: any) => {
    setResponse(responseData);
  };

  // Determine the current step for the stepper based on `currentComponent`
  const DetermineCurrentStep = () => {
    let currentStep;
    switch (currentComponent) {
      case 1:
        currentStep = 0; // Corresponds to 'Create'
        break;
      case 2:
        currentStep = 1; // Corresponds to 'Agreement'
        break;
      case 3:
        currentStep = 2; // Corresponds to 'Payment'
        break;
      case 4:
        currentStep = 3; // Corresponds to 'Transfer'
        break;
      case 5:
        currentStep = 4; // Corresponds to 'Inspection'
        break;
      case 6:
        currentStep = 4; // Corresponds to 'Inspection'
        break;
      case 7:
        currentStep = 5; // Corresponds to 'closed'
        break;
    }
  };

  const isSeller = userDetails?.id === contractDetails?.sellerId;
  const isBuyer = userDetails?.id === contractDetails?.buyerId;
  const isContractCompleted =
    contractDetails?.status === "COMPLETED" ||
    contractDetails?.status === "DELIVERED" ||
    contractDetails?.status === "RECEIVED" ||
    contractDetails?.status === "DISPUTE" ||
    contractDetails?.status === "APPROVE";

  useEffect(() => {
    // Combined effects for both buyer and seller
    if (
      contractDetails?.status === "DELIVERED" &&
      contractDetails?.contractPayments?.paymentStatus === "DEPOSITED"
    ) {
      setWithDrawlMethod(true);
    }
    if (
      contractDetails?.status === "RECEIVED" &&
      contractDetails?.contractPayments?.paymentStatus === "DEPOSITED"
    ) {
      setinspectionPeriod(true);
    }
    if (
      contractDetails?.status === "DISPUTE" &&
      contractDetails?.contractPayments?.paymentStatus === "DEPOSITED"
    ) {
      setDispute(true);
    }
    if (
      contractDetails?.status === "APPROVE" &&
      contractDetails?.contractPayments?.paymentStatus === "DEPOSITED"
    ) {
      setInvoice(true);
    }
    if (
      contractDetails?.status === "DELIVERED" &&
      contractDetails?.contractPayments?.paymentStatus === "DEPOSITED"
    ) {
      setIsDepositSuccessful(true);
    }
    if (
      contractDetails?.status === "RECEIVED" &&
      contractDetails?.contractPayments?.paymentStatus === "DEPOSITED"
    ) {
      setInspection(true);
    }
    if (
      contractDetails?.status === "DISPUTE" &&
      contractDetails?.contractPayments?.paymentStatus === "DEPOSITED"
    ) {
      setOpenMessage(true);
    }
    if (
      contractDetails?.status === "APPROVE" &&
      contractDetails?.contractPayments?.paymentStatus === "DEPOSITED"
    ) {
      setGoInvoice(true);
    }
  }, [
    contractDetails?.contractPayments?.paymentStatus,
    contractDetails?.status,
  ]);

  const renderSellerComponents = () => {
    if (withDrawlMethod) {
      return (
        <>
          {!isMobile && <Stepper currentStep={3} />}
          <WithDrawlBuyerWaiting
            onNext={handleNextComponent}
            contractDetails={contractDetails}
          />
        </>
      );
    } else if (inspectionPeriod) {
      return (
        <>
          {!isMobile && <Stepper currentStep={4} />}
          <InspectedPeriod
            onNext={handleNextComponent}
            contractDetails={contractDetails}
          />
        </>
      );
    } else if (dispute) {
      return (
        <>
          {!isMobile && <Stepper currentStep={4} />}
          <DisputOpened />
        </>
      );
    } else if (invoice) {
      return (
        <>
          {!isMobile && <Stepper currentStep={5} />}
          <Invoice />
        </>
      );
    } else {
      switch (currentComponent) {
        case 1:
          return (
            <>
              {!isMobile && <Stepper currentStep={2} />}
              <SetupWithDrawl
                onNext={handleNextComponent}
                contractDetails={contractDetails}
              />
            </>
          );
        case 2:
          return (
            <>
              {!isMobile && <Stepper currentStep={2} />}
              <AddWithDrawlDisbursement
                onNext={handleNextComponent}
                onBack={handlePreviousComponent}
              />
            </>
          );
        case 3:
          return (
            <>
              {!isMobile && <Stepper currentStep={3} />}
              <WithDrawlMethod
                onNext={handleNextComponent}
                contractDetails={contractDetails}
              />
            </>
          );
        case 4:
          return (
            <>
              {!isMobile && <Stepper currentStep={3} />}
              <WithDrawlBuyerWaiting
                onNext={handleNextComponent}
                contractDetails={contractDetails}
              />
            </>
          );
        case 5:
          return (
            <>
              {!isMobile && <Stepper currentStep={4} />}
              <InspectedPeriod
                onNext={handleNextComponent}
                contractDetails={contractDetails}
              />
            </>
          );
        case 6:
          return (
            <>
              {!isMobile && <Stepper currentStep={4} />}
              <DisputOpened />
            </>
          );
        case 7:
          return (
            <>
              {!isMobile && <Stepper currentStep={5} />}
              <Invoice />
            </>
          );
        default:
          return null;
      }
    }
  };

  const renderBuyerComponents = () => {
    if (isDepositSuccessful) {
      return (
        <>
          {!isMobile && <Stepper currentStep={3} />}
          <SuccessfulDeposit onNext={handleNextComponent} />;
        </>
      );
    } else if (inspection) {
      return (
        <>
          {!isMobile && <Stepper currentStep={4} />}
          <Inspection onNext={handleNextComponent} />
        </>
      );
    } else if (goInvoice) {
      return (
        <>
          {!isMobile && <Stepper currentStep={5} />}
          <Invoice />
        </>
      );
    } else if (openMessage) {
      return (
        <>
          {!isMobile && <Stepper currentStep={4} />}
          <DisputOpened />
        </>
      );
    } else {
      switch (currentComponent) {
        case 1:
          return (
            <>
              {!isMobile && <Stepper currentStep={2} />}
              <Deposit onNext={handleNextComponent} />
            </>
          );
        case 2:
          return (
            <>
              {!isMobile && <Stepper currentStep={2} />}
              <TransferAmount
                onNext={handleNextComponent}
                onBack={handlePreviousComponent}
              />
            </>
          );
        case 3:
          return (
            <>
              {!isMobile && <Stepper currentStep={2} />}
              <BankLocation
                onNext={handleNextComponent}
                onBack={handlePreviousComponent}
                onResponse={handleResponse}
              />
            </>
          );
        case 4:
          return (
            <>
              {!isMobile && <Stepper currentStep={2} />}
              <BankDetails
                onNext={handleNextComponent}
                onBack={handlePreviousComponent}
                responseGet={response}
              />
            </>
          );
        case 5:
          return (
            <>
              {!isMobile && <Stepper currentStep={2} />}
              <PendingDeposit />
            </>
          );
        default:
          return null;
      }
    }
  };

  const renderComponents = (): React.ReactNode => {
    const currentStep = DetermineCurrentStep();

    if (isSeller && isContractCompleted) {
      // Render components specific to the seller's flow when the contract is completed
      return (
        <>
          {renderSellerComponents()}
          {currentComponent !== 2 && (
            <StepAgreement contractDetails={contractDetails} refetchContractDetails={refetchContractDetails} />
          )}
        </>
      );
    } else if (isBuyer && isContractCompleted) {
      // Render components specific to the buyer's flow when the contract is completed
      return (
        <>
          {renderBuyerComponents()}
          {currentComponent !== 2 && currentComponent !== 3 && currentComponent!==4 && (
            <StepAgreement contractDetails={contractDetails} refetchContractDetails={refetchContractDetails} />
          )}

        </>
      );
    } else {
      // Default rendering for the StepAgreement component
      return (
        <>
          {!isMobile && <Stepper currentStep={1} />}
          <StepAgreement contractDetails={contractDetails} refetchContractDetails={refetchContractDetails} />
        </>
      );
    }
  };

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
                <span className={styles.transactionText}>
                  Transaction #10942007
                </span>
                <span>
                  <Image
                    className={styles.copyIcon}
                    src={CopyIcon}
                    alt="copy icon"
                    onClick={handleCopyText}
                  />
                </span>
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

          {renderComponents()}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default ContractProcessingForm;
