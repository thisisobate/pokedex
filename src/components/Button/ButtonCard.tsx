import { css } from "@emotion/css";
import React from "react";
import { Avatar } from "../Avatar";

interface Props {
  name?: string;
  number?: string;
  imgSrc?: string;
  imgSize?: "sm" | "md" | "lg";
  imgAlt?: string;
  bgColor?: string;
  size?: "sm" | "md" | "lg";
  /** reduces padding to xs */
  narrow?: boolean;
  id?: string;
  onClick?: (event: any) => void;
}

export const ButtonCard = (props: Props) => {
  const {
    name,
    number,
    imgSrc,
    id,
    imgSize = "md",
    imgAlt = name,
    size = "md",
    narrow = false,
    onClick,
  } = props;
  const styles = getButtonStyles(narrow, size, imgSrc);
  return (
    <button id={id} className={styles.button} onClick={onClick}>
      {imgSrc && <Avatar src={imgSrc} size={imgSize} alt={imgAlt} />}
      <span className={styles.textYellow}>{number}</span>
      {name}
    </button>
  );
};

const getButtonStyles = (narrow: boolean, size: string, imgSrc?: string) => {
  const sizeMap: { [key: string]: number } = {
    sm: 10,
    md: 50,
    lg: 80,
  };
  return {
    button: css`
      width: ${sizeMap[size]}%;
      padding: ${narrow ? 0 : 12}px;
      display: flex;
      ${imgSrc && "gap: 30px"};
      align-items: center;
      background-color: #40414b;
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: ${narrow ? 8 : 15}px;
      text-align: center;
      font-weight: ${narrow ? 200 : 700};
    `,
    textYellow: css`
      color: #f2c94c;
      font-weight: bold;
    `,
  };
};
