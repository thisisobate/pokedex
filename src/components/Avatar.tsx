import React from "react";
import { css } from "@emotion/css";

interface Props {
  src?: string;
  size: "sm" | "md" | "lg";
  alt?: string;
}

export const Avatar = ({ src, size, alt }: Props) => {
  const styles = getAvatarStyles(size);
  return (
    <div className={styles.imgContainer}>
      <img alt={alt} src={src} className={styles.imageStyle} />
    </div>
  );
};

const getAvatarStyles = (size: string) => {
  const sizeMap: { [key: string]: number } = {
    sm: 10,
    md: 20,
    lg: 30,
  };
  return {
    imgContainer: css`
        width: ${sizeMap[size]}%;
      height: ${sizeMap[size]}%;
    `,
    imageStyle: css`
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    `,
  };
};
