"use client";
import { FC, useState } from "react";
import Image from "next/image";
import styles from "../style.module.scss";
import PlusIcon from "../../../../public/icons/Plus.svg";
import DashIcon from "../../../../public/icons/Dash.svg";
import TagIcon from "../../../../public/icons/Tag.svg";
import LockIcon from "../../../../public/icons/Lock.svg";
import CheckIcon from "../../../../public/icons/Check.svg";
import SecondaryButton from "../../../../public/icons/Secondary Button.svg";
import UserIcon from "../../../../public/icons/User.svg";
import Router, { useRouter } from "next/navigation";
import { storeLocalData, getLocalData } from "@/utils";
import Spinner from "@/utils/spinner";


interface CardDetails {
      documents: any;
      transactions: any;
      shipping: any;
      // shippingId: any;
      // transactionIds: boolean;
      status: string;
      type?: string;
      price: string;
      company: string;
      date: string;
      id: number;
      contractName:string;
      buyerId: number;
      createdAt: string ;

}

interface TransactionId {
      id: number;
}

interface documentId {
      id: number;
}

interface ICard {
      userDetails: any;
      data: CardDetails;
      onDelete: (id: number) => void; // Function to call on delete
      // allContractDetails: any;
}
const Card: FC<ICard> = ({ data,  userDetails, onDelete}) => {
      console.log("data>>>",data);
const[loading,setLoading]=useState(false);
      const router = useRouter();
      const [activeType, setActiveType] = useState(false);
      const [isMouseOver, setMouseOver] = useState(false);
      function handleActiveType() {
            setActiveType((active) => !active);
      }
      
      const roleType = userDetails?.id === data?.buyerId? "Buyer" : "Seller";
       // Assuming contractDetails.createdAt holds the API response date-time string
       const createdAtISO = data?.createdAt || "";
       // Parsing the ISO date string into a Date object
       const date = new Date(createdAtISO);
       // Formatting the date
       const formattedDate = `${date.getDate()} ${date.toLocaleString(
             "default",
             { month: "short" }
       )}, ${date.getFullYear()}`;

      const closedstyles =
           data?.status == "Closed"
                  ? {
                          // color: "#747a67",
                          opacity: "0.5",
                    }
                  : {};

      const mouseOverHandler = (val: boolean, status: string) => {
            if (status !== "Closed") {
                  setMouseOver(val);
            }
      };

      const handleDelete = (e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            onDelete(data.id);
      };

      const handleClick = (e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            setLoading(true);
            storeLocalData('contract_id' , `${data?.id}`);
            storeLocalData('shipping_id' , `${data?.shipping?.id}`);
            const transactionIds: TransactionId[] = data?.transactions?.map((t: TransactionId) => ({ id: t.id }));
            storeLocalData("transaction_ids", JSON.stringify(transactionIds));
            const documentIds: documentId[] = data?.documents?.map((d: documentId) => ({ id: d.id }));
            storeLocalData("document_ids", JSON.stringify(documentIds));
                        

            if (data?.status === "INCOMPLETE") {
                  router.push("/contract-form");
            } else if (data?.status === "PENDING" || data?.status === "COMPLETED") {
                  router.push("/contract-processing-form");
            }
      };

      return (
            <>
            {loading&&<Spinner/>}
                  <div
                        className={
                              status === "Closed"
                                    ? styles.closed
                                    : styles.cardContainerMain
                        }
                        style={{ cursor: "pointer" }}
                        onClick={handleClick}
                  >
                        <div className={styles.flexContainerRow}>
                              <div className={styles.flexRow}>
                                    {data?.status === "INCOMPLETE" && (
                                          <Image
                                                src={DashIcon}
                                                alt="dash icon"
                                          />
                                    )}
                                    {data?.status === "PENDING" && (
                                          <Image
                                                src={DashIcon}
                                                alt="dash icon"
                                          />
                                    )}
                                    {data?.status === "Closed" && (
                                          <Image
                                                className={styles.icon}
                                                src={CheckIcon}
                                                alt="check icon"
                                                style={closedstyles}
                                          />
                                    )}
                                    {data?.status === "Open" && (
                                          <Image
                                                src={LockIcon}
                                                alt="lock icon"
                                          />
                                    )}
                                    <p
                                          className={styles.thirdHeading}
                                          style={closedstyles}
                                    >
                                          {data?.status}
                                    </p>
                              </div>
                              <div
                                    className={styles.flexRow}
                                    onMouseOver={() =>
                                          mouseOverHandler(true, status)
                                    }
                                    onMouseLeave={() =>
                                          mouseOverHandler(false, status)
                                    }
                              >
                                    {isMouseOver ? (
                                          <button
                                                className={styles.cancel}
                                                onClick={handleDelete}
                                          >
                                                Cancel
                                          </button>
                                    ) : (
                                          <>
                                                <Image
                                                      onClick={handleActiveType}
                                                      className={styles.btnIcon}
                                                      style={closedstyles}
                                                      src={
                                                            activeType
                                                                  ? SecondaryButton
                                                                  : UserIcon
                                                      }
                                                      alt="dash icon"
                                                />
                                                {status === "Closed" ? (
                                                      <span
                                                            className={
                                                                  styles.close
                                                            }
                                                      >
                                                            {/* {type} */}
                                                            {roleType}
                                                      </span>
                                                ) : (
                                                      <span
                                                            className={
                                                                  styles.span
                                                            }
                                                      >
                                                            {/* {type} */}
                                                            {roleType}
                                                      </span>
                                                )}
                                          </>
                                    )}
                              </div>
                        </div>
                        <h1 className={styles.heading} style={closedstyles}>
                                    {/* {data?.price : "--" }  */}
                                   { "$--" }
                                   {/* {` $ ${subTotal}`} */}
                        </h1>
                        <div className={styles.flexContainerRow}>
                              <div className={styles.flexRow}>
                                    <p
                                          className={styles.secondHeading}
                                          style={closedstyles}
                                    >
                                          {data?.contractName}
                                    </p>
                              </div>
                              <p
                                    className={styles.thirdHeading}
                                    style={closedstyles}
                              >
                                   Created {formattedDate}
                              </p>
                        </div>
                  </div>
            </>
      );
};

export default Card;
