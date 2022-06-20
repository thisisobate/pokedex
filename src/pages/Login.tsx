import { css } from "@emotion/css";
import React, { ChangeEvent, FormEvent, useState } from "react";

export const Login = () => {
    const [inputValue, setInputValue] = useState<{[key: string]: string}>({});

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputValue(prev => ({
            ...prev,
            [name]: value,
        })
        )
    };

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (inputValue.username === "admin" && inputValue.password ==="admin") {
            window.location.href = window.location.protocol + '/dashboard';
        } else {
            window.alert('Invalid username and password!');
        }
    };
  const styles = getLoginStyle();
  return (
    <div className={styles.background}>
      <div className={styles.form}>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.textbox}>
            <input
              className={styles.input}
              name="username"
              type="text"
              onChange={handleInputChange}
              value={inputValue.username ?? ""}
              placeholder="Username"
            />
          </div>

          <div className={styles.textbox}>
            <input
              className={styles.input}
              name="password"
              type="password"
              onChange={handleInputChange}
              value={inputValue.password ?? ""}
              placeholder="Password"
            />
          </div>
          <button className={styles.button}>Log In</button>
        </form>
      </div>
    </div>
  );
};
const getLoginStyle = () => ({
  background: css({
    overflow: "auto",
    minHeight: "100vh",
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    backgroundColor: "#1C1D1F",
    backgroundAttachment: "fixed",
  }),
  textbox: css({
    display: "flex",
    flexDirection: "column",
    paddingBottom: "30px",
  }),
  input: css({
    padding: "16px",
    backgroundColor: "#40414B",
    color: "#fff",
    border: "none",
    fontSize: "15px",
  }),
  button: css({
    width: "368px",
    padding: "16px",
    backgroundColor: "#F2C94C",
    color: "#ffffff",
    border: "none",
    fontSize: "15px",
    textAlign: "center",
    fontWeight: "700",
  }),
  form: css({
    margin: "0 auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "5rem 3rem",
    backgroundColor: "#2C2F36",
  }),
});
