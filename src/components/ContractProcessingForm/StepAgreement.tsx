import React, { FC, ReactNode, useState, useCallback, useEffect } from "react";
import styles from "./style.module.scss";
import { FormSection, VerifyProfileBar } from "../Shared";
import { Flex, Row, Col, Grid } from "antd";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import Image from "next/image";
import DownloadIcon from "../../../public/icons/Download.svg";
import ConfirmContractReview from "../Shared/Modals/ConfirmContractReview";
import InviteSeller from "../Shared/Modals/InviteSeller";
import { useGetUserDetailsQuery } from "@/Store/services/authApi";
import { useAppContext } from "@/contexts/App";
import { useSelector } from "react-redux";
import { getLocalData } from "@/utils";
import { RootState } from "@reduxjs/toolkit/query";
import { useRouter, useSearchParams } from "next/navigation";
import { useUpdateContractDetailsMutation } from "@/Store/services/contractApi";
import { useCompleteContractDetailsMutation } from "@/Store/services/contractApi";
import { toast } from "react-toastify";
import { calculateTransactionSummary } from "@/utils/CalculateSummary";
import Stepper from "./Stepper";
import SetupWithDrawl from "./seller/SetupWithdrawl";

interface stepAgreementProps {
  contractDetails: any;
  refetchContractDetails : any;
}

interface SignatureState {
  firstPartySigned: boolean;
  secondPartySigned: boolean;
}

interface ContractDetails {
  buyerSign?: string | null;
  sellerSign?: string | null;
  // Add other necessary fields
}

