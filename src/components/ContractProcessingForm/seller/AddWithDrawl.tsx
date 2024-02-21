import { FC, useState } from "react";
import styles from "./styles.module.scss";

import { Flex, Row, Col, Grid } from "antd";
import { Dropdown, FormSection, TextInput } from "../../Shared";
import Image from "next/image";
import { Button } from "../../Shared";
import { ButtonType, IconType } from "@/types";
import { FormProvider, useForm } from "react-hook-form";
import PlusIcon from "../../../../public/icons/Plus.svg";
import { useAppContext } from "@/contexts/App";

const AddWithDrawl: FC = () => {
  const { isMobile } = useAppContext();
  const [currency, setCurrency] = useState<string | null>(null);
  const [formData, setFormData] = useState([{ id: 1 }]);

  const methods = useForm({
    defaultValues: {
      Currency: "",
    },
  });

  const { watch } = methods;
  const selectedCurrency = watch("Currency");
  const handleAdd = () => {
    setFormData([...formData, { id: formData.length + 1 }]);
  };

  return (
    <>
      <div className={styles.sellerMain}>
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
            {formData.map((data, index) => (
              <FormSection key={index}>
                <Row>
                  <Dropdown
                    name="Currency"
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
                  />
                  <TextInput
                    name="Holder’sName"
                    label="Account holder’s name"
                  />
                  <TextInput name="AccountNumber" label="Account number" />{" "}
                  <TextInput name="country" label="Country" />
                  <TextInput name="state" label="State" />
                  <TextInput name="city" label="City" />
                  <TextInput name="firstline" label="First Line" />
                  <TextInput name="postcode" label="Post Code" />
                  {selectedCurrency === "USD$" && (
                    <>
                      <TextInput
                        name="SWIFT/BIC"
                        label="SWIFT/BIC (if applicable)"
                      />

                      <TextInput name="routing number" label="Routing Number" />
                      <TextInput name="email" label="Email" />
                    </>
                  )}
                  {selectedCurrency === "GBP€" && (
                    <TextInput name="sortnumber" label="SortNumber" />
                  )}
                </Row>
              </FormSection>
            ))}{" "}
          </FormProvider>
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
              fullWidth={isMobile}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default AddWithDrawl;
