import React, { useState, useEffect } from "react";
import { Button, Modal } from "@material-ui/core";
import axiosConfig from "../../src/Utils/axiosConfig";
import NavbarSearch from "../../src/Layouts/NavbarSearch";
import AlertboxComponent from "../../src/Components/alertboxComponent/alertboxComponent";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

function ChangePassword() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
    document.getElementById("modalbackground").style.filter = "blur(5px)";
  };

  const handleClose = () => {
    setOpen(false);
    document.getElementById("modalbackground").style.filter = "none";
  };

  const handlePassword1Change = (e) => {
    setPassword1(e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const change = () => {
    const data = new FormData();
    data.append("old_password", password1);
    data.append("new_password", password2);
    data.append("confirm_password", password2);
    axiosConfig
      .post("/api/auth/change-password/", data)
      .then((response) => {
        if (response.status != 200) throw new Error();
        setMessage("Password changed successfully");
        handleOpen();
        setTimeout(() => {
          window.location.href = "/myprofile";
        }, 3000);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            setMessage(err.response.data.error[0]);
            handleOpen();
          }
        } else {
          setMessage("Something went wrong");
          handleOpen();
        }
      });
  };

  const success_failure = () => {
    return (
      <Modal open={open} onClose={handleClose}>
        <AlertboxComponent close={handleClose} message={message} />
      </Modal>
    );
  };

  return (
    <div className="continueAccounts" id="modalbackground">
      {success_failure()}
      {/* <NavbarSearch /> */}
      <div
        className="continueAccount__logo bpLarge__none"
        onClick={() => (window.localtion.href = "/")}
      >
        <h4>Collectnea</h4>
      </div>

      <div className="continueAccount__arr--box">
        <a style={{ cursor: "pointer" }} onClick={() => history.back()}>
          <svg
            className="arrNav__icon u-margin-bottom-small"
            viewBox="0 0 25 13"
            fill="none"
          >
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
        </a>
        <h2 className="heading-2 weight-600 report__mt">
          <label className={styles.font}>Change Password</label>
        </h2>      
      </div>

      <form
        className="continueAccount"
        onSubmit={(e) => {
          e.preventDefault();          
        }}
      >
        <div className="continueAccount__box">
          <p>Enter your current password</p>
          <input
            id="password"
            type="email"
            className="continueAccount__input"            
          />
        </div>
        <div className="continueAccount__box">
          <p>Enter your new password</p>
          <input
            id="password"
            type="email"
            className="continueAccount__input"            
          />
        </div>
        <button
          type="submit"
          className="continueAccount__btn"
          style={{ cursor: "pointer" }}
        >
          Next
        </button>
      </form>
      
      <div
        className="footers fix__bottom"
      >
        <div className="footer">
          <div className="footer__signIn">
            <p>Already have an account?</p>
            <a href="/auth/signin" className="footer__link">
              Sign in here
            </a>
          </div>
          <div className="footer__TandC">
            <p>Agree with ?</p>
            <a href="" className="footer__link">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    
      </div>
  );
}

export default ChangePassword;
