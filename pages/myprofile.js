import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosConfig from "../src/Utils/axiosConfig";
import LanguageIcon from "@material-ui/icons/Language";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ProfileSkeleton from "../src/Skeletons/Profile";
import urlRegex from "url-regex";
import AlertboxComponent from "../src/Components/alertboxComponent/alertboxComponent";
import {
  Modal,
  Fade,
  makeStyles,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import { getProfile } from "../redux/ActionCreator";
import { connect } from "react-redux";
import NavbarSearch from "../src/Layouts/NavbarSearch";
import { removeCookie } from "../redux/localstorage";
import styles from "../styles/Home.module.css";
import timeElapsed from "../src/Utils/timeElapsed";
import { getFollowerslist, getFollowingsList} from '../src/Utils/get_Followers_Following';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textfield: {
    marginLeft: "10px",
    width: "300px",
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  progress: {
    color: "#ffffff",
  },
  avatarSmall: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    ['@media (max-width:62.5em)']:{
      width: theme.spacing(3),
      height: theme.spacing(3)
    } 
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

function myProfile(props) {
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogout] = useState(false);
  const [deleteContinue, setDeleteContinue] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [success_failure_open, setSuccessFailureOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [clicked, setClicked] = useState(false);
  const [activeBrowse, setActiveBrowse] = useState("Answers");
  const [browseContent, setBrowseContent] = useState({
    type: "Answers",
    results: [],
  });
  const [wait, setWait] = useState(true);
  const [user_data, setUserData] = useState();
  const [followersList, setFollowers] = useState("");
  const [followingsList, setFollowing] = useState("");

  const classes = useStyles();

  const router = useRouter();

  const handleSuccessFailureOpen = () => {
    setSuccessFailureOpen(true);
    document.getElementById("modalbackground").style.filter = "blur(5px)";
  };

  const handleSuccessFailureClose = () => {
    setSuccessFailureOpen(false);
    document.getElementById("modalbackground").style.filter = "none";
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
    document.getElementById("modalbackground").style.filter = "blur(5px)";
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteContinue(false);
    document.getElementById("modalbackground").style.filter = "none";
  };

  const handleLogoutOpen = () => {
    setLogout(true);
    document.getElementById("modalbackground").style.filter = "blur(5px)";
  };

  const handleLogoutClose = () => {
    setLogout(false);
    document.getElementById("modalbackground").style.filter = "none";
  };

  const handleOpen = () => {
    setOpen(true);
    document.getElementById("modalbackground").style.filter = "blur(5px)";
  };

  const handleClose = () => {
    setOpen(false);
    document.getElementById("modalbackground").style.filter = "none";
  };  

  const add_update_web_uri = (data) => {
    return new Promise((resolve, reject) => {
      axiosConfig
        .post("/api/auth/add-update-url/", data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          resolve("Success");
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const delete_web_uri = (data) => {
    return new Promise((resolve, reject) => {
      axiosConfig
        .post("/api/auth/delete-web-profile/", data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          resolve("Success");
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  async function save(Websites) {
    let Website,
      Facebook,
      Linkedin,
      Email,
      Instagram = "";
    for (var i = 0; i < Websites.length; i++) {
      if (Websites[i].key === "email") Email = Websites[i].id;
      else if (Websites[i].key === "facebook") Facebook = Websites[i].id;
      else if (Websites[i].key === "linkedin") Linkedin = Websites[i].id;
      else if (Websites[i].key === "website") Website = Websites[i].id;
      else if (Websites[i].key === "instagram") Instagram = Websites[i].id;
    }
    if (document.getElementById("website").value.length != 0) {
      let data = new FormData();
      if (Website) {
        data.append("Id", Website);
      } else {
        data.append("Id", "");
      }
      data.append("key", "website");
      data.append("value", document.getElementById("website").value);
      await add_update_web_uri(data);
    }
    if (document.getElementById("website").value.length === 0 && Website) {
      let data = new FormData();
      data.append("Id", Website);
      await delete_web_uri(data);
    }
    if (document.getElementById("facebook").value) {
      let data = new FormData();
      if (Facebook) {
        data.append("Id", Facebook);
      } else {
        data.append("Id", "");
      }
      data.append("key", "facebook");
      data.append("value", document.getElementById("facebook").value);
      await add_update_web_uri(data);
    }
    if (document.getElementById("facebook").value.length === 0 && Facebook) {
      let data = new FormData();
      data.append("Id", Facebook);
      await delete_web_uri(data);
    }
    if (document.getElementById("linkedin").value) {
      let data = new FormData();
      if (Linkedin) {
        data.append("Id", Linkedin);
      } else {
        data.append("Id", "");
      }
      data.append("key", "linkedin");
      data.append("value", document.getElementById("linkedin").value);
      await add_update_web_uri(data);
    }
    if (document.getElementById("linkedin").value.length === 0 && Linkedin) {
      let data = new FormData();
      data.append("Id", Linkedin);
      await delete_web_uri(data);
    }
    if (document.getElementById("email").value) {
      let data = new FormData();
      if (Email) {
        data.append("Id", Email);
      } else {
        data.append("Id", "");
      }
      data.append("key", "email");
      data.append("value", document.getElementById("email").value);
      await add_update_web_uri(data);
    }
    if (document.getElementById("email").value.length === 0 && Email) {
      let data = new FormData();
      data.append("Id", Email);
      await delete_web_uri(data);
    }
    if (document.getElementById("instagram").value) {
      let data = new FormData();
      if (Instagram) {
        data.append("Id", Instagram);
      } else {
        data.append("Id", "");
      }
      data.append("key", "instagram");
      data.append("value", document.getElementById("instagram").value);
      await add_update_web_uri(data);
    }
    if (document.getElementById("instagram").value.length === 0 && Instagram) {
      let data = new FormData();
      data.append("Id", Instagram);
      await delete_web_uri(data);
    }
    removeCookie("state");
    window.location.reload(false);
  }

  const logout = () => {
    removeCookie("secret");
    removeCookie("state");
    router.push("/");
  };

  const contacts = (data) => {
    let style = {
      width: "33%",
      float: "left",
      textAlign: "center",
      marginTop: "20px",
    };
    if (data.length != 0) {
      return data.map((website) => {
        let url = website.pair;
        let key = website.key;
        let icon;
        if (key === "website") {
          icon = <LanguageIcon />;
        } else if (key === "facebook") {
          icon = <FacebookIcon />;
        } else if (key === "linkedin") {
          icon = <LinkedInIcon />;
        } else if (key === "email") {
          icon = <MailOutlineIcon />;
        } else if (key === "instagram") {
          icon = <InstagramIcon />;
        }
        return (
          <div style={style}>
            <p>
              {icon} {url}
            </p>
          </div>
        );
      });
    } else {
      return (
        <p style={{ textAlign: "center" }}>
          There is no form of contact information available.
        </p>
      );
    }
  };

  useEffect(async () => {
    await props
      .getProfile()
      .then(async (resolve) => {
        setUserData(resolve);
        await getFollowerslist()
          .then((resolve) => {
            setFollowers(resolve);
          })
          .catch((reject) => {});
        await getFollowingsList()
          .then((resolve) => {
            setFollowing(resolve);
          })
          .catch((reject) => {});
        setWait(false);
      })
      .catch((reject) => {
        if (reject.unauthenticated) {
          setMessage("You need to login first");
          handleSuccessFailureOpen();
          setTimeout(() => {
            router.push("/auth/signin");
          }, 3000);
        } else {
          setMessage("Something went wrong !");
          handleSuccessFailureOpen();
        }
      });
    await getMyAnswers()
      .then((resolve) => {
        let data = {
          type: "Answers",
          results: resolve,
        };
        setBrowseContent(data);
      })
      .catch((reject) => {
        console.log(reject);
      });
  }, []);

  const saveButton = () => {
    if (clicked) {
      return (
        <button
          id="saveButton"
          className="btn btn--black font"
          style={{ textTransform: "capitalize", marginTop: "40px" }}
          disabled
        >
          <CircularProgress size={18} className={classes.progress} />
        </button>
      );
    }
    return (
      <button
        id="saveButton"
        className="btn btn--black font"
        onClick={() => {
          setClicked(true);
          save(Websites);
        }}
        style={{ textTransform: "capitalize", marginTop: "40px" }}
      >
        Save
      </button>
    );
  };

  const contactsModal = (Websites) => {
    let Website,
      Facebook,
      Linkedin,
      Email,
      Instagram = "";
    for (var i = 0; i < Websites.length; i++) {
      if (Websites[i].key === "email") Email = Websites[i].pair;
      else if (Websites[i].key === "facebook") Facebook = Websites[i].pair;
      else if (Websites[i].key === "linkedin") Linkedin = Websites[i].pair;
      else if (Websites[i].key === "website") Website = Websites[i].pair;
      else if (Websites[i].key === "instagram") Instagram = Websites[i].pair;
    }
    return (
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          document.getElementById("modalbackground").style.filter = "none";
          setClicked(false);
        }}
        className={classes.modal}
      >
        <Fade in={open}>
          <div className={styles.paper}>
            <div style={{ margin: "0 auto" }} className={styles.font}>
              <h2 style={{ textAlign: "center" }}>Edit contact information</h2>
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className={styles.formItem}>
                  <label className={styles.label}>
                    <LanguageIcon /> Website
                  </label>
                  <input
                    defaultValue={Website}
                    id="website"
                    spellCheck="false"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formItem}>
                  <label className={styles.label}>
                    <FacebookIcon /> Facebook
                  </label>
                  <input
                    defaultValue={Facebook}
                    id="facebook"
                    spellCheck="false"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formItem}>
                  <label className={styles.label}>
                    <LinkedInIcon /> Linkedin
                  </label>
                  <input
                    defaultValue={Linkedin}
                    id="linkedin"
                    spellCheck="false"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formItem}>
                  <label className={styles.label}>
                    <MailOutlineIcon /> Email
                  </label>
                  <input
                    defaultValue={Email}
                    id="email"
                    spellCheck="false"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formItem}>
                  <label className={styles.label}>
                    <InstagramIcon /> Instagram
                  </label>
                  <input
                    defaultValue={Instagram}
                    id="instagram"
                    spellCheck="false"
                    className={styles.formInput}
                  />
                </div>
                <div className="editProfiles__items">{saveButton()}</div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    );
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

  const handlePassword1Change = (e) => {
    setPassword1(e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const deleteAccount = () => {
    const data = new FormData();
    data.append("current_password", password1);
    data.append("confirm_password", password2);
    axiosConfig
      .post("/api/auth/delete-account/", data)
      .then((response) => {
        if (response.status === 200) {
          setMessage(response.message);
          handleSuccessFailureOpen();
          localStorage.removeItem("state");
          localStorage.removeItem("secret");
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else throw new Error();
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setMessage(error.response.data.error[0]);
          handleSuccessFailureOpen();
        } else {
          setMessage("Something went wrong");
          handleSuccessFailureOpen();
        }
      });
  };

  const success_failure = () => {
    return (
      <Modal open={success_failure_open} onClose={handleSuccessFailureClose}>
        <AlertboxComponent
          close={handleSuccessFailureClose}
          message={message}
        />
      </Modal>
    );
  };

  const deleteAccountModal = () => {
    if (deleteContinue) {
      return (
        <Modal open={deleteOpen} onClose={handleDeleteClose}>
          <Fade in={deleteOpen}>
            <AlertboxComponent
              close={handleDeleteClose}
              message="Are you sure you want to delete your account?"
            >
              <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                <input
                  type="password"
                  placeholder="Password"
                  className="social__input u-margin-bottom-small"
                  onChange={handlePassword1Change}
                  style={{ width: "70%" }}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="social__input u-margin-bottom-small"
                  onChange={handlePassword2Change}
                  style={{ width: "70%" }}
                />
                <Button
                  style={{
                    width: "40%",
                    backgroundColor: "#4f4f4f",
                    color: "floralwhite",
                    fontSize: "16px",
                  }}
                  onClick={deleteAccount}
                >
                  Confirm
                </Button>
              </div>
            </AlertboxComponent>
          </Fade>
        </Modal>
      );
    }
    return (
      <Modal open={deleteOpen} onClose={handleDeleteClose}>
        <Fade in={deleteOpen}>
          <AlertboxComponent
            close={handleDeleteClose}
            message="Are you sure you want to delete your account?"
          >
            <div style={{ textAlign: "center", paddingBottom: "20px" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#3ABD98", color: "floralwhite" }}
                onClick={() => setDeleteContinue(true)}
              >
                <b>Yes</b>
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                onClick={handleDeleteClose}
              >
                <b>No</b>
              </Button>
            </div>
          </AlertboxComponent>
        </Fade>
      </Modal>
    );
  };

  const getMyAnswers = () => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("type", "Answer");
      axiosConfig
        .post("/api/answers/get-my-answers-reply/?limit=2&offset=0", data)
        .then((response) => {
          resolve(response.data.body);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const getMyReplies = () => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("type", "Reply");
      axiosConfig
        .post("/api/answers/get-my-answers-reply/?limit=2&offset=0", data)
        .then((response) => {
          resolve(response.data.body);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const getMyBookmarks = () => {
    return new Promise((resolve, reject) => {
      axiosConfig
        .get("/api/questions/get-all-bookmarks/?limit=2&offset=0")
        .then((response) => {
          resolve(response.data.body);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const content = () => {
    if (browseContent.results && browseContent.results.length != 0) {
      return browseContent.results.map((ans) => {
        let marginLeft = "0px";
        if (browseContent.results.indexOf(ans) == 1) {
          marginLeft = "1%";
        }
        let answer, question, profileURL, keywords, elapsed;
        elapsed = timeElapsed(new Date(ans.created_at));
        if (browseContent.type === "Answers") {
          question = ans.content;
          profileURL = ans.category.category_svg;
          if (profileURL) profileURL = profileURL.split("?")[0];
          for (let i = 0; i < ans.Answer.length; i++) {
            if (ans.Answer[i].content != "Deleted Answer") {
              answer = ans.Answer[i].content;
              break;
            }
          }
        } else if (browseContent.type === "Replies") {
          question = ans.content;
          profileURL = ans.category.category_svg;
          if (profileURL) profileURL = profileURL.split("?")[0];
          for (let i = 0; i < ans.Answer.length; i++) {
            for (let j = 0; j < ans.Answer[i].user_replies.length; j++) {
              if (ans.Answer[i].user_replies[j].content != "Deleted Reply") {
                answer = ans.Answer[i].user_replies[j].content;
                break;
              }
            }
          }
        } else if (browseContent.type === "Likes") {
        } else if (browseContent.type === "Bookmarks") {
          if (ans.question.question_type === "normal") {
            question = ans.question.content;
            profileURL = ans.question.category.category_svg;
            if (profileURL) profileURL = profileURL.split("?")[0];
            for (let i = 0; i < ans.question.Answer.length; i++) {
              if (ans.question.Answer[i].Answer != "Deleted Answer") {
                answer = ans.question.Answer[i].Answer;
                break;
              }
            }
          }
          let image = "https://hoptheque.in/testing/project/Nexter/img/realtor-1.jpeg";
          if (ans.question.category.category_svg) {
            image = image.split("?")[0];
          }
          const Options = ans.question.Options.map((option) => {
            let percentStr = option.option_percentage + "%";
            let percent = option.option_percentage;
            if (percent === 0) {
              percent = 1;
              percentStr = "0%";
            }
            return (
              <div                                
                className="homeCard__progress"
                style={{ width: percent + "%", cursor: "pointer" }}
              >
                <p className="homeCard__progress--name">{option.option_name}</p>
                <p className="homeCard__progress--value">{percentStr}</p>
              </div>
            );
          });
          const keywords = ans.question.keywords.map((key) => (
            <label className="homeCard__link">{key.name}</label>
          ));
          let elapsed = timeElapsed(new Date(ans.created_at))
          return (
            <div className="homeCard" style={{ marginBottom: "20px" }}>
              <Avatar className={classes.avatarSmall} src={image} />
              <div className="homeCard__items">
                <p className="homeCard__heading line-height-1 para--dark-3">
                  {ans.question.content}
                </p>
                <p className="para--size-10 para--dark">{elapsed}</p>
              </div>
              <div className="homeCard__box">{Options}</div>
              <div className="homeCard__links">{keywords}</div>              
            </div>
          );
        }

        return (
          <>
         
          <div
            className="card"
          >
            <Avatar className={classes.avatarSmall} src={profileURL} />
            <div className="card__items">
              <p className="card__heading line-height-1 para--dark-3">
                {question}
              </p>
              <p className="para--size-10 para--dark">{elapsed}</p>
            </div>
            <p className=" card__topAnswer">Top answer</p>
            <div className="card__reply">{answer}</div>
            <div className="card__links">
              <label className="card__link">UI/UX</label>
              <label className="card__link">Product Design</label>
              <label className="card__link">Career</label>
            </div>            
          </div>
          </>
        );
      });
    }
  };

  const myInterests = (interests) => {
    if (interests.length != 0) {
      return interests.map((i) => {
        return <a className="categories__link">{i.name}</a>;
      });
    }
    return <p>Not available</p>;
  };

  if (wait) {
    return <ProfileSkeleton />;
  }

  let image = "";
  let fullname = "";
  let bio = "";
  let followers = "";
  let following = "";
  let profession = "";
  let Websites = [];
  let interests = [];
  let contact_websites = () => <></>;
  if (user_data) {
    let data = user_data.body;
    image = user_data.body.profileURL;
    if (image) {
      image = image.split("?")[0];
    }
    fullname = data.user.fullname;
    bio = data.bio;
    followers = followersList.length;
    following = followingsList.length;
    profession = data.Profession;
    Websites = data.Websites;
    contact_websites = () => contacts(Websites);
    interests = data.myInterest;
  }

  let active = {
    cursor: "pointer",
    backgroundColor: "#4f4f4f",
    color: "floralwhite",
    borderRadius: "2px",
  };

  const changeActiveBrowse = (id) => {
    document.getElementById(activeBrowse).className = "categories__link";
    setActiveBrowse(id);
    document.getElementById(id).className = "btn btn--black";
  };

  return (
    <div className="profiles" id="modalbackground">
      {contactsModal(Websites)}
      {logoutModal()}
      {deleteAccountModal()}
      {success_failure()}
      <NavbarSearch />
      <div className="profile">
        <div className="backArrow ">
        <svg className="arrNav__icon bp__small--none"  viewBox="0 0 25 13" fill="none"             
        onClick={() => history.back()}>
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
          <div className="profileNav__heading--box">
            <div className="profileNav__heading--item profileNav__heading--item-1">
              <h2>{fullname}</h2>
              <a
                href="/myprofile/edit"
                className="para--size-11 profileNav__heading--border bp__small--none para--dark-3 "
              >
                Edit Profile
              </a>
            </div>
            <div
              className="profileNav__heading--item profileNav__heading--item-2"
              onClick={() => (window.location.href = "/myprofile/edit")}
            >
              <p className="bp__small--show">edit</p>
              <svg
                className="bp__small--show"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M14.8942 9.77296L13.265 8.49508C13.2959 8.24798 13.319 7.99706 13.319 7.74225C13.319 7.48745 13.2959 7.23652 13.265 6.98943L14.8981 5.71155C15.0447 5.59573 15.0872 5.38725 14.9907 5.2174L13.4464 2.54198C13.3499 2.37596 13.1492 2.30647 12.9755 2.37596L11.0529 3.15195C10.6552 2.84694 10.219 2.58831 9.74798 2.39141L9.45843 0.345289C9.42365 0.163852 9.26538 0.0209961 9.07236 0.0209961H5.98386C5.79084 0.0209961 5.63253 0.163852 5.60166 0.345289L5.31211 2.39141C4.84113 2.58831 4.40485 2.84311 4.00723 3.15195L2.08463 2.37596C1.91091 2.31034 1.71014 2.37596 1.61365 2.54198L0.0693464 5.2174C-0.0271815 5.38342 0.0153096 5.59189 0.162002 5.71155L1.79118 6.98943C1.7603 7.23652 1.73714 7.48745 1.73714 7.74225C1.73714 7.99706 1.7603 8.24798 1.79118 8.49508L0.162002 9.77296C0.0153096 9.88878 -0.0271815 10.0973 0.0693464 10.2671L1.61361 12.9425C1.71014 13.1085 1.91087 13.178 2.0846 13.1085L4.00719 12.3326C4.40485 12.6376 4.84109 12.8962 5.31208 13.0931L5.60162 15.1392C5.6325 15.3207 5.79081 15.4635 5.98383 15.4635H9.07232C9.26534 15.4635 9.42365 15.3207 9.45452 15.1392L9.74407 13.0931C10.2151 12.8962 10.6513 12.6414 11.049 12.3326L12.9715 13.1085C13.1453 13.1742 13.346 13.1085 13.4425 12.9425L14.9868 10.2671C15.0834 10.1011 15.0409 9.89265 14.8942 9.77296ZM7.52809 10.4447C6.03403 10.4447 4.82564 9.23632 4.82564 7.74225C4.82564 6.24819 6.03403 5.03983 7.52809 5.03983C9.02216 5.03983 10.2305 6.24822 10.2305 7.74229C10.2305 9.23636 9.02216 10.4447 7.52809 10.4447Z"
                  fill="#312E2E"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

        <div className="profile__story">
          <Avatar className={classes.avatar} src={image} />
          <div>
            <p className="profile__detail ">{bio}</p>
            <p className="profile__detail ">{profession}</p>
          </div>
        </div>
        <div className="profile__follow">
          <p
            className="profile__follower"
            style={{ cursor: "pointer" }}
            onClick={() => (window.location.href = "/myprofile/followers")}
          >
            {followers} followers
          </p>
          <p
            className="profile__following"
            style={{ cursor: "pointer" }}
            onClick={() => (window.location.href = "/myprofile/following")}
          >
            {following} following
          </p>
        </div>

      <div className="profile">
        <div
          className="categories__box"
        >
          <h3 className="categories__heading heading-3">
            Categories
          </h3>
            <a href="/myprofile/update-interests" className='categories__plus'>
              <svg width="10" height="10" viewBox="0 0 24 24">
                <path d="M24 10h-10v-10h-3v10h-10v3h10v10h3v-10h10z" />
              </svg>
            </a>
        </div>
      </div>

      <div className="profile">
        <div className="categories__link-1">
          {myInterests(interests)}
        </div>
      </div>

      <div className="profile">
          <a
            className="btn btn--black"
            id="Answers"
            style={{ cursor: "pointer" }}
            onClick={async () => {
              await getMyAnswers()
                .then((resolve) => {
                  let data = {
                    type: "Answers",
                    results: resolve,
                  };
                  setBrowseContent(data);
                })
                .catch((reject) => {
                  console.log(reject);
                });
              changeActiveBrowse("Answers");
            }}
          >
            Answers
          </a>
          <label
            className="categories__link"
            style={{ marginLeft: "2%", cursor: "pointer" }}
            id="Replies"
            onClick={async () => {
              await getMyReplies()
                .then((resolve) => {
                  let data = {
                    type: "Replies",
                    results: resolve,
                  };
                  setBrowseContent(data);
                })
                .catch((reject) => {
                  console.log(reject);
                });
              changeActiveBrowse("Replies");
            }}
          >
            Replies
          </label>
          <label
            className="categories__link"
            style={{ marginLeft: "2%", cursor: "pointer" }}
            id="Likes"
            onClick={() => changeActiveBrowse("Likes")}
          >
            Likes
          </label>
          <label
            className="categories__link"
            style={{ marginLeft: "2%", cursor: "pointer" }}
            id="Bookmarks"
            onClick={async () => {
              await getMyBookmarks()
                .then((resolve) => {
                  let data = {
                    type: "Bookmarks",
                    results: resolve,
                  };
                  setBrowseContent(data);
                })
                .catch((reject) => {
                  console.log(reject);
                });
              changeActiveBrowse("Bookmarks");
            }}
          >
            Bookmarks
          </label>
          <label
            className="categories__link"
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => {
              if (activeBrowse === "Answers") {
                window.location.href = "/myprofile/answers";
              } else if (activeBrowse === "Replies") {
                window.location.href = "/myprofile/replies";
              } else if (activeBrowse === "Likes") {
                window.location.href = "/myprofile/likes";
              } else if (activeBrowse === "Bookmarks") {
                window.location.href = "/myprofile/bookmarks";
              }
            }}
          >
            see more &rarr;
          </label>
      </div>

      <div className="profile">
      <div
            className="profile__cards"
          >
        {content()}
        </div>
      </div>

      <div className="contactInformation">
        <div className="contactInformation__heading">
          <h3 className="heading-3">Contact Information</h3>
          <p
            className="para--size-14"
            onClick={handleOpen}
            style={{ cursor: "pointer" }}
          >
            edit
          </p>
        </div>
        
        <div className='contactInformation__footerIcon'>{contact_websites()}</div>

        <div className="contactInformation__footerIcon">
          <label style={{ cursor: "pointer" }} onClick={handleLogoutOpen}>
            Log out
          </label>
          <a
            href="/auth/change-password"
            style={{ color: "#000000", opacity: "85%" }}
          >
            Change password
          </a>
          <label style={{ cursor: "pointer" }} onClick={handleDeleteOpen}>
            Delete my account
          </label>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(myProfile);
