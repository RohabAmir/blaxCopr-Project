import React, { FC, useEffect, useState } from "react";
import { Flex, Grid } from "antd";
import { Button } from "../Shared";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { ButtonType, IconType } from "@/types";
import ShieldIcon from "../../../public/icons/shield.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { useUpdateContractDetailsMutation } from "@/Store/services/contractApi";
import { useFetchContractDetailsQuery } from "@/Store/services/contractApi";
import { storeLocalData, getLocalData } from "@/utils";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { BlobServiceClient } from "@azure/storage-blob";
import { useDeleteDocumentMutation } from "@/Store/services/contractApi";
import { BlobServiceClient } from "@azure/storage-blob";
import { useDeleteDocumentMutation } from "@/Store/services/contractApi";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import styles from "./style.module.scss";
import Image from "next/image";
import { ROUTES } from "@/constants";
import { useAppContext } from "@/contexts/App";
import Form from "antd/es/form/Form";

interface Document {
      id: number;
      document: string;
}

interface StepComplianceProps {
  handleStepChange: (step: number) => void;
  step: number;
}

interface documentId {
      id: number;
}

const StepCompliance: FC<StepComplianceProps> = ({
  handleStepChange,
  step,
}) => {
      const [deleteDocument] = useDeleteDocumentMutation();
      const searchParams = useSearchParams();
      const { isMobile } = useAppContext();
      const contractId = getLocalData("contract_id");
      const [uploadedFiles, setUploadedFiles] = useState<Document[]>([]);
      const [error, setError] = useState("");
      const [filesChanged, setFilesChanged] = useState(false);
      const [submitAttemptedWithoutFiles, setSubmitAttemptedWithoutFiles] =
            useState(false); // New state to track submit attempts without files
      const { getRootProps, getInputProps } = useDropzone({
            onDrop: (acceptedFiles: File[]) => {
                  setSubmitAttemptedWithoutFiles(false); // Reset on new file drop
                  // Reset error state
                  setError("");

                  const newFiles = acceptedFiles.reduce((acc, file) => {
                        const isSupportedFormat = [
                              ".png",
                              ".jpg",
                              ".jpeg",
                              ".pdf",
                        ].some((ext) => file.name.toLowerCase().endsWith(ext));
                        if (isSupportedFormat) {
                              acc.push({
                                    document: file.name,
                                    id: 0,
                              });
                        } else {
                              // Set error state if file format is not supported
                              setError(
                                    `Error: Unsupported file format. Upload files with supported formats only: .PNG, .JPG, .JPEG, .PDF`
                              );
                        }
                        return acc;
                  }, [] as Document[]);

                  setUploadedFiles((currentFiles) => [
                        ...currentFiles,
                        ...newFiles,
                  ]);
                  setFilesChanged(true);
            },
      });
      const [updateContractDetails, { isLoading }] =
            useUpdateContractDetailsMutation();
      const {
            data: contractDetails,
            isSuccess,
            refetch,
      } = useFetchContractDetailsQuery(contractId, {
            skip: !contractId, // Skip querying if no ID
      });
      const methods = useForm({
            defaultValues: {
                  uploadedFiles: [],
            },
      });
      const { handleSubmit, formState, reset } = methods;
      const { isDirty } = formState;

      const router = useRouter();
      const handleButtonClick = () => {
            const isEditing =
                  searchParams.get("editing") === "true" ? "?editing=true" : "";
            router.push(`/${ROUTES.CONTRACT_PROCESSING_FORM}${isEditing}`, {
                  scroll: false,
            });
      };

      const handleBackClick = () => {
            if (step >= 0) handleStepChange(step - 1);
      };

      const extractFileName = (url: string) => {
            const matches = url.match(/\/([^\/\?]+)/);
            return matches && matches[1] ? matches[1] : "Unknown Document";
      };

      // Populate form with fetched data
      useEffect(() => {
            if (isSuccess && contractDetails && contractDetails.documents) {
                  const formattedDocuments = contractDetails.documents.map(
                        (doc: any) => {
                              // Or, if you want to extract just the filename from the URL:
                              const documentName = extractFileName(
                                    doc.document
                              );

                              return {
                                    ...doc,
                                    document: documentName,
                              };
                        }
                  );

                  setUploadedFiles(formattedDocuments);
            }
      }, [contractDetails, isSuccess]);

      // Function to remove a file from the uploadedFiles list
      const removeFile = async (index: number, documentId: number) => {
            if (documentId) {
                try {
                    // Call the deleteDocument mutation with the document ID
                    await deleteDocument(documentId).unwrap();
        
                    // Update the state only after successful deletion
                    setUploadedFiles((currentFiles) =>
                        currentFiles.filter((_, i) => i !== index)
                    );
                    setFilesChanged(true);
                } catch (error) {
                    // Handle any errors here (e.g., show an error message to the user)
                    console.error("Error deleting the document:", error);
                }
            }
        };

      const azureUrl = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL;
      const sasKey = process.env.NEXT_PUBLIC_BLOB_STORAGE_SAS_KEY;
      const containerName =
            process.env.NEXT_PUBLIC_BLOB_STORAGE_CONTAINER || "";

      if (!azureUrl || !sasKey || !containerName) {
            throw new Error("Missing Azure Blob Storage configuration");
      }

      const uploadDocumentsToAzureAndGetUrls = async (documents: any) => {
            const blobServiceClient = new BlobServiceClient(
                  `${azureUrl}/?${sasKey}`
            );
            const containerClient =
                  blobServiceClient.getContainerClient(containerName);

            const uploadPromises = documents.map(async (document: any) => {
                  const blobName = `document_${new Date().getTime()}.pdf`;
                  const blockBlobClient =
                        containerClient.getBlockBlobClient(blobName);

                  await blockBlobClient.uploadBrowserData(document);
                  return blockBlobClient.url;
            });

            return Promise.all(uploadPromises);
      };

      // Function to handle form submission
      const onSubmit = async (data: any) => {
            // Retrieve the stored string and parse it back to an array
            const storedDocumentIdsString =
                  getLocalData("document_ids") || "[]";
            const documentIds = JSON.parse(storedDocumentIdsString);

            if (documentIds.length > 0 && filesChanged) {
                  //Second step patch request
                  // Update existing documents
                  try {
                        const documentUrls =
                              await uploadDocumentsToAzureAndGetUrls(
                                    uploadedFiles
                              );

                        // Transform the array of URLs into the desired format
                        const documentsPayload: Document[] = documentUrls.map(
                              (url: string, index: number) => {
                                    const documentId = documentIds[index]?.id;
                                    return {
                                          ...(documentId
                                                ? { id: documentId }
                                                : {}),
                                          document: url,
                                    } as Document;
                              }
                        );

                        const payload = {
                              contract: {
                                    status: "PENDING",
                              },
                              documents: documentsPayload,
                        };
                        await updateContractDetails({
                              id: contractId,
                              ...payload,
                        });
                        refetch();
                        handleButtonClick();
                  } catch (error) {
                        console.error(
                              "Error updating contract details:",
                              error
                        );
                  }
            } else if (documentIds.length === 0) {
                  //Firt step patch request
                  setSubmitAttemptedWithoutFiles(true); // Set the flag to show error message
                  try {
                        const documentUrls =
                              await uploadDocumentsToAzureAndGetUrls(
                                    uploadedFiles
                              );

                        // Transform the array of URLs into the desired format
                        const documentsPayload = documentUrls.map((url) => ({
                              document: url,
                        }));

                        const payload = {
                              contract: {
                                    status: "PENDING",
                              },
                              documents: documentsPayload,
                        };
                        const response: any = await updateContractDetails({
                              id: contractId,
                              ...payload,
                        });
                        // // Extract the document IDs from the response
                        const documentIds: documentId[] =
                              response.data.response.updatedContract.documents.map(
                                    (d: Document) => ({ id: d.id })
                              );
                        if (response.data && documentIds) {
                              // Store the array of IDs in local storage as a string
                              storeLocalData(
                                    "document_ids",
                                    JSON.stringify(documentIds)
                              );
                        }
                        refetch();
                        handleButtonClick();
                  } catch (error) {
                        console.error(
                              "Error updating contract details:",
                              error
                        );
                  }
            } else {
                  handleButtonClick();
            }
      };

      return (
            <form
                  className={styles.compilanceMain}
                  onSubmit={handleSubmit(onSubmit)}
            >
                  <FormProvider {...methods}>
                        <Flex
                              className={styles.compilanceBox}
                        >
                              <Button
                                    name="Back"
                                    leftIcon={IconType.BackArrow}
                                    type={ButtonType.Secondary}
                                    onClickHandler={handleBackClick}
                                    size={isMobile ? "middle" : "large"}
                              />
                              <h1
                                    // level={!screens["md"] ? 2 : 3}
                                    className={
                                          !isMobile
                                                ? styles.textHeadingComplilance
                                                : ""
                                    }
                              >
                                    Compliance
                              </h1>
                              {/* <span style={{ width: "110px" }}></span> */}
                        </Flex>
                        <Flex
                              vertical
                              align="center"
                              style={{
                                    maxWidth: "550px",
                                    margin: "auto",
                              }}
                        >
                              <div className={styles.innerWrapper}>
                                    <Flex
                                          vertical
                                          align="center"
                                          justify="center"
                                          gap={20}
                                          {...getRootProps()}
                                          className={styles.dragDropContainer}
                                    >
                                          <DownloadOutlined />
                                          <Text className={styles.upload}>
                                                Upload Documents.
                                          </Text>
                                          <Text className={styles.details}>
                                                Drag and drop a file less than 5
                                                MB. <br /> Attach any supporting
                                                documents <br /> related to the
                                                agreement
                                          </Text>
                                          <Button
                                                name="Or select file"
                                                isSubmit={false}
                                          />
                                          <input {...getInputProps()} />
                                    </Flex>
                                    {/* Uploaded files list */}
                                    <Flex
                                          vertical
                                          align="flex-start"
                                          style={{ width: "100%" }}
                                    >
                                          <Title level={4}>
                                                Uploaded Files
                                          </Title>
                                          <div className={styles.uploadedFiles}>
                                                {uploadedFiles.map(
                                                      (file, index) => (
                                                            <div
                                                                  key={index}
                                                                  className={
                                                                        styles.listItem
                                                                  }
                                                            >
                                                                  <div
                                                                        className={
                                                                              styles.listItemLeft
                                                                        }
                                                                  >
                                                                        <CheckCircleOutlined />
                                                                        <span>
                                                                              {
                                                                                    file.document
                                                                              }
                                                                        </span>
                                                                  </div>
                                                                  <div
                                                                        className={
                                                                              styles.listItemRight
                                                                        }
                                                                  >
                                                                        <Text
                                                                              strong
                                                                        >
                                                                              Uploaded
                                                                        </Text>
                                                                        <CloseCircleOutlined
                                                                              onClick={() => removeFile(index, uploadedFiles[index].id)}
                                                                        />
                                                                  </div>
                                                            </div>
                                                      )
                                                )}
                                          </div>
                                          {error && (
                                                <Text type="danger">
                                                      {error}
                                                </Text>
                                          )}
                                    </Flex>
                                    <Flex
                                          align="center"
                                          style={{ marginBottom: "24px" }}
                                    >
                                          <Image
                                                className={styles.shield}
                                                src={ShieldIcon}
                                                alt="shield"
                                          />
                                          <Text
                                                style={{
                                                      color: "#454745",
                                                }}
                                          >
                                                All your data is secured with
                                                encryption both during
                                                transmission and while stored,
                                                utilizing 256-bit AES and
                                                SSL/TLS encryption technologies.
                                          </Text>
                                    </Flex>
                              </div>
                        </Flex>
                        <Flex
                              vertical
                              align="flex-end"
                              style={{ width: "100%", margin: "auto" }}
                        >
                              <Button
                                    name="Next"
                                    type={ButtonType.Primary}
                                    isSubmit
                                    isLoading={isLoading}
                                    fullWidth={isMobile}
                                    customDisabled={uploadedFiles.length === 0} // Disable if no files uploaded
                              />
                        </Flex>
                  </FormProvider>
            </form>
      );
};

export default StepCompliance;
