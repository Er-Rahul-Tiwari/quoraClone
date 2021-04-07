import React from "react";

function Social() {
  return (
    <div className="continueAccounts" id="modalbackground">      
      <div className="continueAccount__logo bpLarge__none">
        <h4>Collectnea</h4>
      </div>

      <div className="continueAccount__arr--box">
        <a>
          <svg
            className="arrNav__icon u-margin-bottom-small"
            viewBox="0 0 25 13"
            fill="none"
          >
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
        </a>
        <h2 className="heading-2 weight-600 report__mt font">
          Continue Account
        </h2>
      </div>

      <form className="continueAccount">       
        <div className="continueAccount__box">
          <p>Username</p>
          <input
            type="text"
            className="continueAccount__input font"            
          />
          <p id="username"></p>
        </div>
        <div className="continueAccount__box">
          <p>Fullname</p>
          <input
            type="text"
            className="continueAccount__input font"            
          />
          <p id="fullname"></p>
        </div>
        <div className="continueAccount__box">
          <p>Profession</p>
          <select
            className="continueAccount__select"
            style={{
              appearance: "none",
              MozAppearance: "none",
              WebkitAppearance: "none",
            }}            
          >            
          </select>
        </div>
        <button
          className=" continueAccount__btn"
          type="submit"
          style={{ cursor: "pointer" }}
        >
          Register
        </button>
      </form>

      <div
        className="footers"
        style={{ position: "fixed", left: 0, bottom: 0, width: "100%" }}
      >
        <div className="footer">
          <div className="footer__signIn">
            <p>Forgot your password?</p>
            <a href="/auth/forgot-password" className="footer__link">
              Click here
            </a>
          </div>
          <div className="footer__TandC">
            <p>Agree with ?</p>
            <a href="/info/terms-and-conditions" className="footer__link">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
