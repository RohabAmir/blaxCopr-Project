import { ButtonType } from "@/types";
import { Col, Flex, Row } from "antd";
import Title from "antd/es/typography/Title";
import { Button } from "..";
import React, { FC, ReactNode, useState } from "react";
import styles from "./style.module.scss";

interface IFromSection {
  title?: string;
  buttonTitle?: string;
  buttonClickHandler?: () => void;
  children: ReactNode;
}

const FromSection: FC<IFromSection> = ({
  title,
  buttonTitle,
  buttonClickHandler,
  children,
}) => {
  const [removeButton, setRemoveButton] = useState(false);
  return (
    <Flex
      vertical
      align="center"
      // gap={20}
      style={{ width: "100%", boxSizing: "border-box" }}
    >
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Title level={3}>{title}</Title>
        {removeButton && (
          <Button
            name="Remove"
            onClickHandler={buttonClickHandler}
            type={ButtonType.Secondary}
          />
        )}
      </Flex>
      <Flex
        vertical
        align="center"
        style={{ width: "100%" }}
        className={styles.formSectionWrapper}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default FromSection;
