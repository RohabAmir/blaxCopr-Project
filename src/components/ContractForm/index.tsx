"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Stepper from "./Stepper";
import { Flex, Grid } from "antd";
import Create from "./StepCreate";
import StepDetail from "./StepDetail";
import StepCompliance from "./StepCompliance";

interface StepMapping {
      [key: string]: number;
}

const steps: StepMapping = {
      create: 0,
      details: 1,
      compliance: 2,
};

const reverseSteps: string[] = ["create", "details", "compliance"];

const ContractForm: FC = () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      const page: string = searchParams.get("page") || "";
      const { useBreakpoint } = Grid;
      const screens: any = useBreakpoint();

      const [selectedCurrency, setSelectedCurrency] = useState(null);
      const [activeStep, setActiveStep] = useState<number>(0);

      useEffect(() => {
            // Attempt to determine the current step from the URL's query parameters
            const page = searchParams.get("page") || "";
            const step = page ? steps[page] : 0; // Default to step 0 if not found
            setActiveStep(step);
      }, [searchParams]);

      const handleStepChange = (current: number, data?: any) => {
            setActiveStep(current);
            const { selectedCurrency } = data || {};
            setSelectedCurrency(selectedCurrency);
      
            // Check if isEditing query param exists and append it if true
            const isEditing = searchParams.get("editing") === "true" ? "&editing=true" : "";
      
            // Update the URL to reflect the current step, including isEditing parameter if present
            const stepName = reverseSteps[current];
            // Use the Next.js router to update the URL without navigating away from the page
            router.push(`/contract-form?page=${stepName}${isEditing}`, undefined, {
                  shallow: true,
            });
      };
      

      return (
            <div>
                  {screens["sm"] && <Stepper activeStep={activeStep} />}

                  <Flex vertical align="center">
                        {activeStep === 0 && (
                              <Create
                                    handleStepChange={handleStepChange}
                                    step={activeStep}
                              />
                        )}
                        {activeStep === 1 && (
                              <StepDetail
                                    handleStepChange={handleStepChange}
                                    step={activeStep}
                                    selectedCurrency={selectedCurrency}
                              />
                        )}
                        {activeStep === 2 && (
                              <StepCompliance
                                    handleStepChange={handleStepChange}
                                    step={activeStep}
                              />
                        )}
                  </Flex>
            </div>
      );
};
export default ContractForm;