const StepAgreement: FC<stepAgreementProps> = ({ contractDetails, refetchContractDetails }) => {
  const contractId = getLocalData("contract_id");
  const { data: userDetails } = useGetUserDetailsQuery();
  console.log("contractDetails>>>", contractDetails);
  const [updateContractDetails, { isLoading }] =
    useUpdateContractDetailsMutation();
  const [completeContractDetails, { isLoading: isCompleting }] =
    useCompleteContractDetailsMutation();
  const [Details, setDetails] = useState(contractDetails);
  const router = useRouter();
  const { isMobile } = useAppContext();
  const searchParams = useSearchParams();
  const [subTotal, setSubTotal] = useState<number>(0);
  const [buyerPrice, setBuyerPrice] = useState<number>(0);
  const [escrowFee, setEscrowFee] = useState<number>(0);
  const [modalState, setModalState] = useState({
    buyer: false,
    seller: false,
  });

  // Add state variables to track signatures and edits
  const [firstPartySigned, setFirstPartySigned] = useState(false);
  const [secondPartySigned, setSecondPartySigned] = useState(false);
  const [isEditedAfterSign, setIsEditedAfterSign] = useState(false);
  const [isEditedBeforeSign, setIsEditedBeforeSign] = useState(
    searchParams.get("editing") ? true : false
  );

  const roleType = userDetails?.id === contractDetails?.buyerId;
  const isContractSignedByBoth = firstPartySigned && secondPartySigned;
  const isContractKeysAvailable =
    contractDetails?.buyerSign && contractDetails?.sellerSign;
  const isNextButtonEnabled = isContractSignedByBoth && isContractKeysAvailable;

  // Determine if the user is not the seller or if the contract is not completed
  const isNotSellerOrContractNotCompleted =
    userDetails?.id !== contractDetails?.sellerId ||
    contractDetails?.status !== "COMPLETED";

  // Determine if both parties are involved in the contract
  const bothPartiesInvolved = contractDetails?.buyerId && contractDetails?.sellerId;
  const bothPartiesSigned = contractDetails?.buyerSign && contractDetails?.sellerSign

  const handleNextButtonClick = async () => {
    try {
      const payload = {
        contract: {
          status: "COMPLETED",
        },
      };
      await completeContractDetails({
        id: contractId,
        ...payload,
      }).unwrap();
      toast.success("Moving To Payment Flow");
      // Delay before navigating to payment
      setTimeout(() => {
        refetchContractDetails();
      }, 1000);
    } catch (error) {
      // Handle error here, perhaps with a toast notification
      toast.error("Error completing contract.");
    }
  };

  const handleContractUpdate = (updatedContractDetails: {
    buyerSign: any;
    sellerSign: any;
  }) => {
    setDetails(updatedContractDetails);
    // Now, re-evaluate the signature and editing state based on updated details
    const firstPartySigned = !!updatedContractDetails.buyerSign;
    const secondPartySigned = !!updatedContractDetails.sellerSign;
    setFirstPartySigned(firstPartySigned);
    setSecondPartySigned(secondPartySigned);
    setIsEditedAfterSign(!(firstPartySigned || secondPartySigned)); // Assuming you want to lock edits if any party has signed
  };

  useEffect(() => {
    // Check if buyerSign or sellerSign exist in the contractDetails
    const firstPartySigned = !!contractDetails?.buyerSign;
    const secondPartySigned = !!contractDetails?.sellerSign;
    setFirstPartySigned(firstPartySigned);
    setSecondPartySigned(secondPartySigned);

    // Disable editing if the current user's corresponding signature exists
    const currentUserRoleType =
      userDetails?.id === contractDetails?.buyerId ? "buyer" : "seller";
    const editDisabled =
      (currentUserRoleType === "buyer" && firstPartySigned) ||
      (currentUserRoleType === "seller" && secondPartySigned);
    setIsEditedAfterSign(editDisabled);
  }, [contractDetails, searchParams, userDetails]);

  const openModal = (modalType: string) => {
    setModalState({ ...modalState, [modalType]: true });
    document.body.style.overflow = "hidden";
    document.body.style.zIndex = "-1";
    document.body.style.background = "rgba(0, 0, 0, 0.30)";
  };

  const closeModal = (modalType: string) => {
    setModalState({ ...modalState, [modalType]: false });
    document.body.style.background = "#fff";
    document.body.style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
  };

  const handleEditClickDocuments = () => {
    setIsEditedBeforeSign(true);
    router.push("/contract-form?page=compliance&editing=true");
  };
  const handleEditClickAggreement = () => {
    setIsEditedBeforeSign(true);
    router.push("/contract-form?page=create&editing=true");
  };
  const handleEditClickTransaction = () => {
    setIsEditedBeforeSign(true);
    router.push("/contract-form?page=details&editing=true");
  };

  const extractFileName = (url: string) => {
    const matches = url.match(/\/([^\/\?]+)/);
    return matches && matches[1] ? matches[1] : "Unknown Document";
  };

  const downloadFile = (fileUrl: string, fileName: string) => {
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = fileName || "downloadedFile";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  useEffect(() => {
    if (contractDetails) {
      const transactions = contractDetails.transactions.map((t: any) => ({
        price: t.price.toString(),
        category: t.category,
      }));
  
      const shippingCostInput = contractDetails.shipping?.shippingCost?.toString() || "0";
      const collectionServiceUpgrade = !!contractDetails.shipping?.collectionServiceUpgrade;
      const lienHolderUpgrade = !!contractDetails.shipping?.lienHolderUpgrade;
      const escrowFeePaidBy = contractDetails.shipping?.escrowFeePaidBy || "";
  
      // Call your utility function
      const summary = calculateTransactionSummary(
        transactions,
        shippingCostInput,
        collectionServiceUpgrade,
        lienHolderUpgrade,
        escrowFeePaidBy
      );
  
      // Update state with the results
      setSubTotal(summary.subTotal);
      setBuyerPrice(summary.buyerPrice);
      setEscrowFee(summary.escrowFee);
    }
  }, [contractDetails]);
  



  return (
    <>
      <div className={styles.agreementMain}>
        {!isMobile && isNotSellerOrContractNotCompleted && (
          <>
           {!bothPartiesSigned && (
             <Flex vertical className="w-full">
             <FormSection title="Agreement">
               <div className={styles.main}>
                 <div
                   className={styles.flexText}
                   onClick={() => openModal("buyer")}
                 >
                   <p className={styles.textHeading}>
                     {roleType ? "Buyer signs here " : "Seller signs here"}
                   </p>

                   <Button
                     name="Review & Sign"
                     type={ButtonType.Primary}
                     size={isMobile ? "small" : "large"}
                   />
                 </div>
                 {modalState.buyer && (
                   <ConfirmContractReview
                     userDetails={userDetails}
                     contractDetails={contractDetails}
                     onContractUpdate={handleContractUpdate}
                     firstPartySigned={firstPartySigned}
                     secondPartySigned={secondPartySigned}
                     isEditedBeforeSign={isEditedBeforeSign}
                     closeModal={() => closeModal("buyer")}
                   />
                 )}
               </div>
             </FormSection>
           </Flex>
           )}
            {!bothPartiesInvolved && (
              <Flex
                vertical
                className="w-full"
                style={{ marginBottom: "24px" }}
              >
                <FormSection>
                  <div className={styles.main}>
                    <div
                      className={styles.flexText}
                      onClick={() => openModal("seller")}
                    >
                      <p className={styles.textHeading}>
                        {roleType ? "Seller signs here " : "Buyer signs here"}
                      </p>

                      <Button
                        name={roleType ? "Invite Seller " : "Invite Buyer"}
                        type={ButtonType.Secondary}
                        size={isMobile ? "small" : "large"}
                      />
                    </div>
                    {modalState.seller && (
                      <InviteSeller
                        contractDetails={contractDetails}
                        userDetails={userDetails}
                        closeModal={() => closeModal("seller")}
                      />
                    )}
                  </div>
                </FormSection>
              </Flex>
            )}
          </>
        )}

        {/* Review contract details */}

        <Flex vertical className="w-full">
          <FormSection title="Review the contract details">
            <div className={styles.main}>
              <div className={styles.flexText}>
                <p className={styles.textHeading}>Document uploaded</p>

                <Button
                  name="Edit"
                  type={ButtonType.Primary}
                  size={isMobile ? "small" : "large"}
                  onClickHandler={
                    !isEditedAfterSign ? handleEditClickDocuments : () => {}
                  }
                  customDisabled={isEditedAfterSign}
                />
              </div>
            </div>
            {contractDetails?.documents?.map(
              (
                document: {
                  id: React.Key | null | undefined;
                  document: string;
                },
                ind: number
              ) => (
                <div key={document.id} className={styles.main}>
                  <div className={styles.flexTextColor}>
                    <p className={styles.subHeading}>
                      {extractFileName(document.document)}
                    </p>

                    <Image
                      className={styles.icon}
                      src={DownloadIcon}
                      alt="download icon"
                      onClick={() =>
                        downloadFile(
                          document.document,
                          extractFileName(document.document)
                        )
                      }
                    />
                  </div>
                </div>
              )
            )}
          </FormSection>
        </Flex>

        {/* agreement Details  */}

        <Flex vertical className="w-full">
          <FormSection>
            <div className={styles.main}>
              <div className={styles.flexText}>
                <p className={styles.textHeading}>Agreement details</p>

                <Button
                  name="Edit"
                  type={ButtonType.Primary}
                  size={isMobile ? "small" : "large"}
                  onClickHandler={
                    !isEditedAfterSign ? handleEditClickAggreement : () => {}
                  }
                  customDisabled={isEditedAfterSign}
                />
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Contract name</p>
                <p className={styles.textHeadingDetails}>
                  {contractDetails?.contractName || ""}
                </p>
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Role</p>
                <p className={styles.textHeadingDetails}>
                  {contractDetails?.createrRole || ""}
                </p>
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Currency</p>
                <p className={styles.textHeadingDetails}>
                  {contractDetails?.currency || ""}
                </p>
              </div>
            </div>{" "}
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Inspection period</p>
                <p className={styles.textHeadingDetails}>
                  {contractDetails?.inspectionPeriod || ""}
                </p>
              </div>
            </div>
          </FormSection>
        </Flex>

        {/* Transaction Details */}

        <Flex vertical className="w-full">
          {contractDetails?.transactions?.map(
            (
              transaction: {
                description: ReactNode;
                category: ReactNode;
                price: ReactNode;
                itemName: ReactNode;
                id: any;
              },
              index: any
            ) => (
              <FormSection key={transaction.id || index}>
                <div className={styles.main}>
                  <div className={styles.flexText}>
                    <p className={styles.textHeading}>Transaction details</p>
                    <Button
                      name="Edit"
                      type={ButtonType.Primary}
                      size={isMobile ? "small" : "large"}
                      onClickHandler={
                        !isEditedAfterSign
                          ? handleEditClickTransaction
                          : () => {}
                      }
                      customDisabled={isEditedAfterSign}
                    />
                  </div>
                  <div className={styles.main}>
                    <div className={styles.flexTextColor}>
                      <p className={styles.subHeading}>Item name</p>
                      <p className={styles.textHeadingDetails}>
                        {transaction.itemName}
                      </p>
                    </div>
                  </div>
                  <div className={styles.main}>
                    <div className={styles.flexTextColor}>
                      <p className={styles.subHeading}>Price (USD)</p>
                      <p className={styles.textHeadingDetails}>
                        {transaction.price}
                      </p>
                    </div>
                  </div>
                  <div className={styles.main}>
                    <div className={styles.flexTextColor}>
                      <p className={styles.subHeading}>Item category</p>
                      <p className={styles.textHeadingDetails}>
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className={styles.main}>
                    <div className={styles.main}>
                      <div className={styles.flexTextColorNew}>
                        <p className={styles.subHeading}>Description</p>
                        <p className={styles.textHeadingDetailsNew}>
                          {transaction.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FormSection>
            )
          )}
        </Flex>

        {/* shipping */}

        <Flex vertical className="w-full">
          <FormSection>
            <div className={styles.main}>
              <div className={styles.flexText}>
                <p className={styles.textHeading}>Shipping</p>

                <Button
                  name="Edit"
                  type={ButtonType.Primary}
                  size={isMobile ? "small" : "large"}
                  onClickHandler={
                    !isEditedAfterSign ? handleEditClickTransaction : () => {}
                  }
                  customDisabled={isEditedAfterSign}
                />
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Shipping cost (USD)</p>
                <p className={styles.textHeadingDetails}>
                  {` $ ${contractDetails?.shipping?.shippingCost || ""}`}
                </p>
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Shipping method</p>
                <p className={styles.textHeadingDetails}>
                  {contractDetails?.shipping?.shippingMethod || ""}
                </p>
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Shipping fee paid by</p>
                <p className={styles.textHeadingDetails}>
                  {contractDetails?.shipping?.shippingFeePaidBy || ""}
                </p>
              </div>
            </div>{" "}
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Inspection period</p>
                <p className={styles.textHeadingDetails}>
                  {contractDetails?.shipping?.inspectionPeriod || ""}
                </p>
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

                <Button
                  name="Edit"
                  type={ButtonType.Primary}
                  size={isMobile ? "small" : "large"}
                  onClickHandler={
                    !isEditedAfterSign ? handleEditClickTransaction : () => {}
                  }
                  customDisabled={isEditedAfterSign}
                />
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Subtotal</p>
                <p className={styles.textHeadingDetails}>{` $ ${subTotal.toFixed(2)}`}</p>
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Shipping fee</p>
                <p className={styles.textHeadingDetails}>
                  {` $ ${contractDetails?.shipping?.shippingCost || ""}`}
                </p>
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}> Escrow fee paid by</p>
                <p className={styles.textHeadingDetails}>
                  {contractDetails?.shipping?.escrowFeePaidBy || ""}
                </p>
              </div>
            </div>{" "}
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Escrow fee</p>
                <p className={styles.textHeadingDetails}>
                  {` $ ${escrowFee.toFixed(2)}`}
                </p>
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Buyer price</p>
                <p className={styles.textHeadingDetails}>
                  {` $ ${buyerPrice.toFixed(2)}`}
                </p>
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Cancellation fees paid by</p>
                <p className={styles.textHeadingDetails}>
                  {contractDetails?.shipping?.cancellationFeePaidBy || ""}
                </p>
              </div>
            </div>
          </FormSection>
        </Flex>
        <Flex
          vertical
          align="flex-end"
          style={{
            width: "100%",
            marginBottom: "40px",
          }}
        >
          <Button
            name="Next"
            type={ButtonType.Primary}
            onClickHandler={handleNextButtonClick}
            fullWidth={isMobile}
            customDisabled={!isNextButtonEnabled || isCompleting}
          />
        </Flex>
      </div>
    </>
  );
};

export default StepAgreement;
