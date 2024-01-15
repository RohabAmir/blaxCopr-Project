import { FC } from "react";
import styles from "./style.module.scss";
import BankIcon from "../../../public/icons/Bank.svg";
import CreditCardIcon from "../../../public/icons/CreditCard.svg";
import { Flex, Row, Col, Grid } from "antd";
import { Dropdown, FormSection } from "../Shared";

import Image from "next/image";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { FormProvider, useForm } from "react-hook-form";

const BankLocation: FC = () => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  const methods = useForm();
  return (
    <>
      <div className={styles.bankMain}>
        <div className={styles.bank}>
          {screens["md"] && (
            <Button
              name="Back"
              leftIcon={IconType.BackArrow}
              type={ButtonType.Secondary}
              size={screens["sm"] ? "large" : "middle"}
            />
          )}
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
              onChange={() => {
                console.log("");
              }}
            />
            <Dropdown
              name="currency"
              label="Currency"
              options={[
                { value: "usd", label: "USD" },
                { value: "eur", label: "EUR" },
                { value: "gbp", label: "GBP" },
                { value: "gel", label: "GEL" },
              ]}
              onChange={() => {
                console.log("");
              }}
            />
            <span className={styles.inlineText}>
              <input className={styles.checkBox} type="checkbox" />
              Save this location or future use
            </span>
          </FormSection>
        </FormProvider>
        <div className={styles.transferFlexBtn}>
          {!screens["md"] && (
            <Button
              name="Back"
              leftIcon={IconType.BackArrow}
              type={ButtonType.Secondary}
              size={screens["sm"] ? "large" : "middle"}
            />
          )}
          <div className={styles.bankBtn}>
            <Button
              name="Continue"
              type={ButtonType.Primary}
              size={screens["sm"] ? "large" : "middle"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default BankLocation;
