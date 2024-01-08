import { FC } from "react";
import styles from "./style.module.scss";
import BankIcon from "../../../public/icons/Bank.svg";
import CreditCardIcon from "../../../public/icons/CreditCard.svg";
import { Flex, Row, Col } from "antd";
import { Dropdown, FormSection } from "../Shared";

import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { FormProvider, useForm } from "react-hook-form";

const BankLocation: FC = () => {
  const methods = useForm();
  return (
    <>
      <div className={styles.bankMain}>
        <div className={styles.bank}>
          <Button
            name="Back"
            leftIcon={IconType.BackArrow}
            type={ButtonType.Secondary}
          />
          <p className={styles.transferHeading}>Bank location</p>
        </div>
        <p className={styles.subHeadingBank}>
          Please select your bank's country and currency to proceed
        </p>
        <FormProvider {...methods}>
          <FormSection>
            <Dropdown
              name="bank location"
              label="Bank Location"
              options={[{ value: "US", label: "United States" }]}
            />
            <Dropdown
              name="currency"
              label="Currency"
              options={[{ value: "usd", label: "USD" }]}
            />
            <span className={styles.inlineText}>
              <input className={styles.checkBox} type="checkbox" />
              Save this location or future use
            </span>
          </FormSection>
        </FormProvider>
        <div className={styles.bankBtn}>
          <Button name="Continue" type={ButtonType.Primary} />
        </div>
      </div>
    </>
  );
};
export default BankLocation;
