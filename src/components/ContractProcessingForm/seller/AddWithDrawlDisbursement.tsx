import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { Flex, Row, Col, Grid } from "antd";
import { Dropdown, FormSection, TextInput } from "../../Shared";
import Image from "next/image";
import { Button } from "../../Shared";
import { ButtonType, IconType } from "@/types";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import {
  useForm,
  FormProvider,
  useFieldArray,
  Controller,
} from "react-hook-form";
import PlusIcon from "../../../../public/icons/Plus.svg";
import { useAppContext } from "@/contexts/App";
import { useAddAccountMutation } from "@/Store/services/paymentApi";

interface addWithDrawlProps {
  onNext: () => void;
  onBack: () => void;

}

const AddWithDrawlDisbursement: FC<addWithDrawlProps> = ({onNext, onBack}) => {
  const [addAccount, {isLoading, isError, error }] = useAddAccountMutation();
  const [country, setSelectedCountry] = useState<string | null>(null);
  const [state, setSelectedState] = useState<string | null>(null);

  const methods = useForm({
    defaultValues: {
         currency: ""
    },
  });
  const { handleSubmit, watch } = methods;
  const selectedCurrency = watch("currency");
  const { isMobile } = useAppContext();
  const [formData, setFormData] = useState([{ 
    id: 1, 
    isPrimary: false, 
    accountHolderName: '', 
    bankName: '', 
    // ... other fields
  }]);

  const handleAdd = () => {
    setFormData([...formData, {
      id: formData.length + 1,
      isPrimary: false,
      accountHolderName: '', 
      bankName: '', 
      // ... other fields
    }]);
  };



   // Handle form submission
   const onSubmit = async (data: any) => {
    try {
      const formattedData = formData.map((item) => {
        return {
          currency: data.Currency,
          accountHolderName: data.accountHolderName,
          bankName: data.bankName,
          firstLine: data.firstLine,
          city: data.city,
          countryCode: data.country,
          sortCode: data.sortCode,
          accountNumber: data.accountNumber,
          routingNumber: data.routingNumber,
          accountType: data.accountType,
          IBAN: data.IBAN,
          state: data.state,
          isPrimary: item.isPrimary,
        };
      });
      await addAccount(formattedData);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handlechange = (value: string) => {
    setSelectedCountry(value);
    setSelectedState(value);
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




  return (
    <>
      <form 
        className={styles.sellerMain}
        onSubmit={handleSubmit(onSubmit)}
      >
       <FormProvider {...methods}>
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
                    <input 
                      className={styles.radioBtn} 
                      type="radio"
                      // checked={data.isPrimary}
                      // onChange={() => setPrimary(data.id)} 
                    />
                    <p className={styles.subHeadingDeposit}>Set as Primary</p>
                  </div>
                  <Row>
                    <Dropdown
                      name="currency"
                      label="Currency"
                      options={[
                        { value: "USD$", label: "USD$" },
                        { value: "GBP€", label: "GBP€" },
                        { value: "EUR€", label: "EUR€" },
                        { value: "GEL€", label: "GEL€" },
                      ]}
                      required
                    />
                    <Dropdown
                      name="withdrawl method"
                      label="Choose withdrawal method"
                      options={[{ value: "bank transfer", label: "Bank Transfer" }]}
                      required
                      onChange={(e) => console.log(e)}
                    />
                    <TextInput name="accountHolderName" label="Account holder’s name" required/>
                    <Dropdown
                        name="country"
                        label="Country"
                        onChange={handlechange}
                        required
                        options={}
                    />
                    <Dropdown
                        name="state"
                        label="State"
                        onChange={handlechange}
                        options={}
                        required
                    />
                    <TextInput name="city" label="City"  required/>
                    <TextInput name="firstLine" label="First Line"  required/>
                    <TextInput name="postCode" label="Post Code" required />
                    {selectedCurrency === "USD$" && (
                      <>
                        <TextInput name="accountNumber" label="Account number" required/>
                        <TextInput name="routingNumber" label="Routing Number"  required/>
                        <TextInput name="email" label="Email" required/>
                      </>
                    )}
                    {selectedCurrency === "GEL€" && (
                      <>
                        <TextInput name="IBAN" label="IBAN" required/>
                      </>
                    )}
                    {selectedCurrency === "EUR€" && (
                            <>
                              <TextInput name="IBAN" label="IBAN" required/>
                            </>
                    )}
                    {selectedCurrency === "GBP€" && (
                      <>
                          <TextInput name="sortCode" label="SortNumber" required/>
                          <TextInput name="accountNumber" label="Account number" required/>
                      </>
                          
                    )}
                  </Row>
                </FormSection>
              </FormProvider>
              {/* ----------------------------- */}

           
              {formData.map((data,index) => (
                <>
                  <div className={styles.flexHeadingBtn}>
                    <p className={styles.withdrawlPrimaryHeadingLast}>
                      Additional Disbursement Bank
                    </p>
                    <Button
                      name="Remove"
                      type={ButtonType.Secondary}
                      size={isMobile ? "small" : "large"}
                      onClickHandler={() => removeAccount(data.id)}
                    />
                </div>
                <FormProvider {...methods}>
                      <FormSection key={index}>
                        <div className={styles.flexRadio}>
                          <input 
                            className={styles.radioBtn} 
                            type="radio"
                            checked={data.isPrimary}
                            onChange={() => setPrimary(data.id)}
                          />
                          <p className={styles.subHeadingDeposit}>Set as Primary</p>
                        </div>
                        <Row>
                          <Dropdown
                             name={`currency_${index}`} 
                            label="Currency"
                            options={[
                              { value: "USD$", label: "USD$" },
                              { value: "GBP€", label: "GBP€" },
                              { value: "EUR€", label: "EUR€" },
                              { value: "GEL€", label: "GEL€" },
                            ]}
                            required
                          />
                          <Dropdown
                            name="withdrawl method"
                            label="Choose withdrawal method"
                            options={[
                              { value: "bank transfer", label: "Bank Transfer" },
                            ]}
                            onChange={(e) => console.log(e)}
                            required
                          />
                          <TextInput name={`accountHolderName_${index}`}  label="Account holder’s name" required/>
                          <Dropdown
                              name={`country_${index}`}
                              label="Country"
                              onChange={handlechange}
                              options={}
                              required
                          />
                          <Dropdown
                              name={`state_${index}`}
                              label="State"
                              onChange={handlechange}
                              options={}
                              required
                          />
                          <TextInput  name={`city_${index}`}  label="City"  required/>
                          <TextInput  name={`firstLine_${index}`}  label="First Line"  required/>
                          <TextInput  name={`postCode_${index}`}  label="Post Code" required />
                          {selectedCurrency === "USD$" && (
                            <>
                              <TextInput name="accountNumber" label="Account number" required/>
                              <TextInput name="routingNumber" label="Routing Number"  required/>
                              <TextInput name="email" label="Email" required/>
                            </>
                          )}
                          {selectedCurrency === "GEL€" && (
                            <>
                              <TextInput  name={`IBAN_${index}`}  label="IBAN" required/>
                            </>
                          )}
                          {selectedCurrency === "EUR€" && (
                            <>
                              <TextInput  name={`IBAN_${index}`}  label="IBAN" required/>
                            </>
                          )}
                          {selectedCurrency === "GBP€" && (
                            <>
                                <TextInput  name={`sortCode_${index}`}  label="SortNumber" required/>
                              <TextInput  name={`accountNumber_${index}`}  label="Account number" required/>
                            </>
                                
                          )}
                        </Row>
                      </FormSection>
                  </FormProvider>
                </>

              ))}
            
           
              

              {/* ------------------------- */}
              <div className={styles.btnText}>
                <span className={styles.flexBtn}>
                  <button className={styles.btn}>
                    <Image
                      className={styles.iconPlus}
                      src={PlusIcon}
                      alt="plus icon"
                      onClick={handleAdd}
                    />
                  </button>
                </span>
                <span className={styles.withdrawlPrimaryHeading}>
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
                  onClickHandler={onNext}
                />
              </div>
            </div>
       </FormProvider>
      </form>
    </>
  );
};
export default AddWithDrawlDisbursement;