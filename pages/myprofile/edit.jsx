import React, { useState, useEffect } from "react";
import axiosConfig from "../../src/Utils/axiosConfig";
import NavbarSearch from "../../src/Layouts/NavbarSearch";
import AlertboxComponent from "../../src/Components/alertboxComponent/alertboxComponent";
import { Modal, CircularProgress, Avatar, makeStyles } from "@material-ui/core";
import { getProfile } from "../../redux/ActionCreator";
import { connect } from "react-redux";
import { removeCookie } from "../../redux/localstorage";
import styles from "../../styles/Home.module.css";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  progress: {
    color: "#ffffff",
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

function editProfile(props) {
  const classes = useStyles();
  const [professionList, setProfessionList] = useState([]);
  const [message, setMessage] = useState();
  const [success_failure_open, setSuccessFailureOpen] = useState(false);
  const [new_username, setNewusername] = useState("");
  const [new_bio, setNewbio] = useState("");
  const [new_fullname, setNewfullname] = useState("");
  const [new_profession, setNewprofession] = useState("");
  const [new_image, setNewimage] = useState();
  const [real_username, setRealusername] = useState("");
  const [real_bio, setRealbio] = useState("");
  const [real_fullname, setRealfullname] = useState("");
  const [real_profession, setRealprofession] = useState("");
  const [real_email, setRealemail] = useState("");
  const [real_image, setRealimage] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await props
        .getProfile()
        .then((resolve) => {
          setRealusername(resolve.body.user.username);
          setRealfullname(resolve.body.user.fullname);
          setRealbio(resolve.body.bio);
          setRealprofession(resolve.body.Profession);
          setRealemail(resolve.body.user.email);
          const image = resolve.body.profileURL;
          if (image != "None") {
            setRealimage(image.split("?")[0]);
          } else setRealimage("");
        })
        .catch((reject) => {
          window.location.href = "/";
        });
    };
    getData();
    axiosConfig.get("api/misc/get-profession/").then((response) => {
      setProfessionList(response.data.body);
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
        onClick={saveChanges}
        style={{ textTransform: "capitalize", marginTop: "40px" }}
      >
        Save
      </button>
    );
  };

  const saveChanges = () => {
    setClicked(true);
    const data = new FormData();
    data.append("bio", new_bio || real_bio || "");
    data.append("username", new_username || real_username);
    data.append("fullname", new_fullname || real_fullname);
    data.append("profession", new_profession || real_profession);
    data.append("avatar", new_image);

    axiosConfig
      .post("/api/auth/edit-profile/", data)
      .then((response) => {
        if (response.status == 200) {
          setMessage(response.data.message);
          handleOpen();
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message + error.response.data.error);
          handleOpen();
        } else {
          setMessage("Something went wrong");
          handleOpen();
        }
      });
  };

  const handleOpen = () => {
    setSuccessFailureOpen(true);
    document.getElementById("modalbackground").style.filter = "blur(3px)";
  };

  const handleClose = () => {
    setSuccessFailureOpen(false);
    setClicked(false);    
    document.getElementById("modalbackground").style.filter = "none";
    removeCookie("state");
    window.location.reload(false);
  };

  const fullnameChange = (e) => {
    setNewfullname(e.target.value);
  };

  const usernameChange = (e) => {
    setNewusername(e.target.value);
  };

  const bioChange = (e) => {
    setNewbio(e.target.value);
  };

  const professionChange = (e) => {
    setNewprofession(e.target.value);
  };

  const handleUpload = (e) => {
    setNewimage(e.target.files[0]);
    const image = document.getElementById("image");
    image.src = URL.createObjectURL(e.target.files[0]);
  };

  const profList = professionList.map((profession) => {
    if (profession.name === real_profession) {
      return <option selected>{profession.name}</option>;
    }
    return <option>{profession.name}</option>;
  });

  const success_failure = () => {
    return (
      <Modal open={success_failure_open} onClose={handleClose}>
        <AlertboxComponent close={handleClose} message={message} />
      </Modal>
    );
  };

  return (
    <div className="answers" id="modalbackground">
      <NavbarSearch>
        {success_failure()}
        <div className=" editProfileNav__heading bp__small--none">
          <a
            style={{ cursor: "pointer", color: "#000000" }}
            onClick={() => history.back()}
          >
            <svg width="25" height="13" viewBox="0 0 25 13" fill="none">
              <path
                d="M23.9277 6.71484H1.39802"
                stroke="#312E2E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288"
                stroke="#312E2E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <h2 className="heading-2">
            <label className={styles.font}>Edit Profile</label>
          </h2>
        </div>

        <div className="editProfiles">
          <div className="editProfiles__item">
            <img
              className="card__img"
              id="image"
              src={
                real_image ||
                "https://hoptheque.in/testing/project/Nexter/img/realtor-1.jpeg"
              }
            />
            <div>
              <p className="para">{real_fullname}</p>
              <p
                className="para editProfiles__change"
                style={{ cursor: "pointer" }}
                onClick={() => document.getElementById("getFile").click()}
              >
                Change Profile Picture{" "}
                <input
                  id="getFile"
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  style={{ display: "none" }}
                ></input>
              </p>
              <p id="imageError"></p>
            </div>
          </div>
          <div className="editProfiles__items">
            <label style={{ color: "#000000" }}>Username</label>
            <input
              placeholder="Username"
              id="username"
              onChange={usernameChange}
              defaultValue={real_username}
              spellCheck="false"
              style={{
                backgroundColor: "#fafafa",
                border: "none",
                outline: "none",
                padding: "5px 10px 5px 10px",
                fontFamily: "Manrope, sans-serif",
                opacity: "90%",
                fontSize: "16px",
              }}
            />
          </div>
          <div className="editProfiles__items">
            <label style={{ color: "#000000" }}>Bio</label>
            <textarea
              placeholder="Bio"
              id="bio"
              onChange={bioChange}
              defaultValue={real_bio}
              spellCheck="false"
              style={{
                backgroundColor: "#fafafa",
                border: "none",
                outline: "none",
                padding: "5px 10px 5px 10px",
                fontFamily: "Manrope, sans-serif",
                opacity: "90%",
                fontSize: "16px",
                resize: "none",
              }}
            />
          </div>
          <div className="editProfiles__items">
            <label style={{ color: "#000000" }}>Fullname</label>
            <input
              placeholder="Fullname"
              id="fullname"
              onChange={fullnameChange}
              defaultValue={real_fullname}
              spellCheck="false"
              style={{
                backgroundColor: "#fafafa",
                border: "none",
                outline: "none",
                padding: "5px 10px 5px 10px",
                fontFamily: "Manrope, sans-serif",
                opacity: "90%",
                fontSize: "16px",
              }}
            />
          </div>
          <div className="editProfiles__items">
            <label style={{ color: "#000000" }}>Profession</label>
            <select
              id="profession"
              onChange={professionChange}
              style={{
                backgroundColor: "#fafafa",
                border: "none",
                outline: "none",
                padding: "5px 10px 5px 10px",
                fontFamily: "Manrope, sans-serif",
                opacity: "90%",
                fontSize: "16px",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
                cursor: "pointer",
              }}
            >
              {profList}
            </select>
          </div>
          <div className="editProfiles__items">
            <label style={{ color: "#000000" }}>Email</label>
            <p className="para editProfiles__items__background">{real_email}</p>
          </div>
          <div className="editProfiles__items">{saveButton()}</div>
        </div>
      </NavbarSearch>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(editProfile);
