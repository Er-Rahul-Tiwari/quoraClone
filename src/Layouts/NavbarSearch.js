import React, { useEffect, useState } from "react";
import {
  Avatar,
  makeStyles,
  Popover,
  Typography,
  Modal,
  Fade,
  Button,
} from "@material-ui/core";
import { getProfile } from "../../redux/ActionCreator";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import AlertboxComponent from "../Components/alertboxComponent/alertboxComponent";
import { removeCookie } from "../../redux/localstorage";
import styles from "../../styles/Home.module.css";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    cursor: "pointer",
    ["@media (max-width:62.5em)"]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
  typography: {
    padding: theme.spacing(2),
    fontSize: "15px",
    width: "200px",
    cursor: "pointer",    
  },
  notifications: {
    padding: theme.spacing(2),
    width: "200px",
    display: "block",
    cursor: "pointer",
    fontSize: "14px",
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

function NavbarSearch(props) {
  const router = useRouter();
  const classes = useStyles();
  const [unauthenticated, setUnauth] = useState(true);
  const [userdata, setUserdata] = useState();
  const [logoutOpen, setLogout] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "notification-popover" : undefined;

  useEffect(() => {
    const getData = async () => {
      await props
        .getProfile()
        .then((resolve) => {
          setUserdata(resolve);
          setUnauth(false);
        })
        .catch((reject) => {
          setUnauth(true);
        });
    };
    getData();
  }, []);

  const submitQuery = () => {
    let text = document.getElementById("MainSearchbar").value;
    if (text) {
      text = text.split(" ");
      let string = "";
      for (let i = 0; i < text.length; i++) {
        if (i == 0) {
          string = string + text[i];
        } else {
          string = string + "+" + text[i];
        }
      }
      if (router.pathname != "/searchResult") {
        router.push("/searchResult?" + "search=" + string + "&type=question");
      } else if (props.search) {
        props.search(string, "question");
      }
    }
  };

  const buttonSignup = {
    fontSize: "18px",
    backgroundColor: "#FBFBFB",
    borderRadius: "3px",
    cursor: "pointer",
  };

  const buttonLogin = {
    marginRight: "20px",
    fontSize: "18px",
    cursor: "pointer",
    color: "#000000",
    opacity: "80%",
  };

  const handleLogoutOpen = () => {
    setLogout(true);
    document.getElementById("modalbackground").style.filter = "blur(3px)";
  };

  const handleLogoutClose = () => {
    setLogout(false);
    document.getElementById("modalbackground").style.filter = "none";
  };

  const logout = () => {
    removeCookie("secret");
    removeCookie("state");
    handleLogoutClose();
    window.location.reload(false);
    window.location.href = "/";
  };

  const logoutModal = () => {
    return (
      <Modal open={logoutOpen} onClose={handleLogoutClose}>
        <Fade in={logoutOpen}>
          <AlertboxComponent
            close={handleLogoutClose}
            message="Are you sure you want to logout your account?"
          >
            <div style={{ textAlign: "center", paddingBottom: "20px" }}>
              <Button
                color="success"
                variant="contained"
                style={{ backgroundColor: "#3ABD98", color: "floralwhite" }}
                onClick={() => logout()}
              >
                <b>Yes</b>
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                onClick={handleLogoutClose}
              >
                <b>No</b>
              </Button>
            </div>
          </AlertboxComponent>
        </Fade>
      </Modal>
    );
  };

  const unauth = () => {
    if (!unauthenticated) {
      let profileURL = userdata.body.profileURL;
      if (profileURL) profileURL = profileURL.split("?")[0];
      return (
        <div className="navIcons">
          <a
            className="navIcon"
            style={{ cursor: "pointer" }}
            onClick={handleClick2}
          >
            <div className="navIcon__background"></div>
            <svg className="navIcon__icon" viewBox="0 0 24 24" fill="none">
              <path d="M 18 8 C 18 6.4087 17.3679 4.88258 16.2426 3.75736 C 15.1174 2.63214 13.5913 2 12 2 C 10.4087 2 8.88258 2.63214 7.75736 3.75736 C 6.63214 4.88258 6 6.4087 6 8 C 6 15 3 17 3 17 H 21 C 21 17 18 15 18 8 Z" />
              <path d="M 13.73 21 C 13.5542 21.3031 13.3019 21.5547 12.9982 21.7295 C 12.6946 21.9044 12.3504 21.9965 12 21.9965 C 11.6496 21.9965 11.3054 21.9044 11.0018 21.7295 C 10.6982 21.5547 10.4458 21.3031 10.27 21" />
            </svg>
            <div className="navIcon__notification"></div>
          </a>
          <Popover
            id={id2}
            open={open2}
            anchorEl={anchorEl2}
            onClose={handleClose2}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Typography className={classes.typography}>
              <label
                className={styles.font}
                style={{ color: "#312E2E", fontSize: "14px" }}
              >
                Notifications
              </label>
            </Typography>
            <Typography className={classes.notifications}>
              <div
                style={{
                  borderRadius: "50%",
                  width: "20px",
                  backgroundColor: "cadetblue",
                  height: "20px",
                  float: "left",
                }}
              ></div>
              <p className={styles.font} style={{ float: "right" }}>
                Your reply has 6 likes
              </p>
            </Typography>
            <Typography className={classes.notifications}>
              <div
                style={{
                  borderRadius: "50%",
                  width: "20px",
                  backgroundColor: "cadetblue",
                  height: "20px",
                  float: "left",
                }}
              ></div>
              <p className={styles.font} style={{ float: "right" }}>
                Your reply has 6 likes
              </p>
            </Typography>
            <Typography
              className={classes.notifications}
              onClick={() =>
                (window.location.href = "/myprofile/notifications")
              }
            >
              <label className={styles.font} style={{ float: "right" }}>
                View More
              </label>
            </Typography>
          </Popover>

          <a className="navIcon">
            <Avatar
              src={profileURL}
              className={classes.avatar}
              onClick={handleClick}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Typography className={classes.typography}>
                <a href="/myprofile" className="para--dark nav__drop font">                  
                  <p>Profile</p>
                </a>
              </Typography>              
              <Typography className={classes.typography}>
                <a href="/info/faq" className="para--dark nav__drop font">                  
                  <p>FAQ</p>
                </a>
              </Typography>              
              <Typography className={classes.typography}>
                <a href="/info/report" className="para--dark font">                  
                  <p>Report Issue</p>
                </a>
              </Typography>
              <Typography className={classes.typography}>
                <a href="/info/share" className="para--dark font">                  
                  <p>Share</p>
                </a>
              </Typography>
              <Typography className={classes.typography}>
                <a href="/info/contactus" className="para--dark font">                  
                  <p>Contact us</p>
                </a>
              </Typography>
              <Typography className={classes.typography}>
                <a href="/info/terms-and-conditions" className="para--dark font">                  
                  <p>Terms and conditions</p>
                </a>
              </Typography>
              <Typography className={classes.typography}>
                <a
                  className="para--dark font"
                  onClick={() => {
                    handleLogoutOpen();
                    handleClose();
                  }}
                >
                  <p>Logout</p>
                </a>
              </Typography>
            </Popover>
          </a>
        </div>
      );
    }
    return (
      <div className="navSign">
        <a href="/auth/signin" className="navSign__btn font">
          Login
        </a>
        <a href="/auth/signup" className="navSign__btn font">
          Sign up
        </a>
      </div>
    );
  };

  return (
    <>
      <div className="nav__backArrow bpLarge__display" id="modalbackground">
        {logoutModal()}
        <a href="">
          <svg className="arrNav__icon" viewBox="0 0 25 13" fill="none">
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
        </a>
      </div>

      <a href="/" className="nav__logo">
        <h4>Collectnea</h4>
      </a>

      <div className="nav">
        <form
          className="nav__search nav__search__grid-3"
          onSubmit={(e) => {
            e.preventDefault();
            submitQuery();
          }}
        >
          <svg className="nav__search__icon" viewBox="0 0 15 15" fill="none">
            <circle
              cx="7.6156"
              cy="7.31202"
              r="4.29962"
              transform="rotate(-59.841 7.6156 7.31202)"
              stroke="#312E2E"
              strokeWidth="1.4"
            />
            <path
              d="M10.3757 10.3086L13.1489 13.2068"
              stroke="#312E2E"
              strokeWidth="1.4"
            />
          </svg>

          <input
            type="text"
            id="MainSearchbar"
            className="nav__search__input font"
            placeholder="search"
          />

          <button
            className="btn btn--black nav__search__btn"
            style={{ cursor: "pointer" }}
          >
            <label className={styles.font} style={{ cursor: "pointer" }}>
              Search
            </label>
          </button>
        </form>
      </div>

      {unauth()}
      {props.children}


        {/* <ul className="dropdown__link">
          <li>
            <a href="./index.html" className="" aria-haspopup="true">All</a>
            <ul className="dropdown" aria-label="submenu">
              <li><a href="#">Popular</a></li>
              <li><a href="#">New</a></li>
              <li><a href="#">Rising</a></li>
              <li><a href="#">Unanswered</a></li>
            </ul>
          </li>
        </ul> */}
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarSearch);
