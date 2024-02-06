"use client";
import { Col, Flex, Row, Grid, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import { Button, Dropdown, FormSection, TextInput } from "../Shared";
import { ButtonType, IconType } from "@/types";
import styles from "./style.module.scss";
import ShieldIcon from "../../../public/icons/shield.svg";
import ChevronIcon from "../../../public/icons/TagChevron.svg";
import Image from "next/image";
import {
      useForm,
      FormProvider,
      useFieldArray,
      Controller,
} from "react-hook-form";
import { useUpdateContractDetailsMutation } from "@/Store/services/contractApi";
import { useFetchContractDetailsQuery } from "@/Store/services/contractApi";
import { storeLocalData, getLocalData } from "@/utils";
import { useAppContext } from "@/contexts/App";


interface TransactionItem {
      itemName: string;
      price: string;
      category: string;
      description: string;
}
interface ShippingDetails {
      shippingCost: string;
      shippingMethod: string;
      inspectionPeriod: string;
      shippingFeePaidBy: string;
      cancellationFeePaidBy: string;
      collectionServiceUpgrade: boolean;
      lienHolderUpgrade: boolean;
}

const StepDetail: FC<any> = ({ handleStepChange, step }) => {
      const text = Typography;
      const contractId = getLocalData("contract_id");

      const [updateContractDetails, { isLoading, isError, error }] =
            useUpdateContractDetailsMutation();
      const {
            data: contractDetails,
            isSuccess,
            refetch,
      } = useFetchContractDetailsQuery(contractId, {
            skip: !contractId, // Skip querying if no ID
      });
      console.log("contractData>>", contractDetails);
      const { isMobile } = useAppContext();
      const methods = useForm({
            defaultValues: {
                  transactions: [
                        {
                              itemName: "",
                              price: "",
                              category: "",
                              description: "",
                        },
                  ], // Initialize with one empty transaction
                  shippingCost: "",
                  shippingMethod: "",
                  inspectionPeriod: "",
                  shippingFeePaidBy: "",
                  cancellationFeePaidBy: "",
                  collectionServiceUpgrade: false,
                  lienHolderUpgrade: false,
            },
      });

      const { fields, append, remove } = useFieldArray({
            control: methods.control,
            name: "transactions",
      });
      const { handleSubmit, control, reset, formState} = methods;
      const { isDirty } = formState;

      const [itemsCount, setItemsCount] = useState<number>(1);
      const [isShipping, setShipping] = useState(true);
      const [selectedCategory, setSelectedCategory] = useState<string | null>(
            null
      );

      const handlechange = (value: string) => {
            setSelectedCategory(value);
      };
      //for fetching the contractDetails field values and populating them
      useEffect(() => {
            if (isSuccess && contractDetails) {
                  // Populate the form with fetched data or keep the initial transaction if none exist
                  const transactions =
                        contractDetails.transactions.length > 0
                              ? contractDetails.transactions
                              : [
                                      {
                                          itemName: "",
                                          price: "",
                                          category: "",
                                          description: "",
                                      },
                                ];
                  methods.reset({
                        transactions,
                        shippingCost: contractDetails.shipping?.shippingCost,
                        shippingMethod: contractDetails.shipping?.shippingMethod,
                        inspectionPeriod: contractDetails.shipping?.inspectionPeriod,
                        shippingFeePaidBy: contractDetails.shipping?.shippingFeePaidBy,
                        cancellationFeePaidBy: contractDetails.shipping?.cancellationFeePaidBy,
                        collectionServiceUpgrade: contractDetails.shipping?.collectionServiceUpgrade,
                        lienHolderUpgrade: contractDetails.shipping?.lienHolderUpgrade,
                  });
            }
      }, [contractDetails, isSuccess, methods]);

      const handleBackClick = () => {
            if (step >= 0) handleStepChange(step - 1);
      };

      // Function to handle form submission
      const onSubmit = async (data: any) => {
            console.log("formData>>>", data);
            const transactionId = getLocalData("transaction_id");
            const shippingId = getLocalData("shipping_id");
            // Create the transactions array with the desired structure
            const transactionsPayload = data.transactions.map(
                  (transaction: {
                        itemName: any;
                        description: any;
                        price: string;
                        category: any;
                  }) => ({
                        itemName: transaction.itemName,
                        description: transaction.description,
                        price: parseFloat(transaction.price),
                        category: transaction.category,
                  })
            );

            // Create the shipping object with the desired structure
            const shippingPayload = {
                  ...(shippingId ? { id: Number(shippingId) } : {}),
                  shippingMethod: data.shippingMethod,
                  shippingCost: parseFloat(data.shippingCost),
                  inspectionPeriod: parseFloat(data.inspectionPeriod),
                  shippingFeePaidBy: data.shippingFeePaidBy,
                  cancellationFeePaidBy: data.cancellationFeePaidBy,
                  collectionServiceUpgrade: data.collectionServiceUpgrade,
                  lienHolderUpgrade: data.lienHolderUpgrade,
            };

            const payload = {
                  transactions: transactionsPayload,
                  shipping: shippingPayload,
            };

            if ( (transactionId || shippingId) && isDirty ) {
                  //Second step patch request 
                   // Update existing contract
                  console.log('running in transactionId || shippingId) && isDirty ')
                   try {
                        await updateContractDetails({
                              id: contractId,
                              ...payload,
                        });
                        // Refetch contract details after successful update
                        refetch();
                        handleStepChange(2); // Proceed to the next step
                  } catch (error) {
                        console.error(
                              "Failed to update contract details:",
                              error
                        );
                  }

            } else if (!transactionId || !shippingId){
                  //Firt step patch request 
                  console.log('running in transactionId || shippingId)')
                  try {
                        const response:any = await updateContractDetails({ id: contractId, ...payload });
                        console.log('reponse>>>>>>>>',response)
                        if ( response.data && response.data.response.updatedContract.shipping.id){
                              // storeLocalData("transaction_id",response.data.response.updatedContract.transactions.id );
                              storeLocalData("shipping_id",response.data.response.updatedContract.shipping.id);
                               // Refetch contract details after successful update
                              refetch();
                              handleStepChange(2); // Proceed to the next step upon successful update
                        }
                  } catch (error) {
                        console.error("Failed to update contract details:", error);
                  }
            }else {
                     // No changes made, simply navigate to the next step
                     handleStepChange(2);
            }

      };

      return (
            <form
                  className={styles.detailsMain}
                  onSubmit={handleSubmit(onSubmit)}
            >
                  <FormProvider {...methods}>
                        <Flex className="w-full" align="flex-start" vertical>
                              <Button
                                    name="Back"
                                    leftIcon={IconType.BackArrow}
                                    type={ButtonType.Secondary}
                                    onClickHandler={handleBackClick}
                                    size={isMobile ? "middle" : "large"}
                              />
                        </Flex>
                        {fields.map((field, index) => (
                              <FormSection
                                    key={field.id}
                                    title="Transaction Details"
                                    buttonTitle="Remove"
                                    buttonClickHandler={() => remove(index)}
                              >
                                    <Flex
                                          style={{ width: "100%" }}
                                          className={styles.detialsCol}
                                    >
                                          <div className={styles.detailsItem}>
                                                <TextInput
                                                      name={`transactions.${index}.itemName`}
                                                      label="Item name"
                                                      required
                                                />
                                          </div>
                                          <div className={styles.detailsItem}>
                                                <TextInput
                                                      name={`transactions.${index}.price`}
                                                      label={`price (${contractDetails?.currency})`}
                                                      required
                                                />
                                          </div>
                                    </Flex>
                                    <Dropdown
                                          name={`transactions.${index}.category`}
                                          label="Item category"
                                          options={[
                                                {
                                                      value: "123",
                                                      label: "Item2",
                                                },
                                          ]}
                                          onChange={handlechange}
                                          required
                                    />
                                    <Row className="w-full">
                                          <p className={styles.textAreaDes}>
                                                Description of Item or Service
                                          </p>
                                          <Controller
                                                name={`transactions[${index}].description`}
                                                control={control}
                                                // defaultValue={
                                                //       transactions?.description
                                                // }
                                                render={({ field }) => (
                                                      <textarea
                                                            {...field}
                                                            rows={6}
                                                            className={
                                                                  styles.textArea
                                                            }
                                                      />
                                                )}
                                          />
                                    </Row>
                              </FormSection>
                        ))}

                        <FormSection>
                              <Row className="w-full">
                                    <Button
                                          name="Add new item"
                                          onClickHandler={(event) => {
                                                append({
                                                      itemName: "",
                                                      price: "",
                                                      category: "",
                                                      description: "",
                                                }); // Append new item with default values
                                          }}
                                          size={isMobile ? "middle" : "large"}
                                    />
                              </Row>
                        </FormSection>

                        {isShipping && (
                              <FormSection
                                    title="Shipping "
                                    buttonTitle="Remove"
                                    buttonClickHandler={() =>
                                          setShipping(false)
                                    }
                                    // size={!screens["sm"] ? "middle" : "large"}
                              >
                                    <Flex
                                          style={{ width: "100%" }}
                                          className={styles.detialsCol}
                                    >
                                          <div className={styles.detailsItem}>
                                                <TextInput
                                                      name="shippingCost"
                                                      label={`Shipping cost (${contractDetails?.currency})`}
                                                      placeholder="$500.00"
                                                      required
                                                />
                                          </div>
                                          <div className={styles.detailsItem}>
                                                <Dropdown
                                                      name="shippingMethod"
                                                      label="Shipping method"
                                                      options={[
                                                            {
                                                                  value: "standard-shipping",
                                                                  label: " Standard Shipping ",
                                                            },
                                                      ]}
                                                      onChange={() =>
                                                            console.log("")
                                                      }
                                                      required
                                                />
                                          </div>
                                    </Flex>
                                    <Flex
                                          style={{ width: "100%" }}
                                          className={styles.detialsCol}
                                    >
                                          <Col className={styles.detailsItem}>
                                                <Dropdown
                                                      name="shippingFeePaidBy"
                                                      label="Shipping fee paid by"
                                                      options={[
                                                            {
                                                                  value: "SELLER",
                                                                  name: "SELLER",
                                                            },
                                                            {
                                                                  value: "BUYER",
                                                                  name: "BUYER",
                                                            },
                                                      ]}
                                                      onChange={() =>
                                                            console.log("")
                                                      }
                                                      required
                                                />
                                          </Col>
                                          <Col className={styles.detailsItem}>
                                                <Dropdown
                                                      name="inspectionPeriod"
                                                      label="Inspection period (days)"
                                                      options={[
                                                            {
                                                                  value: "1",
                                                                  label: "1(min)",
                                                            },
                                                      ]}
                                                      onChange={() =>
                                                            console.log("")
                                                      }
                                                      required
                                                />
                                          </Col>
                                    </Flex>
                              </FormSection>
                        )}
                        {/* next section */}
                        <FormSection>
                              <Flex
                                    style={{ width: "100%" }}
                                    className={styles.detailsBox}
                              >
                                    <Flex className={styles.detailsFlex}>
                                          <Controller
                                                name="collectionServiceUpgrade"
                                                control={methods.control}
                                                render={({
                                                      field: {
                                                            onChange,
                                                            value,
                                                            ref,
                                                      },
                                                }) => (
                                                      <input
                                                            type="checkbox"
                                                            ref={ref}
                                                            checked={value}
                                                            onChange={(e) =>
                                                                  onChange(
                                                                        e.target
                                                                              .checked
                                                                  )
                                                            }
                                                      />
                                                )}
                                          />
                                          <p className={styles.headingDetails}>
                                                Upgrade to title collection
                                                service
                                          </p>
                                    </Flex>
                                    <Row>
                                          <p className={styles.textDetails}>
                                                $60.00
                                          </p>
                                    </Row>
                              </Flex>
                              <Row className={styles.subText}>
                                    Blaxcorp.com holds title while the
                                    transaction completes, making the
                                    transaction secure (recommended)
                              </Row>
                        </FormSection>
                        {/* next section2 */}
                        <FormSection>
                              <Flex
                                    style={{ width: "100%" }}
                                    className={styles.detailsBox}
                              >
                                    <Flex className={styles.detailsFlex}>
                                          <Controller
                                                name="lienHolderUpgrade"
                                                control={methods.control}
                                                render={({
                                                      field: {
                                                            onChange,
                                                            value,
                                                            ref,
                                                      },
                                                }) => (
                                                      <input
                                                            type="checkbox"
                                                            ref={ref}
                                                            checked={value}
                                                            onChange={(e) =>
                                                                  onChange(
                                                                        e.target
                                                                              .checked
                                                                  )
                                                            }
                                                      />
                                                )}
                                          />
                                          <p className={styles.headingDetails}>
                                                Upgrade to lien holder service{" "}
                                          </p>
                                    </Flex>
                                    <Row>
                                          <p className={styles.textDetails}>
                                                $60.00
                                          </p>
                                    </Row>
                              </Flex>
                              <Row className={styles.subText}>
                                    Blaxcorp.com guarantees to pay off current
                                    lien holder upon transaction closure
                              </Row>
                        </FormSection>
                        {/* transaction summary */}
                        <FormSection title="Transaction Summary">
                              <div className={styles.flex}>
                                    <Image
                                          className={styles.shieldIcon}
                                          src={ShieldIcon}
                                          alt="icon"
                                    />
                                    <div className={styles.summary}>
                                          <div className={styles.flexDetails}>
                                                <p className={styles.total}>
                                                      Subtotal:
                                                </p>
                                                <p className={styles.amount}>
                                                      $10.000.00
                                                </p>
                                          </div>
                                          <div className={styles.flexDetails}>
                                                <p className={styles.total}>
                                                      Shipping fee:
                                                </p>
                                                <p className={styles.amount}>
                                                      $123.00
                                                </p>
                                          </div>
                                          {!isMobile && (
                                                <div
                                                      className={
                                                            styles.flexDetailsLine
                                                      }
                                                >
                                                      <Flex
                                                            align="center"
                                                            className="w-full"
                                                      >
                                                            <span>
                                                                  Escrow fee
                                                                  paid by:
                                                            </span>
                                                            <span
                                                                  className="w-full"
                                                                  style={{
                                                                        maxWidth: "100px",
                                                                        padding: "0px",
                                                                        marginRight:
                                                                              "24px",
                                                                  }}
                                                            >
                                                                  <select
                                                                        className={
                                                                              styles.select
                                                                        }
                                                                        name="Seller"
                                                                  >
                                                                        <option value="seller">
                                                                              Seller
                                                                        </option>
                                                                        <option value="buyer">
                                                                              Buyer
                                                                        </option>
                                                                  </select>
                                                            </span>
                                                      </Flex>
                                                      <p
                                                            className={
                                                                  styles.amount
                                                            }
                                                      >
                                                            $30.00
                                                      </p>
                                                </div>
                                          )}
                                          {isMobile && (
                                                <>
                                                      <div
                                                            className={
                                                                  styles.flexDetails
                                                            }
                                                            style={{
                                                                  marginBottom:
                                                                        "8px",
                                                            }}
                                                      >
                                                            <p
                                                                  className={
                                                                        styles.total
                                                                  }
                                                            >
                                                                  Escrow fee:
                                                            </p>
                                                            <p
                                                                  className={
                                                                        styles.amount
                                                                  }
                                                            >
                                                                  $30.00
                                                            </p>
                                                      </div>
                                                      <div
                                                            className={
                                                                  styles.flexDetailsLine
                                                            }
                                                      >
                                                            <Flex
                                                                  align="center"
                                                                  className="w-full"
                                                            >
                                                                  <span>
                                                                        Escrow
                                                                        fee paid
                                                                        by:
                                                                  </span>
                                                            </Flex>
                                                            <select
                                                                  className={
                                                                        styles.selectAfter
                                                                  }
                                                                  name="Seller"
                                                            >
                                                                  <option value="seller">
                                                                        Seller
                                                                  </option>
                                                                  <option value="buyer">
                                                                        Buyer
                                                                  </option>
                                                            </select>
                                                      </div>
                                                </>
                                          )}

                                          <div className={styles.flexDetails}>
                                                <p className={styles.total}>
                                                      Buyer price:
                                                </p>
                                                <p className={styles.amount}>
                                                      $10.153.00
                                                </p>
                                          </div>
                                    </div>
                              </div>
                        </FormSection>
                        {/* payment processing fees */}
                        <FormSection>
                              <Flex className={styles.detailsPayment}>
                                    <Flex justify="center">
                                          <Image
                                                className={styles.chevron}
                                                src={ChevronIcon}
                                                alt="cheron icon"
                                          />
                                          <p className={styles.headingDetails}>
                                                Payment processing fees
                                          </p>
                                    </Flex>
                                    <p className={styles.amount}>+$25.00</p>
                              </Flex>
                              <Row className={styles.subTextFees}>
                                    Depending on the payment method you will
                                    use, there may be additional processing fees
                                    as outlined below.
                              </Row>
                        </FormSection>
                        {/* last section */}
                        <FormSection>
                              <Row
                                    style={{ width: "100%" }}
                                    className={styles.cancelFee}
                              >
                                    <Row>
                                          <Image
                                                className={styles.chevron}
                                                src={ChevronIcon}
                                                alt="cheron icon"
                                          />
                                          <p className={styles.headingDetails}>
                                                Cancellation fees{" "}
                                          </p>
                                    </Row>
                                    <div className={styles.amountBigUpdated}>
                                          Cancellation fees paid by:{" "}
                                          <Controller
                                                name="cancellationFeePaidBy"
                                                control={methods.control}
                                                rules={{
                                                      required: "This field is required",
                                                }} // Validation rule
                                                render={({ field }) => (
                                                      <select
                                                            {...field}
                                                            className={
                                                                  styles.select
                                                            }
                                                      >
                                                            <option
                                                                  value=""
                                                                  disabled
                                                            >
                                                                  Select
                                                            </option>
                                                            <option value="SELLER">
                                                                  Seller
                                                            </option>
                                                            <option value="BUYER">
                                                                  Buyer
                                                            </option>
                                                      </select>
                                                )}
                                          />
                                    </div>
                              </Row>
                              <Row>
                                    <div className={styles.subTextFeesDetail}>
                                          1. Cancellation fee: 1% of the
                                          escrowed amount <br />
                                    </div>
                                    <div className={styles.subTextFeesDetail}>
                                          2. Wire Transfer Fee: $25 <br />
                                    </div>
                                    <div className={styles.subTextFeesDetail}>
                                          3. administrative Fee: $20
                                    </div>
                              </Row>
                        </FormSection>
                        <Flex
                              className="w-full"
                              align="flex-end"
                              vertical
                              style={{ marginBottom: "24px" }}
                        >
                              <Button
                                    name="Next"
                                    type={ButtonType.Primary}
                                    fullWidth={isMobile}
                                    isSubmit
                                    isLoading={isLoading}
                              />
                        </Flex>
                  </FormProvider>
            </form>
      );
};

export default StepDetail;
