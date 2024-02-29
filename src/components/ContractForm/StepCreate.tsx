"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Col, Flex, Grid, Row } from "antd";
import { TextInput, Dropdown, Button } from "../Shared";
import { ButtonType, IconType } from "@/types";
import { FormProvider, useForm } from "react-hook-form";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import ShieldIcon from "../../../public/icons/shield.svg";

import OKIcon from "../../../public/icons/CheckOK.svg";
import CurrentIcon from "../../../public/icons/CheckCurrent.svg";
import InActiveIcon from "../../../public/icons/CheckInActive.svg";
import { usePostContractDetailsMutation } from "@/Store/services/contractApi";
import { useGetUserDetailsQuery } from "@/Store/services/authApi";
import { useUpdateContractDetailsMutation } from "@/Store/services/contractApi";
import { useFetchContractDetailsQuery } from "@/Store/services/contractApi";
import { storeLocalData, getLocalData } from "@/utils";

import Link from "next/link";
import { useAppContext } from "@/contexts/App";



const Create: FC<any> = ({ handleStepChange, step }) => {
      const contractId = getLocalData("contract_id");
      const { data: userDetails } = useGetUserDetailsQuery();
      const [postContractDetails, { isLoading, isError, error }] =
            usePostContractDetailsMutation();
      const [updateContractDetails] = useUpdateContractDetailsMutation();
      const {
            data: contractDetails,
            isSuccess,
            refetch,
      } = useFetchContractDetailsQuery(contractId, {
            skip: !contractId, // Skip querying if no ID
      });

      const [selectedCurrency, setSelectedCurrency] = useState<string | null>(
            null
      );
      const [selectedRole, setSelectedRole] = useState<string | null>(null);
      const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
      const { isMobile } = useAppContext();

      const methods = useForm({
            defaultValues: {
                  contractName: "",
                  role: "",
                  currency: "",
                  InspectionPeriod: "",
            },
      });
      const { handleSubmit, formState, reset } = methods;
      const { isDirty } = formState;

      useEffect(() => {
            if (isSuccess && contractDetails) {
                  methods.reset({
                        contractName: contractDetails.contractName,
                        role: contractDetails.createrRole,
                        currency: contractDetails.currency,
                        InspectionPeriod: contractDetails.inspectionPeriod,
                  });
                  setSelectedRole(contractDetails.createrRole);
            }
      }, [contractDetails, isSuccess, methods]);

      // Determine if the role dropdown should be disabled
      const isRoleSelected = !!selectedRole; // This checks if a role has already been selected

  const handlechange = (value: string) => {
    setSelectedCurrency(value);
    setSelectedPeriod(value);
    setSelectedRole(value);
  };

  const roleOptions = [
    { value: "BUYER", label: "BUYER" },
    { value: "SELLER", label: "SELLER" },
  ];
  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "GBP", label: "GBP" },
    { value: "EUR", label: "EUR" },
    { value: "GEL", label: "GEL" },
  ];

  const inspectionOptions = Array.from({ length: 180 }, (_, index) => ({
    value: (index + 1).toString(),
    label: (index + 1).toString(),
  }));

      // Function to handle form submission
      const onSubmit = async (data: any) => {
            const contractId = getLocalData("contract_id");
            let payload = {
                  contract: {
                      contractName: data.contractName,
                      inspectionPeriod: data.InspectionPeriod,
                      createrRole: data.role,
                      currency: data.currency,
                      // Add status as "INCOMPLETE" only for new contracts (POST requests)
                      ...(contractId == null ? { status: "INCOMPLETE" } : {})
                  },
              };

    if (contractId && isDirty) {
      try {
        await updateContractDetails({
          id: contractId,
          ...payload,
        });
        refetch();
        handleStepChange(1); // Proceed to the next step
      } catch (error) {
        console.error("Failed to update contract details:", error);
      }
    } else if (!contractId) {
      // Post new contract details
      try {
        const result: any = await postContractDetails(payload);
        if (result.data && result.data.id) {
          storeLocalData("contract_id", result.data.id);
          handleStepChange(1); // Proceed to the next step
        }
      } catch (error) {
        console.error("Failed to post contract details:", error);
      }
    } else {
      // No changes made, simply navigate to the next step
      handleStepChange(1);
    }
  };

  return (
    <form className={styles.createMain} onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <Flex className={styles.createFlex}>
          <Link href="/dashboard">
            <Button
              name="Back"
              leftIcon={IconType.BackArrow}
              type={ButtonType.Secondary}
              size={isMobile ? "middle" : "large"}
            />
          </Link>

                              {isMobile && (
                                    <div className={styles.stepperFlexMain}>
                                          <div
                                                className={
                                                      styles.stepperFlexNew
                                                }
                                          >
                                                <Image
                                                      src={OKIcon}
                                                      alt="ok icon"
                                                />
                                                <span
                                                      className={
                                                            styles.spanStepper
                                                      }
                                                >
                                                      create
                                                </span>
                                          </div>
                                          <div
                                                className={
                                                      styles.stepperFlexNew
                                                }
                                          >
                                                <Image
                                                      src={CurrentIcon}
                                                      alt="ok icon"
                                                />
                                                <span
                                                      className={
                                                            styles.spanStepper
                                                      }
                                                >
                                                      details
                                                </span>
                                          </div>
                                          <div
                                                className={
                                                      styles.stepperFlexNew
                                                }
                                          >
                                                <Image
                                                      src={CurrentIcon}
                                                      alt="ok icon"
                                                />
                                                <span
                                                      className={
                                                            styles.spanStepper
                                                      }
                                                >
                                                      compilance
                                                </span>
                                          </div>{" "}
                                          <div
                                                className={
                                                      styles.stepperFlexNew
                                                }
                                          >
                                                <Image
                                                      src={CurrentIcon}
                                                      alt="ok icon"
                                                />
                                                <span
                                                      className={
                                                            styles.spanStepper
                                                      }
                                                >
                                                      agreement
                                                </span>
                                          </div>
                                    </div>
                              )}
                              <Title
                                    level={!isMobile ? 2 : 3}
                                    className={styles.headingMain}
                              >
                                    {" "}
                                    Create new contract
                              </Title>
                              <span></span>
                        </Flex>
                        <Flex className={styles.mainContainerCreate}>
                              <Flex className={styles.createInput}>
                                    <Flex vertical className="w-full" gap={20}>
                                          <TextInput
                                                name="contractName"
                                                label="Contract Name"
                                                required
                                          />
                                          <Dropdown
                                                name="role"
                                                label="My role"
                                                options={roleOptions}
                                                onChange={handlechange}
                                                required
                                                disabled={isRoleSelected} // Disable the dropdown if a role is selected
                                          />
                                          <Dropdown
                                                name="currency"
                                                label="Currency"
                                                options={currencyOptions}
                                                onChange={handlechange}
                                                required
                                          />
                                          <Dropdown
                                                name="InspectionPeriod"
                                                label="Inspection Period(days)"
                                                options={inspectionOptions}
                                                onChange={handlechange}
                                                required
                                          />
                                    </Flex>
                              </Flex>

          <Flex className={styles.createInput}>
            <Flex vertical>
              <div className={styles.text}>
                <Image
                  className={styles.img}
                  src={ShieldIcon}
                  alt="shield icon"
                />
                <h2 className={styles.heading}>AES-256 encryption</h2>
                <p className={styles.description}>
                  Every contract is secured using SHA-256 hashing, AES-256
                  encryption, and TLS 1.3 protocol to ensure the highest level
                  of data integrity, confidentiality, and security.
                </p>
              </div>
            </Flex>
          </Flex>
        </Flex>
        <div className={styles.nextBtn}>
          <Button
            name="Next"
            fullWidth={isMobile}
            isSubmit
            isLoading={isLoading}
          />
        </div>
      </FormProvider>
    </form>
  );
};

export default Create;
