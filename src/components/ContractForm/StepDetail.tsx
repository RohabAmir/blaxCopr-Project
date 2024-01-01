import { Col, Flex, Row } from "antd";
import React from "react";
import { Button, Dropdown, FormSection, TextInput } from "../Shared";
import { ButtonType, IconType } from "@/types";
import styles from "./style.module.scss";
import ShieldIcon from "../../../public/icons/shield.svg";
import ChevronIcon from "../../../public/icons/TagChevron.svg";
import Image from "next/image";
const StepDetail = () => {
  return (
    <Flex vertical style={{ width: "560px" }}>
      <Button
        name="Back"
        leftIcon={IconType.BackArrow}
        type={ButtonType.Secondary}
      />
      <Flex style={{ width: "100%", marginBottom: "48px" }}>
        <FormSection title="Transaction Details">
          <Row style={{ width: "100%" }} justify={"space-between"}>
            <Col span={11}>
              <TextInput name="itemName" label="Item name" />
            </Col>
            <Col span={11}>
              <TextInput name="price" label="Price(USD)" />
            </Col>
          </Row>
          <Dropdown
            name="itemCategory"
            label="Item category"
            options={[{ value: "123", label: "Item2" }]}
          />
          <Row style={{ width: "100%" }}>
            <TextInput
              name="Description "
              label="Description of Item or Service"
            />
          </Row>
          <Row style={{ width: "100%" }}>
            <Button name="Add new item " />
          </Row>
        </FormSection>
      </Flex>
      {/* shipping */}

      <Flex style={{ width: "100%", marginBottom: "48px" }}>
        <FormSection title="Shipping ">
          <Row style={{ width: "100%" }} justify={"space-between"}>
            <Col span={11}>
              <TextInput
                name="itemName"
                label="Shipping cost (USD)"
                placeholder="$500.00"
              />
            </Col>
            <Col span={11}>
              <Dropdown
                name="Standard shipping"
                label="Shipping method"
                options={[
                  { value: "standard Shipping", label: " Standard Shipping " },
                ]}
              />
            </Col>
          </Row>
          <Row style={{ width: "100%" }} justify={"space-between"}>
            <Col span={11}>
              <Dropdown
                name="itemCategory"
                label="Shipping fee paid by"
                options={[{ value: "seller", name: "seller" }]}
              />
            </Col>
            <Col span={11}>
              <Dropdown
                name="inspection period"
                label="Inspection period (days)"
                options={[{ value: "123", label: "1(min)" }]}
              />
            </Col>
          </Row>
        </FormSection>
      </Flex>
      {/* next section */}
      <Flex style={{ width: "100%" }}>
        <FormSection>
          <Row style={{ width: "100%" }} justify="space-between">
            <Row style={{ gap: "16px" }}>
              <input className={styles.checkBox} type="checkbox" />
              <p className={styles.headingDetails}>
                Upgrade to title collection service
              </p>
            </Row>
            <Row>
              <p className={styles.textDetails}>$60.00</p>
            </Row>
          </Row>
          <Row className={styles.subText}>
            Blaxcorp.com holds title while the transaction completes, making the
            transaction secure (recommended)
          </Row>
        </FormSection>
      </Flex>
      {/* next section2 */}
      <Flex style={{ width: "100%", marginBottom: "48px" }}>
        <FormSection>
          <Row style={{ width: "100%" }} justify="space-between">
            <Row style={{ gap: "16px" }}>
              <input className={styles.checkBox} type="checkbox" />
              <p className={styles.headingDetails}>
                Upgrade to lien holder service{" "}
              </p>
            </Row>
            <Row>
              <p className={styles.textDetails}>$60.00</p>
            </Row>
          </Row>
          <Row className={styles.subText}>
            Blaxcorp.com guarantees to pay off current lien holder upon
            transaction closure
          </Row>
        </FormSection>
      </Flex>
      {/* transaction summary */}
      <Flex style={{ width: "100%", marginBottom: "48px" }}>
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
                <div>
                  <p className={styles.total}>
                    Escrow fee paid by:
                    {/* <Dropdown 
                      name="itemCategory"
                      options ={[
                        { value: "seller", label: "Seller" },
                        { value: "buyer", label: "Buyer" },
                      ]}
                    /> */}
                    <select className={styles.select} name="Seller">
                      <option value="seller">Seller</option>
                      <option value="buyer">Buyer</option>
                    </select>
                  </p>
                </div>
                <p className={styles.amount}>$30.00</p>
              </div>
              <div className={styles.flexDetails}>
                <p className={styles.total}>Buyer price:</p>
                <p className={styles.amount}>$10.153.00</p>
              </div>
            </div>
          </div>
        </FormSection>
      </Flex>
      {/* payment processing fees */}
      <Flex style={{ width: "100%", marginBottom: "48px" }}>
        <FormSection>
          <Row style={{ width: "100%" }} justify="space-between">
            <Row>
              <Image
                className={styles.chevron}
                src={ChevronIcon}
                alt="cheron icon"
              />
              <p className={styles.headingDetails}>Payment processing fees</p>
            </Row>
            <p className={styles.amount}>+ $25.00</p>
          </Row>
          <Row className={styles.subTextFees}>
            Depending on the payment method you will use, there may be
            additional processing fees as outlined below.
          </Row>
        </FormSection>
      </Flex>
      {/* last section */}
      <Flex style={{ width: "100%", marginBottom: "48px" }}>
        <FormSection>
          <Row style={{ width: "100%" }} justify="space-between">
            <Row>
              <Image
                className={styles.chevron}
                src={ChevronIcon}
                alt="cheron icon"
              />
              <p className={styles.headingDetails}>Cancellation fees </p>
            </Row>
            <p className={styles.amountBig}>
              Cancellation fees paid by:{" "}
              <select className={styles.select} name="Seller">
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>
              </select>
            </p>
          </Row>
          <Row>
            <div className={styles.subTextFeesDetail}>
              <p>
                1. Cancellation fee: 1% of the escrowed amount <br />
              </p>
            </div>
            <div className={styles.subTextFeesDetail}>
              <p>
                2. Wire Transfer Fee: $25 <br />
              </p>
            </div>
            <div className={styles.subTextFeesDetail}>
              <p>3. administrative Fee: $20</p>
            </div>
          </Row>
        </FormSection>
      </Flex>
      <div className={styles.btn}>
        <Button name="Next" type={ButtonType.Primary} />
      </div>
    </Flex>
  );
};

export default StepDetail;
