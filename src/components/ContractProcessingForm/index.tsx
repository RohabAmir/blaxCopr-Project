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
      const contractId = getLocalData("contract_id");
      const { data: contractDetails } = useFetchContractDetailsQuery(
            contractId,
            {
                  skip: !contractId, // Skip querying if no ID
            }
      );
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
      const roleType = userDetails?.id === contractDetails?.buyerId;

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

      // Assuming contractDetails.createdAt holds the API response date-time string
      const createdAtISO = contractDetails?.createdAt || "";

      // Parsing the ISO date string into a Date object
      const date = new Date(createdAtISO);

      // Formatting the date
      const formattedDate = `${date.getDate()} ${date.toLocaleString(
            "default",
            { month: "short" }
      )}, ${date.getFullYear()}`;

      // Determine if the user is a seller and if the contract is completed
      const isSeller = userDetails?.id === contractDetails?.sellerId;
      const isContractCompleted = contractDetails?.status === "COMPLETED";

      // Determine the current step for the stepper
      let currentStep = 0; // Default to the first step
      if (isSeller && isContractCompleted) {
            currentStep = 2; // Assuming the payment step is the 4th step (index 3)
      }

      const renderComponent = () => {
            switch (currentComponent) {
                  case 1:
                        return <SetupWithDrawl onNext={handleNextComponent} />;
                  case 2:
                        return (
                              <AddWithDrawlDisbursement
                                    onNext={handleNextComponent}
                                    onBack={handlePreviousComponent}
                              />
                        );
                  case 3:
                        return (
                              <WithDrawlMethod
                                    onNext={handleNextComponent}
                                    onBack={handlePreviousComponent}
                              />
                        );
                  case 4:
                        return (
                              <WithDrawlMethod
                                    onNext={handleNextComponent}
                                    onBack={handlePreviousComponent}
                              />
                        );
                  default:
                        return null;
            }
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

      return (
            <Flex vertical className="w-full">
                  <VerifyProfileBar />

                  {/* -------------------------Useful Code---------------------------------- */}

                  <Flex className="w-full">
                        <div className={styles.agreementContainer}>
                              <>
                                    <Flex vertical style={{ width: "100%" }}>
                                          <Title level={screens["sm"] ? 2 : 3}>
                                                {contractDetails?.contractName ||
                                                      ""}
                                          </Title>
                                          <div
                                                className={
                                                      styles.flexTransaction
                                                }
                                          >
                                                <span
                                                      className={
                                                            styles.transactionText
                                                      }
                                                >
                                                      Transaction #10942007
                                                </span>
                                                <span>
                                                      <Image
                                                            className={
                                                                  styles.copyIcon
                                                            }
                                                            src={CopyIcon}
                                                            alt="copy icon"
                                                      />
                                                </span>
                                          </div>
                                    </Flex>

                                    <Flex style={{ width: "100%" }}>
                                          <div
                                                className={
                                                      styles.boxesAgreement
                                                }
                                          >
                                                <div
                                                      className={
                                                            styles.detailBox
                                                      }
                                                >
                                                      <div>
                                                            <Image
                                                                  src={UserIcon}
                                                                  alt="user icon"
                                                            />
                                                      </div>
                                                      <div
                                                            className={
                                                                  styles.center
                                                            }
                                                      >
                                                            {roleType
                                                                  ? "Buyer"
                                                                  : "Seller"}
                                                      </div>
                                                </div>
                                                <div
                                                      className={
                                                            styles.detailBox
                                                      }
                                                >
                                                      <div>
                                                            <Image
                                                                  src={
                                                                        CalenderIcon
                                                                  }
                                                                  alt="calendar icon"
                                                            />
                                                      </div>
                                                      <div
                                                            className={
                                                                  styles.center
                                                            }
                                                      >
                                                            Created{" "}
                                                            {formattedDate}
                                                      </div>
                                                </div>

                                                <div
                                                      className={
                                                            styles.detailBox
                                                      }
                                                      onClick={openModal}
                                                >
                                                      <div
                                                            className={
                                                                  styles.crossBox
                                                            }
                                                      >
                                                            <Image
                                                                  className={
                                                                        styles.xIcon
                                                                  }
                                                                  src={XIcon}
                                                                  alt="X icon"
                                                            />
                                                      </div>
                                                      <div
                                                            className={
                                                                  styles.center
                                                            }
                                                      >
                                                            Cancel contract{" "}
                                                      </div>
                                                </div>
                                                {isModalOpen && (
                                                      <ConfirmContractCancellation
                                                            closeModal={
                                                                  closeModal
                                                            }
                                                      />
                                                )}
                                          </div>
                                    </Flex>
                              </>
                        </div>
                  </Flex>

                  <div>
                        <div className={styles.transactionDetails}>
                              <span style={{ color: "#006ACC" }}>
                                    example@gmail.com
                              </span>{" "}
                              is buying a{" "}
                              <span style={{ fontWeight: "600" }}>
                                    domain name
                              </span>{" "}
                              from
                              <span style={{ color: "#006ACC" }}>
                                    {" "}
                                    name@gmail.com.
                              </span>
                              <br /> The{" "}
                              <span style={{ fontWeight: "600" }}>
                                    inspection period
                              </span>{" "}
                              for this transaction is{" "}
                              <span style={{ fontWeight: "600" }}>
                                    3 calendar days.
                              </span>
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

                              {/* agrrement buyer components */}
                              {/* ------------------------------------ */}
                              {/*   <Deposit />
                                    <TransferAmount />
                                    <BankLocation />
                                    <BankDetails />
                                    <PendingDeposit />
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
                              {/* <WithDrawlMethod /> */}
                              {/* <WithDrawlBuyerWaiting /> */}
                              {/* <InspectedPeriod /> */}
                              {/* <DisputOpened /> */}
                              {/* <Invoice /> */}
                              {/* <FundsReleased />  */}

                              {/* ---Agreement form--- */}
                              {/* <ConfirmContractCancellation closeModal={closeModal} /> */}
                              {/* <StepAgreement
                                    contractDetails={contractDetails}
                              /> */}
                              {isSeller && isContractCompleted ? (
                                    <>
                                          <Stepper currentStep={2} />
                                          {/* Render Seller Flow Components */}
                                          {renderComponent()}

                                          {/* Show StepAgreement component only if currentComponent is not case 2 */}
                                          {currentComponent !== 2 &&  (
                                                <StepAgreement
                                                      contractDetails={
                                                            contractDetails
                                                      }
                                                />
                                          )}
                                    </>
                              ) : (
                                    <>
                                          {/* Render StepAgreement Component */}
                                          <Stepper currentStep={1} />
                                          <StepAgreement
                                                contractDetails={
                                                      contractDetails
                                                }
                                          />
                                    </>
                              )}
                        </Flex>
                  </Flex>
            </Flex>
      );
};

export default ContractProcessingForm;
