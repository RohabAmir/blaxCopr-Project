import { Flex, Grid } from "antd";
import React, { FC, useState, useEffect } from "react";
import TextInput from "../Shared/Inputs/Text";
import Button from "../Shared/Button";
import styles from "./style.module.scss";
import { useUpdateUserDetailsMutation } from "@/Store/services/authApi";
import { useRouter } from "next/navigation";

interface UserDetails {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
}

interface PersonalDetailsProps {
      userDetails: UserDetails;
}
interface updateUserDetailsProps {
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
}
const PersonalDetails: FC<PersonalDetailsProps> = ({
      userDetails,
}) => {
      console.log(userDetails);
      const [updateUserDetails] = useUpdateUserDetailsMutation();
      const [userFormData, setUserFormData] = useState<UserDetails>({
            firstName: userDetails?.firstName || "",
            lastName: userDetails?.lastName || "",
            email: userDetails?.email || "",
            phone: userDetails?.phone || "",
      });
      const [isDirty, setIsDirty] = useState(false);
      const router = useRouter();

      const handleInputChange = (
            name: keyof UserDetails,
            value: string | number
      ) => {
            setUserFormData((prev) => ({ ...prev, [name]: value }));
            setIsDirty(true);
      };

      const handleSubmit = async () => {
            const updatedFields: Partial<UserDetails> = {};
            Object.keys(userFormData).forEach((key) => {
                  const k = key as keyof UserDetails;
                  if (
                        userFormData[k] !== userDetails[k] &&
                        userFormData[k] !== undefined
                  ) {
                        updatedFields[k] = userFormData[k];
                  }
            });
            if (Object.keys(updatedFields).length > 0) {
                  await updateUserDetails(
                        updatedFields as updateUserDetailsProps
                  );
                  router.push('/dashboard');
            }
      };

      const { useBreakpoint } = Grid;
      const screens = useBreakpoint();

      return (
            <div className={styles.personalDetails}>
                  <div className={styles.personalDetailsMin}>
                        <div
                              style={
                                    screens.sm
                                          ? { width: "50%" }
                                          : { width: "100%" }
                              }
                        >
                              <TextInput
                                    name="firstName"
                                    label="First Name"
                                    defaultValue={userFormData.firstName}
                                    onChange={(value) =>
                                          handleInputChange("firstName", value)
                                    }
                              />
                              <TextInput
                                    name="lastName"
                                    label="Last Name"
                                    defaultValue={userFormData.lastName}
                                    onChange={(value) =>
                                          handleInputChange("lastName", value)
                                    }
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
                                    defaultValue={userFormData.email}
                                    onChange={(value) =>
                                          handleInputChange("email", value)
                                    }
                              />
                              <TextInput
                                    name="phone"
                                    label="Phone"
                                    type="text"
                                    defaultValue={userFormData.phone}
                                    onChange={(value) =>
                                          handleInputChange("phone", value)
                                    }
                              />
                        </div>
                  </div>
                  <div className={styles.btnEnd}>
                        <Button
                              name="Save"
                              fullWidth={!screens.sm}
                              onClickHandler={handleSubmit}
                              customDisabled={!isDirty}
                        />
                  </div>
            </div>
      );
};

export default PersonalDetails;
