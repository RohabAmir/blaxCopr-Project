import { FC } from "react";

import styles from "./style.module.css";
import Card from "./Card";
interface CardDetails {
  status: string;
  type: string;
  price: string;
  company: string;
  date: string;
}
const CardContainer: FC = () => {
  const CardList: Array<CardDetails> = [
    {
      status: "action required",
      type: "seller",
      price: "$11,270",
      company: "LLC. Blaxcorp",
      date: "Created 12 Dec",
    },
    {
      status: "closed",
      type: "seller",
      price: "$15,000",
      company: "John Doe LLC. Property",
      date: "Created 12 Dec",
    },
    {
      status: "open",
      type: "buyer",
      price: "$15,000",
      company: "Jane Doe LLC. Property",
      date: "Created 12 Dec",
    },
    {
      status: "open ",
      type: "seller",
      price: "$7,250",
      company: "LLC. Blaxcorp",
      date: "Created 12 Dec",
    },
    {
      status: "action required",
      type: "seller",
      price: "$11,270",
      company: "Jane Doe LLC. Property",
      date: "Created 12 Dec",
    },
  ];
  return (
    <>
      <div className={styles.grid}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default CardContainer;
