import { FC } from "react";
import styles from "./style.module.scss";

const InvoiceMerchandise: FC = () => {
  return (
    <>
      <div className={styles.invoiceMain}>
        <div className={styles.invoiceHeadingBg}>
          <p className={styles.invoiceMainHeading}>Merchandise</p>
        </div>
        <div className={styles.invoiceRow}>
          <p>hello-1</p>
          <p>hello-1</p>
          <p>hello-1</p>
          <p>hello-1</p>
          <p>hello-1</p>
          <p>hello-1</p>
          <p>hello-1</p>
          <p>hello-1</p>
          <p>hello-1</p>
        </div>
      </div>
    </>
  );
};
export default InvoiceMerchandise;
