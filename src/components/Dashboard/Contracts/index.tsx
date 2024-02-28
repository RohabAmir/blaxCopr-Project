import { FC, useEffect, useState } from "react";

import styles from "../style.module.scss";
import Card from "./Card";
import PlusIcon from "../../../../public/icons/Plus.svg";
import Image from "next/image";
import Link from "next/link";
import AccountDetailForm from "@/app/(dashboard)/(forms)/account-details-form/page";
import { ROUTES } from "@/constants";
import { removeLocalData } from "@/utils";
import { useDeleteContractMutation } from "@/Store/services/contractApi";
import Spinner from "@/utils/Spinner";
import { useRouter } from "next/navigation";

interface CardDetails {
  status: string;
  type: string;
  price: string;
  company: string;
  date: string;
  id: number;
}
interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  id: number;
}
interface CardContainerProps {
  activeNav: string[];
  allContractDetails: any;
  userDetails: UserDetails;
  refetchAllContractDetails: () => void;
}

const CardContainer: FC<CardContainerProps> = ({
  activeNav,
  allContractDetails,
  userDetails,
  refetchAllContractDetails,
}) => {
  const [loading, setLoading] = useState(false);
  console.log("allContractDetails>>", allContractDetails);
  const router = useRouter();
  const [CardList, setCardList] = useState<Array<CardDetails>>([]);
  const [deleteContract] = useDeleteContractMutation();

  const handleDeleteContract = async (id: number) => {
    try {
      await deleteContract(id).unwrap();
      refetchAllContractDetails();
    } catch (error) {
      console.error("Error deleting contract:", error);
    }
  };

  const filteredCardList = !activeNav.includes("all")
    ? allContractDetails?.response.filter((data: { status: string }) =>
        activeNav.includes(data.status)
      )
    : allContractDetails?.response;

  const removeContractLocalData = () => {
    removeLocalData("contract_id");
    removeLocalData("shipping_id");
    removeLocalData("transaction_ids");
    removeLocalData("document_ids");
  };

  const createOnClickHandler = () => {
    setLoading(true);
    removeContractLocalData();
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.grid}>
          <div className={styles.cardContainerMainPlus}>
            <Link href={ROUTES.CONTRACT_FORM}>
              <button className={styles.button}>
                <Image
                  src={PlusIcon}
                  alt="plus icon"
                  onClick={createOnClickHandler}
                />
              </button>
            </Link>
            <p className={styles.titleScreen}>Create</p>
          </div>
          {filteredCardList?.map((data: any, idx: any) => {
            return (
              <Card
                key={idx}
                data={data}
                onDelete={handleDeleteContract}
                userDetails={userDetails}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default CardContainer;
