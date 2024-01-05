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
  buttonClickHandler,
  children,
}) => {
  return (
    <Flex
      vertical
      align="center"
      gap={20}
      className="w-full box-border"
    >
      <Flex justify="space-between" align="center" className="w-full">
        <Title level={3}>{title}</Title>
        {buttonClickHandler && (
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
        gap={20}
        className={styles.formSectionWrapper}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default FromSection;
