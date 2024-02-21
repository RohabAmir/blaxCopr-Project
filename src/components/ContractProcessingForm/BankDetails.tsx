import { FC } from "react";
import styles from "./style.module.scss";
import WarningIcon from "../../../public/icons/Dash.svg";
import { Flex, Grid } from "antd";
import { FormSection } from "../Shared";

import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
// import { FormProvider, useForm } from "react-hook-form";
import CopyIcon from "../../../public/icons/Copy.svg";
import InfoIcon from "../../../public/icons/Info.svg";

import { useAppContext } from "@/contexts/App";
interface BankDetailsProps {
  onNext: () => void;
  onBack: () => void;
  responseGet: any;
}

const BankDetails: FC<BankDetailsProps> = ({ onBack, onNext, responseGet }) => {
  const handleCopyText = (event: any) => {
    const textToCopy = event.target.previousSibling.textContent.trim();
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => alert("Copied to clipboard"))
      .catch((error) => console.error("Failed to copy:", error));
  };
  const { isMobile } = useAppContext();
  // console.log("response-----------", responseGet);
  // console.log("after----", responseGet.data.responseData);
  return (
    <>
      <Flex vertical className="w-full">
        <div className={styles.bankDetailsMainRes}>
          <div className={styles.bankDetails}>
            {!isMobile && (
              <Button
                name="Back"
                leftIcon={IconType.BackArrow}
                type={ButtonType.Secondary}
                onClickHandler={onBack}
              />
            )}
            <p className={styles.transferHeading}>Send money from your bank</p>
          </div>
          <div className={styles.bankDetailsMain}>
            <div className={styles.flexDeposit}>
              <Image
                className={styles.warningIcon}
                src={WarningIcon}
                alt="warning icon"
              />
              <div className={styles.flexTextBankDetails}>
                <p className={styles.headingDeposit}>
                  Send money from your bank with information below
                </p>
                <p className={styles.subHeadingDeposit}>
                  {" "}
                  {responseGet?.data?.responseData?.totalAmountToDeposit}
                </p>
              </div>
            </div>
          </div>

          {/* --------------------------------------- */}
          <Flex vertical className="w-full">
            <FormSection>
              <div className={styles.main}>
                <div className={styles.flexText}>
                  <p className={styles.currencyHeading}>Payment details</p>
                </div>
              </div>

              {/* payment details */}

              <div className={styles.main}>
                <div className={styles.flexTextColor}>
                  <p className={styles.subHeadingDt}>Amount due </p>

                  <span className={styles.bankInlineText}>
                    <span className={styles.bankDHeading}>
                      {responseGet?.data?.responseData?.totalAmountToDeposit}
                    </span>
                    <Image
                      className={styles.copyIcon}
                      src={CopyIcon}
                      alt="copy icon"
                      onClick={handleCopyText}
                    />
                  </span>
                </div>
              </div>
            </FormSection>
          </Flex>

          {/*Account Details  */}

          <Flex vertical className="w-full">
            <FormSection>
              <div className={styles.main}>
                <div className={styles.flexText}>
                  <p className={styles.textHeading}>Blaxcorp account details</p>
                </div>
                <p className={styles.subHeadingBankDetails}>
                  Send money from your account using the details below
                </p>
              </div>

              <div className={styles.mainBankDetails}>
                <div className={styles.flexTextColorBank}>
                  <p className={styles.currencyHeading}>Blaxcorp reference</p>

                  <span className={styles.bankInlineText}>
                    <span className={styles.currencyHeading}>
                      {responseGet.data.responseData.referenceNo}
                    </span>
                    <Image
                      className={styles.copyIcon}
                      src={CopyIcon}
                      alt="copy icon"
                      onClick={handleCopyText}
                    />
                  </span>
                </div>
                <p className={styles.bankDetailsSubText}>
                  The inclusion of the Blaxcorp reference code in your payment
                  reference is{" "}
                  <span style={{ color: "#BF1E2C" }}>MANDATORY.</span>
                </p>
                <p className={styles.bankDetailsSubText}>
                  Payments made without the required code will be automatically
                  refunded, which may incur additional processing fees.
                </p>
              </div>

              {/* --------------------- */}

              <div className={styles.mainBankDetails}>
                <div className={styles.flexTextColorBank}>
                  <p className={styles.currencySubHeading}>Currency</p>

                  <span className={styles.bankInlineText}>
                    <span className={styles.currencyHeading}>
                      {responseGet.data.responseData.currency}
                    </span>
                    <Image
                      className={styles.copyIcon}
                      src={CopyIcon}
                      alt="copy icon"
                      onClick={handleCopyText}
                    />
                  </span>
                </div>

                <p className={styles.bankDetailsSubText}>
                  Please ensure that your payment is made in the specified
                  contract currency (for example, USD when USD is selected).
                  Payments made in a different currency may be subject to
                  additional fees by your bank.
                </p>
              </div>
              {/* ------------------------------------- */}
              <div className={styles.mainBankDetails}>
                <div className={styles.flexTextColorBank}>
                  <p className={styles.currencySubHeading}>Beneficiary</p>

                  <span className={styles.bankInlineText}>
                    <span className={styles.currencyHeading}>
                      {responseGet.data.responseData.routingNumber}
                    </span>
                    <Image
                      className={styles.copyIcon}
                      src={CopyIcon}
                      alt="copy icon"
                      onClick={handleCopyText}
                    />
                  </span>
                </div>
              </div>
              {/* --------------------------------------------------- */}
              <div className={styles.mainBankDetails}>
                <div className={styles.flexTextColorBank}>
                  <p className={styles.currencySubHeading}>Account Name</p>

                  <span className={styles.bankInlineText}>
                    <span className={styles.currencyHeading}>
                      {responseGet.data.responseData.accountName}
                    </span>
                    <Image
                      className={styles.copyIcon}
                      src={CopyIcon}
                      alt="copy icon"
                      onClick={handleCopyText}
                    />
                  </span>
                </div>
              </div>
              {/* --------------------------------------------------- */}
              <div className={styles.mainBankDetails}>
                <div className={styles.flexTextColorBank}>
                  <p className={styles.currencySubHeading}>SWIFT/BIC</p>

                  <span className={styles.bankInlineText}>
                    <span className={styles.currencyHeading}>
                      {responseGet.data.responseData.swift}
                    </span>
                    <Image
                      className={styles.copyIcon}
                      src={CopyIcon}
                      alt="copy icon"
                      onClick={handleCopyText}
                    />
                  </span>
                </div>
              </div>
              {/* --------------------------------------------------- */}
              <div className={styles.mainBankDetails}>
                <div className={styles.flexTextColorBank}>
                  <p className={styles.currencySubHeading}>Account number</p>

                  <span className={styles.bankInlineText}>
                    <span className={styles.currencyHeading}>
                      {responseGet.data.responseData.accountNumber}
                    </span>
                    <Image
                      className={styles.copyIcon}
                      src={CopyIcon}
                      alt="copy icon"
                      onClick={handleCopyText}
                    />
                  </span>
                </div>
              </div>

              {/* --------------------------------------------------- */}

              <div className={styles.mainBankDetails}>
                <div className={styles.flexTextColorBank}>
                  <p className={styles.currencySubHeading}>Bank Address</p>

                  <span className={styles.bankInlineTextLast}>
                    <div className={styles.flexColumnBank}>
                      <span className={styles.currencyHeadingLast}>
                        {responseGet.data.responseData.bankAddress}
                      </span>
                    </div>
                    <Image
                      className={styles.copyIcon}
                      src={CopyIcon}
                      alt="copy icon"
                      onClick={handleCopyText}
                    />
                  </span>
                </div>
              </div>
              {/* --------------------------------------------------- */}
            </FormSection>
          </Flex>

          {/* ---------------------------------------------------------------------------------- */}

          <Flex vertical className="w-full">
            <FormSection>
              <span className={styles.flexInline}>
                <Image src={InfoIcon} alt="info icon" />
                <span className={styles.lastText}>
                  Wire transfers usually arrive within 1 to 5 business days,
                  depending on the bank
                </span>
              </span>
            </FormSection>
          </Flex>
          {/* ----------------- */}
          {/* <Flex vertical className="w-full">
            <FormSection>
              <span className={styles.flexInline}>
                <Image src={InfoIcon} alt="info icon" />
                <span className={styles.lastText}>
                  ACH payment is required for all USD transactions. The
                  transaction limit is $1,000,000. For higher amounts, email
                  support@blaxcorp.com.
                </span>
              </span>
            </FormSection>
          </Flex> */}
          {/* --------------- */}
          <Flex vertical className="w-full">
            <FormSection>
              <span className={styles.flexInline}>
                <Image src={InfoIcon} alt="info icon" />
                <span className={styles.lastText}>
                  The transaction limit is €1,000,000. For higher amounts, email
                  support@blaxcorp.com.
                </span>
              </span>
            </FormSection>
            <div className={styles.bankBtn}>
              <Button
                name="Continue"
                type={ButtonType.Primary}
                size={!isMobile ? "large" : "middle"}
                onClickHandler={onNext}
              />
            </div>
          </Flex>
        </div>
      </Flex>
    </>
  );
};
export default BankDetails;
