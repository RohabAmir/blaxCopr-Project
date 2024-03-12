"use client";
import { FC, useEffect, useState, useRef } from "react";
import styles from "./style.module.scss";
import {
      useCreateApplicantMutation,
      useOnfidoSdkTokenQuery,
} from "@/Store/services/onfidoApi";
import { ICountry, IState, Country, State } from "country-state-city";
import iso2ToIso3 from "country-iso-2-to-3";
import { Onfido } from "onfido-sdk-ui";


interface ModalProps {
      closeModal: () => void;
}

const ConfirmVerificationModal: FC<ModalProps> = ({ closeModal }) => {
      const [createApplicant, { isLoading, isError, error }] =
            useCreateApplicantMutation();
      const { data: sdkTokenData, refetch: fetchOnfidoSdkToken } =
            useOnfidoSdkTokenQuery();
      const [dob, setDob] = useState<string>("");
      const [buildingNumber, setBuildingNumber] = useState<string>("");
      const [street, setStreet] = useState<string>("");
      const [town, setTown] = useState<string>("");
      const [postCode, setPostCode] = useState<string>("");
      const [country, setCountry] = useState<string>("");
      const [countries, setCountries] = useState<ICountry[]>([]);
      const [states, setStates] = useState<IState[]>([]);
      const [selectedState, setSelectedState] = useState<string | null>(null);
      const [successMessage, setSuccessMessage] = useState<string | null>(null);
      const onfidoContainerRef = useRef(null);
      const [onfidoInitiated, setOnfidoInitiated] = useState(false);

      useEffect(() => {
            const allCountries = Country.getAllCountries();
            setCountries(allCountries);
      }, []);

      useEffect(() => {
            if (country === "US") {
                  const usStates = State.getStatesOfCountry(country);
                  setStates(usStates);
            } else {
                  setStates([]);
                  setSelectedState(null); // Reset selected state if not USA
            }
      }, [country]);

      useEffect(() => {
            if (sdkTokenData) {
                  closeModal();
                  // When SDK Token is fetched --> initializing Onfido SDK
            }
      }, [sdkTokenData, closeModal]);

      // Initialize Onfido SDK
      const initOnfido = () => {
            if (
                  onfidoContainerRef.current &&
                  sdkTokenData &&
                  !onfidoInitiated
            ) {
                  Onfido.init({
                        token: sdkTokenData.token,
                        containerId: onfidoContainerRef.current,
                        steps: [
                              {
                                    type: "document",
                              },
                              {
                                    type: "face",
                                    options: {
                                          requestedVariant: "video",
                                    },
                              },
                              "complete",
                        ],
                        onComplete: (data: any) => {
                              console.log("Onfido verification complete", data);
                              // You can now handle the verification result
                        },
                        onError: (error: any) => {
                              console.error("Onfido SDK error:", error);
                        },
                  });
                  setOnfidoInitiated(true);
            }
      };

      useEffect(() => {
            initOnfido();
      }, [sdkTokenData]);

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault(); // Prevent default form submission
            // Convert country ISO Alpha-2 code to ISO Alpha-3
            const countryISOAlpha3 = iso2ToIso3(country);

            const payload = {
                  dob: dob,
                  address: {
                        building_number: buildingNumber,
                        street: street,
                        town: town,
                        postcode: postCode,
                        country: countryISOAlpha3,
                        state: country === "US" ? selectedState : null,
                  },
            };
            try {
                  await createApplicant({ data: payload }).unwrap();
                  setTimeout(() => {
                        fetchOnfidoSdkToken();
                  }, 1000);
            } catch (error) {
                  // Handle error in creating applicant
                  console.error("Error in creating applicant:", error);
            }
      };

      // A utility function to handle the Api error message
      function isErrorWithMessage(error: any): error is { message: string } {
            return error && typeof error.message === "string";
      }

      return (
            <>
                  <form className={styles.overlay} onSubmit={handleSubmit}>
                      <div></div>
                        <div
                              style={{ maxHeight: "none" }}
                              className={styles.modalNew}
                        >
                              <p className={styles.heading}>
                                    Verify Your Profile
                              </p>
                              <div className={styles.sellerFlex}>
                                    <label className={styles.label}>
                                          Country
                                    </label>
                                    <select
                                          className={styles.select}
                                          value={country}
                                          onChange={(e) =>
                                                setCountry(e.target.value)
                                          }
                                          required
                                    >
                                          <option value="">
                                                Select Country
                                          </option>
                                          {countries.map((country) => (
                                                <option
                                                      key={country.isoCode}
                                                      value={country.isoCode}
                                                >
                                                      {country.name}
                                                </option>
                                          ))}
                                    </select>
                                    {country === "US" && (
                                          <>
                                                <label className={styles.label}>
                                                      State
                                                </label>
                                                <select
                                                      className={styles.select}
                                                      value={
                                                            selectedState ?? ""
                                                      }
                                                      onChange={(e) =>
                                                            setSelectedState(
                                                                  e.target.value
                                                            )
                                                      }
                                                      required={
                                                            country === "US"
                                                      }
                                                >
                                                      <option value="">
                                                            Select State
                                                      </option>
                                                      {states.map((state) => (
                                                            <option
                                                                  key={
                                                                        state.isoCode
                                                                  }
                                                                  value={
                                                                        state.isoCode
                                                                  }
                                                            >
                                                                  {state.name}
                                                            </option>
                                                      ))}
                                                </select>
                                          </>
                                    )}
                                    <label className={styles.label}>
                                          BuildingNumber
                                    </label>
                                    <input
                                          className={styles.input}
                                          type="text"
                                          value={buildingNumber}
                                          onChange={(e) =>
                                                setBuildingNumber(
                                                      e.target.value
                                                )
                                          }
                                          required
                                    />
                                    <label className={styles.label}>
                                          Street
                                    </label>
                                    <input
                                          className={styles.input}
                                          type="text"
                                          value={street}
                                          onChange={(e) =>
                                                setStreet(e.target.value)
                                          }
                                          required
                                    />
                                    <label className={styles.label}>Town</label>
                                    <input
                                          className={styles.input}
                                          type="text"
                                          value={town}
                                          onChange={(e) =>
                                                setTown(e.target.value)
                                          }
                                          required
                                    />
                                    <label className={styles.label}>
                                          PostCode
                                    </label>
                                    <input
                                          className={styles.input}
                                          type="text"
                                          value={postCode}
                                          onChange={(e) =>
                                                setPostCode(e.target.value)
                                          }
                                          required
                                    />
                                    <label className={styles.label}>
                                          Date-of-birth
                                    </label>
                                    <input
                                          className={styles.input}
                                          type="text"
                                          value={dob}
                                          onChange={(e) =>
                                                setDob(e.target.value)
                                          }
                                          required
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
                                          <div
                                                style={{
                                                      color: "red",
                                                      marginBlock: "12px",
                                                }}
                                          >
                                                {"status" in error &&
                                                isErrorWithMessage(error.data)
                                                      ? error.data.message
                                                      : "An error occurred. Please try again later."}
                                          </div>
                                    )
                              )}
                              <button
                                    className={styles.btnOpen}
                                    type="submit"
                                    disabled={isLoading}
                              >
                                    {isLoading
                                          ? "Verifying..."
                                          : "Complete Verification"}
                              </button>
                              <button
                                    className={styles.crossNew}
                                    onClick={closeModal}
                              >
                                    &times;
                              </button>
                              <div ref={onfidoContainerRef} />
                        </div>
                        
                  </form>
            </>
      );
};
export default ConfirmVerificationModal;
