import React, { useEffect } from "react";
import styles from "../../styles/Home.module.css";

function AccountRecovery(props) {
  useEffect(() => {    
  });
  return (
    <div className="continueAccounts" id="modalbackground">      
      <div
        className="continueAccount__logo bpLarge__none"
        onClick={() => (window.localtion.href = "/")}
      >
        <h4>Collectnea</h4>
      </div>

      <div className="continueAccount__arr--box">
        <a style={{ cursor: "pointer" }}>
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
          <label className={styles.font}>Forgot Password</label>
        </h2>
      </div>

      <form
        className="continueAccount"
        onSubmit={(e) => {
          e.preventDefault();          
        }}
      >
        <div className="continueAccount__box">
          <p>Email id</p>
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

export default AccountRecovery;
