import React, { FC } from "react";
import styles from "./style.module.scss";
import { FormSection } from "../Shared";
import { Flex, Row, Col } from "antd";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import Image from "next/image";
import DownloadIcon from "../../../public/icons/Download.svg";

const Invoice: FC = () => {

  const downloadFile = (fileUrl: string, fileName: string) => {
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = fileName || "downloadedFile";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <>
      <div className={styles.agreementMain}>
        <Flex vertical className="w-full">
          <FormSection title="Invoice">
            <div className={styles.main}>
              <div className={styles.flexText}>
                <p className={styles.textHeading}>Download invoice</p>
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Invoice.pdf</p>
                <Image
                  className={styles.icon}
                  src={DownloadIcon}
                  alt="download icon"
                  // onClick={() =>
                    
                  // }
                />
              </div>
            </div>
          </FormSection>
        </Flex>
      </div>
    </>
  );
};
export default Invoice;
