import { FC } from "react";
import CardContainer from "./Contracts";
import styles from "../Dashboard/Contracts/style.module.css";
import Header from "./Contracts/Header";
import Navbar from "./Contracts/Navbar";

const Dashboard: FC = () => {
  return (
    <>
      <div className={styles.main}>
        <Header />
        <Navbar />
        <CardContainer />
      </div>
    </>
  );
};

export default Dashboard;
