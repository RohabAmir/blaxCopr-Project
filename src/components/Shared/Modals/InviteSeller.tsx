"use client";
import { FC, useState } from "react";
import styles from "./style.module.scss";
import { getLocalData } from "@/utils";
import { useSendInviteMutation } from "@/Store/services/contractApi";

interface ModalProps {
  closeModal: () => void;
  contractDetails: any;
  userDetails: any;
}
interface sendInviteProps {
  email: string;
  message: string;
  role: string;
  id: string;
}
const InviteSeller: FC<ModalProps> = ({
  closeModal,
  contractDetails,
  userDetails,
}) => {
  const userRole = userDetails?.id === contractDetails?.buyerId;
  const contractId = getLocalData("contract_id");
  const [sendInviteDetails, { isLoading, isError, error }] =
    useSendInviteMutation();
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const payload = {
      email: email,
      message: message,
      role: userRole ? "SELLER" : "BUYER",
    };

    const response = await sendInviteDetails({
      id: contractId,
      ...payload,
    }).unwrap();
    setSuccessMessage(response.response.message);
    // if (response?.response?.statusCode === 200) {
    //       closeModal(); // Only close modal on success
    // }
  };

  // A utility function to handle the Api error message
  function isErrorWithMessage(error: any): error is { message: string } {
    return error && typeof error.message === "string";
  }

  return (
    <>
      <form className={styles.overlay} onSubmit={handleSubmit}>
        <div className={styles.modalNew}>
          <p className={styles.heading}>
            Invite{" "}
            {contractDetails?.createrRole === "BUYER" ? "Seller" : "Buyer"}
          </p>
          <div className={styles.sellerFlex}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className={styles.label}>Message for the seller</label>
            <textarea
              className={styles.input2}
              rows={4}
              placeholder="Hello, I've sent over the Blaxcorp contract for your review. It contains the details we agreed upon. If you're ready to proceed, please sign at!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {/* Dynamically handling success and error messages from api  */}
          {successMessage ? (
            <div style={{ color: "green" }}>{successMessage}</div>
          ) : (
            isError &&
            error && (
              <div style={{ color: "red", marginBottom: "5px" }}>
                {"status" in error && isErrorWithMessage(error.data)
                  ? error.data.message
                  : "An error occurred. Please try again later."}
              </div>
            )
          )}
          <button className={styles.btnOpen} type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Invite"}
          </button>
          <button className={styles.crossNew} onClick={closeModal}>
            &times;
          </button>
        </div>
      </form>
    </>
  );
};
export default InviteSeller;
