import { FC, useState } from "react";
import styles from "./style.module.scss";
import { Grid } from "antd";
import { Dropdown, FormSection } from "../Shared";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { FormProvider, useForm } from "react-hook-form";
import { useAppContext } from "@/contexts/App";
import { useDepositDataMutation } from "@/Store/services/paymentApi";
interface BankLocationProps {
  onNext: () => void;
  onBack: () => void;
}

const BankLocation: FC<BankLocationProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    bankLocation: "",
    currency: "",
  });
  const [depositData, { isLoading, isError }] = useDepositDataMutation();
  const handleChange = (fieldName: any, value: any) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await depositData({
        id: "id",
        data: formData,
      });
      onNext();
    } catch (error) {}
  };
  const { isMobile } = useAppContext();
  const methods = useForm();
  return (
    <>
      <div className={styles.bankMain}>
        <div className={styles.bank}>
          {!isMobile && (
            <Button
              name="Back"
              leftIcon={IconType.BackArrow}
              type={ButtonType.Secondary}
              size={!isMobile ? "large" : "middle"}
              onClickHandler={onBack}
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
              onChange={(value) => handleChange("bankLocation", value)}
            />
            <Dropdown
              name="currency"
              label="Currency"
              options={[
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
                { value: "GBP", label: "GBP" },
                { value: "GEL", label: "GEL" },
              ]}
              onChange={(value) => handleChange("currency", value)}
            />
            <span className={styles.inlineText}>
              <input className={styles.checkBox} type="checkbox" />
              Save this location or future use
            </span>
          </FormSection>
        </FormProvider>
        <div className={styles.transferFlexBtn}>
          {isMobile && (
            <Button
              name="Back"
              leftIcon={IconType.BackArrow}
              type={ButtonType.Secondary}
              size={!isMobile ? "large" : "middle"}
              onClickHandler={onBack}
            />
          )}
          <div className={styles.bankBtn}>
            <Button
              name="Continue"
              type={ButtonType.Primary}
              size={!isMobile ? "large" : "middle"}
              onClickHandler={handleSubmit}
              isSubmit
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default BankLocation;
