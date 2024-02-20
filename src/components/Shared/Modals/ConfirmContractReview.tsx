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

interface ModalProps {
      closeModal: () => void;
      contractDetails: any;
      userDetails: any;
      firstPartySigned: boolean;
      secondPartySigned: boolean;
      isEditedAfterSign: boolean;
      buyerSign?: string | null; 
      onContractUpdate: (updatedContractDetails: any) => void;

}
const ConfirmContractReview: FC<ModalProps> = ({
      closeModal,
      contractDetails,
      userDetails,
      isEditedAfterSign,
      onContractUpdate,
}) => {
      console.log(userDetails);
      console.log("data>>", contractDetails);
      const contractId = getLocalData("contract_id");
      const sigCanvasRef = useRef<SignatureCanvas>(null);
      const [updateContractDetails, { isLoading }] =
            useUpdateContractDetailsMutation();

      const azureUrl = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL;
      const sasKey = process.env.NEXT_PUBLIC_BLOB_STORAGE_SAS_KEY;
      const containerName =
            process.env.NEXT_PUBLIC_BLOB_STORAGE_CONTAINER || "";

      if (!azureUrl || !sasKey || !containerName) {
            throw new Error("Missing Azure Blob Storage configuration");
      }

      const uploadToAzureAndGetUrl = async (signatureImage: string) => {
            const blobServiceClient = new BlobServiceClient(
                  `${azureUrl}/?${sasKey}`
            );
            const containerClient =
                  blobServiceClient.getContainerClient(containerName);
            const blobName = `signature_${new Date().getTime()}.png`;
            const blockBlobClient =
                  containerClient.getBlockBlobClient(blobName);
            const buffer = Buffer.from(signatureImage.split(",")[1], "base64");

            await blockBlobClient.upload(buffer, buffer.length);
            return blockBlobClient.url;
      };

      const clearSignature = () => {
            sigCanvasRef.current?.clear();
      };

      const saveSignature = async () => {
            if (sigCanvasRef.current) {
                  const signatureImage = sigCanvasRef.current
                        .getTrimmedCanvas()
                        .toDataURL("image/png");
                  try {
                        const signatureUrl = await uploadToAzureAndGetUrl(signatureImage);
                        const isBuyer = // assuming to be fisrt party 
                              userDetails.id === contractDetails.buyerId;
                              let updateData: { buyerSign?: string | null; sellerSign?: string | null; } = isBuyer ? { buyerSign: signatureUrl } : { sellerSign: signatureUrl };

                        // When the second party (seller) makes changes and signs, clear the first party's (buyer) signature if edited
                        if (!isBuyer && isEditedAfterSign) {
                              updateData.buyerSign = null   ; // Clear buyer's signature if the contract was edited by the seller
                        }

                        // Constructing the payload for the PATCH request
                        const payload = {
                              id: contractId,
                              contract: updateData
                        };

                        const updatedContractDetails = await updateContractDetails(payload);
                        onContractUpdate(updatedContractDetails); // Notify parent component
                        
                        // Update signature state in parent component
                        updateSignatureState({
                              firstPartySigned: isBuyer,
                              secondPartySigned: !isBuyer,
                        });

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
                              <p className={styles.heading}>
                                    Confirm contract review
                              </p>
                              <Image
                                    className={styles.iconWarning}
                                    src={WarningIcon}
                                    alt="warning"
                              />
                              <p className={styles.description}>
                                    Clicking 'Review and Sign' indicates that
                                    you have thoroughly read and understood the
                                    terms of the contract. Your signature will
                                    represent your agreement and commitment to
                                    these terms.
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
                              <button
                                    className={styles.crossNew}
                                    onClick={closeModal}
                              >
                                    &times;
                              </button>
                        </div>
                  </div>
            </>
      );
};
export default ConfirmContractReview;
