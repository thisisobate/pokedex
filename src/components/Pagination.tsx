import { css } from "@emotion/css";
import React from "react";

interface Props {
  total: number;
  limit: number;
  page: number;
  setPage: (value: number) => void;
}

export const Pagination = ({ total, limit, page, setPage }: Props) => {
  const numPages = Math.ceil(total / limit);
  const styles = getPaginationStyles();
  return (
    <div className={styles.container}>
      <div className={styles.numberedPages}>
        {Array(numPages)
          .fill(0)
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
      </div>
      <div>
        <button
          className={styles.spacing}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          prev
        </button>
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          Next
        </button>
      </div>
    </div>
  );
};

const getPaginationStyles = () => {
  return {
    container: css`
      display: flex;
      gap: 20%;
      align-items: center;
      background-color: #1f1f1f;
      height: 9vh;
      border-bottom-left-radius: 10px 10px;


      & > div:last-child > button {
        margin: 0 10px;
        background-color: #2C2F36;
        color: white;
        border: none;
        padding: 4px 8px;
        border-radius: 4px;
        &:disabled,
      &[disabled]{
        background: #ccc;
      }
    `,
    numberedPages: css`
      & > button {
        margin: 0 10px;
        background-color: #2c2f36;
        color: white;
        border: none;
        padding: 4px 8px;
        border-radius: 4px;
      }

      & > button[aria-current] {
        background: white;
        color: black;
        font-weight: bold;
        cursor: revert;
        transform: revert;
      }
    `,
    spacing: css`
      margin-right: 10px;
    `,
  };
};
