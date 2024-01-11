"use client";
import { Col, Flex, Row, Grid } from "antd";
import React, { FC, useState, useEffect } from "react";
import { Button, Dropdown, FormSection, TextInput } from "../Shared";
import { ButtonType, IconType } from "@/types";
import styles from "./style.module.scss";
import ShieldIcon from "../../../public/icons/shield.svg";
import ChevronIcon from "../../../public/icons/TagChevron.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
const StepDetail: FC<any> = ({ handleStepChange, step }) => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  const [itemsCount, setItemsCount] = useState<number>(1);
  const [isShipping, setShipping] = useState(true);
  // const router = useRouter();
  useEffect(() => {
    console.log("Component mounted, router is ready");
  }, []);

  const handleBackClick = () => {
    console.log("hello");
    console.log(step - 1);
    if (step >= 0) handleStepChange(step - 1);
  };
  return (
    <Flex className={styles.detailsMain}>
      <Flex className="w-full" align="flex-start" vertical>
        <Button
          name="Back"
          leftIcon={IconType.BackArrow}
          type={ButtonType.Secondary}
          onClickHandler={handleBackClick}
          size={!screens["sm"] ? "middle" : "large"}

          // onClickHandler={() => router.back()}
        />
      </Flex>
      {new Array(itemsCount).fill("").map((_, i) => (
        <FormSection key={i} title="Transaction Details">
          <Flex style={{ width: "100%" }} className={styles.detialsCol}>
            <div className={styles.detailsItem}>
              <TextInput name="itemName" label="Item name" />
            </div>
            <div className={styles.detailsItem}>
              <TextInput name="price" label="Price(USD)" />
            </div>
          </Flex>
          <Dropdown
            name="itemCategory"
            label="Item category"
            options={[{ value: "123", label: "Item2" }]}
          />
          <Row className="w-full">
            <TextInput
              name="Description "
              label="Description of Item or Service"
            />
          </Row>
        </FormSection>
      ))}
      <FormSection>
        <Row className="w-full">
          <Button
            name="Add new item "
            onClickHandler={() => setItemsCount(itemsCount + 1)}
            size={!screens["sm"] ? "middle" : "large"}
          />
        </Row>
      </FormSection>
      {isShipping && (
        <FormSection
          title="Shipping "
          buttonTitle="Remove"
          buttonClickHandler={() => setShipping(false)}
          // size={!screens["sm"] ? "middle" : "large"}
        >
          <Flex style={{ width: "100%" }} className={styles.detialsCol}>
            <div className={styles.detailsItem}>
              <TextInput
                name="itemName"
                label="Shipping cost (USD)"
                placeholder="$500.00"
              />
            </div>
            <div className={styles.detailsItem}>
              <Dropdown
                name="Standard shipping"
                label="Shipping method"
                options={[
                  { value: "standard-shipping", label: " Standard Shipping " },
                ]}
              />
            </div>
          </Flex>
          <Flex style={{ width: "100%" }} className={styles.detialsCol}>
            <Col className={styles.detailsItem}>
              <Dropdown
                name="itemCategory"
                label="Shipping fee paid by"
                options={[
                  { value: "seller", name: "seller" },
                  { value: "buyer", name: "buyer" },
                ]}
              />
            </Col>
            <Col className={styles.detailsItem}>
              <Dropdown
                name="inspection period"
                label="Inspection period (days)"
                options={[{ value: "1", label: "1(min)" }]}
              />
            </Col>
          </Flex>
        </FormSection>
      )}
      {/* next section */}
      <FormSection>
        <Flex style={{ width: "100%" }} className={styles.detailsBox}>
          <Flex className={styles.detailsFlex}>
            <input className={styles.checkBox} type="checkbox" />
            <p className={styles.headingDetails}>
              Upgrade to title collection service
            </p>
          </Flex>
          <Row>
            <p className={styles.textDetails}>$60.00</p>
          </Row>
        </Flex>
        <Row className={styles.subText}>
          Blaxcorp.com holds title while the transaction completes, making the
          transaction secure (recommended)
        </Row>
      </FormSection>
      {/* next section2 */}
      <FormSection>
        <Flex style={{ width: "100%" }} className={styles.detailsBox}>
          <Flex className={styles.detailsFlex}>
            <input className={styles.checkBox} type="checkbox" />
            <p className={styles.headingDetails}>
              Upgrade to lien holder service{" "}
            </p>
          </Flex>
          <Row>
            <p className={styles.textDetails}>$60.00</p>
          </Row>
        </Flex>
        <Row className={styles.subText}>
          Blaxcorp.com guarantees to pay off current lien holder upon
          transaction closure
        </Row>
      </FormSection>
      {/* transaction summary */}
      <FormSection title="Transaction Summary">
        <div className={styles.flex}>
          <Image className={styles.shieldIcon} src={ShieldIcon} alt="icon" />
          <div className={styles.summary}>
            <div className={styles.flexDetails}>
              <p className={styles.total}>Subtotal:</p>
              <p className={styles.amount}>$10.000.00</p>
            </div>
            <div className={styles.flexDetails}>
              <p className={styles.total}>Shipping fee:</p>
              <p className={styles.amount}>$123.00</p>
            </div>
            <div className={styles.flexDetailsLine}>
              <Flex align="center" className="w-full">
                <span>Escrow fee paid by:</span>
                <span
                  className="w-full"
                  style={{ maxWidth: "100px", padding: "0px" }}
                >
                  <Dropdown
                    name="escrow-payee"
                    options={[
                      { value: "seller", label: "Seller" },
                      { value: "buyer", label: "Buyer" },
                    ]}
                  />
                </span>
              </Flex>
              <p className={styles.amount}>$30.00</p>
            </div>
            <div className={styles.flexDetails}>
              <p className={styles.total}>Buyer price:</p>
              <p className={styles.amount}>$10.153.00</p>
            </div>
          </div>
        </div>
      </FormSection>
      {/* payment processing fees */}
      <FormSection>
        <Flex className={styles.detailsPayment}>
          <Flex justify="center">
            <Image
              className={styles.chevron}
              src={ChevronIcon}
              alt="cheron icon"
            />
            <p className={styles.headingDetails}>Payment processing fees</p>
          </Flex>
          <p className={styles.amount}>+$25.00</p>
        </Flex>
        <Row className={styles.subTextFees}>
          Depending on the payment method you will use, there may be additional
          processing fees as outlined below.
        </Row>
      </FormSection>
      {/* last section */}
      <FormSection>
        <Row style={{ width: "100%" }} className={styles.cancelFee}>
          <Row>
            <Image
              className={styles.chevron}
              src={ChevronIcon}
              alt="cheron icon"
            />
            <p className={styles.headingDetails}>Cancellation fees </p>
          </Row>
          <div className={styles.amountBig}>
            Cancellation fees paid by:{" "}
            <select className={styles.select} name="Seller">
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
        </Row>
        <Row>
          <div className={styles.subTextFeesDetail}>
            1. Cancellation fee: 1% of the escrowed amount <br />
          </div>
          <div className={styles.subTextFeesDetail}>
            2. Wire Transfer Fee: $25 <br />
          </div>
          <div className={styles.subTextFeesDetail}>
            3. administrative Fee: $20
          </div>
        </Row>
      </FormSection>
      <Flex
        className="w-full"
        align="flex-end"
        vertical
        style={{ marginBottom: "24px" }}
      >
        <Button
          name="Next"
          type={ButtonType.Primary}
          onClickHandler={() => handleStepChange(2)}
          fullWidth={!screens["sm"]}
        />
      </Flex>
    </Flex>
  );
};

export default StepDetail;
