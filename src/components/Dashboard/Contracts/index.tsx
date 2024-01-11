import { FC } from "react";

import styles from "../style.module.scss";
import Card from "./Card";
import PlusIcon from "../../../../public/icons/Plus.svg";
import Image from "next/image";
import Link from "next/link";
import AccountDetailForm from "@/app/(dashboard)/(forms)/account-details-form/page";
import { ROUTES } from "@/constants";
interface CardDetails {
  status: string;
  type: string;
  price: string;
  company: string;
  date: string;
}
interface CardContainerProps {
  activeNav: string;
}

const CardContainer: FC<CardContainerProps> = ({ activeNav }) => {
  const CardList: Array<CardDetails> = [
    {
      status: "Action required",
      type: "seller",
      price: "11,270",
      company: "LLC. Blaxcorp",
      date: "Created 12 Dec",
    },
    {
      status: "Closed",
      type: "seller",
      price: "15,000",
      company: "John Doe LLC. Property",
      date: "Created 12 Dec",
    },
    {
      status: "Open",
      type: "buyer",
      price: "15,000",
      company: "Jane Doe LLC. Property",
      date: "Created 12 Dec",
    },

    {
      status: "Action required",
      type: "seller",
      price: "11,270",
      company: "Jane Doe LLC. Property",
      date: "Created 12 Dec",
    },
  ];
  const filteredCardList =
    activeNav !== "all"
      ? CardList.filter(
          (data) => data.status.toLowerCase() === activeNav.toLowerCase()
        )
      : CardList;

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.cardContainerMainPlus}>
          <Link href={ROUTES.CONTRACT_FORM}>
            <button className={styles.button}>
              <Image src={PlusIcon} alt="plus icon" />
            </button>
          </Link>
          <p className={styles.titleScreen}>Create</p>
        </div>
        {filteredCardList.map((data, idx) => (
          <Card key={idx} data={data} />
        ))}
      </div>
    </>
  );
};

export default CardContainer;
