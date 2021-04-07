import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/router";
import NavbarSearch from "../../src/Layouts/NavbarSearch";
import styles from "../../styles/Home.module.css";
import cookie from "cookie";
import * as FormData from "form-data";
import LanguageIcon from "@material-ui/icons/Language";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { getProfile } from "../../redux/ActionCreator";
import { connect } from "react-redux";
import axiosConfig from "../../src/Utils/axiosConfig";
import ProfileSkeleton from '../../src/Skeletons/Profile';
import { removeCookie } from "../../redux/localstorage";
import CryptoJS from "crypto-js";
import axios from "axios";

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
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

function profile(props) {
  const classes = useStyles();
  const [user_data, setUserData] = useState();
  const router = useRouter();
  const [activeBrowse, setActiveBrowse] = useState("Answers");
  const [wait, setWait] = useState(true);
  const [change, setChanged] = useState();

  const changeActiveBrowse = (id) => {
    document.getElementById(activeBrowse).className = "categories__link";
    setActiveBrowse(id);
    document.getElementById(id).className = "btn btn--black";
  };

  useEffect(async () => {
    await props
      .getProfile()
      .then((resolve) => {        
        if(props.userdata){
          setUserData(props.userdata);
          setWait(false);
        }
        else if(parseInt(props.id) === resolve.body.userID){
          window.location.href = "/myprofile";          
        }      
      })
      .catch((reject) => {
        window.location.href = "/auth/signin";
      });
  }, []);

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

  const toggleFollowing = () => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("userID", user_data.body.userID);
      axiosConfig
        .post("/api/auth/toggle-following-view/", data)
        .then((response) => {
          resolve(response);          
        })
        .catch((error) => {
          reject(error);
        });
    });
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
    return <ProfileSkeleton/>
  }

  let image = "";
  let fullname = "";
  let bio = "";
  let following = "";
  let profession = "";
  let Websites = [];
  let interests = [];
  let isFollowing = () => null;
  let contact_websites = () => <div></div>;
  if (user_data) {
    let data = user_data.body;
    image = user_data.body.profileURL;
    if (image) {
      image = image.split("?")[0];
    }
    fullname = data.user.fullname;
    bio = data.bio;
    following = data.followings_count;
    profession = data.Profession;
    isFollowing = () => {
      if (user_data.body.is_following) {
        return (
          <p
            className="profile__following"
            style={{
              textTransform: "capitalize",
              cursor: "pointer",
              fontSize: "18px",
              backgroundColor: "#FBFBFB",
              borderRadius: "3px",              
            }}
            onClick={async () => {
              await toggleFollowing()
                .then((resolve) => {
                  user_data.body.is_following = false;
                  setUserData(user_data);
                  removeCookie("state");
                  if (change) setChanged();
                  else setChanged(1);
                })
                .catch((reject) => {});
            }}
          >
            <label style={{ padding: "0px 10px 0px 5px"}}>Unfollow</label>
          </p>
        );
      }
      return (
        <p
          className="profile__follower"
          style={{ textTransform: "capitalize", cursor: "pointer" }}
          onClick={async () => {
            await toggleFollowing()
              .then((resolve) => {
                user_data.body.is_following = true;
                setUserData(user_data);
                removeCookie("state");
                if (change) setChanged();
                else setChanged(1);
              })
              .catch((reject) => {});
          }}
        >
          Follow
        </p>
      );
    };
    Websites = data.Websites;
    contact_websites = () => contacts(Websites);
    interests = data.myInterest;
  }

  return (
    <div className="homes">
      <NavbarSearch />
      <div className="profile">
        <div className="backArrow">
          <b
            className="para--size-22 backArrow__icon"
            style={{ cursor: "pointer" }}
            onClick={() => history.back()}
          >
            &larr;
          </b>
          <div className="profileNav__heading--box">
            <div className="profileNav__heading--item profileNav__heading--item-1">
              <h2
                className={styles.font}
                style={{ textTransform: "capitalize" }}
              >
                {fullname}
              </h2>
            </div>
            <div className="profileNav__heading--item profileNav__heading--item-2">
              <a className="bp__small--none" style={{ color: "#000000" }}>
                Settings
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="profile">
        <div className="profile__story">
          <Avatar className={classes.avatar} src={image} />
          <div>
            <p className="profile__detail ">{bio}</p>
            <p className="profile__detail ">{profession}</p>
          </div>
        </div>
        <div className="profile__follow">
          {isFollowing()}
          <p className="profile__following">{following} following</p>
        </div>
      </div>
      <div className="profile">
        <section
          className="categories__bg-color"
          style={{ marginBottom: "3%" }}
        >
          <h3 className="handle heading-3">
            <label className={styles.font}>Categories</label>
          </h3>
        </section>
      </div>

      <div className="profile">
        <div className="categories__link-1" style={{ marginBottom: "3%" }}>
          {myInterests(interests)}
        </div>
      </div>           

      <div className="contactInformation">
        <div className="contactInformation__heading">
          <h3 className="heading-3">Contact Information</h3>
        </div>
        <div style={{ display: "inline-block" }}>{contact_websites()}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(profile);

const decryptData = (cookie) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cookie, "gje0u49mcw094rm-0r23");
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
  } catch (e) {
    return null;
  }
};

export const getServerSideProps = async (context) => {
  let userdata;
  let id = context.params.id;
  if (context.req) {
    const data = new FormData();
    data.append("userID", id);
    const cookies = parseCookies(context.req);
    const axiosConfig = axios.create({
      baseURL: "https://server.collectanea.co",
      headers: data.getHeaders(),
    });
    axiosConfig.interceptors.request.use(
      function (config) {
        const Token = decryptData(cookies.secret);
        if (Token) config.headers["Authorization"] = "Token " + Token;

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    const getUser = () => {
      return new Promise((resolve, reject) => {
        axiosConfig
          .post("/api/auth/get-user-profile/", data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {            
            reject(null);
          });
      });
    };
    await getUser()
      .then((resolve) => {
        userdata = resolve;
      })
      .catch((reject) => {        
        userdata = null;
      });
  }
  return {
    props: { userdata, id },
  };
};
