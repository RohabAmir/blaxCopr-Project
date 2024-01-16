import React, { FC, useState } from "react";
import { Flex, Grid } from "antd";
import { Button } from "../Shared";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { ButtonType, IconType } from "@/types";
import ShieldIcon from "../../../public/icons/shield.svg";
import { useRouter } from "next/navigation";

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

interface IStepCompliance {}

const StepCompliance: FC<any> = ({ handleStepChange, step }) => {
  const { isMobile } = useAppContext();
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: any) => {
      setUploadedFiles(acceptedFiles);
      // Call your backend API endpoint to upload files
    },
  });

  const router = useRouter();
  const handleButtonClick = () => {
    router.push(`/${ROUTES.CONTRACT_PROCESSING_FORM}`, { scroll: false });
  };

  const handleBackClick = () => {
    if (step >= 0) handleStepChange(step - 1);
  };

  return (
    <Flex
      // vertical
      // align="center"
      // gap={20}
      // style={{
      //   width: "760px",
      //   margin: "auto",
      //   marginBottom: "24px",
      //   padding: "12px",
      // }}
      className={styles.compilanceMain}
    >
      <Flex
        // align="center"
        // justify="space-between"
        // style={{ width: "100%", margin: "auto" }}
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
          className={!isMobile ? styles.textHeadingComplilance : ""}
        >
          Compliance
        </h1>
        {/* <span style={{ width: "110px" }}></span> */}
      </Flex>
      <Flex
        vertical
        align="center"
        style={{ maxWidth: "550px", margin: "auto" }}
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
            <Text className={styles.upload}>Upload Documents.</Text>
            <Text className={styles.details}>
              Drag and drop a file less than 5 MB. <br /> Attach any supporting
              documents <br /> related to the agreement
            </Text>
            <Button name="Or select file" />
            <input {...getInputProps()} />
          </Flex>
          <Flex vertical align="flex-start" style={{ width: "100%" }}>
            <Title level={4}>Uploaded Files</Title>
            <div className={styles.uploadedFiles}>
              {uploadedFiles.map((file: any) => (
                <div
                  key={file.name}
                  className={styles.listItem}
                  style={{ marginBottom: "24px" }}
                >
                  <div className={styles.listItemLeft}>
                    <CheckCircleOutlined />
                    <span>{file.name}</span>
                  </div>
                  <div className={styles.listItemRight}>
                    <Text strong>Uploaded</Text>
                    <CloseCircleOutlined />
                  </div>
                </div>
              ))}
            </div>
          </Flex>
          <Flex align="center" style={{ marginBottom: "24px" }}>
            <Image className={styles.shield} src={ShieldIcon} alt="shield" />
            <Text style={{ color: "#454745" }}>
              All your data is secured with encryption both during transmission
              and while stored, utilizing 256-bit AES and SSL/TLS encryption
              technologies.
            </Text>
          </Flex>
        </div>
      </Flex>
      <Flex vertical align="flex-end" style={{ width: "100%", margin: "auto" }}>
        <Button
          name="Next"
          type={ButtonType.Primary}
          onClickHandler={handleButtonClick}
          fullWidth={isMobile}
        />
      </Flex>
    </Flex>
  );
};

export default StepCompliance;
