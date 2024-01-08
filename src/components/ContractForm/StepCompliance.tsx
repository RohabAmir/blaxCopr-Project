import React, { FC, useState } from "react";
import { Flex } from "antd";
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
interface IStepCompliance {}
const StepCompliance: FC<IStepCompliance> = ({}) => {
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
  return (
    <Flex
      vertical
      align="center"
      gap={20}
      style={{ width: "760px", margin: "auto", marginBottom: "24px" }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{ width: "100%", margin: "auto" }}
      >
        <Button
          name="Back"
          leftIcon={IconType.BackArrow}
          type={ButtonType.Secondary}
        />
        <Title level={2}>Compliance</Title>
        <span style={{ width: "110px" }}></span>
      </Flex>
      <Flex vertical align="center" style={{ width: "400px", margin: "auto" }}>
        <Flex
          vertical
          align="center"
          justify="center"
          gap={30}
          {...getRootProps()}
          className={styles.dragDropContainer}
        >
          <DownloadOutlined />
          <Text strong>Upload Documents.</Text>
          <Text style={{ width: "50%", textAlign: "center" }}>
            Drag and drop a file less than 5 MB. Attach any supporting documents
            related to the agreement
          </Text>
          <Button name="Or select file" />
          <input {...getInputProps()} />
        </Flex>
        <Flex vertical align="flex-start" style={{ width: "100%" }}>
          <Title level={4}>Uploaded Files</Title>
          {uploadedFiles.map((file: any) => (
            <div key={file.name} className={styles.listItem}>
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
        </Flex>
        <Flex align="center">
          <Image className={styles.shield} src={ShieldIcon} alt="shield" />
          <Text>
            All your data is secured with encryption both during transmission
            and while stored, utilizing 256-bit AES and SSL/TLS encryption
            technologies.
          </Text>
        </Flex>
      </Flex>
      <Flex vertical align="flex-end" style={{ width: "100%", margin: "auto" }}>
        <Button
          name="Next"
          type={ButtonType.Primary}
          onClickHandler={handleButtonClick}
        />
      </Flex>
    </Flex>
  );
};

export default StepCompliance;
