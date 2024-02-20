import React, { FC } from "react";
import styles from "./.styles.module.scss";
import { FormSection } from "../../Shared";
import { Flex} from "antd";
import Image from "next/image";
import DownloadIcon from "../../../public/icons/Download.svg";

const Invoice: FC = () => {
  return (
    <>
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
              />
            </div>
          </div>
        </FormSection>
      </Flex>
    </>
  );
};
export default Invoice;
