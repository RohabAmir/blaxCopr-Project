import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import TargetIcon from "../../../../public/icons/Target.svg";
import VectorIcon from "../../../../public/icons/Vector.svg";
import ConfirmVerificationModal from "../Modals/ConfirmVerificationModal";
import { Onfido } from "onfido-sdk-ui";

const Header: FC = () => {
      const [VerificationModal, setVerificationModal] = useState(false);
      const [sdkToken, setSdkToken] = useState<string | null>(null);
      const [onfidoInitiated, setOnfidoInitiated] = useState(false);

      const handleClick = () => {
            setVerificationModal(true);
      };
      const closeModal = () => {
            setVerificationModal(false);
      };

      const handleReceiveToken = (token: string) => {
            setSdkToken(token);
            closeModal(); 
      };


      // Initialize Onfido SDK
      const initOnfido = () => {
            if (sdkToken && !onfidoInitiated) {
                  Onfido.init({
                        token: sdkToken,
                        containerId: "onfido-mount",
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
      }, [sdkToken]);

      return (
            <>
                  <div className={styles.header}>
                        {sdkToken ? (
                              <div  
                                    className={styles.onfido}
                                    id="onfido-mount"
                              ></div>
                        ) : (
                              <>
                                    <div className={styles.flexRow}>
                                          <Image
                                                className={styles.img}
                                                src={TargetIcon}
                                                alt="target image"
                                          />
                                          <p className={styles.secondHeading}>
                                                Verify your profile
                                          </p>
                                    </div>

                                    <button
                                          className={styles.btn}
                                          onClick={handleClick}
                                    >
                                          Verify
                                          <Image
                                                className={styles.iconVector}
                                                src={VectorIcon}
                                                alt="vector icon"
                                          />
                                    </button>
                              </>
                        )}
                  </div>
                  {VerificationModal && (
                        <div className={styles.modalBackdrop}>
                              <ConfirmVerificationModal
                                    closeModal={closeModal}
                                    onReceiveToken={handleReceiveToken}
                              />
                        </div>
                  )}
            </>
      );
};
export default Header;
