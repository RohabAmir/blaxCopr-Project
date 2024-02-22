import { Flex, Grid } from "antd";
import React, { FC, useState, useEffect } from "react";
import TextInput from "../Shared/Inputs/Text";
import Button from "../Shared/Button";
import styles from "./style.module.scss";
import { useUpdateUserDetailsMutation } from "@/Store/services/authApi";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

interface UserDetails {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
}

interface PersonalDetailsProps {
      userDetails: UserDetails;
}

interface UpdateUserResponse {
     
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      
  }
  
const PersonalDetails: FC<PersonalDetailsProps> = ({ userDetails }) => {
      const [updateUserDetails, { isLoading, isError, error }] =
            useUpdateUserDetailsMutation();
      const [changedFields, setChangedFields] = useState({});
      const [successMessage, setSuccessMessage] = useState("");

      const [userFormData, setUserFormData] = useState<UserDetails>({
            firstName: userDetails?.firstName || "",
            lastName: userDetails?.lastName || "",
            email: userDetails?.email || "",
            phone: userDetails?.phone || "",
      });
      const methods = useForm({
            defaultValues: {
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
            },
      });

      useEffect(() => {
            if (userDetails) {
                  methods.reset({
                        firstName: userDetails?.firstName,
                        lastName: userDetails?.lastName,
                        email: userDetails?.email,
                        phone: userDetails?.phone,
                  });
            }
      }, [userDetails, methods]);

      const { handleSubmit, formState, reset } = methods;
      const [isDirty, setIsDirty] = useState(false);
      const router = useRouter();

      const handleInputChange = (
            name: keyof UserDetails,
            value: string | number
      ) => {
            setUserFormData((prev) => ({ ...prev, [name]: value }));
            setIsDirty(true);
            setChangedFields((prev) => ({ ...prev, [name]: value }));
      };

      const onSubmit = async () => {
            if (Object.keys(changedFields).length > 0) {
                const response: any  = await updateUserDetails(changedFields as UpdateUserResponse);
                setSuccessMessage(response?.data?.updatedUser?.message );
        
            }
        };
        

      function isErrorWithMessage(error: any): error is { message: string } {
            return error && typeof error.message === "string";
      }

      const { useBreakpoint } = Grid;
      const screens = useBreakpoint();

      return (
            <form
                  className={styles.personalDetails}
                  onSubmit={handleSubmit(onSubmit)}
            >
                  <FormProvider {...methods}>
                        <div className={styles.personalDetailsMin}>
                              <div
                                    style={
                                          screens.sm
                                                ? { width: "50%" }
                                                : { width: "100%" }
                                    }
                              >
                                    <TextInput
                                          type="text"
                                          name="firstName"
                                          label="First Name"
                                          onChange={(value) =>
                                                handleInputChange(
                                                      "firstName",
                                                      value
                                                )
                                          }
                                          required
                                    />
                                    <TextInput
                                          type="text"
                                          name="lastName"
                                          label="Last Name"
                                          onChange={(value) =>
                                                handleInputChange(
                                                      "lastName",
                                                      value
                                                )
                                          }
                                          required
                                    />
                              </div>
                              <div
                                    style={
                                          screens.sm
                                                ? { width: "50%" }
                                                : { width: "100%" }
                                    }
                              >
                                    <TextInput
                                          name="email"
                                          label="Email"
                                          type="email"
                                          onChange={(value) =>
                                                handleInputChange(
                                                      "email",
                                                      value
                                                )
                                          }
                                          required
                                    />
                                    <TextInput
                                          name="phone"
                                          label="Phone"
                                          type="text"
                                          defaultValue={userFormData.phone}
                                          onChange={(value) =>
                                                handleInputChange(
                                                      "phone",
                                                      value
                                                )
                                          }
                                          required
                                    />
                              </div>
                        </div>
                        <div className={styles.btnEnd}>
                              <Button
                                    name="Save"
                                    fullWidth={!screens.sm}
                                    isSubmit
                                    customDisabled={!isDirty}
                              />
                        </div>
                        {/* Dynamically handling success and error messages from api  */}
                        {successMessage ? (
                              <div style={{ color: "green" }}>
                                    {successMessage}
                              </div>
                        ) : (
                              isError &&
                              error && (
                                    <div style={{ color: "red" }}>
                                          {"status" in error &&
                                          isErrorWithMessage(error.data)
                                                ? error.data.message
                                                : "An error occurred. Please try again later."}
                                    </div>
                              )
                        )}
                  </FormProvider>
            </form>
      );
};

export default PersonalDetails;
