import { FC } from "react";
import styles from "./style.module.scss";
import WarningIcon from "../../../public/icons/Dash.svg";
import { Flex } from "antd";
import { FormSection } from "../Shared";

import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
// import { FormProvider, useForm } from "react-hook-form";
import CopyIcon from "../../../public/icons/Copy.svg";
import InfoIcon from "../../../public/icons/Info.svg";

const BankDetails: FC = () => {
  return (
    <>
      <Flex vertical className="w-full">
        <div className={styles.bankDetails}>
          <Button
            name="Back"
            leftIcon={IconType.BackArrow}
            type={ButtonType.Secondary}
          />
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
              <p className={styles.subHeadingDeposit}>Amount: $10.030.00</p>
            </div>
          </div>
        </div>

        {/* --------------------------------------- */}
        <Flex vertical className="w-full">
          <FormSection>
            <div className={styles.main}>
              <div className={styles.flexText}>
                <p className={styles.textHeading}>Payment details</p>
              </div>
            </div>

            {/* payment details */}

            <div className={styles.main}>
              <div className={styles.flexTextColor}>
                <p className={styles.subHeading}>Payment details</p>

                <span className={styles.bankInlineText}>
                  <span className={styles.bankDHeading}>$10.030.00</span>
                  <Image
                    className={styles.copyIcon}
                    src={CopyIcon}
                    alt="copy icon"
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
                  <span className={styles.currencyHeading}>BLAXCORPVMNUBR</span>
                  <Image
                    className={styles.copyIcon}
                    src={CopyIcon}
                    alt="copy icon"
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
                  <span className={styles.currencyHeading}>USD</span>
                  <Image
                    className={styles.copyIcon}
                    src={CopyIcon}
                    alt="copy icon"
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
                  <span className={styles.currencyHeading}>Blaxcorp</span>
                  <Image
                    className={styles.copyIcon}
                    src={CopyIcon}
                    alt="copy icon"
                  />
                </span>
              </div>
            </div>
            {/* --------------------------------------------------- */}
            <div className={styles.mainBankDetails}>
              <div className={styles.flexTextColorBank}>
                <p className={styles.currencySubHeading}>Account Name</p>

                <span className={styles.bankInlineText}>
                  <span className={styles.currencyHeading}>BLXTRUST LTD</span>
                  <Image
                    className={styles.copyIcon}
                    src={CopyIcon}
                    alt="copy icon"
                  />
                </span>
              </div>
            </div>
            {/* --------------------------------------------------- */}
            <div className={styles.mainBankDetails}>
              <div className={styles.flexTextColorBank}>
                <p className={styles.currencySubHeading}>SWIFT/BIC</p>

                <span className={styles.bankInlineText}>
                  <span className={styles.currencyHeading}>CAYEBZBZ</span>
                  <Image
                    className={styles.copyIcon}
                    src={CopyIcon}
                    alt="copy icon"
                  />
                </span>
              </div>
            </div>
            {/* --------------------------------------------------- */}
            <div className={styles.mainBankDetails}>
              <div className={styles.flexTextColorBank}>
                <p className={styles.currencySubHeading}>Account number</p>

                <span className={styles.bankInlineText}>
                  <span className={styles.currencyHeading}>190489506</span>
                  <Image
                    className={styles.copyIcon}
                    src={CopyIcon}
                    alt="copy icon"
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
                      P.O. Box 105,
                    </span>
                    <span className={styles.currencyHeadingLast}>
                      Coconut Drive
                    </span>
                    <span className={styles.currencyHeadingLast}>
                      San Pedro Town, Ambergris Caye
                    </span>
                  </div>
                  <Image
                    className={styles.copyIcon}
                    src={CopyIcon}
                    alt="copy icon"
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
      </Flex>
    </>
  );
};
export default BankDetails;
