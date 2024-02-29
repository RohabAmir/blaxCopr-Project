import { FC, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Grid } from "antd";
import { Dropdown, FormSection } from "../Shared";
import { Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { FormProvider, useForm } from "react-hook-form";
import { useAppContext } from "@/contexts/App";
import { useDepositDataMutation } from "@/Store/services/paymentApi";
import { getLocalData } from "@/utils";
import {
  Country,
  State,
  City,
  ICountry,
  IState,
  ICity,
} from "country-state-city";

interface BankLocationProps {
  onNext: () => void;
  onBack: () => void;
  onResponse: (response: any) => void;
}

const BankLocation: FC<BankLocationProps> = ({
  onNext,
  onBack,
  onResponse,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedBankLocation, setSelectedBankLocation] = useState<
    string | null
  >(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [depositData, { isLoading, isError }] = useDepositDataMutation();
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const countryData: any = Country.getAllCountries().map(
      (country: ICountry) => ({
        value: country.isoCode,
        label: country.name,
      })
    );
    setCountries(countryData);
  }, []);

  const handleChange = (value: string) => {
    setSelectedCurrency(value);
    setSelectedBankLocation(value);
  };

  const { isMobile } = useAppContext();
  const methods = useForm({
    defaultValues: {
      currency: "",
      BankLocation: "",
    },
  });
  const contractId = getLocalData("contract_id");
  const { handleSubmit, formState, reset } = methods;

  const onSubmit = async (data: any, event: any) => {
    // event.preventDefault();
    const payload = {
      id: contractId,
      currency: data.currency,
      bankLocation: data.bankLocation,
    };
    try {
      const response: any = await depositData({ ...payload });
      console.log("response", response?.data);
      if (response?.data?.responseData) {
        console.log("response inside if", response?.data);
        onNext();
      }
      onResponse(response);
    } catch (error) {
      console.error("FAILED TO SUBMIT DATA", error);
    }
  };
  return (
    <>
      <form className={styles.bankMain} onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
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
          <FormSection>
            <Dropdown
              name="bankLocation"
              label="Bank Location"
              options={countries}
              // options={[{ value: "US", label: "United States" }]}
              onChange={handleChange}
              required
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
              onChange={handleChange}
              required
            />
            <span className={styles.inlineText}>
              <input className={styles.checkBox} type="checkbox" />
              Save this location or future use
            </span>
          </FormSection>
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
                isLoading={isLoading}
                isSubmit
              />
            </div>
          </div>
        </FormProvider>
      </form>
    </>
  );
};
export default BankLocation;
