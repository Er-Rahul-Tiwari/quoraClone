import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  Input,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import AlertboxComponent from "../../src/Components/alertboxComponent/alertboxComponent";
import { axioslogin } from "../../src/Utils/axiosConfig";
import { encryptData, decryptData } from "../../src/Utils/Crypto";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getProfile } from "../../redux/ActionCreator";
import {
  checkCookie,
  setCookie,
  getCookie,
  removeCookie,
} from "../../redux/localstorage";
import styles from "../../styles/Home.module.css";

const useStyles = makeStyles((theme) => ({
  progress: {
    color: "#4f4f4f",
  },
}));

const mapStateToProps = (state) => {
  return {
    profileData: state.ProfileData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile),
});

function signin(props) {
  const [next, setNext] = useState(false);

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);

  const [wait, setWait] = useState(true);

  const classes = useStyles();

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      await props
        .getProfile()
        .then((resolve) => {
          history.back();
        })
        .catch((reject) => {
          setWait(false);
        });
    };
    getData();
  }, []);

  const changePage = () => {
    console.log(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email));
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setNext(true);
    } else {
      setMessage("Invalid email");
      handleOpen();
    }
  };

  const handleOpen = () => {
    setOpen(true);
    document.getElementById("modalbackground").style.filter = "blur(3px)";
  };

  const handleClose = () => {
    setOpen(false);
    document.getElementById("modalbackground").style.filter = "none";
  };

  const enterPressed = (event) => {
    if (event.key === "Enter") {
      changePage();
    }
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const formSubmit = (email, password) => {
    const data = new FormData();

    data.append("email", email);
    data.append("password", password);

    return axioslogin
      .post("/api/auth/login/", data)
      .then((response) => {
        if (response.status != 200) throw new Error();
        setMessage(response.data.message);
        const enc = encryptData(response.data.body.token);
        setCookie("secret", enc, 15);
        removeCookie("state");
        handleOpen();
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status == 401) {
            setMessage("Invalid email or password");
          } else if (error.response.status == 500) {
            setMessage("Please try again later");
          }
        } else {
          setMessage("Something went wrong");
        }
        handleOpen();
      });
  };

  const modal = () => {
    return (
      <Modal open={open} onClose={handleClose}>
        <AlertboxComponent close={handleClose} message={message} />
      </Modal>
    );
  };
  if (wait) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={22} className={classes.progress} />
      </div>
    );
  }
  if (next) {
    return (
      <div className="continueAccounts" id="modalbackground">
        {modal()}
        <div
          className="continueAccount__logo bpLarge__none"
          onClick={() => (window.localtion.href = "/")}
        >
          <h4>Collectnea</h4>
        </div>

        <div className="continueAccount__arr--box">
          <a onClick={() => setNext(false)} style={{ cursor: "pointer" }}>
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
            <label className={styles.font}>Enter your password</label>
          </h2>
        </div>

        <form
          className="continueAccount"
          onSubmit={(e) => {
            e.preventDefault();
            formSubmit(email, password);
          }}
        >
          <div className="continueAccount__box">
            <p>Password</p>
            <input
              id="password"
              type="password"
              className="continueAccount__input font"
              onChange={passwordChange}
            />
          </div>
          <button
            type="submit"
            className="continueAccount__btn font"
            style={{ cursor: "pointer" }}
          >
            Next
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

  return (
    <div className="signIns" id="modalbackground">
      {modal()}
      <div className="sign__logo bpLarge__none">
        <h4>Collectnea</h4>
      </div>

      <div className="sign__arr--box">
        <a onClick={() => history.back()} style={{ cursor: "pointer" }}>
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
          <label className={styles.font}>Sign In</label>
        </h2>
      </div>

      <div className="social">
        <div className="social__google">
          <svg className="social__svg" viewBox="0 0 29 29">
            <path
              fill="#fbbd00"
              d="M 6.85848 14.5255 C 6.85848 13.1059 7.24959 11.7761 7.92906 10.6375 V 5.80762 H 3.0992 C 1.18227 8.2972 0.143188 11.3313 0.143188 14.5255 C 0.143188 17.7196 1.18227 20.7537 3.0992 23.2433 H 7.92906 V 18.4134 C 7.24959 17.2748 6.85848 15.945 6.85848 14.5255 Z"
            />
            <path
              fill="#0f9d58"
              d="M 14.4691 22.1348 L 11.1115 25.4924 L 14.4691 28.8501 C 17.6633 28.8501 20.6974 27.811 23.187 25.894 V 21.0693 H 18.3623 C 17.2137 21.7513 15.8783 22.1348 14.4691 22.1348 Z"
            />
            <path
              fill="#31aa52"
              d="M 7.92905 18.4131 L 3.09919 23.2429 C 3.47872 23.7359 3.89199 24.2079 4.33917 24.6551 C 7.04499 27.3609 10.6425 28.8511 14.4691 28.8511 V 22.1358 C 11.6921 22.1358 9.25823 20.6405 7.92905 18.4131 Z"
            />
            <path
              fill="#3c79e6"
              d="M 28.7951 14.5248 C 28.7951 13.6532 28.7162 12.78 28.5605 11.9295 L 28.4345 11.2412 H 14.4691 V 17.9565 H 21.2657 C 20.6057 19.2694 19.5909 20.3405 18.3622 21.07 L 23.1869 25.8948 C 23.6798 25.5152 24.1518 25.102 24.5991 24.6548 C 27.3049 21.9489 28.7951 18.3514 28.7951 14.5248 Z"
            />
            <path
              fill="#cf2d48"
              d="M 19.8507 9.14359 L 20.4442 9.73711 L 25.1927 4.98873 L 24.5992 4.39521 C 21.8933 1.6894 18.2958 0.199219 14.4691 0.199219 L 11.1115 3.55686 L 14.4691 6.91451 C 16.502 6.91451 18.4132 7.70613 19.8507 9.14359 Z"
            />
            <path
              fill="#eb4132"
              d="M 14.4692 6.91451 V 0.199219 C 10.6426 0.199219 7.04504 1.6894 4.33917 4.39516 C 3.89199 4.84234 3.47872 5.31437 3.09919 5.80733 L 7.92905 10.6372 C 9.25829 8.40978 11.6922 6.91451 14.4692 6.91451 Z"
            />
          </svg>
          <p>Sign in with Google</p>
        </div>
        <label className="social__google">
          <svg className="social__svg" viewBox="0 0 29 30">
            <path
              xmlns="http://www.w3.org/2000/svg"
              fill="#4267b2"
              d="M 27.2606 0.945313 H 2.35043 C 1.49744 0.945755 0.805939 1.66239 0.806152 2.54607 V 28.3459 C 0.80658 29.2293 1.4985 29.9455 2.35172 29.9453 H 27.2606 C 28.114 29.9455 28.8059 29.2291 28.8062 28.3452 C 28.8062 28.345 28.8062 28.3448 28.8062 28.3446 V 2.54475 C 28.8057 1.66129 28.1138 0.945091 27.2606 0.945313 Z"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              d="M 20.1382 30.9445 V 19.7297 H 23.7886 L 24.3354 15.34 H 20.1382 V 12.5443 C 20.1382 11.2763 20.4781 10.4123 22.2336 10.4123 H 24.4585 V 6.4968 C 24.0714 6.44347 22.7433 6.32422 21.198 6.32422 C 17.9714 6.32422 15.7632 8.36328 15.7632 12.1095 V 15.34 H 12.1265 V 19.7297 H 15.7632 V 30.9445 H 20.1382 Z"
            />
          </svg>
          <p>Sign in with Facebook</p>
        </label>
        <label className="social__google">
          <svg className="social__svg" viewBox="0 0 30 35">
            <path
              xmlns="http://www.w3.org/2000/svg"
              fill="#03a9f4"
              d="M 29.5562 3.33537 C 28.4777 3.81722 27.3286 4.1366 26.1305 4.29168 C 27.363 3.54214 28.3037 2.36429 28.746 0.944602 C 27.5968 1.64245 26.3281 2.13537 24.976 2.41045 C 23.8848 1.22706 22.3297 0.494141 20.6332 0.494141 C 17.3417 0.494141 14.6918 3.21537 14.6918 6.55137 C 14.6918 7.03137 14.7317 7.49291 14.8296 7.93229 C 9.8869 7.68676 5.51334 5.27383 2.57528 1.59814 C 2.06234 2.5046 1.76146 3.54214 1.76146 4.65906 C 1.76146 6.75629 2.82178 8.61537 4.40228 9.69168 C 3.44709 9.67322 2.51003 9.39076 1.71615 8.94583 C 1.71615 8.96429 1.71615 8.98829 1.71615 9.01229 C 1.71615 11.9551 3.77696 14.3994 6.4794 14.9624 C 5.99546 15.0972 5.46803 15.1618 4.92065 15.1618 C 4.54003 15.1618 4.15578 15.1397 3.79509 15.0584 C 4.5654 17.4566 6.75128 19.2197 9.3504 19.2769 C 7.32765 20.8886 4.75934 21.8597 1.97896 21.8597 C 1.4914 21.8597 1.02378 21.8375 0.556152 21.7766 C 3.18971 23.5064 6.31084 24.4941 9.67665 24.4941 C 20.6169 24.4941 26.5982 15.2634 26.5982 7.26214 C 26.5982 6.99445 26.5891 6.73599 26.5764 6.47937 C 27.7563 5.62645 28.7478 4.56122 29.5562 3.33537 Z"
            />
          </svg>
          <p>Sign in with Twitter</p>
        </label>

        <div className="social__align">
          <p className={styles.font}>Or</p>
        </div>
        <div className="social__align">
          <p className={styles.font}>Your email</p>
        </div>

        <input
          id="emailId"
          type="text"
          placeholder="Email address"
          className="social__input font"
          onChange={emailChange}
          onKeyPress={enterPressed}
        />

        <button
          className=" social__btn"
          onClick={() => changePage()}
          style={{ cursor: "pointer" }}
        >
          <label className={styles.font}>Next</label>
        </button>
      </div>

      <div
        className="footers"
      >
        <div className="footer">
          <div className="footer__signIn">
            <p>Forgot your password?</p>
            <a href="/auth/forgot-password" className="footer__link">
              Click here
            </a>
          </div>
          <div className="footer__TandC">
            <p>Dont have an account?</p>
            <a href="/auth/signup" className="footer__link">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(signin);
