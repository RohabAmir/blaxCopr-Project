import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Flex, Row, Col, Grid } from "antd";
import { Dropdown, FormSection, TextInput } from "../../Shared";
import Image from "next/image";
import { Button } from "../../Shared";
import { ButtonType, IconType } from "@/types";
import {
      useForm,
      FormProvider,
      useFieldArray,
      Controller,
} from "react-hook-form";
import PlusIcon from "../../../../public/icons/Plus.svg";
import { useAppContext } from "@/contexts/App";
import { useAddAccountMutation } from "@/Store/services/paymentApi";
import { ICountry, IState, Country, State } from "country-state-city";

interface addWithDrawlProps {
      onNext: () => void;
      onBack: () => void;
}

const AddWithDrawlDisbursement: FC<addWithDrawlProps> = ({
      onNext,
      onBack,
}) => {
      const [addAccount, { isLoading, isError, error }] =
            useAddAccountMutation();
      const [countries, setCountries] = useState<ICountry[]>([]);
      const [states, setStates] = useState<IState[]>([]);
      const [apiError, setApiError] = useState(null);
      const [selectedCountry, setSelectedCountry] = useState<string | null>(
            null
      );
      const [selectedState, setSelectedState] = useState<string | null>(null);
      const { isMobile } = useAppContext();
      const methods = useForm();
      const { handleSubmit, watch } = methods;
      const [formData, setFormData] = useState([
            {
                  id: 1,
                  isPrimary: false,
                  accountHolderName: "",
                  bankName: "",
                  // ... other fields
            },
      ]);

      const handleAdd = () => {
            setFormData([
                  ...formData,
                  {
                        id: formData.length + 1,
                        isPrimary: false,
                        accountHolderName: "",
                        bankName: "",
                        // ... other fields
                  },
            ]);
      };

      useEffect(() => {
            setCountries(Country.getAllCountries());
      }, []);

      const handleCountryChange = (isoCode: string) => {
            setSelectedCountry(isoCode);
            const fetchedStates = State.getStatesOfCountry(isoCode);
            console.log(`States for ${isoCode}:`, fetchedStates); // Debugging log
            setStates(fetchedStates);
      };

      // Create an array of field names for the currencies
      const currencyFieldNames = formData.map(
            (_, index) => `currency_${index}`
      );
      // Watch all currency fields
      const watchedCurrencies = watch(currencyFieldNames);

      // Handle form submission
      const onSubmit = async (data: any) => {
            const accounts = formData.map((_, index) => {
                  return {
                        currency: data[`currency_${index}`],
                        accountHolderName: data[`accountHolderName_${index}`],
                        firstLine: data[`firstLine_${index}`],
                        city: data[`city_${index}`],
                        countryCode: data[`country_${index}`],
                        state: data[`state_${index}`],
                        postCode: data[`postCode_${index}`],
                        sortCode: data[`sortCode_${index}`],
                        accountNumber: data[`accountNumber_${index}`],
                        routingNumber: data[`routingNumber_${index}`],
                        email: data[`email_${index}`],
                        IBAN: data[`IBAN_${index}`],
                        isPrimary: formData[index].isPrimary,
                  };
            });
            try {
                  const response: any = await addAccount(accounts);
                  if (response?.data) {
                        onNext();
                  }
            } catch (error) {
                  console.error("Error submitting form", error);
            }
      };

      // Handle setting primary account
      const setPrimary = (id: number) => {
            const updatedFormData = formData.map((item) => ({
                  ...item,
                  isPrimary: item.id === id,
            }));
            setFormData(updatedFormData);
      };

      // Handle remove account
      const removeAccount = (id: number) => {
            setFormData(formData.filter((item) => item.id !== id));
      };

      function isErrorWithMessage(error: any): error is { message: string } {
            return error && typeof error.message === "string";
      }

      return (
            <>
                  <form
                        className={styles.sellerMain}
                        onSubmit={handleSubmit(onSubmit)}
                  >
                        <FormProvider {...methods}>
                              <div className={styles.withDrawlMain}>
                                    {formData.map((data, index) => {
                                          const currentCurrency =
                                                watchedCurrencies[index];
                                          return (
                                                <div key={data.id}>
                                                      {index === 0 ? (
                                                            <>
                                                                  <p
                                                                        className={
                                                                              styles.withdrawlPrimaryHeading
                                                                        }
                                                                  >
                                                                        Primary
                                                                        Disbursement
                                                                        Bank
                                                                  </p>
                                                                  <p
                                                                        className={
                                                                              styles.subHeadingWithdrawlLight
                                                                        }
                                                                  >
                                                                        This
                                                                        account
                                                                        is
                                                                        designated
                                                                        for the
                                                                        disbursement
                                                                        of funds
                                                                        by
                                                                        Blaxcorp
                                                                        upon the
                                                                        successful
                                                                        completion
                                                                        of a
                                                                        contract
                                                                  </p>
                                                            </>
                                                      ) : (
                                                            <div
                                                                  className={
                                                                        styles.flexHeadingBtn
                                                                  }
                                                            >
                                                                  <p
                                                                        className={
                                                                              styles.withdrawlPrimaryHeadingLast
                                                                        }
                                                                  >
                                                                        Additional
                                                                        Disbursement
                                                                        Bank
                                                                  </p>
                                                                  <Button
                                                                        name="Remove"
                                                                        type={
                                                                              ButtonType.Secondary
                                                                        }
                                                                        size={
                                                                              isMobile
                                                                                    ? "small"
                                                                                    : "large"
                                                                        }
                                                                        onClickHandler={() =>
                                                                              removeAccount(
                                                                                    data.id
                                                                              )
                                                                        }
                                                                  />
                                                            </div>
                                                      )}

                                                      <FormSection key={index}>
                                                            <div
                                                                  className={
                                                                        styles.flexRadio
                                                                  }
                                                            >
                                                                  <input
                                                                        className={
                                                                              styles.radioBtn
                                                                        }
                                                                        type="radio"
                                                                        checked={
                                                                              data.isPrimary
                                                                        }
                                                                        onChange={() =>
                                                                              setPrimary(
                                                                                    data.id
                                                                              )
                                                                        }
                                                                  />
                                                                  <p
                                                                        className={
                                                                              styles.subHeadingDeposit
                                                                        }
                                                                  >
                                                                        Set as
                                                                        Primary
                                                                  </p>
                                                            </div>
                                                            <Row>
                                                                  <Dropdown
                                                                        name={`currency_${index}`}
                                                                        label="Currency"
                                                                        onChange={(
                                                                              value
                                                                        ) =>
                                                                              console.log()
                                                                        }
                                                                        options={[
                                                                              {
                                                                                    value: "USD",
                                                                                    label: "USD",
                                                                              },
                                                                              {
                                                                                    value: "GBP",
                                                                                    label: "GBP",
                                                                              },
                                                                              {
                                                                                    value: "EUR",
                                                                                    label: "EUR",
                                                                              },
                                                                              {
                                                                                    value: "GEL",
                                                                                    label: "GEL",
                                                                              },
                                                                        ]}
                                                                        required
                                                                  />
                                                                  <Dropdown
                                                                        name="withdrawl method"
                                                                        label="Choose withdrawal method"
                                                                        options={[
                                                                              {
                                                                                    value: "bank transfer",
                                                                                    label: "Bank Transfer",
                                                                              },
                                                                        ]}
                                                                        onChange={(
                                                                              e
                                                                        ) =>
                                                                              console.log(
                                                                                    e
                                                                              )
                                                                        }
                                                                        required
                                                                  />
                                                                  <TextInput
                                                                        name={`accountHolderName_${index}`}
                                                                        label="Account holder’s name"
                                                                        required
                                                                  />
                                                                  <Dropdown
                                                                        name={`country_${index}`}
                                                                        label="Country"
                                                                        onChange={(
                                                                              isoCode: string
                                                                        ) =>
                                                                              handleCountryChange(
                                                                                    isoCode
                                                                              )
                                                                        }
                                                                        options={countries.map(
                                                                              (
                                                                                    country
                                                                              ) => ({
                                                                                    value: country.isoCode,
                                                                                    label: country.name,
                                                                              })
                                                                        )}
                                                                        required
                                                                  />
                                                                  <Dropdown
                                                                        name={`state_${index}`}
                                                                        label="State"
                                                                        options={states.map(
                                                                              (
                                                                                    state
                                                                              ) => ({
                                                                                    value: state.isoCode,
                                                                                    label: state.name,
                                                                              })
                                                                        )}
                                                                        required
                                                                  />
                                                                  <TextInput
                                                                        name={`city_${index}`}
                                                                        label="City"
                                                                        required
                                                                  />
                                                                  <TextInput
                                                                        name={`firstLine_${index}`}
                                                                        label="First Line"
                                                                        required
                                                                  />
                                                                  <TextInput
                                                                        name={`postCode_${index}`}
                                                                        label="Post Code"
                                                                        required
                                                                  />
                                                                  {currentCurrency ===
                                                                        "USD" && (
                                                                        <>
                                                                              <TextInput
                                                                                    name={`accountNumber_${index}`}
                                                                                    label="Account number"
                                                                                    required
                                                                              />
                                                                              <TextInput
                                                                                    name={`routingNumber_${index}`}
                                                                                    label="Routing Number"
                                                                                    required
                                                                              />
                                                                              <TextInput
                                                                                    name={`email_${index}`}
                                                                                    label="Email"
                                                                                    required
                                                                              />
                                                                        </>
                                                                  )}
                                                                  {currentCurrency ===
                                                                        "GEL" && (
                                                                        <>
                                                                              <TextInput
                                                                                    name={`IBAN_${index}`}
                                                                                    label="IBAN"
                                                                                    required
                                                                              />
                                                                        </>
                                                                  )}
                                                                  {currentCurrency ===
                                                                        "EUR" && (
                                                                        <>
                                                                              <TextInput
                                                                                    name={`IBAN_${index}`}
                                                                                    label="IBAN"
                                                                                    required
                                                                              />
                                                                        </>
                                                                  )}
                                                                  {currentCurrency ===
                                                                        "GBP" && (
                                                                        <>
                                                                              <TextInput
                                                                                    name={`sortCode_${index}`}
                                                                                    label="SortNumber"
                                                                                    required
                                                                              />
                                                                              <TextInput
                                                                                    name={`accountNumber_${index}`}
                                                                                    label="Account number"
                                                                                    required
                                                                              />
                                                                        </>
                                                                  )}
                                                            </Row>
                                                      </FormSection>
                                                </div>
                                          );
                                    })}
                                    <div className={styles.btnText}>
                                          <span className={styles.flexBtn}>
                                                <button
                                                      className={styles.btn}
                                                      onClick={handleAdd}
                                                >
                                                      <Image
                                                            src={PlusIcon}
                                                            alt="plus icon"
                                                      />
                                                </button>
                                          </span>
                                          <span
                                                className={
                                                      styles.withdrawlPrimaryHeading
                                                }
                                          >
                                                Add another bank
                                          </span>
                                    </div>
                                    <div className={styles.btnEnd}>
                                          <Button
                                                name="Save"
                                                type={ButtonType.Primary}
                                                isSubmit
                                                isLoading={isLoading}
                                                fullWidth={isMobile}
                                          />
                                    </div>
                                    {isError && error && (
                                          <div style={{ color: "red" }}>
                                                {"status" in error &&
                                                isErrorWithMessage(error.data)
                                                      ? error.data.message
                                                      : "An error occurred. Please try again later."}
                                          </div>
                                    )}
                              </div>
                        </FormProvider>
                  </form>
            </>
      );
};
export default AddWithDrawlDisbursement;
