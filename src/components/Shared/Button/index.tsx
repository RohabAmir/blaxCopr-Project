import { Button } from "antd";
import React, { FC } from "react";
import styles from "./style.module.scss";
import FilterIcon from "../../../../public/icons/filters.svg";
import CaretLeft from "../../../../public/icons/CaretLeft.svg";
import PlusIcon from "../../../../public/icons/Plus.svg";
import { ButtonType, IconType } from "@/types";

import Image from "next/image";
import type { SizeType } from "antd/es/config-provider/SizeContext";

interface IButton {
      name: string;
      onClickHandler?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
      fullWidth?: boolean;
      type?: ButtonType;
      size?: SizeType;
      leftIcon?: IconType;
      rightIcon?: IconType;
      style?: any;
      isSubmit?: boolean;
      isLoading?: boolean;
      customDisabled?: boolean;
}

const GeneralButton: FC<IButton> = ({
      name,
      onClickHandler,
      fullWidth = false,
      type = ButtonType.Primary,
      size = "large",
      leftIcon = IconType.None,
      rightIcon = IconType.None,
      style,
      isSubmit = true,
      isLoading = false,
      customDisabled = false,
}) => {
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (onClickHandler) {
                  onClickHandler(event);
            }
      };

      return (
            <Button
                  onClick={handleClick}
                  shape="round"
                  className={styles.root}
                  size={size}
                  htmlType={isSubmit ? "submit" : "button"}
                  loading={isLoading}
                  disabled={isLoading || customDisabled}
                  style={{
                        width: fullWidth ? "100%" : "fit-content",
                        fontWeight: 600,
                        backgroundColor:
                              type === ButtonType.Primary
                                    ? "#9FE870"
                                    : type === ButtonType.Secondary
                                    ? "#16330014"
                                    : "transparent",
                        ...style,
                  }}
            >
                  {leftIcon !== IconType.None ? (
                        <Image
                              src={
                                    leftIcon === IconType.Filter
                                          ? FilterIcon
                                          : CaretLeft
                              }
                              alt="left"
                        />
                  ) : (
                        ""
                  )}
                  {name}
                  {rightIcon !== IconType.None ? (
                        <Image
                              src={
                                    rightIcon === IconType.Filter
                                          ? FilterIcon
                                          : CaretLeft
                              }
                              alt="right"
                        />
                  ) : (
                        ""
                  )}
            </Button>
      );
};

export default GeneralButton;
