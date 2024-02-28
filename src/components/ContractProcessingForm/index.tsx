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
import { useRouter } from "next/router";
import ConfirmContractCancellation from "./ConfirmContractCancellation";
import { useState } from "react";
import { useFetchContractDetailsQuery } from "@/Store/services/contractApi";
import { useGetUserDetailsQuery } from "@/Store/services/authApi";
import { storeLocalData, getLocalData } from "@/utils";

import { useAppContext } from "@/contexts/App";

const ContractProcessingForm: FC = () => {
  const { isMobile } = useAppContext();
  const [response, setResponse] = useState(null);
  const [currentComponent, setCurrentComponent] = useState(1);
  const [isDepositSuccessful, setIsDepositSuccessful] = useState(false);

  const [previousComponent, setPreviousComponent] = useState<number | null>(
    null
  );

  const contractId = getLocalData("contract_id");
  const {
    data: contractDetails,
    refetch: refetchContractDetails,
    isFetching: isFetchingContractDetails,
  } = useFetchContractDetailsQuery(contractId, {
    skip: !contractId, // Skip querying if no ID
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
  // console.log(roleType);

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
  const isContractCompleted =
    contractDetails?.status === "COMPLETED" ||
    contractDetails?.status === "DELIVERED" ||
    contractDetails?.status === "RECEIVED" ||
    contractDetails?.status === "DISPUTE" ||
    contractDetails?.status === "APPROVE";

  let currentStep;
  switch (currentComponent) {
    case 1:
      currentStep = 0;
      break;
    case 2:
      currentStep = 1;
      break;
    case 3:
      currentStep = 2;
      break;
    case 4:
      currentStep = 3;
    case 5:
      currentStep = 4;
      break;
  }
  if (isBuyer && isContractCompleted) {
    currentStep = 2;
  }
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
  const [newContractDetails, setContractDetails] = useState(null);

  const handleStatusChange = (newDetails: any) => {
    setContractDetails(newDetails); // Update the state with new details
  };

  const handleNextComponent = () => {
    setPreviousComponent(currentComponent);
    setCurrentComponent(currentComponent + 1);
  };
  const handleResponse = (responseData: any) => {
    setResponse(responseData);
  };

  const handleReceived = () => {
    console.log("Before updating inspection:", inspection);
    setinspection(true);
    console.log("After updating inspection:", inspection);
  };

  const [inspection, setinspection] = useState(false);
  const [goInvoice, setGoInvoice] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  useEffect(() => {
    if (contractId) {
      refetchContractDetails();
    }
  }, [contractId, refetchContractDetails]);

  useEffect(() => {
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
      setinspection(true);
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
  }, [contractDetails]);

  const renderComponentsBuyer = () => {
    if (isDepositSuccessful) {
      return (
        <>
          <Stepper currentStep={3} />
          <SuccessfulDeposit onNext={handleReceived} />;
        </>
      );
    } else if (inspection) {
      return (
        <>
          <Stepper currentStep={4} />
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
          <Stepper currentStep={4} />
          <DisputOpened />
        </>
      );
    } else {
      switch (currentComponent) {
        case 1:
          return (
            <>
              <Stepper currentStep={2} />
              <Deposit onNext={handleNextComponent} />
            </>
          );
        case 2:
          return (
            <>
              <Stepper currentStep={2} />

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
              <Stepper currentStep={2} />

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
              <Stepper currentStep={2} />
              <PendingDeposit />
            </>
          );

        default:
          return null;
      }
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
        {/* <Stepper /> */}
        <Flex
          vertical
          align="center"
          style={{ width: "100%" }}
          // style={{ width: "100%", padding: "0 24px" }}
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

          {isBuyer && isContractCompleted ? (
            <>
              {renderComponentsBuyer()}
              {currentComponent !== 2 && (
                <StepAgreement contractDetails={contractDetails} />
              )}
            </>
          ) : (
            <>
              <Stepper currentStep={1} />
              <StepAgreement contractDetails={contractDetails} />
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ContractProcessingForm;
