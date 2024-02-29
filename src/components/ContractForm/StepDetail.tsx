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
import { useDeleteTransactionMutation } from "@/Store/services/contractApi";

import {
      updateBuyerPrice,
      updateSubTotal,
      updateEscrowPrice
} from "@/Store/services/contractSlice";
import { useDispatch } from "react-redux";


interface Transaction {
      id?: number; // Include 'id' as optional for new transactions
      itemName: string;
      description: string;
      price: string;
      category: string;
}

interface TransactionId {
      id: number;
}

interface CategoryFee {
      [category: string]: number;
}

interface FeeStructure {
      min: number;
      max: number;
      baseFee: number;
      percentageFee: number;
      categoryFees: CategoryFee;
}

interface FormValues {
      transactions: Transaction[];
      shippingCost: string;
      shippingMethod: string;
      collectionServiceUpgrade: boolean;
      lienHolderUpgrade: boolean;
      escrowFeePaidBy: string;
      inspectionPeriod: string;
      shippingFeePaidBy: string;
      cancellationFeePaidBy: string;
}

const StepDetail: FC<any> = ({ handleStepChange, step }) => {

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const categoryFee: CategoryFee = {
            "Real Estate": 0.0075,
            "Legal Services": 0.035,
            "Financial Services": 0.0075,
            "Loan Disbursement": 0.0125,
            "Freelancing Platforms": 0.03,
            "Payment Processors": 0.025,
            "Insurance Services": 0.015,
            "Construction Services": 0.0125,
            "Healthcare Services": 0.02,
            "Education Services": 0.01,
            "Retail and eCommerce": 0.0175,
            "Transportation Services": 0.025,
            "Utilities Services": 0.0125,
            "Government Services": 0.0225,
            "Non-Profit Organizations": 0.0125,
            "Hospitality and Tourism": 0.035,
            "Technology Services": 0.02,
            "Entertainment Industry": 0.035,
            "Manufacturing Sector": 0.02,
            "Agriculture Services": 0.0175,
            "General Goods": 0.015,
            "Luxury Items": 0.0225,
            "Automobiles": 0.0125,
            "Marine Vehicles": 0.02,
            "Aircraft": 0.015,
           " Jewelry": 0.025,
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const feeStructures: FeeStructure[] = [
            {
                  min: 1.0,
                  max: 9999.99,
                  baseFee: 100.0,
                  percentageFee: 0.008,
                  categoryFees: categoryFee,
            },

            {
                  min: 10000.0,
                  max: 49999.99,
                  baseFee: 150.0,
                  percentageFee: 0.006,
                  categoryFees: categoryFee,
            },

            {
                  min: 50000.0,
                  max: 99999.99,
                  baseFee: 200.0,
                  percentageFee: 0.005,
                  categoryFees: categoryFee,
            },

            {
                  min: 100000.0,
                  max: 249999.99,
                  baseFee: 250.0,
                  percentageFee: 0.004,
                  categoryFees: categoryFee,
            },

            {
                  min: 250000.0,
                  max: 499999.99,
                  baseFee: 300.0,
                  percentageFee: 0.003,
                  categoryFees: categoryFee,
            },

            {
                  min: 500000.0,
                  max: 999999.99,
                  baseFee: 350.0,
                  percentageFee: 0.0025,
                  categoryFees: categoryFee,
            },
      ];


      // Convert categoryFee to an array of options
      const options = Object.keys(categoryFee).map((key) => ({
            value: key,
            label: key,
      }));

      const [ deleteTransaction ] = useDeleteTransactionMutation();
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
      console.log("contractData>>" , contractDetails);
      const { isMobile } = useAppContext();
      const dispatch = useDispatch();
      const methods = useForm<FormValues>({
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
                  escrowFeePaidBy: "",
                  collectionServiceUpgrade: false,
                  lienHolderUpgrade: false,
            },
      });

      const { fields, append, remove } = useFieldArray({
            control: methods.control,
            name: "transactions",
      });

      console.log("fields",fields)

      const { handleSubmit, reset, formState, watch, control } = methods;
      const { isDirty } = formState;

      // Watch for changes in the relevant fields
      const watchedTransactions = watch("transactions");
      const watchedShippingCost = watch("shippingCost");
      const watchedCollectionServiceUpgrade = watch("collectionServiceUpgrade");
      const watchedLienHolderUpgrade = watch("lienHolderUpgrade");
      const watchedEscrowFeePaidBy = watch("escrowFeePaidBy");

      const [isShipping, setShipping] = useState(true);
      const [selectedCategory, setSelectedCategory] = useState<string | null>(
            null
      );
      const [subTotal, setSubTotal] = useState<number>(0);
      const [buyerPrice, setBuyerPrice] = useState<number>(0);
      const [escrowFee, setEscrowFee] = useState<number>(0);
      const [shippingFee, setShippingFee] = useState<number>(0);


      const handlechange = (value: string) => {
            setSelectedCategory(value);
      };


      // useEffect hook adjusted to include dynamic escrow fee calculation and other transaction summaries
      useEffect(() => {
            let totalTransactionAmount = 0;
            let totalCategoryFee = 0;
            let percentageFee = 0;
            let wirefeeTransfer = 25;

            // Calculate total amount and category fees
            watchedTransactions.forEach(
                  (transaction: {
                        price: string;
                        category: string | number;
                  }) => {
                        const price = parseFloat(transaction.price) || 0;
                        const categoryFeePercentage =
                              categoryFee[transaction.category] || 0;
                        totalTransactionAmount += price;
                        totalCategoryFee += price * categoryFeePercentage;
                  }
            );

            // Find applicable fee structure
            const applicableFeeStructure = feeStructures.find(
                  (fs) =>
                        totalTransactionAmount >= fs.min &&
                        totalTransactionAmount <= fs.max
            );

            const baseFee = applicableFeeStructure? applicableFeeStructure.baseFee: 0;
            let remainingAmount  = totalTransactionAmount;
            for (const fee of feeStructures){
                  if(remainingAmount>fee.max){
                        percentageFee+=(fee.max * fee.percentageFee);
                        remainingAmount-=fee.max;
                  }
                  else{
                        percentageFee +=remainingAmount*fee.percentageFee;
                        break;
                  }
            }

            // Calculate subtotal and buyer price
            const shippingCost = parseFloat(watchedShippingCost) || 0;
            const serviceUpgradeCost =
                  (watchedCollectionServiceUpgrade ? 60 : 0) +
                  (watchedLienHolderUpgrade ? 60 : 0);
            const dynamicEscrowFee = baseFee + percentageFee + totalCategoryFee + wirefeeTransfer;
            let dynamicSubTotal =
                  totalTransactionAmount + shippingCost + serviceUpgradeCost;
            let dynamicBuyerPrice =
                  dynamicSubTotal +
                  (watchedEscrowFeePaidBy === "BUYER" ? dynamicEscrowFee : 0);

            setSubTotal(dynamicSubTotal);
            setBuyerPrice(dynamicBuyerPrice);
            setEscrowFee(dynamicEscrowFee);
            setShippingFee(shippingCost);


            // Optionally, update Redux or local state as needed
            dispatch(updateSubTotal(subTotal));
            dispatch(updateBuyerPrice(buyerPrice));
            dispatch(updateEscrowPrice(escrowFee));



      }, [watchedTransactions, watchedShippingCost, watchedCollectionServiceUpgrade, watchedLienHolderUpgrade, watchedEscrowFeePaidBy, dispatch, feeStructures, subTotal, buyerPrice, categoryFee, escrowFee]);

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
                        shippingMethod:
                              contractDetails.shipping?.shippingMethod,
                        inspectionPeriod:
                              contractDetails.shipping?.inspectionPeriod,
                        shippingFeePaidBy:
                              contractDetails.shipping?.shippingFeePaidBy,
                        cancellationFeePaidBy:
                              contractDetails.shipping?.cancellationFeePaidBy,
                        escrowFeePaidBy:
                              contractDetails.shipping?.escrowFeePaidBy,
                        collectionServiceUpgrade:
                              contractDetails.shipping
                                    ?.collectionServiceUpgrade,
                        lienHolderUpgrade:
                              contractDetails.shipping?.lienHolderUpgrade,
                  });
                  // Calculate and update summary values
                  // const { subTotal, buyerPrice } = calculateSummary(contractDetails);
                  // setSubTotal(subTotal);
                  // setBuyerPrice(buyerPrice);
            }
      }, [contractDetails, isSuccess, methods]);

      const handleBackClick = () => {
            if (step >= 0) handleStepChange(step - 1);
      };

      const handleRemoveTransaction = async ( event: any, index: number, transactionId?: number) => {
            event.preventDefault();
            if (transactionId) {
                try {
                  console.log("transactionId",transactionId)
                    // Call the deleteTransaction mutation with the transaction ID
                    await deleteTransaction(transactionId).unwrap();
    
                    // Update the state only after successful deletion
                    remove(index);
                } catch (error) {
                    // Handle any errors here (e.g., show an error message to the user)
                    console.error("Error deleting the transaction:", error);
                }
            } else {
                // If the transaction doesn't have an ID yet (e.g., it hasn't been saved to the server), just remove it from the form
                remove(index);
            }
      };


      // Function to handle form submission
      const onSubmit = async (data: any) => {
            // Retrieve the stored string and parse it back to an array
            const storedTransactionIdsString =
                  getLocalData("transaction_ids") || "[]";
            const transactionIds = JSON.parse(storedTransactionIdsString);
            const shippingId = getLocalData("shipping_id");
            // Create the transactions array with the desired structure
            const transactionsPayload: Transaction[] = data.transactions.map(
                  (transaction: Transaction, index: number) => {
                        const transactionId = transactionIds[index]?.id;
                        return {
                              ...(transactionId ? { id: transactionId } : {}),
                              itemName: transaction.itemName,
                              description: transaction.description,
                              price: parseFloat(transaction.price),
                              category: transaction.category,
                        };
                  }
            );

            // Create the shipping object with the desired structure
            const shippingPayload = {
                  ...(shippingId ? { id: Number(shippingId) } : {}),
                  shippingMethod: data.shippingMethod,
                  shippingCost: parseFloat(data.shippingCost),
                  inspectionPeriod: parseFloat(data.inspectionPeriod),
                  shippingFeePaidBy: data.shippingFeePaidBy,
                  cancellationFeePaidBy: data.cancellationFeePaidBy,
                  escrowFeePaidBy: data.escrowFeePaidBy,
                  collectionServiceUpgrade: data.collectionServiceUpgrade,
                  lienHolderUpgrade: data.lienHolderUpgrade,
            };

    const payload = {
      transactions: transactionsPayload,
      shipping: shippingPayload,
    };

            dispatch(updateSubTotal(subTotal));
            dispatch(updateBuyerPrice(buyerPrice));
            dispatch(updateEscrowPrice(escrowFee));


            if ((transactionIds.length > 0 || shippingId) && isDirty) {
                  //Second step patch request
                  // Update existing details
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
            } else if (transactionIds.length === 0 || !shippingId) {
                  //Firt step patch request
                  console.log("running in transactionId || shippingId)");
                  try {
                        const response: any = await updateContractDetails({
                              id: contractId,
                              ...payload,
                        });
                        // Extract the transaction IDs from the response
                        const transactionIds: TransactionId[] =
                              response.data.response.updatedContract.transactions.map(
                                    (t: Transaction) => ({ id: t.id })
                              );
                        if (
                              response.data &&
                              response.data.response.updatedContract.shipping
                                    .id &&
                              transactionIds
                        ) {
                              // Store the array of IDs in local storage as a string
                              storeLocalData(
                                    "transaction_ids",
                                    JSON.stringify(transactionIds)
                              );
                              storeLocalData(
                                    "shipping_id",
                                    response.data.response.updatedContract
                                          .shipping.id
                              );
                              // Refetch contract details after successful update
                              refetch();
                              handleStepChange(2); // Proceed to the next step upon successful update
                        }
                  } catch (error) {
                        console.error(
                              "Failed to update contract details:",
                              error
                        );
                  }
            } else {
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
                                    buttonClickHandler={() => {
                                          const transactionId = contractDetails?.transactions[index]?.id;
                                          handleRemoveTransaction(event, index, transactionId);
                                      }}
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
                                          options={options}
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
                                                }); 
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
                                                      ${subTotal.toFixed(2)}
                                                </p>
                                          </div>
                                          <div className={styles.flexDetails}>
                                                <p className={styles.total}>
                                                      Shipping fee:
                                                </p>
                                                <p className={styles.amount}>
                                                      {/* {` $ ${
                                                            contractDetails
                                                                  ?.shipping
                                                                  ?.shippingCost ||
                                                            ""
                                                      }`} */}
                                                      ${shippingFee.toFixed(2)}
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
                                                                  <Controller
                                                                        name="escrowFeePaidBy"
                                                                        control={
                                                                              methods.control
                                                                        }
                                                                        rules={{
                                                                              required: "This field is required",
                                                                        }} // Validation rule
                                                                        render={({
                                                                              field,
                                                                        }) => (
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
                                                            </span>
                                                      </Flex>
                                                      <p
                                                            className={
                                                                  styles.amount
                                                            }
                                                      >
                                                             ${escrowFee.toFixed(2)}
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
                                                                  ${escrowFee.toFixed(2)}
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
                                                            <Controller
                                                                  name="escrowFeePaidBy"
                                                                  control={
                                                                        methods.control
                                                                  }
                                                                  rules={{
                                                                        required: "This field is required",
                                                                  }} // Validation rule
                                                                  render={({
                                                                        field,
                                                                  }) => (
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
                                                </>
                                          )}

                                          <div className={styles.flexDetails}>
                                                <p className={styles.total}>
                                                      Buyer price:
                                                </p>
                                                <p className={styles.amount}>
                                                      ${buyerPrice.toFixed(2)}
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
