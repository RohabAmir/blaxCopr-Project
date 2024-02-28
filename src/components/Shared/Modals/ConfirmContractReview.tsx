"use client";
import { FC, useRef } from "react";
import styles from "./style.module.scss";
import WarningIcon from ".././../../../public/icons/Dash.svg";
import { Button } from "..";
import Image from "next/image";
import SignatureCanvas from "react-signature-canvas";
import { ButtonType } from "@/types";
import { useUpdateContractDetailsMutation } from "@/Store/services/contractApi";
import { BlobServiceClient } from "@azure/storage-blob";
import { getLocalData } from "@/utils";
interface SignatureState {
  firstPartySigned: boolean;
  secondPartySigned: boolean;
}
interface UpdateData {
  buyerSign?: string | null;
  sellerSign?: string | null;
}
interface ModalProps {
  closeModal: () => void;
  contractDetails: any;
  userDetails: any;
  firstPartySigned: boolean;
  secondPartySigned: boolean;
  isEditedBeforeSign: boolean;
  buyerSign?: string | null;
  onContractUpdate: (updatedContractDetails: any) => void;
}
const ConfirmContractReview: FC<ModalProps> = ({
  closeModal,
  contractDetails,
  userDetails,
  isEditedBeforeSign,
  onContractUpdate,
}) => {
  console.log(userDetails);
  console.log("data>>", contractDetails);
  console.log("BuyerSign>>", contractDetails?.buyerSign);
  console.log("SellerSign>>", contractDetails?.buyerSign);
  const contractId = getLocalData("contract_id");
  console.log("isEdited", isEditedBeforeSign);
  const sigCanvasRef = useRef<SignatureCanvas>(null);
  const [updateContractDetails, { isLoading }] =
    useUpdateContractDetailsMutation();
  const azureUrl = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL;
  const sasKey = process.env.NEXT_PUBLIC_BLOB_STORAGE_SAS_KEY;
  const containerName = process.env.NEXT_PUBLIC_BLOB_STORAGE_CONTAINER || "";
  if (!azureUrl || !sasKey || !containerName) {
    throw new Error("Missing Azure Blob Storage configuration");
  }
  const uploadToAzureAndGetUrl = async (signatureImage: string) => {
    const blobServiceClient = new BlobServiceClient(`${azureUrl}/?${sasKey}`);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = `signature_${new Date().getTime()}.png`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const buffer = Buffer.from(signatureImage.split(",")[1], "base64");
    await blockBlobClient.upload(buffer, buffer.length);
    return blockBlobClient.url;
  };
  const clearSignature = () => {
    sigCanvasRef.current?.clear();
  };
  const saveSignature = async (): Promise<void> => {
    if (sigCanvasRef.current) {
      const signatureImage = sigCanvasRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      try {
        const signatureUrl = await uploadToAzureAndGetUrl(signatureImage);
        const isBuyer = userDetails.id === contractDetails.buyerId;
        const isSeller = userDetails.id === contractDetails.sellerId;
        let updateData: UpdateData = {};
        if (isBuyer) {
          // Buyer is signing
          updateData.buyerSign = signatureUrl;
          // If the contract was edited after the seller signed, nullify the seller's sign
          if (isEditedBeforeSign && contractDetails.sellerSign) {
            updateData.sellerSign = null;
          }
        } else if (isSeller) {
          // Seller is signing
          updateData.sellerSign = signatureUrl;
          // If the contract was edited after the buyer signed, nullify the buyer's sign
          if (isEditedBeforeSign && contractDetails.buyerSign) {
            updateData.buyerSign = null;
          }
        }
        // Constructing the payload for the PATCH request
        const payload = {
          id: contractId,
          contract: updateData,
        };
        const updatedContractDetails = await updateContractDetails(payload);
        onContractUpdate(updatedContractDetails); // Notify parent component
        closeModal();
      } catch (error) {
        console.error("Error uploading signature:", error);
      }
    }
  };
  return (
    <>
      <div className={styles.overlay}>
        <div
          className={styles.modalNew}
          style={{
            maxHeight: "530px",
            paddingBottom: "60px",
          }}
        >
          <p className={styles.heading}>Confirm contract review</p>
          <Image
            className={styles.iconWarning}
            src={WarningIcon}
            alt="warning"
          />
          <p className={styles.description}>
            Clicking 'Review and Sign' indicates that you have thoroughly read
            and understood the terms of the contract. Your signature will
            represent your agreement and commitment to these terms.
          </p>
          <p
            className={styles.description}
            style={{
              alignSelf: "flex-start",
              marginLeft: "19px",
            }}
          >
            Draw Signature
          </p>
          <div className={styles.signatureContainer}>
            <SignatureCanvas
              ref={sigCanvasRef}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 150,
                className: styles.sigCanvas,
              }}
            />
          </div>
          <div className={styles.modalBtn}>
            <Button
              name="Reset"
              type={ButtonType.Secondary}
              onClickHandler={clearSignature}
            />
            <Button
              name="Review and Sign"
              type={ButtonType.Primary}
              onClickHandler={saveSignature}
            />
          </div>
          <button className={styles.crossNew} onClick={closeModal}>
            &times;
          </button>
        </div>
      </div>
    </>
  );
};
export default ConfirmContractReview;
