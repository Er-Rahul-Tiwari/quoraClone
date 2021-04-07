import React, { useState, useEffect } from "react";
import NavbarSearch from "../../src/Layouts/NavbarSearch";
import { getProfile } from "../../redux/ActionCreator";
import { connect } from "react-redux";
import FollowerSkeleton from "../../src/Skeletons/Follower";
import { Avatar, makeStyles } from "@material-ui/core";
import axiosConfig from "../../src/Utils/axiosConfig";

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

function Follower(props) {
  const classes = useStyles();
  const [followersList, setFollowerslist] = useState();
  const [wait, setWait] = useState(true);
  const [change, setChange] = useState();

  useEffect(async () => {
    await props
      .getProfile()
      .then((resolve) => {
        axiosConfig
          .get("/api/auth/get-followers-list/")
          .then((response) => {
            setFollowerslist(response.data.body);
            setWait(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((reject) => {
        window.location.href = "/auth/signin";
      });
  }, []);

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

  const followers = () => {
    if (followersList.length != 0) {
      return followersList.map((user) => {
        let index = followersList.indexOf(user);
        let image = "";
        if (user.profileURL) {
          image = user.profileURL.split("?")[0];
        }
        let width = "100%";
        if (followersList.length === 1) {
          width = "50%";
        }
        let followbutton = () => null;
        if (user.is_follower) {
          followbutton = () => {
            return (
              <button className="btn__small btn--green followerCard__btn font">
                Unfollow
              </button>
            );
          };
        } else {
          followbutton = () => {
            return (
              <button className="btn__small btn--green followerCard__btn font">
                Follow back
              </button>
            );
          };
        }
        return (
          <div className="followerCard" style={{ width: width }}>
            <Avatar className={classes.avatar} src={image} />
            <p className="para--dark-3">{user.username}</p>
            {followbutton()}
          </div>
        );
      });
    }
    return <p style={{ textAlign: "center" }}>You dont have followers yet !</p>;
  };

  if (wait) {
    return <FollowerSkeleton />;
  }
  

  return (
    <div className="followers">
      <NavbarSearch />

      <div className="arrNavs">
        <div className="arrNav">
          <svg
            className="arrNav__icon visibility__none"
            viewBox="0 0 25 13"
            fill="none"
            style={{ cursor: "pointer" }}
            onClick={() => history.back()}
          >
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
          <h2 className="heading-2 weight-600 font">{props.profileData.data.body.followers_count} followers</h2>          
        </div>
      </div>

      <div className="follower">
        <div className="followerCards">
         {followers()}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Follower);
