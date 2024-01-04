import { FC } from "react";
import styles from "./styles.module.scss";

import { Flex, Row, Col } from "antd";
import { Dropdown, FormSection, TextInput } from "../../Shared";

import Image from "next/image";
import { Button } from "../../Shared";
import { ButtonType, IconType } from "@/types";
import { FormProvider, useForm } from "react-hook-form";
import PlusIcon from "../../../../public/icons/Plus.svg";

const AddWithDrawlDisbursement: FC = () => {
  const methods = useForm();
  return (
    <>
      <div className={styles.withDrawlMain}>
        <p className={styles.withDrawlHeading}>Add withdrawl method</p>

        <p className={styles.withdrawlPrimaryHeading}>
          Primary Disbursement Bank
        </p>
        <p className={styles.subHeadingWithdrawlLight}>
          This account is designated for the disbursement of funds by Blaxcorp
          upon the successful completion of a contract
        </p>
        <FormProvider {...methods}>
          <FormSection>
            <div className={styles.flexRadio}>
              <input className={styles.radioBtn} type="radio" />
              <p className={styles.subHeadingDeposit}>Set as Primary</p>
            </div>
            <Row>
              <Dropdown
                name="withdrawl method"
                label="Choose withdrawal method"
                options={[{ value: "bank transfer", label: "Bank Transfer" }]}
              />
              <TextInput name="Holder’sName" label="Account holder’s name" />
              <TextInput name="AccountNumber" label="Account number" />{" "}
              <TextInput name="SWIFT/BIC" label="SWIFT/BIC (if applicable)" />{" "}
              <TextInput name="IBAN" label="IBAN" />{" "}
              <TextInput name="BankName" label="Bank name " />{" "}
              <Dropdown
                name="Currency"
                label="Currency"
                options={[{ value: "USD$", label: "USD$" }]}
              />
            </Row>
          </FormSection>
        </FormProvider>
        {/* ----------------------------- */}
        <div className={styles.flexHeadingBtn}>
          <p className={styles.withdrawlPrimaryHeadingLast}>
            Additional Disbursement Bank
          </p>
          <Button name="Remove" type={ButtonType.Secondary} />
        </div>
        <FormProvider {...methods}>
          <FormSection>
            <div className={styles.flexRadio}>
              <input className={styles.radioBtn} type="radio" />
              <p className={styles.subHeadingDeposit}>Set as Primary</p>
            </div>
            <Row>
              <Dropdown
                name="withdrawl method"
                label="Choose withdrawal method"
                options={[{ value: "bank transfer", label: "Bank Transfer" }]}
              />
              <TextInput name="Holder’sName" label="Account holder’s name" />
              <TextInput name="AccountNumber" label="Account number" />{" "}
              <TextInput name="SWIFT/BIC" label="SWIFT/BIC (if applicable)" />{" "}
              <TextInput name="IBAN" label="IBAN" />{" "}
              <TextInput name="BankName" label="Bank name " />{" "}
              <Dropdown
                name="Currency"
                label="Currency"
                options={[{ value: "USD$", label: "USD$" }]}
              />
            </Row>
          </FormSection>
        </FormProvider>
        {/* ------------------------- */}

        <div className={styles.btnText}>
          <span className={styles.flexBtn}>
            <button className={styles.btn}>
              <Image
                className={styles.iconPlus}
                src={PlusIcon}
                alt="plus icon"
              />
            </button>
          </span>
          <span className={styles.withdrawlPrimaryHeading}>
            Add another bank
          </span>
        </div>

        <div className={styles.btnEnd}>
          <Button name="Save" type={ButtonType.Primary} />
        </div>
      </div>
    </>
  );
};
export default AddWithDrawlDisbursement;
